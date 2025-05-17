import { useState } from "react";
import {
  setProducts,
  addProduct,
  productCategory,
  resetProducts,
} from "../Redux/productReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NewProduct from "./NewProduct";
import { v4 as uuidv4 } from "uuid";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.product?.products);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    fetch("/mockApi.json")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProducts(data));
      });
  }, [dispatch]);

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleAddProduct = (product) => {
    const newProduct = {
      ...product,
      id: uuidv4(),
    };
    dispatch(addProduct(newProduct));
  };

  const AllProductsCategory = [
    ...new Set(products?.map((product) => product.category)),
  ];

  const handleCategoryFilter = (category) => {
    if (category === "All") {
      dispatch(resetProducts());
    } else {
      dispatch(productCategory(category));
      setCurrentPage(1);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <button
          onClick={toggleModal}
          className="mb-4 px-4 py-2 bg-gray-500 text-white rounded"
        >
          Create Product
        </button>
      </div>

      <div>
        <select
          name="category"
          id="category"
          className="my-4 w-[20%] h-11 p-2 rounded border-gray-300 shadow-sm sm:text-sm outline-none focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) => {
            handleCategoryFilter(e.target.value);
          }}
        >
          <option value="All" className="font-bold">
            All Categories
          </option>
          {AllProductsCategory.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        ) : (
          currentProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow">
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-auto rounded-sm"
              />
              <h2 className="text-lg font-semibold">{product.productName}</h2>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-blue-600 font-bold mt-2">₦ {product.price}</p>
              <p className="text-sm font-light italic mt-2">
                {" "}
                {product.description}
              </p>
            </div>
          ))
        )}
      </div>
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-gray-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((page) => Math.min(page + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow w-[50%] relative">
            <div className="relative mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Add New Product</h2>
              </div>

              <button
                onClick={toggleModal}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 mb-4">
              Fill in the details of the new product below.
            </p>

            <NewProduct onClose={toggleModal} AddProduct={handleAddProduct} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

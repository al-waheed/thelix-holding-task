import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const NewProduct = (props) => {
  const { onClose, AddProduct } = props;

  const handleUploadImage = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file || !file.type.match(/^image\//)) {
      toast.error("Please upload a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFieldValue("image", reader.result);
    };
    reader.onerror = () => toast.error("Failed to read file");
    reader.readAsDataURL(file);
  };

  return (
    <Formik
      initialValues={{
        productName: "",
        category: "",
        price: "",
        description: "",
        image: "",
      }}
      validationSchema={Yup.object({
        productName: Yup.string()
          .matches(/^[A-Za-z\s]+$/, "Product name must contain only letters")
          .required("Product name is required"),
        category: Yup.string()
          .matches(/^[A-Za-z\s]+$/, "Category must contain only letters")
          .required("Category is required"),
        price: Yup.number()
          .typeError("Price must be a number")
          .required("Price is required"),
        description: Yup.string().required("Description is required"),
        image: Yup.string().required("Product image is required"),
      })}
      onSubmit={(values, { resetForm }) => {
        AddProduct(values);
        resetForm();
        onClose();
        toast.success("Product added successfully!");
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700">
              Product Name
            </label>
            <Field
              type="text"
              id="productName"
              name="productName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="productName"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">
              Category
            </label>
            <Field
              type="text"
              id="category"
              name="category"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="category"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">
              Price
            </label>
            <Field
              type="number"
              id="price"
              name="price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => handleUploadImage(e, setFieldValue)}
            />
            <ErrorMessage
              name="image"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Add Product
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewProduct;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  allProducts: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.allProducts = action.payload;
    },
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
      state.allProducts.unshift(action.payload);
      localStorage.setItem("products", JSON.stringify(state.allProducts));
    },
    searchProduct: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.products = !searchTerm
        ? [...state.allProducts]
        : (state.products = state.allProducts.filter((product) =>
            product.productName.toLowerCase().includes(searchTerm)
          ));
    },
    productCategory: (state, action) => {
      state.products =
        action.payload === "All"
          ? [...state.allProducts]
          : (state.products = state.allProducts.filter(
              (product) => product.category === action.payload
            ));
    },
    resetProducts: (state, action) => {
      state.products = [...state.allProducts];
    },
  },
});

export const {
  setProducts,
  addProduct,
  searchProduct,
  resetProducts,
  productCategory,
} = productSlice.actions;
export default productSlice.reducer;

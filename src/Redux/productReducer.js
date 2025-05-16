import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
    },
    searchProduct: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm === "") {
        state.products = state.products;
        return;
      }
      state.products = state.products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm)
      );
    },
    productCategory: (state, action) => {
      if (action.payload === "All") {
        state.products = state.products;
        return;
      }
      state.products = state.products.filter(
        (product) => product.category === action.payload
      );
    },
  },
});

export const { setProducts, addProduct, searchProduct, productCategory } =
  productSlice.actions;
export default productSlice.reducer;

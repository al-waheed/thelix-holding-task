import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Redux/productReducer.js";
import App from "./App.jsx";
import "./index.css";

const store = configureStore({
  reducer: {
    product: productSlice,
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

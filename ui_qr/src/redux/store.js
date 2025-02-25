import { configureStore } from "@reduxjs/toolkit";
import cartsReducer from "../redux/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartsReducer,
  },
});

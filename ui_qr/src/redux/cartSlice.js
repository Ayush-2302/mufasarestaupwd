import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    cartAdded: (state, action) => {
      const item = action.payload;
      const existingItem = state.find((cartItem) => cartItem._id === item._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }

      saveCartToLocalStorage(state);
    },
    cartRemoved: (state, action) => {
      const id = action.payload;
      const updatedCart = state.filter((item) => item._id !== id);
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    },
    cartCleared: () => {
      saveCartToLocalStorage([]);
      return [];
    },
  },
});

export const { cartAdded, cartRemoved, cartCleared } = cartSlice.actions;

export default cartSlice.reducer;

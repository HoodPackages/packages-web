import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),

  addToCart: (item) => {
    const cart = get().cart;

    const existingIndex = cart.findIndex(
      (p) => p._id === item._id && p.name === item.name
    );

    let updatedCart;
    if (existingIndex >= 0) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += item.quantity;
    } else {
      updatedCart = [...cart, { ...item }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    set({ cart: updatedCart });
  },

  removeFromCart: (id) => {
    const updatedCart = get().cart.filter((p) => p._id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    set({ cart: updatedCart });
  },

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: [] });
  }
}));

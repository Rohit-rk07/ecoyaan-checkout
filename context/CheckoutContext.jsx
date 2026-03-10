"use client";

import { createContext, useContext, useState } from "react";

const emptyCart = {
  cartItems: [],
  shipping_fee: 0,
  discount_applied: 0,
};

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {
  const [cart, setCart] = useState(emptyCart);
  const [shippingAddress, setShippingAddress] = useState(null);

  const value = {
    cart,
    setCart,
    shippingAddress,
    setShippingAddress,
  };

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useCheckout must be used inside CheckoutProvider");
  }

  return context;
}

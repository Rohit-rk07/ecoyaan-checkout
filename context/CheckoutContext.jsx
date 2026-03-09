"use client";

import { createContext, useContext, useMemo, useState } from "react";

const defaultCart = {
  cartItems: [],
  shipping_fee: 0,
  discount_applied: 0,
};

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {
  const [cart, setCart] = useState(defaultCart);
  const [address, setAddress] = useState(null);

  const value = useMemo(
    () => ({
      cart,
      setCart,
      address,
      setAddress,
    }),
    [cart, address],
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useCheckout must be used inside CheckoutProvider");
  }

  return context;
}

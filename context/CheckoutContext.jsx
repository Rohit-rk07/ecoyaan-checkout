"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const emptyCart = {
  cartItems: [],
  shipping_fee: 0,
  discount_applied: 0,
};

const STORAGE_KEY = "ecoyaan_checkout_state_v1";

function readPersistedState() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writePersistedState(state) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore write errors (storage full, blocked, etc.)
  }
}

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {
  const initialPersistedState = readPersistedState();
  const initialAddresses = Array.isArray(initialPersistedState?.shippingAddresses)
    ? initialPersistedState.shippingAddresses
    : [];
  const initialSelectedId =
    typeof initialPersistedState?.selectedShippingAddressId === "string"
      ? initialPersistedState.selectedShippingAddressId
      : null;
  const initialSelectedIdValid =
    initialSelectedId &&
    initialAddresses.some((address) => address.id === initialSelectedId);

  const [cart, setCart] = useState(() =>
    initialPersistedState?.cart?.cartItems ? initialPersistedState.cart : emptyCart,
  );
  const [shippingAddresses, setShippingAddresses] = useState(() => initialAddresses);
  const [selectedShippingAddressId, setSelectedShippingAddressId] = useState(() => {
    if (initialSelectedIdValid) return initialSelectedId;
    if (initialAddresses.length > 0) return initialAddresses[0].id;
    return initialSelectedId;
  });

  useEffect(() => {
    writePersistedState({
      cart,
      shippingAddresses,
      selectedShippingAddressId,
    });
  }, [cart, selectedShippingAddressId, shippingAddresses]);

  const selectedShippingAddress = useMemo(() => {
    if (!selectedShippingAddressId) return null;
    return (
      shippingAddresses.find(
        (address) => address.id === selectedShippingAddressId,
      ) ?? null
    );
  }, [selectedShippingAddressId, shippingAddresses]);

  const upsertShippingAddress = (address) => {
    setShippingAddresses((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === address.id);
      if (existingIndex === -1) return [...prev, address];

      const next = [...prev];
      next[existingIndex] = address;
      return next;
    });
  };

  const removeShippingAddress = (id) => {
    setShippingAddresses((prev) => prev.filter((address) => address.id !== id));
    setSelectedShippingAddressId((prev) => {
      if (prev !== id) return prev;
      return null;
    });
  };

  const selectShippingAddress = (id) => {
    setSelectedShippingAddressId(id);
  };

  const value = {
    cart,
    setCart,
    shippingAddresses,
    selectedShippingAddressId,
    selectedShippingAddress,
    upsertShippingAddress,
    removeShippingAddress,
    selectShippingAddress,
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

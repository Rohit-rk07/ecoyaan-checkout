"use client";

import { CheckoutProvider } from "@/context/CheckoutContext";

export default function Providers({ children }) {
  return <CheckoutProvider>{children}</CheckoutProvider>;
}

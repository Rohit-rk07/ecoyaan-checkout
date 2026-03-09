"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ShippingForm from "@/components/ShippingForm";
import OrderSummary from "@/components/OrderSummary";
import { useCheckout } from "@/context/CheckoutContext";

export default function ShippingPage() {
  const router = useRouter();
  const { cart } = useCheckout();

  useEffect(() => {
    if (!cart.cartItems.length) {
      router.replace("/cart");
    }
  }, [cart.cartItems.length, router]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">Checkout</h1>
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <ShippingForm />
        <OrderSummary cart={cart} />
      </div>
    </main>
  );
}

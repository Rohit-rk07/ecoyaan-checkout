"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckoutShell from "@/components/CheckoutShell";
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
    <CheckoutShell
      activeStep="shipping"
      eyebrow="Step 02"
      title="Address Details"
    >
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <ShippingForm />
        <OrderSummary cart={cart} />
      </div>
    </CheckoutShell>
  );
}

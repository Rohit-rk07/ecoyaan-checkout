"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckoutShell from "@/components/CheckoutShell";
import ShippingForm from "@/components/ShippingForm";
import OrderSummary from "@/components/OrderSummary";
import StickyActions from "@/components/StickyActions";
import { useCheckout } from "@/context/CheckoutContext";

export default function ShippingPage() {
  const router = useRouter();
  const { cart, selectedShippingAddress } = useCheckout();

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
      description="Pick a saved address or add a new one. Your addresses stay on this device so the flow continues even after a refresh."
      hasStickyFooter
    >
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <ShippingForm />
        <OrderSummary cart={cart} />
      </div>

      <StickyActions
        secondaryLabel="Back"
        onSecondary={() => router.push("/cart")}
        primaryLabel="Next step"
        onPrimary={() => router.push("/checkout/payment")}
        primaryDisabled={!selectedShippingAddress}
      />
    </CheckoutShell>
  );
}

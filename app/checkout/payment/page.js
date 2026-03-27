"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckoutShell from "@/components/CheckoutShell";
import OrderSummary from "@/components/OrderSummary";
import StickyActions from "@/components/StickyActions";
import { useCheckout } from "@/context/CheckoutContext";

export default function PaymentPage() {
  const router = useRouter();
  const { cart, selectedShippingAddress } = useCheckout();

  useEffect(() => {
    if (!cart.cartItems.length) {
      router.replace("/cart");
      return;
    }

    if (!selectedShippingAddress) {
      router.replace("/checkout/shipping");
    }
  }, [selectedShippingAddress, cart.cartItems.length, router]);

  const onPay = () => {
    router.push("/success");
  };

  return (
    <CheckoutShell
      activeStep="payment"
      eyebrow="Step 03"
      title="Confirm delivery details and payment."
      description="Review the address and order summary. The payment action is simulated for this assignment."
      hasStickyFooter
    >
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <section className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--panel-strong)] p-5 shadow-[0_18px_40px_rgba(19,26,22,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Payment
          </p>
          <h2 className="mt-2 text-xl font-semibold text-[color:var(--ink)]">Delivery details</h2>
          {selectedShippingAddress ? (
            <div className="mt-4 rounded-[24px] bg-[color:var(--surface)] px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
              <p className="font-semibold text-[color:var(--ink)]">{selectedShippingAddress.fullName}</p>
              <p>{selectedShippingAddress.email}</p>
              <p>{selectedShippingAddress.phone}</p>
              <p>
                {selectedShippingAddress.city}, {selectedShippingAddress.state} - {selectedShippingAddress.pinCode}
              </p>
            </div>
          ) : null}
        </section>
        <OrderSummary cart={cart} />
      </div>

      <StickyActions
        secondaryLabel="Back"
        onSecondary={() => router.push("/checkout/shipping")}
        primaryLabel="Complete payment"
        onPrimary={onPay}
        primaryDisabled={!selectedShippingAddress}
      />
    </CheckoutShell>
  );
}

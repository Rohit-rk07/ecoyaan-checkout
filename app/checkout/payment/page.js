"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckoutShell from "@/components/CheckoutShell";
import OrderSummary from "@/components/OrderSummary";
import { useCheckout } from "@/context/CheckoutContext";

export default function PaymentPage() {
  const router = useRouter();
  const { cart, shippingAddress } = useCheckout();

  useEffect(() => {
    if (!cart.cartItems.length) {
      router.replace("/cart");
      return;
    }

    if (!shippingAddress) {
      router.replace("/checkout/shipping");
    }
  }, [shippingAddress, cart.cartItems.length, router]);

  const onPay = () => {
    router.push("/success");
  };

  return (
    <CheckoutShell
      activeStep="payment"
      eyebrow="Step 03"
      title="Confirm delivery details and payment."
    >
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <section className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--panel-strong)] p-5 shadow-[0_18px_40px_rgba(19,26,22,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Payment
          </p>
          <h2 className="mt-2 text-xl font-semibold text-[color:var(--ink)]">Delivery details</h2>
          {shippingAddress ? (
            <div className="mt-4 rounded-[24px] bg-[color:var(--surface)] px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
              <p className="font-semibold text-[color:var(--ink)]">{shippingAddress.fullName}</p>
              <p>{shippingAddress.email}</p>
              <p>{shippingAddress.phone}</p>
              <p>
                {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}
              </p>
            </div>
          ) : null}


          <button
            type="button"
            onClick={onPay}
            disabled={!shippingAddress}
            className="mt-6 w-full rounded-full bg-[color:var(--ink)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Complete payment
          </button>
        </section>
        <OrderSummary cart={cart} />
      </div>
    </CheckoutShell>
  );
}

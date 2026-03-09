"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import OrderSummary from "@/components/OrderSummary";
import { useCheckout } from "@/context/CheckoutContext";

export default function PaymentPage() {
  const router = useRouter();
  const { cart, address } = useCheckout();

  useEffect(() => {
    if (!cart.cartItems.length) {
      router.replace("/cart");
      return;
    }

    if (!address) {
      router.replace("/checkout/shipping");
    }
  }, [address, cart.cartItems.length, router]);

  const onPay = () => {
    router.push("/success");
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">Payment Confirmation</h1>
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">Delivery Details</h2>
          {address ? (
            <div className="mt-3 space-y-1 text-sm text-zinc-700">
              <p>{address.fullName}</p>
              <p>{address.email}</p>
              <p>{address.phone}</p>
              <p>
                {address.city}, {address.state} - {address.pinCode}
              </p>
            </div>
          ) : null}

          <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
            Payment is mocked for this assignment. Clicking the button confirms your order.
          </div>

          <button
            type="button"
            onClick={onPay}
            disabled={!address}
            className="mt-6 w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-400"
          >
            Pay Securely
          </button>
        </section>
        <OrderSummary cart={cart} />
      </div>
    </main>
  );
}

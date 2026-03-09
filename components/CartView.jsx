"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { useCheckout } from "@/context/CheckoutContext";

export default function CartView({ initialCart }) {
  const router = useRouter();
  const { cart, setCart } = useCheckout();

  useEffect(() => {
    if (cart.cartItems.length === 0 && initialCart?.cartItems?.length > 0) {
      setCart(initialCart);
    }
  }, [cart.cartItems.length, initialCart, setCart]);

  const activeCart = cart.cartItems.length > 0 ? cart : initialCart;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">Your Cart</h1>
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <section className="space-y-4">
          {activeCart.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </section>
        <section className="space-y-4">
          <OrderSummary cart={activeCart} />
          <button
            type="button"
            onClick={() => router.push("/checkout/shipping")}
            className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Proceed to Checkout
          </button>
        </section>
      </div>
    </main>
  );
}

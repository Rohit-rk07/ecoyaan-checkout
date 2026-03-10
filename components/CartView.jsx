"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CartItem from "@/components/CartItem";
import CheckoutShell from "@/components/CheckoutShell";
import OrderSummary from "@/components/OrderSummary";
import { useCheckout } from "@/context/CheckoutContext";
import { getCartTotals } from "@/lib/cartMath";

export default function CartView({ initialCart }) {
  const router = useRouter();
  const { cart, setCart } = useCheckout();

  useEffect(() => {
    if (cart.cartItems.length === 0 && initialCart?.cartItems?.length > 0) {
      setCart(initialCart);
    }
  }, [cart.cartItems.length, initialCart, setCart]);

  const activeCart = cart.cartItems.length > 0 ? cart : initialCart;
  const { itemCount } = getCartTotals(activeCart);

  return (
    <CheckoutShell
      activeStep="cart"
      eyebrow="Step 01"
      title="Review the bag before you lock the order."
      description="The cart is rendered on the server and hydrated into local checkout state so the next steps can stay fast and simple."
    >
      <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
        <section className="space-y-4">
          <div className="flex items-center justify-between rounded-[24px] border border-dashed border-[color:var(--border-strong)] px-4 py-3 text-sm text-[color:var(--muted)]">
            <span>{itemCount} units ready for checkout</span>
            <span>Mock inventory available</span>
          </div>
          {activeCart.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </section>
        <section className="space-y-4">
          <OrderSummary cart={activeCart} />
          <div className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
            <p className="text-sm leading-6 text-[color:var(--muted)]">
              The next screen collects only the fields needed for a mocked checkout:
              name, contact, PIN, city, and state.
            </p>
            <button
              type="button"
              onClick={() => router.push("/checkout/shipping")}
              className="mt-4 w-full rounded-full bg-[color:var(--ink)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-92"
            >
              Continue to shipping
            </button>
          </div>
        </section>
      </div>
    </CheckoutShell>
  );
}

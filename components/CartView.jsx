"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CartItem from "@/components/CartItem";
import CheckoutShell from "@/components/CheckoutShell";
import OrderSummary from "@/components/OrderSummary";
import StickyActions from "@/components/StickyActions";
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
      description="Double-check quantities and totals. Continue when everything looks good."
      hasStickyFooter
    >
      <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
        <section className="space-y-4">
          <div className="flex items-center justify-between rounded-[24px] border border-dashed border-[color:var(--border-strong)] px-4 py-3 text-sm text-[color:var(--muted)]">
            <span>{itemCount} units ready for checkout</span>
          </div>
          {activeCart.cartItems.map((item) => (
            <CartItem key={item.product_id} item={item} />
          ))}
        </section>
        <section className="space-y-4">
          <OrderSummary cart={activeCart} />
        </section>
      </div>

      <StickyActions
        primaryLabel="Next step"
        onPrimary={() => router.push("/checkout/shipping")}
        primaryDisabled={!activeCart.cartItems.length}
      />
    </CheckoutShell>
  );
}

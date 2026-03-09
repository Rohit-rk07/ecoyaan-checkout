import CartView from "@/components/CartView";
import { fetchCart } from "@/lib/fetchCart";

export default async function CartPage() {
  const cart = await fetchCart();

  return <CartView initialCart={cart} />;
}

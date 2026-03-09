function formatINR(value) {
  return `Rs. ${Number(value).toLocaleString("en-IN")}`;
}

export default function OrderSummary({ cart }) {
  const items = cart?.cartItems || [];
  const shipping = Number(cart?.shipping_fee || 0);
  const discount = Number(cart?.discount_applied || 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shipping - discount;

  return (
    <aside className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">Order Summary</h2>
      <div className="mt-4 space-y-2 text-sm text-zinc-700">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>{formatINR(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span>{formatINR(shipping)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span>- {formatINR(discount)}</span>
        </div>
      </div>
      <div className="mt-4 border-t border-zinc-200 pt-3">
        <div className="flex items-center justify-between text-base font-semibold text-zinc-900">
          <span>Total</span>
          <span>{formatINR(total)}</span>
        </div>
      </div>
    </aside>
  );
}

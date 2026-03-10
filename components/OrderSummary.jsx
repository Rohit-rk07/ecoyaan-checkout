import { formatPrice, getCartTotals } from "@/lib/cartMath";

export default function OrderSummary({ cart }) {
  const { itemCount, subtotal, shipping, discount, total } = getCartTotals(cart);

  return (
    <aside className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--panel-strong)] p-5 text-[color:var(--ink)] shadow-[0_20px_60px_rgba(19,26,22,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Summary
          </p>
          <h2 className="mt-2 text-xl font-semibold">Order snapshot</h2>
        </div>
        <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--muted)]">
          {itemCount} items
        </span>
      </div>
      <div className="mt-6 space-y-3 text-sm text-[color:var(--muted)]">
        <div className="flex items-center justify-between">
          <span>Bag subtotal</span>
          <span className="text-[color:var(--ink)]">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping fee</span>
          <span className="text-[color:var(--ink)]">{formatPrice(shipping)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Eco discount</span>
          <span className="text-[color:var(--accent-strong)]">- {formatPrice(discount)}</span>
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-[color:var(--surface)] px-4 py-4">
        <div className="flex items-center justify-between text-base font-semibold text-[color:var(--ink)]">
          <span>Final total</span>
          <span>{formatPrice(total)}</span>
        </div>
        <p className="mt-1 text-xs text-[color:var(--muted)]">Inclusive of taxes. Payment is simulated in the next step.</p>
      </div>
    </aside>
  );
}

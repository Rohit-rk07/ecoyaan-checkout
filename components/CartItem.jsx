import Image from "next/image";
import { formatPrice } from "@/lib/cartMath";

export default function CartItem({ item }) {
  const total = item.product_price * item.quantity;

  return (
    <article className="flex gap-4 rounded-[24px] border border-[color:var(--border)] bg-[color:var(--panel-strong)] p-4 shadow-[0_12px_32px_rgba(19,26,22,0.06)]">
      <Image
        src={item.image}
        alt={item.product_name}
        width={88}
        height={88}
        className="h-22 w-22 rounded-2xl object-cover"
        unoptimized
      />
      <div className="flex flex-1 items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
            Product {item.product_id}
          </p>
          <h3 className="mt-1 text-base font-semibold text-[color:var(--ink)]">{item.product_name}</h3>
          <p className="mt-2 text-sm text-[color:var(--muted)]">Quantity selected: {item.quantity}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-[color:var(--muted)]">{formatPrice(item.product_price)} each</p>
          <p className="mt-2 text-base font-semibold text-[color:var(--ink)]">{formatPrice(total)}</p>
        </div>
      </div>
    </article>
  );
}

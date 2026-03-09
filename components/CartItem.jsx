import Image from "next/image";

export default function CartItem({ item }) {
  const total = item.price * item.quantity;

  return (
    <article className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <Image
        src={item.image}
        alt={item.name}
        width={80}
        height={80}
        className="h-20 w-20 rounded-lg object-cover"
        unoptimized
      />
      <div className="flex flex-1 items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">{item.name}</h3>
          <p className="mt-1 text-sm text-zinc-600">Qty: {item.quantity}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-zinc-500">Rs. {item.price}</p>
          <p className="text-sm font-semibold text-zinc-900">Rs. {total}</p>
        </div>
      </div>
    </article>
  );
}

import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-12">
      <section className="w-full rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <p className="text-5xl">??</p>
        <h1 className="mt-3 text-2xl font-bold text-zinc-900">Order Successful</h1>
        <p className="mt-2 text-zinc-600">Thank you for your purchase. Your order has been confirmed.</p>
        <Link
          href="/cart"
          className="mt-6 inline-flex rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
        >
          Back to Cart
        </Link>
      </section>
    </main>
  );
}

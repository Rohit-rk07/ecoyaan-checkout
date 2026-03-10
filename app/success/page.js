import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-12">
      <section className="w-full overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[color:var(--panel)] shadow-[0_28px_90px_rgba(19,26,22,0.14)]">
        <div className="border-b border-[color:var(--border)] bg-[radial-gradient(circle_at_top,_rgba(142,168,122,0.28),_transparent_35%),linear-gradient(180deg,_#f8f5ec,_#eef2e7)] px-8 py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--muted)]">
            Checkout complete
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
            Order confirmed.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
            The flow is complete.
          </p>
        </div>
        <div className="grid gap-6 px-8 py-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <div className="inline-flex rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[color:var(--muted)]">
              Reference: ECO-DEMO-302
            </div>
          </div>
        </div>
        <div className="px-8 pb-8">
          <Link
            href="/cart"
            className="inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-[color:var(--ink)] px-6 py-3 text-sm font-semibold leading-none text-white shadow-[0_12px_30px_rgba(19,26,22,0.18)] transition hover:opacity-92"
            style={{ color: "#ffffff" }}
          >
            <span className="whitespace-nowrap" style={{ color: "#ffffff" }}>
              Start over from cart
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}

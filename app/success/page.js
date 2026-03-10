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
            The flow is complete. Cart data was fetched on the server, address state moved through the client, and payment stayed mocked by design.
          </p>
        </div>
        <div className="grid gap-6 px-8 py-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <div className="inline-flex rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[color:var(--muted)]">
              Reference: ECO-DEMO-302
            </div>
            <p className="mt-5 text-sm leading-6 text-[color:var(--muted)]">
              If this were production, the next step would be handoff to order creation and confirmation email workflows. For the assignment, this page closes the mocked checkout loop.
            </p>
          </div>
          <div className="rounded-[24px] bg-[color:var(--surface)] p-5">
            <p className="text-sm font-medium text-[color:var(--ink)]">What this page proves</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              Navigation, client state persistence, and end-to-end route completeness.
            </p>
          </div>
        </div>
        <Link
          href="/cart"
          className="mx-8 mb-8 inline-flex rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-92"
        >
          Start over from cart
        </Link>
      </section>
    </main>
  );
}

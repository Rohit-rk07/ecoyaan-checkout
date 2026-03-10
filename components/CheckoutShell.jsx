const STEPS = [
  { key: "cart", label: "Bag" },
  { key: "shipping", label: "Address" },
  { key: "payment", label: "Confirm" },
];

export default function CheckoutShell({
  activeStep,
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[color:var(--panel)] shadow-[0_25px_80px_rgba(19,26,22,0.12)]">
        <div className="border-b border-[color:var(--border)] bg-[radial-gradient(circle_at_top_left,_rgba(142,168,122,0.32),_transparent_38%),linear-gradient(135deg,_#f8f5ec,_#edf2ea)] px-6 py-8 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--muted)]">
                {eyebrow}
              </p>
              <h1 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-[color:var(--ink)] sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--muted)] sm:text-base">
                {description}
              </p>
            </div>
            <ol className="flex gap-3 overflow-x-auto pb-1">
              {STEPS.map((step, index) => {
                const isActive = step.key === activeStep;

                return (
                  <li
                    key={step.key}
                    className={`min-w-28 rounded-full border px-4 py-2 text-sm transition ${
                      isActive
                        ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
                        : "border-[color:var(--border-strong)] bg-white/70 text-[color:var(--muted)]"
                    }`}
                  >
                    <span className="mr-2 text-xs opacity-70">0{index + 1}</span>
                    {step.label}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
        <div className="px-6 py-6 sm:px-8 sm:py-8">{children}</div>
      </section>
    </main>
  );
}

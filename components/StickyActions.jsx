"use client";

export default function StickyActions({
  primaryLabel,
  onPrimary,
  primaryDisabled = false,
  secondaryLabel,
  onSecondary,
  secondaryDisabled = false,
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-t-[26px] border border-b-0 border-[color:var(--border)] bg-[rgba(252,249,242,0.82)] px-4 py-4 shadow-[0_-18px_60px_rgba(19,26,22,0.12)] backdrop-blur supports-[backdrop-filter]:bg-[rgba(252,249,242,0.74)]">
          <div
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end"
            style={{
              paddingBottom: "calc(env(safe-area-inset-bottom) + 0.25rem)",
            }}
          >
            {secondaryLabel ? (
              <button
                type="button"
                onClick={onSecondary}
                disabled={secondaryDisabled}
                className="min-h-12 w-full rounded-full border border-[color:var(--border-strong)] bg-white/70 px-5 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--accent)] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              >
                {secondaryLabel}
              </button>
            ) : null}

            <button
              type="button"
              onClick={onPrimary}
              disabled={primaryDisabled}
              className="min-h-12 w-full rounded-full bg-[color:var(--ink)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(19,26,22,0.18)] transition hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              {primaryLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

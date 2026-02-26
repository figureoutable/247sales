"use client";

// Direct link to Discovery Call (15 min) — skips event-type selection and opens calendar
const CAL_EMBED_URL = "https://cal.com/figures/discovery";

export function CalEmbed({ className }: { className?: string }) {
  return (
    <div className={className}>
      <iframe
        src={CAL_EMBED_URL}
        title="Book a call with Figures"
        className="h-[700px] w-full rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800"
        style={{ border: 0 }}
      />
    </div>
  );
}

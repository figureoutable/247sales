import type { Metadata } from "next";
import { Testimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Accounts & Tax | Figures",
  description:
    "End-to-end accounting and tax for UK businesses. Bookkeeping, VAT, year-end accounts and tax — done properly, on time. Book a free discovery call.",
};

export default function AccountsAndTaxPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1 — HEADLINE */}
      <section className="px-4 pt-16 pb-2 sm:px-6 sm:pt-20 sm:pb-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            <span className="block">Accounts & Tax Filed in 21 Days</span>
            <span className="mt-2 block">or You Don&apos;t Pay a Penny</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 sm:text-xl">
            <span className="block">Full-Service Accounting for UK Businesses. Fixed fees, same-day responses.</span>
            <span className="mt-1 block">No Jargon, No Surprises.</span>
          </p>
        </div>
      </section>

      {/* SECTION 2 — VIDEO */}
      <section className="px-4 pt-2 pb-6 sm:px-6 sm:pt-4 sm:pb-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
            <iframe
              src="https://www.youtube.com/embed/h86AWtWx15o"
              title="How Figures accounting and tax works"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* SECTION 2b — BULLET POINTS (2x2, EY box highlighted) */}
      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
            <div className="flex min-h-[4rem] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-base text-slate-700 sm:gap-2.5 sm:px-5">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700" aria-hidden>✓</span>
              <span>Open 8am to 8pm</span>
            </div>
            <div className="flex min-h-[4rem] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-base text-slate-700 sm:gap-2.5 sm:px-5">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700" aria-hidden>✓</span>
              <span>Fixed fees from day one</span>
            </div>
            <div className="flex min-h-[4rem] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-base text-slate-700 sm:gap-2.5 sm:px-5">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700" aria-hidden>✓</span>
              <span>Same-day responses</span>
            </div>
            <div className="flex min-h-[4rem] items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-base text-slate-800 sm:gap-2.5 sm:px-5">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700" aria-hidden>✓</span>
              <span>EY Trained Chartered Accountants</span>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* SECTION 3 — BOOKING CALENDAR */}
      <section className="border-t border-slate-200 bg-slate-50/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Book your free 20-minute discovery call
          </h2>
          <p className="mt-4 text-center text-lg text-slate-600">
            No obligation. No hard sell. An honest conversation about
            whether we are the right fit :)
          </p>
          <div className="mt-10 w-full">
            <iframe
              src="https://cal.com/figures/discoverycall"
              title="Book a discovery call with Figures"
              className="h-[700px] w-full"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

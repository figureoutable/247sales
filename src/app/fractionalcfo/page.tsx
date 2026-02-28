import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fractional CFO | Figures",
  description:
    "Senior finance leadership from £1,500 a month. No recruitment, no overhead, no long-term commitment. Book a free discovery call.",
};

export default function FractionalCFOPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1 — HEADLINE */}
      <section className="px-4 pt-16 pb-2 sm:px-6 sm:pt-20 sm:pb-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            <span className="block">Your business deserves a CFO</span>
            <span className="mt-2 block">You just don&apos;t need a full-time one</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 sm:text-xl">
            Figures gives you senior finance leadership from £1,500 a month — no
            recruitment, no overhead, no long-term commitment.
          </p>
        </div>
      </section>

      {/* SECTION 3 — VIDEO */}
      <section className="px-4 pt-2 pb-6 sm:px-6 sm:pt-4 sm:pb-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
            <iframe
              src="https://www.youtube.com/embed/IMINKKOOWgE"
              title="How Figures fractional CFO works"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHAT YOU GET */}
      <section className="px-4 pt-6 pb-16 sm:px-6 sm:pt-8 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            What a Figures fractional CFO actually does
          </h2>

          {/* Sample reports — above the three cards */}
          <div className="mt-12 mx-auto max-w-2xl text-center">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              See sample reports
            </h3>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition-colors hover:border-slate-400 hover:bg-slate-50"
              >
                View Sample Management Report
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition-colors hover:border-slate-400 hover:bg-slate-50"
              >
                View Sample Board Pack
              </a>
            </div>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-lg font-semibold text-slate-900">
                Monthly Management Reporting
              </h3>
              <p className="mt-4 text-slate-600">
                Actual vs budget, cash flow, KPIs and forward forecast delivered
                within 5 working days of month end. Every month, without
                chasing.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-lg font-semibold text-slate-900">
                Cash Flow & Runway Management
              </h3>
              <p className="mt-4 text-slate-600">
                13-week rolling cash forecasts and early warning monitoring so
                you always know what is coming and never get caught short.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-lg font-semibold text-slate-900">
                Strategic Finance Support
              </h3>
              <p className="mt-4 text-slate-600">
                Budgets, forecasts, scenario models and board preparation. The
                thinking your business needs to grow with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHAT HAPPENS ON THE CALL */}
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            What to expect on the discovery call
          </h2>
          <ol className="mt-8 space-y-4 sm:space-y-5">
            <li className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:gap-5 sm:p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white sm:h-12 sm:w-12 sm:text-base" aria-hidden>
                1
              </span>
              <p className="pt-1 text-slate-700 sm:pt-1.5">
                We spend 15 minutes understanding your business and current
                finance setup
              </p>
            </li>
            <li className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:gap-5 sm:p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white sm:h-12 sm:w-12 sm:text-base" aria-hidden>
                2
              </span>
              <p className="pt-1 text-slate-700 sm:pt-1.5">
                I will tell you honestly whether a fractional CFO is right for
                you at this stage
              </p>
            </li>
            <li className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:gap-5 sm:p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white sm:h-12 sm:w-12 sm:text-base" aria-hidden>
                3
              </span>
              <p className="pt-1 text-slate-700 sm:pt-1.5">
                If it is a fit, I will explain exactly what working together
                looks like and what it costs
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* SECTION 6 — BOOKING CALENDAR */}
      <section className="border-t border-slate-200 bg-slate-50/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Book your free 15-minute discovery call
          </h2>
          <p className="mt-4 text-center text-lg text-slate-600">
            No obligation. No hard sell. Just an honest conversation about
            whether we are the right fit.
          </p>
          <div className="mt-10 w-full">
            <iframe
              src="https://cal.com/figures/discovery"
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

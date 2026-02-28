import type { Metadata } from "next";
import Image from "next/image";

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
            The average CFO costs £100k+ a year. Figures starts at £1,500 a month.
            No recruitment, no overhead, no lock-in.
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

          <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Monthly Management Reporting
              </h3>
              <p className="mt-2 text-slate-600 sm:mt-3">
                Actual vs budget, cash flow, KPIs and forward forecast delivered
                within 5 working days of month end. Every month, without
                chasing.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Cash Flow & Runway Management
              </h3>
              <p className="mt-2 text-slate-600 sm:mt-3">
                13-week rolling cash forecasts and early warning monitoring so
                you always know what is coming and never get caught short.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Strategic Finance Support
              </h3>
              <p className="mt-2 text-slate-600 sm:mt-3">
                Budgets, forecasts, scenario models and board preparation. The
                thinking your business needs to grow with confidence.
              </p>
            </div>
          </div>

          {/* Sample reports — below the three cards */}
          <div className="mt-10 mx-auto max-w-4xl text-center sm:mt-16">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Sample Reports
            </h3>
            <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
              <div className="w-full max-w-sm">
                <a
                  href="/sample-reports/ecommerce-management-report-sample.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-sm transition-shadow hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                  aria-label="View sample management report (PDF)"
                >
                  <Image
                    src="/sample-reports/sample-management-report.png"
                    alt="Sample Management Report — Revenue Performance & Forecast"
                    width={480}
                    height={320}
                    className="h-auto w-full object-cover"
                  />
                </a>
                <p className="mt-2 text-center text-sm font-medium text-slate-700">
                  Ecommerce — Management Report
                </p>
              </div>
              <div className="w-full max-w-sm">
                <a
                  href="/sample-reports/marketing-agency-budget-financial-plan.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-sm transition-shadow hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                  aria-label="View sample board pack (PDF)"
                >
                  <Image
                    src="/sample-reports/sample-board-pack.png"
                    alt="Sample Board Pack — Current Position & Opportunities"
                    width={480}
                    height={320}
                    className="h-auto w-full object-cover"
                  />
                </a>
                <p className="mt-2 text-center text-sm font-medium text-slate-700">
                  Marketing Agency — Budget &amp; Financial Plan
                </p>
              </div>
            </div>
          </div>
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

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
            The average CFO costs £100k+ a year. With Figures, you get the same expertise at a fraction of the cost.
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
            See what quality finance support looks like, explore our sample reports:
          </h2>

          {/* Sample reports */}
          <div className="mt-10 mx-auto max-w-5xl text-center sm:mt-16">
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
              <div className="mx-auto w-full max-w-sm">
                <a
                  href="/sample-reports/ecommerce-management-report-sample.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-sm transition-shadow hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                  aria-label="View sample — Revenue Performance & Forecast (PDF)"
                >
                  <Image
                    src="/sample-reports/sample-ecommerce-management-report.png"
                    alt="Revenue Performance & Forecast — Ecommerce Management Report"
                    width={480}
                    height={320}
                    className="h-auto w-full object-cover"
                  />
                </a>
                <p className="mt-2 text-center text-sm font-medium text-slate-700">
                  Ecommerce — Management Report
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm">
                <a
                  href="/sample-reports/invoice-finance-report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-sm transition-shadow hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                  aria-label="View sample — Invoice Finance Market Review (PDF)"
                >
                  <Image
                    src="/sample-reports/sample-invoice-finance-review.png"
                    alt="Invoice Finance — Market Review"
                    width={480}
                    height={320}
                    className="h-auto w-full object-cover"
                  />
                </a>
                <p className="mt-2 text-center text-sm font-medium text-slate-700">
                  Invoice Finance — Market Review
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm">
                <a
                  href="/sample-reports/marketing-agency-budget-financial-plan.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-sm transition-shadow hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                  aria-label="View sample — Current Position & Opportunities (PDF)"
                >
                  <Image
                    src="/sample-reports/sample-marketing-agency-forecast.png"
                    alt="Current Position & Opportunities — Marketing Agency Budget & Financial Plan"
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
            Book your free 20-minute discovery call
          </h2>
          <p className="mt-4 text-center text-lg text-slate-600">
            No obligation. No hard sell. An honest conversation about
            whether we are the right fit.
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

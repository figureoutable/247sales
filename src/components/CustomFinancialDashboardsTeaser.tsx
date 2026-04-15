import Image from "next/image";
import Link from "next/link";

export function CustomFinancialDashboardsTeaser() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20" aria-labelledby="custom-dashboards-heading">
      <div className="mx-auto max-w-6xl">
        <Link href="/finance-dashboard" className="group block rounded-xl px-2 py-1 text-center">
          <h2
            id="custom-dashboards-heading"
            className="text-center text-3xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-slate-700 sm:text-4xl"
          >
            Custom Financial Dashboards
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-base text-slate-600 sm:text-lg">
            Built around your numbers, your reporting cadence, and the decisions you need to make.
          </p>
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Link
            href="/finance-dashboard"
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/finance-dashboards/custom-dashboard-glox.png"
                alt="Glox AI custom finance dashboard preview"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Link>

          <Link
            href="/finance-dashboard"
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/finance-dashboards/custom-dashboard-istanbul.png"
                alt="Istanbul Barbers custom finance dashboard preview"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

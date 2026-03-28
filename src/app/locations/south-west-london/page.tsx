import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { LOCATIONS_PATH, SW_LONDON_HUB_INTRO, SW_LONDON_HUB_META, townPath } from "@/data/locations";
import { SW_LONDON_TOWN_PAGES } from "@/data/locations-sw-towns";
import { LocalBusinessJsonLd } from "@/components/locations/LocalBusinessJsonLd";

export const metadata: Metadata = {
  title: { absolute: SW_LONDON_HUB_META.title },
  description: SW_LONDON_HUB_META.description,
  alternates: { canonical: "/locations/south-west-london" },
};

export default function SouthWestLondonHubPage() {
  return (
    <>
      <LocalBusinessJsonLd areaServed="South West London" />
      <div className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <nav className="text-sm text-slate-600" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href={LOCATIONS_PATH} className="font-medium hover:text-black hover:underline">
                  Areas we serve
                </Link>
              </li>
              <li aria-hidden className="text-slate-400">
                /
              </li>
              <li className="font-semibold text-slate-900">South West London</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Accountants in South West London</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">{SW_LONDON_HUB_INTRO}</p>

          <section className="mt-14" aria-labelledby="sw-towns-heading">
            <h2 id="sw-towns-heading" className="text-2xl font-bold text-slate-900">
              Areas we cover in South West London
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {SW_LONDON_TOWN_PAGES.map((t) => (
                <article key={t.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">
                    <Link href={townPath("south-west-london", t.slug)} className="hover:underline">
                      {t.displayName}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{t.hubBlurb}</p>
                  <p className="mt-4">
                    <Link
                      href={townPath("south-west-london", t.slug)}
                      className="text-sm font-semibold text-slate-900 underline-offset-2 hover:underline"
                    >
                      Accountants in {t.displayName}
                    </Link>
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16" aria-labelledby="sw-services-heading">
            <h2 id="sw-services-heading" className="text-2xl font-bold text-slate-900">
              Services for South West London businesses
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              We deliver the same chartered accountant standards London SMEs expect — including{" "}
              <Link href="/services/statutory-accounts-tax" className="font-medium text-slate-900 underline-offset-2 hover:underline">
                statutory accounts and corporation tax
              </Link>
              ,{" "}
              <Link href="/services/payroll-paye" className="font-medium text-slate-900 underline-offset-2 hover:underline">
                payroll and PAYE
              </Link>
              ,{" "}
              <Link href="/services/bookkeeping-xero" className="font-medium text-slate-900 underline-offset-2 hover:underline">
                bookkeeping and Xero
              </Link>
              ,{" "}
              <Link href="/services/vat" className="font-medium text-slate-900 underline-offset-2 hover:underline">
                VAT
              </Link>
              ,{" "}
              <Link href="/services/management-reporting" className="font-medium text-slate-900 underline-offset-2 hover:underline">
                management reporting
              </Link>
              ,{" "}
              <Link href="/services/cash-flow-management" className="font-medium text-slate-900 underline-offset-2 hover:underline">
                cash flow management
              </Link>
              ,{" "}
              <Link href="/services/budgeting-forecasting" className="font-medium text-slate-900 underline-offset-2 hover:underline">
                budgeting and forecasting
              </Link>
              ,{" "}
              <Link href="/services/board-investor-reporting" className="font-medium text-slate-900 underline-offset-2 hover:underline">
                board and investor reporting
              </Link>
              , and{" "}
              <Link href="/services/fractional-cfo" className="font-medium text-slate-900 underline-offset-2 hover:underline">
                fractional CFO
              </Link>{" "}
              support — with meetings across South West London when you need them.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.id}`} className="text-sm font-medium text-slate-700 underline-offset-2 hover:text-black hover:underline">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { LOCATIONS_PATH, SURREY_HUB_INTRO, SURREY_HUB_META, townPath } from "@/data/locations";
import { SURREY_TOWN_PAGES } from "@/data/locations-surrey-towns";
import { LocalBusinessJsonLd } from "@/components/locations/LocalBusinessJsonLd";

export const metadata: Metadata = {
  title: { absolute: SURREY_HUB_META.title },
  description: SURREY_HUB_META.description,
  alternates: { canonical: "/locations/surrey" },
};

export default function SurreyHubPage() {
  return (
    <>
      <LocalBusinessJsonLd areaServed="Surrey" />
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
              <li className="font-semibold text-slate-900">Surrey</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Accountants in Surrey</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">{SURREY_HUB_INTRO}</p>

          <section className="mt-14" aria-labelledby="surrey-towns-heading">
            <h2 id="surrey-towns-heading" className="text-2xl font-bold text-slate-900">
              Towns we support in Surrey
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {SURREY_TOWN_PAGES.map((t) => (
                <article key={t.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">
                    <Link href={townPath("surrey", t.slug)} className="hover:underline">
                      {t.displayName}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{t.hubBlurb}</p>
                  <p className="mt-4">
                    <Link
                      href={townPath("surrey", t.slug)}
                      className="text-sm font-semibold text-slate-900 underline-offset-2 hover:underline"
                    >
                      Accountants in {t.displayName}
                    </Link>
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16" aria-labelledby="surrey-services-heading">
            <h2 id="surrey-services-heading" className="text-2xl font-bold text-slate-900">
              Services for Surrey businesses
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Surrey SMEs rely on us for compliance and insight across the full finance stack — from{" "}
              <Link href="/services/bookkeeping-xero" className="font-medium text-slate-900 underline-offset-2 hover:underline">
                bookkeeping and Xero
              </Link>{" "}
              through{" "}
              <Link href="/services/statutory-accounts-tax" className="font-medium text-slate-900 underline-offset-2 hover:underline">
                statutory accounts and corporation tax
              </Link>
              ,{" "}
              <Link href="/services/payroll-paye" className="font-medium text-slate-900 underline-offset-2 hover:underline">
                payroll
              </Link>
              , and{" "}
              <Link href="/services/vat" className="font-medium text-slate-900 underline-offset-2 hover:underline">
                VAT
              </Link>{" "}
              to forward-looking{" "}
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
              support when you need part-time finance leadership.
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

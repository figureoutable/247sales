import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import type { TownEntry } from "@/data/locations";
import { LOCATIONS_PATH, SURREY_HUB_PATH, SW_LONDON_HUB_PATH, otherTownLinks } from "@/data/locations";
import { LocalBusinessJsonLd } from "./LocalBusinessJsonLd";

const HUB_LABEL: Record<TownEntry["region"], string> = {
  surrey: "Surrey",
  "south-west-london": "South West London",
};

const HUB_PATH: Record<TownEntry["region"], string> = {
  surrey: SURREY_HUB_PATH,
  "south-west-london": SW_LONDON_HUB_PATH,
};

export function TownLocationPage({ town }: { town: TownEntry }) {
  const others = otherTownLinks(town);
  const surreyOthers = others.filter((o) => o.region === "surrey");
  const swOthers = others.filter((o) => o.region === "south-west-london");

  return (
    <>
      <LocalBusinessJsonLd areaServed={town.displayName} />
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
              <li>
                <Link href={HUB_PATH[town.region]} className="font-medium hover:text-black hover:underline">
                  {HUB_LABEL[town.region]}
                </Link>
              </li>
              <li aria-hidden className="text-slate-400">
                /
              </li>
              <li className="font-semibold text-slate-900">{town.displayName}</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{town.h1}</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">{town.intro}</p>

          <section className="mt-14" aria-labelledby="location-services-heading">
            <h2 id="location-services-heading" className="text-2xl font-bold text-slate-900">
              Accounting services for businesses in {town.displayName}
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We support limited companies and growing teams with the full stack of SME finance work. That includes{" "}
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
              , and{" "}
              <Link href="/services/vat" className="font-medium text-slate-900 underline-offset-2 hover:underline">
                VAT
              </Link>{" "}
              compliance. When you need forward-looking insight, we also deliver{" "}
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
              support for leadership teams. Every service has its own detail page if you want to go deeper on scope, timelines and how we work with clients like yours.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.id}`}
                    className="text-sm font-medium text-slate-700 underline-offset-2 hover:text-black hover:underline"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14" aria-labelledby="why-figures-location-heading">
            <h2 id="why-figures-location-heading" className="text-2xl font-bold text-slate-900">
              Why Figures for {town.displayName} businesses
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{town.whyFigures}</p>
          </section>

          <section className="mt-14" aria-labelledby="location-faq-heading">
            <h2 id="location-faq-heading" className="text-2xl font-bold text-slate-900">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-8">
              {town.faqs.map((faq) => (
                <div key={faq.q}>
                  <p className="font-semibold text-slate-900">{faq.q}</p>
                  <p className="mt-2 leading-relaxed text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 border-t border-slate-200 pt-12" aria-labelledby="internal-services-heading">
            <h2 id="internal-services-heading" className="text-xl font-bold text-slate-900">
              Our services
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.id}`} className="text-sm text-slate-600 underline-offset-2 hover:text-black hover:underline">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-xl font-bold text-slate-900">Other areas we serve</h2>
            <div className="mt-4 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">Surrey</p>
                <ul className="mt-2 space-y-1">
                  {surreyOthers.map((o) => (
                    <li key={o.href}>
                      <Link href={o.href} className="text-sm text-slate-600 underline-offset-2 hover:text-black hover:underline">
                        {o.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">South West London</p>
                <ul className="mt-2 space-y-1">
                  {swOthers.map((o) => (
                    <li key={o.href}>
                      <Link href={o.href} className="text-sm text-slate-600 underline-offset-2 hover:text-black hover:underline">
                        {o.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

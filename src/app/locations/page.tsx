import type { Metadata } from "next";
import Link from "next/link";
import {
  LOCATIONS_ROOT_INTRO,
  LOCATIONS_ROOT_META,
  SW_LONDON_HUB_PATH,
  SURREY_HUB_PATH,
  townPath,
} from "@/data/locations";
import { SURREY_TOWN_PAGES } from "@/data/locations-surrey-towns";
import { SW_LONDON_TOWN_PAGES } from "@/data/locations-sw-towns";
import { LocalBusinessJsonLd } from "@/components/locations/LocalBusinessJsonLd";

export const metadata: Metadata = {
  title: { absolute: LOCATIONS_ROOT_META.title },
  description: LOCATIONS_ROOT_META.description,
  alternates: { canonical: "/locations" },
};

export default function LocationsHubPage() {
  return (
    <>
      <LocalBusinessJsonLd areaServed="Surrey and South West London" />
      <div className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Areas We Serve</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">{LOCATIONS_ROOT_INTRO}</p>

          <section className="mt-14" aria-labelledby="locations-surrey-section">
            <h2 id="locations-surrey-section" className="text-2xl font-bold text-slate-900">
              <Link href={SURREY_HUB_PATH} className="hover:underline">
                Surrey
              </Link>
            </h2>
            <p className="mt-3 text-slate-600">
              Chartered accountant support for SMEs and founders across the county — see the{" "}
              <Link href={SURREY_HUB_PATH} className="font-medium text-slate-900 underline-offset-2 hover:underline">
                Surrey hub
              </Link>{" "}
              for an overview.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {SURREY_TOWN_PAGES.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={townPath("surrey", t.slug)}
                    className="text-sm font-medium text-slate-700 underline-offset-2 hover:text-black hover:underline"
                  >
                    {t.listLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14" aria-labelledby="locations-sw-section">
            <h2 id="locations-sw-section" className="text-2xl font-bold text-slate-900">
              <Link href={SW_LONDON_HUB_PATH} className="hover:underline">
                South West London
              </Link>
            </h2>
            <p className="mt-3 text-slate-600">
              Same Woking-based team, structured for London-paced SMEs — start from the{" "}
              <Link href={SW_LONDON_HUB_PATH} className="font-medium text-slate-900 underline-offset-2 hover:underline">
                South West London hub
              </Link>
              .
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {SW_LONDON_TOWN_PAGES.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={townPath("south-west-london", t.slug)}
                    className="text-sm font-medium text-slate-700 underline-offset-2 hover:text-black hover:underline"
                  >
                    {t.listLabel}
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

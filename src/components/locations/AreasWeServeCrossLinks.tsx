import Link from "next/link";
import { SURREY_TOWN_PAGES } from "@/data/locations-surrey-towns";
import { SW_LONDON_TOWN_PAGES } from "@/data/locations-sw-towns";
import { SURREY_HUB_PATH, SW_LONDON_HUB_PATH, townPath } from "@/data/locations";

export function AreasWeServeCrossLinks() {
  return (
    <section className="mt-16 border-t border-slate-200 pt-12" aria-labelledby="areas-we-serve-heading">
      <h2 id="areas-we-serve-heading" className="text-2xl font-bold text-slate-900">
        Areas we serve
      </h2>
      <p className="mt-3 text-slate-600">
        Figures is based in Woking and works with SMEs across Surrey and South West London. Explore a local page for
        more detail, or{" "}
        <Link href="/locations" className="font-medium text-slate-900 underline-offset-2 hover:underline">
          view all areas we serve
        </Link>
        .
      </p>
      <div className="mt-8 grid gap-10 sm:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            <Link href={SURREY_HUB_PATH} className="hover:underline">
              Surrey
            </Link>
          </p>
          <ul className="mt-3 space-y-2">
            {SURREY_TOWN_PAGES.map((t) => (
              <li key={t.slug}>
                <Link href={townPath("surrey", t.slug)} className="text-sm text-slate-600 underline-offset-2 hover:text-black hover:underline">
                  {t.listLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            <Link href={SW_LONDON_HUB_PATH} className="hover:underline">
              South West London
            </Link>
          </p>
          <ul className="mt-3 space-y-2">
            {SW_LONDON_TOWN_PAGES.map((t) => (
              <li key={t.slug}>
                <Link
                  href={townPath("south-west-london", t.slug)}
                  className="text-sm text-slate-600 underline-offset-2 hover:text-black hover:underline"
                >
                  {t.listLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

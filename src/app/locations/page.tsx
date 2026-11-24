import type { Metadata } from "next";
import { LOCATIONS_ROOT_INTRO, LOCATIONS_ROOT_META, SW_LONDON_HUB_PATH, SURREY_HUB_PATH, townPath } from "@/data/locations";
import { SURREY_TOWN_PAGES } from "@/data/locations-surrey-towns";
import { SW_LONDON_TOWN_PAGES } from "@/data/locations-sw-towns";
import { LocalBusinessJsonLd } from "@/components/locations/LocalBusinessJsonLd";
import { Arrow, Btn, C, Crumbs, CtaBand, Eyebrow, Guarantee, H1, H2, Lead, Pill, Section, TextLink } from "@/components/redesign/ui";

export const metadata: Metadata = {
  title: { absolute: LOCATIONS_ROOT_META.title },
  description: LOCATIONS_ROOT_META.description,
  alternates: { canonical: "/locations" },
};

export default function LocationsHubPage() {
  return (
    <>
      <LocalBusinessJsonLd areaServed="Surrey and South West London" />
      <Section pad="56px 0 80px">
        <Crumbs items={[{ label: "Home", href: "/" }, { label: "Areas we serve" }]} />
        <Eyebrow>Areas we serve</Eyebrow>
        <H1>Accountants in Surrey and South West London</H1>
        <Lead maxWidth={820}>{LOCATIONS_ROOT_INTRO}</Lead>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 30 }}>
          <Btn>
            Book a free discovery call <Arrow />
          </Btn>
        </div>
        <Guarantee />
      </Section>

      <Section bg={C.alt}>
        <H2>Surrey</H2>
        <Lead maxWidth={820}>Chartered accountant support for small businesses and founders across the county.</Lead>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
          {SURREY_TOWN_PAGES.map((t) => (
            <Pill key={t.slug} href={townPath("surrey", t.slug)}>
              {t.listLabel}
            </Pill>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <TextLink href={SURREY_HUB_PATH}>Accountants in Surrey</TextLink>
        </div>
      </Section>

      <Section>
        <H2>South West London</H2>
        <Lead maxWidth={820}>The same team, set up for London-paced small businesses.</Lead>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
          {SW_LONDON_TOWN_PAGES.map((t) => (
            <Pill key={t.slug} href={townPath("south-west-london", t.slug)}>
              {t.listLabel}
            </Pill>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <TextLink href={SW_LONDON_HUB_PATH}>Accountants in South West London</TextLink>
        </div>
      </Section>

      <CtaBand title="Not on the list? We work with clients across the UK." text="Book a free 30-minute discovery call and we will send you a fixed quote." />
    </>
  );
}

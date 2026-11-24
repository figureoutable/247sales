import { SERVICES } from "@/lib/constants";
import type { TownEntry } from "@/data/locations";
import { LOCATIONS_PATH, SURREY_HUB_PATH, SW_LONDON_HUB_PATH, otherTownLinks } from "@/data/locations";
import { Arrow, Btn, C, CheckList, Crumbs, CtaBand, DarkCard, Eyebrow, FaqGrid, Guarantee, H1, H2, Lead, Para, Pill, Row, Section, TextLink, Tile } from "@/components/redesign/ui";
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
  const isHome = town.slug === "woking";

  return (
    <>
      <LocalBusinessJsonLd areaServed={town.displayName} />
      <Section pad="56px 0 80px">
        <Crumbs items={[{ label: "Home", href: "/" }, { label: "Areas we serve", href: LOCATIONS_PATH }, { label: HUB_LABEL[town.region], href: HUB_PATH[town.region] }, { label: town.displayName }]} />
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 48 }}>
          <div style={{ flex: "1.3 1 480px", minWidth: 0 }}>
            <Eyebrow>{HUB_LABEL[town.region]}</Eyebrow>
            <H1>{town.h1}</H1>
            <Lead>{town.hubBlurb}</Lead>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 30 }}>
              <Btn>
                Book a free discovery call <Arrow />
              </Btn>
              <Btn kind="ghost" href="/#pricing">
                See pricing
              </Btn>
            </div>
            <Guarantee />
          </div>
          <DarkCard label={isHome ? "Local to Woking" : `Serving ${town.displayName}`}>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#FFFFFF" }}>
              {isHome ? "Our home town. Woking clients get the shortest path to partner-level advice." : `Woking-based, working with ${town.displayName} businesses in person and remotely.`}
            </p>
            <div style={{ marginTop: 8 }}>
              <CheckList items={["Face-to-face meetings when it helps", "ICAS Chartered Accountants", "Former EY, advised Lloyds, UBS and Metro Bank", "Fixed fees agreed upfront"]} color="#FFFFFF" tick={C.yellow} />
            </div>
          </DarkCard>
        </div>
      </Section>

      <Section pad="0 0 88px">
        <Eyebrow>About {town.displayName}</Eyebrow>
        <H2>Accounting for {town.displayName} businesses</H2>
        <Para>{town.intro}</Para>
      </Section>

      <Section bg={C.alt}>
        <Eyebrow>What we do in {town.displayName}</Eyebrow>
        <H2>Accounting services for businesses in {town.displayName}</H2>
        <Row>
          {SERVICES.map((s) => (
            <Tile key={s.id} title={s.title} text={s.description} href={`/services/${s.id}`} />
          ))}
        </Row>
        <div style={{ marginTop: 28 }}>
          <TextLink href="/services">View all services</TextLink>
        </div>
      </Section>

      <Section>
        <Eyebrow>Why Figures</Eyebrow>
        <H2>Why Figures for {town.displayName} businesses</H2>
        <Para>{town.whyFigures}</Para>
      </Section>

      <Section bg={C.alt}>
        <Eyebrow>FAQ</Eyebrow>
        <H2>Questions from {town.displayName} businesses</H2>
        <FaqGrid items={town.faqs} />
      </Section>

      <Section pad="72px 0">
        <Eyebrow>Nearby areas</Eyebrow>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {others.map((o) => (
            <Pill key={o.href} href={o.href}>
              Accountants in {o.label}
            </Pill>
          ))}
          <Pill href={LOCATIONS_PATH}>All areas we serve</Pill>
        </div>
      </Section>

      <CtaBand title={`Looking for an accountant in ${town.displayName}?`} text="Book a free discovery call. We'll chat about your business and how we can help, with no obligation." />
    </>
  );
}

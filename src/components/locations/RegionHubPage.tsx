import { SERVICES } from "@/lib/constants";
import { LOCATIONS_PATH, townPath } from "@/data/locations";
import { LocalBusinessJsonLd } from "@/components/locations/LocalBusinessJsonLd";
import { Arrow, Btn, C, Crumbs, CtaBand, Eyebrow, Guarantee, H1, H2, Lead, Pill, Row, Section, Tile } from "@/components/redesign/ui";

type Town = { slug: string; displayName: string; hubBlurb: string };

type Props = {
  region: "surrey" | "south-west-london";
  name: string;
  intro: string;
  townsHeading: string;
  towns: readonly Town[];
};

/** Shared layout for the Surrey and South West London area pages. */
export function RegionHubPage({ region, name, intro, townsHeading, towns }: Props) {
  return (
    <>
      <LocalBusinessJsonLd areaServed={name} />
      <Section pad="56px 0 80px">
        <Crumbs items={[{ label: "Home", href: "/" }, { label: "Areas we serve", href: LOCATIONS_PATH }, { label: name }]} />
        <Eyebrow>Areas we serve</Eyebrow>
        <H1>Accountants in {name}</H1>
        <Lead maxWidth={820}>{intro}</Lead>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 30 }}>
          <Btn>
            Book a free discovery call <Arrow />
          </Btn>
          <Btn kind="ghost" href="/contact">
            Get a fixed quote
          </Btn>
        </div>
        <Guarantee />
      </Section>

      <Section bg={C.alt}>
        <Eyebrow>Local pages</Eyebrow>
        <H2>{townsHeading}</H2>
        <Row>
          {towns.map((t) => (
            <Tile key={t.slug} title={t.displayName} text={t.hubBlurb} href={townPath(region, t.slug)} label={`Accountants in ${t.displayName}`} />
          ))}
        </Row>
      </Section>

      <Section>
        <Eyebrow>What we do</Eyebrow>
        <H2>Services for {name} businesses</H2>
        <Lead maxWidth={820}>
          From bookkeeping, payroll and VAT to year-end accounts, tax returns, management reporting and fractional CFO support. One team, one fixed fee.
        </Lead>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
          {SERVICES.map((s) => (
            <Pill key={s.id} href={`/services/${s.id}`}>
              {s.title}
            </Pill>
          ))}
        </div>
      </Section>

      <CtaBand title={`Looking for an accountant in ${name}?`} text="Book a free 30-minute discovery call. We will talk through what you need and send you a fixed quote." />
    </>
  );
}

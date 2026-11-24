import type { Metadata } from "next";
import { SERVICES } from "@/lib/constants";
import { Arrow, Btn, C, Crumbs, CtaBand, Eyebrow, Guarantee, H1, H2, Lead, Row, Section, Tile } from "@/components/redesign/ui";

export const metadata: Metadata = {
  title: "Accounting & Tax Services for Small Businesses",
  alternates: { canonical: "/services" },
  description:
    "Year-end accounts, Self Assessment, bookkeeping, VAT, payroll, management reporting and fractional CFO. Fixed-fee accounting for UK small businesses and startups.",
};

const SMALL_BUSINESS = ["statutory-accounts-tax", "self-assessment", "bookkeeping-xero", "vat", "payroll-paye"];

export default function ServicesPage() {
  const everyday = SERVICES.filter((s) => SMALL_BUSINESS.includes(s.id));
  const growth = SERVICES.filter((s) => !SMALL_BUSINESS.includes(s.id));

  return (
    <>
      <Section pad="56px 0 80px">
        <Crumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        <Eyebrow>Our services</Eyebrow>
        <H1>Accounting and tax services, done properly</H1>
        <Lead>End-to-end finance and accounting for UK founders and small businesses. Fixed fees, plain English and one team that knows your numbers.</Lead>
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
        <Eyebrow>Small businesses</Eyebrow>
        <H2>The essentials, off your desk</H2>
        <Row>
          {everyday.map((s) => (
            <Tile key={s.id} title={s.title} text={s.description} href={`/services/${s.id}`} />
          ))}
          <Tile title="Making Tax Digital" text="Get ready for quarterly reporting to HMRC. A plain-English guide for sole traders and landlords." href="/mtdincometax" />
        </Row>
      </Section>

      <Section>
        <Eyebrow>Startups &amp; investors</Eyebrow>
        <H2>A finance team that grows with you</H2>
        <Row>
          {growth.map((s) => (
            <Tile key={s.id} title={s.title} text={s.description} href={`/services/${s.id}`} />
          ))}
        </Row>
      </Section>

      <CtaBand title="Not sure what you need?" text="Book a free 30-minute discovery call. We will help you figure it out and send you a fixed quote." />
    </>
  );
}

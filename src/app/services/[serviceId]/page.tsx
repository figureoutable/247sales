import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/constants";
import { SERVICE_PAGES } from "@/data/service-pages";
import { getAllPosts } from "@/components/redesign/posts";
import { Arrow, Btn, C, Card, Check, CheckList, Crumbs, CtaBand, DarkCard, Eyebrow, FaqGrid, Guarantee, H1, H2, Lead, Para, Pill, Row, Section, TextLink, Tile } from "@/components/redesign/ui";

type Props = { params: Promise<{ serviceId: string }> };

/** Search-friendly page titles. "| Figures" is added by the root layout. */
const SEO_TITLES: Record<string, string> = {
  "statutory-accounts-tax": "Year-End Accounts & Corporation Tax Accountants",
  "self-assessment": "Self Assessment Tax Return Accountants",
  "payroll-paye": "Payroll & PAYE Services for Small Businesses",
  "bookkeeping-xero": "Bookkeeping & Xero Accountants for Small Businesses",
  "fractional-cfo": "Fractional CFO Services for UK Startups",
  "management-reporting": "Management Accounts & Board Reporting",
  vat: "VAT Accountants for Small Businesses",
  "cash-flow-management": "Cash Flow Forecasting for Startups & SMEs",
  "board-investor-reporting": "Board & Investor Reporting for Startups",
  "budgeting-forecasting": "Budgeting & Forecasting Services",
};

function getService(serviceId: string) {
  return SERVICES.find((s) => s.id === serviceId) ?? null;
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ serviceId: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceId } = await params;
  const service = getService(serviceId);
  if (!service) return { title: "Service not found" };

  return {
    title: SEO_TITLES[service.id] ?? service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.id}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { serviceId } = await params;
  const service = getService(serviceId);
  if (!service) notFound();

  const content = SERVICE_PAGES[service.id as keyof typeof SERVICE_PAGES];
  if (!content) notFound();

  const heading = SEO_TITLES[service.id] ?? service.title;
  const related = SERVICES.filter((s) => s.id !== service.id).slice(0, 5);
  const allPosts = await getAllPosts();
  const keyword = service.title.split(" ")[0].toLowerCase();
  const guides = allPosts.filter((p) => p.title.toLowerCase().includes(keyword)).slice(0, 3);

  return (
    <>
      <Section pad="56px 0 80px">
        <Crumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]} />
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 48 }}>
          <div style={{ flex: "1.3 1 480px", minWidth: 0 }}>
            <Eyebrow>{service.title}</Eyebrow>
            <H1>{heading}</H1>
            <Lead>{content.intro}</Lead>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 30 }}>
              <Btn>
                Book a free discovery call <Arrow />
              </Btn>
              <Btn kind="ghost" href="/contact">
                Get a fixed quote
              </Btn>
            </div>
            <Guarantee />
          </div>
          <DarkCard label="At a glance">
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#FFFFFF" }}>
              <strong>Who it&rsquo;s for:</strong> {service.whoFor}
            </p>
            <div style={{ marginTop: 8 }}>
              <CheckList items={[...content.whatWeDo.slice(0, 3), "Fixed fee agreed upfront"]} color="#FFFFFF" tick={C.yellow} />
            </div>
          </DarkCard>
        </div>
      </Section>

      <Section bg={C.alt}>
        <Eyebrow>What we do</Eyebrow>
        <H2>{service.title}, handled properly</H2>
        <Para>{service.detail}</Para>
        <Row>
          {content.whatWeDo.map((item) => (
            <Card key={item} flex="1 1 250px">
              <div style={{ display: "flex", gap: 12, fontSize: 16, lineHeight: 1.55 }}>
                <Check />
                <span>{item}</span>
              </div>
            </Card>
          ))}
        </Row>
      </Section>

      <Section>
        <Eyebrow>How we do it</Eyebrow>
        <H2>A clear process from start to finish</H2>
        <ol style={{ listStyle: "none", margin: "36px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 16, maxWidth: 820 }}>
          {content.howWeWork.map((step, i) => (
            <li key={step} style={{ display: "flex", gap: 16, alignItems: "flex-start", fontSize: 17, lineHeight: 1.6 }}>
              <span style={{ flex: "none", width: 36, height: 36, borderRadius: 999, background: C.yellow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800 }}>{i + 1}</span>
              <span style={{ paddingTop: 4 }}>{step}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section bg={C.alt}>
        <Row gap="24px" mt={0}>
          <Card pad={32} flex="1 1 320px">
            <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800 }}>What we need from you</h2>
            <CheckList items={content.whatWeNeedFromYou} />
          </Card>
          <Card pad={32} flex="1 1 320px">
            <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800 }}>Typical timeline</h2>
            <CheckList items={content.typicalTimeline} />
          </Card>
          <Card pad={32} flex="1 1 320px">
            <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800 }}>Items to note</h2>
            <CheckList items={content.itemsToNote} />
          </Card>
        </Row>
      </Section>

      {content.extraCopy.length > 0 && (
        <Section>
          <Eyebrow>More detail</Eyebrow>
          <H2>Good to know</H2>
          {content.extraCopy.map((p) => (
            <Para key={p}>{p}</Para>
          ))}
        </Section>
      )}

      {guides.length > 0 && (
        <Section bg={C.alt}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
            <div>
              <Eyebrow>Guides</Eyebrow>
              <H2>Learn more</H2>
            </div>
            <TextLink href="/blog">All guides</TextLink>
          </div>
          <Row>
            {guides.map((g) => (
              <Tile key={g._id} title={g.title} href={`/blog/${g.slug.current}`} label="Read the guide" />
            ))}
          </Row>
        </Section>
      )}

      <Section>
        <Eyebrow>FAQ</Eyebrow>
        <H2>Frequently asked questions</H2>
        <FaqGrid items={content.faqs} />
      </Section>

      <Section pad="0 0 72px">
        <Eyebrow>Related services</Eyebrow>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {related.map((s) => (
            <Pill key={s.id} href={`/services/${s.id}`}>
              {s.title}
            </Pill>
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          <Eyebrow>Areas we serve</Eyebrow>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Pill href="/locations/surrey">Accountants in Surrey</Pill>
            <Pill href="/locations/south-west-london">Accountants in South West London</Pill>
            <Pill href="/locations">All areas we serve</Pill>
          </div>
        </div>
      </Section>

      <CtaBand title="Want to talk it through?" text="Book a free discovery call and we will point you to the right service." />
    </>
  );
}

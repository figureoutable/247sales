import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, SOCIAL_LINKS } from "@/lib/constants";
import { SURREY_TOWN_PAGES } from "@/data/locations-surrey-towns";
import { SW_LONDON_TOWN_PAGES } from "@/data/locations-sw-towns";
import { SURREY_HUB_PATH, SW_LONDON_HUB_PATH, townPath } from "@/data/locations";

const DIM = "#B5B5B5";

const SERVICES = [
  { label: "Accounts & corporation tax", href: "/accountstax" },
  { label: "Self Assessment", href: "/services/self-assessment" },
  { label: "Bookkeeping & Xero", href: "/services/bookkeeping-xero" },
  { label: "VAT returns", href: "/services/vat" },
  { label: "Payroll & PAYE", href: "/services/payroll-paye" },
  { label: "MTD for Income Tax", href: "/mtdincometax" },
];

const STARTUPS = [
  { label: "Startup accountants", href: "/startups" },
  { label: "Fractional CFO", href: "/fractionalcfo" },
  { label: "Investor reporting", href: "/services/board-investor-reporting" },
  { label: "Cash flow forecasting", href: "/services/cash-flow-management" },
  { label: "Finance dashboards", href: "/finance-dashboard" },
];

const MORE = [
  { label: "Free checklists", href: "/checklists" },
  { label: "Home expense calculator", href: "/home-expense-calculator" },
  { label: "Tax-deductible expenses", href: "/tax-deductible-expenses" },
  { label: "Finance dashboard demo", href: "/finance-dashboard" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { label: "YouTube", href: SOCIAL_LINKS.youtube },
  { label: "TikTok", href: SOCIAL_LINKS.tiktok },
  { label: "Instagram", href: SOCIAL_LINKS.instagram },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
];

const linkStyle = { display: "inline-flex", alignItems: "center", minHeight: 32, fontSize: 15, color: DIM, textDecoration: "none" } as const;
const headStyle = { margin: "0 0 8px", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#FFFFFF" } as const;

function Column({ title, titleHref, items }: { title: string; titleHref?: string; items: { label: string; href: string }[] }) {
  return (
    <div style={{ flex: "1 1 130px", display: "flex", flexDirection: "column", gap: 4 }}>
      <p style={headStyle}>
        {titleHref ? (
          <Link href={titleHref} style={{ color: "#FFFFFF", textDecoration: "none" }}>
            {title}
          </Link>
        ) : (
          title
        )}
      </p>
      {items.map((item) => (
        <Link key={item.label} href={item.href} className="hover:!text-white" style={linkStyle}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "#0A0A0A", padding: "72px 0 36px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px 32px" }}>
          <div style={{ flex: "1.6 1 240px", display: "flex", flexDirection: "column", gap: 14 }}>
            <Link href="/" aria-label="Figures home" style={{ alignSelf: "flex-start" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/redesign/logo-white.png" alt="Figures" style={{ height: 32, width: "auto", display: "block" }} />
            </Link>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: DIM, maxWidth: 320 }}>
              Oddly satisfying accounting. Chartered accountants for small businesses, startups and founders across Surrey, London and the UK.
            </p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: DIM }}>
              <a href={`tel:${CONTACT_PHONE_TEL}`} style={{ color: DIM, textDecoration: "none" }}>
                {CONTACT_PHONE_DISPLAY}
              </a>
              <br />
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: DIM, textDecoration: "none" }}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
          <Column title="Services" titleHref="/services" items={SERVICES} />
          <Column title="Startups & VC" titleHref="/startups" items={STARTUPS} />
          <Column title="Free tools & more" items={MORE} />
          <Column title="Surrey" titleHref={SURREY_HUB_PATH} items={SURREY_TOWN_PAGES.map((t) => ({ label: t.listLabel, href: townPath(t.region, t.slug) }))} />
          <Column title="South West London" titleHref={SW_LONDON_HUB_PATH} items={SW_LONDON_TOWN_PAGES.map((t) => ({ label: t.listLabel, href: townPath(t.region, t.slug) }))} />
        </div>
        <div style={{ marginTop: 56, paddingTop: 24, borderTop: "1px solid #2E2E2E", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, fontSize: 14, color: DIM }}>
          <span>&copy; {new Date().getFullYear()} Figures &amp; Finance Limited, trading as Figures. ICAS Chartered Accountants.</span>
          <span style={{ display: "inline-flex", flexWrap: "wrap", gap: "4px 14px" }}>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: DIM, textDecoration: "none" }}>
                {s.label}
              </a>
            ))}
            <Link href="/privacypolicy" style={{ color: DIM }}>
              Privacy policy
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

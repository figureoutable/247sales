import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { C, Crumbs, H1, Section } from "@/components/redesign/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacypolicy" },
  description:
    "Figures privacy policy. How we collect, use and protect your personal data when you use our accounting, tax and fractional CFO services.",
};

const LAST_UPDATED = "November 2026";
const EMAIL = "joshua@tryfigures.com";

const P = ({ children }: { children: ReactNode }) => (
  <p style={{ margin: "14px 0 0", fontSize: 17, lineHeight: 1.75, color: "#262626" }}>{children}</p>
);

const List = ({ items }: { items: ReactNode[] }) => (
  <ul style={{ listStyle: "disc", margin: "12px 0 0", paddingLeft: 22, display: "flex", flexDirection: "column", gap: 8, fontSize: 17, lineHeight: 1.7, color: "#262626" }}>
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

const SECTIONS: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <P>
        Figures (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is the trading name of Figures &amp; Finance Limited. We provide accounting, tax and fractional CFO services to UK businesses. This privacy policy explains how we collect, use and protect your personal data when you use our website at tryfigures.com or our services.
      </P>
    ),
  },
  {
    id: "what-we-collect",
    title: "What information we collect",
    body: (
      <>
        <P>We may collect and process the following:</P>
        <List
          items={[
            <><strong>Identity and contact data:</strong> name, email address, phone number, job title, company name.</>,
            <><strong>Engagement data:</strong> information you provide when booking a call, filling in forms, or corresponding with us.</>,
            <><strong>Financial and business data:</strong> where we provide accounting or tax services, the information necessary to deliver those services (e.g. records, bank details, HMRC-related information).</>,
            <><strong>Technical data:</strong> IP address, browser type, device information, and how you use our website (e.g. pages visited).</>,
          ]}
        />
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    body: (
      <>
        <P>We use your data to:</P>
        <List
          items={[
            "Provide our services (accounting, tax, fractional CFO and related advice).",
            "Respond to enquiries and manage discovery calls and ongoing client relationships.",
            "Send relevant updates (where you have agreed or we have a legitimate interest).",
            "Improve our website and services and comply with legal and regulatory obligations.",
          ]}
        />
      </>
    ),
  },
  {
    id: "legal-basis",
    title: "Our legal basis (UK GDPR)",
    body: (
      <P>
        We process personal data where: (a) it is necessary to perform a contract with you or to take steps at your request; (b) we have a legitimate interest (e.g. running our business, improving our services, marketing to existing clients); (c) you have given consent; or (d) we have a legal obligation to do so.
      </P>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <P>
        Our website may use cookies and similar technologies to improve functionality and analyse use. You can adjust your browser settings to refuse or limit cookies; some features may not work as intended if you do.
      </P>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <P>
        We may share your data with: service providers who help us run our business (e.g. hosting, email, scheduling tools such as Cal.com); professional advisers where required; and regulators or authorities when we are legally required to do so. We do not sell your personal data.
      </P>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <P>
        We keep your data only for as long as needed to provide our services, meet legal and regulatory requirements (e.g. tax and accounting records), and handle disputes. When we no longer need it, we delete or anonymise it securely.
      </P>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <P>
        Under UK data protection law you have the right to: access your data; have it corrected; request erasure in certain cases; restrict or object to processing; and data portability where applicable. You may also have the right to complain to the Information Commissioner&rsquo;s Office (ICO). To exercise any of these rights, contact us using the details below.
      </P>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <P>
        We put in place appropriate technical and organisational measures to protect your personal data against unauthorised access, loss or misuse. No method of transmission over the internet is completely secure; we cannot guarantee absolute security.
      </P>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <P>
        We may update this privacy policy from time to time. The &ldquo;Last updated&rdquo; date at the top will change when we do. We encourage you to review this page periodically.
      </P>
    ),
  },
  {
    id: "contact",
    title: "How to contact us",
    body: (
      <P>
        For any questions about this privacy policy or your personal data, email <a href={`mailto:${EMAIL}`} style={{ color: C.ink, fontWeight: 700 }}>{EMAIL}</a> or use our{" "}
        <Link href="/contact" style={{ color: C.ink, fontWeight: 700 }}>contact page</Link>.
      </P>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <Section pad="56px 0 88px">
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]} />
      <H1>Privacy policy</H1>
      <p style={{ margin: "16px 0 0", fontSize: 15, color: C.mute }}>Last updated: {LAST_UPDATED}</p>
      <div style={{ display: "flex", flexWrap: "wrap-reverse", gap: 48, alignItems: "flex-start", marginTop: 40 }}>
        <article style={{ flex: "999 1 520px", minWidth: 0, maxWidth: 760 }}>
          {SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id} style={{ scrollMarginTop: 96 }}>
              <h2 style={{ margin: i === 0 ? 0 : "40px 0 0", fontSize: 26, letterSpacing: "-0.02em", fontWeight: 800 }}>{s.title}</h2>
              {s.body}
            </section>
          ))}
        </article>
        <nav aria-label="On this page" style={{ flex: "1 1 240px", boxSizing: "border-box", padding: "22px 24px", background: C.alt, borderRadius: 16 }}>
          <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>On this page</p>
          <ol style={{ listStyle: "decimal", margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8, fontSize: 15 }}>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} style={{ color: C.ink }}>{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </Section>
  );
}

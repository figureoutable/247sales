import { CONTACT_EMAIL, CONTACT_PHONE_TEL } from "@/lib/constants";

const BASE_URL = "https://tryfigures.com";

/** Business details for Google on the homepage: who Figures is, what it offers and where. */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${BASE_URL}/#organization`,
    name: "Figures",
    legalName: "Figures & Finance Limited",
    url: BASE_URL,
    logo: `${BASE_URL}/figures-logo.png`,
    image: `${BASE_URL}/opengraph-image`,
    description:
      "ICAS Chartered Accountants for small businesses, landlords and startups. Accounts, tax, VAT, payroll, bookkeeping and fractional CFO services.",
    telephone: CONTACT_PHONE_TEL,
    email: CONTACT_EMAIL,
    foundingDate: "2023",
    founder: { "@type": "Person", name: "Joshua Lee", jobTitle: "Co-founder, ICAS Chartered Accountant" },
    address: { "@type": "PostalAddress", addressLocality: "Woking", addressRegion: "Surrey", addressCountry: "GB" },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Surrey" },
      { "@type": "AdministrativeArea", name: "South West London" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    knowsAbout: [
      "Year-end accounts",
      "Corporation tax",
      "Self Assessment",
      "VAT",
      "Payroll",
      "Bookkeeping",
      "Fractional CFO",
      "Management reporting",
    ],
    sameAs: [
      "https://youtube.com/@tryfigures",
      "https://linkedin.com/company/tryfigures",
      "https://instagram.com/tryfigures",
      "https://tiktok.com/@tryfigures",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

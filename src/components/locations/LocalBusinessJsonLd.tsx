type Props = { areaServed: string };

const BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Figures Chartered Accountants",
  url: "https://tryfigures.com",
  telephone: "+447775081123",
  address: {
    "@type": "PostalAddress",
    streetAddress: "65 Southwood Avenue",
    addressLocality: "Woking",
    addressRegion: "Surrey",
    postalCode: "GU21 2EZ",
    addressCountry: "GB",
  },
} as const;

export function LocalBusinessJsonLd({ areaServed }: Props) {
  const json = JSON.stringify({
    ...BUSINESS,
    areaServed: { "@type": "Place", name: areaServed },
  });

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

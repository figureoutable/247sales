type Props = { areaServed: string };

const BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Figures",
  url: "https://tryfigures.com",
  telephone: "+447775081123",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Woking",
    addressRegion: "Surrey",
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

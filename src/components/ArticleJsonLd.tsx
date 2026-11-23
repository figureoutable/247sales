type Props = {
  title: string;
  description?: string | null;
  slug: string;
  publishedAt: string;
  updatedAt?: string | null;
  image?: string | null;
};

const BASE_URL = "https://tryfigures.com";

/** Structured data so Google understands each blog post as an article by Figures. */
export function ArticleJsonLd({ title, description, slug, publishedAt, updatedAt, image }: Props) {
  const url = `${BASE_URL}/blog/${slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description ?? undefined,
    url,
    mainEntityOfPage: url,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    image: image ? (image.startsWith("http") ? image : `${BASE_URL}${image}`) : `${BASE_URL}/opengraph-image`,
    author: { "@type": "Organization", name: "Figures", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "Figures",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/figures-logo.png` },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

import type { MetadataRoute } from "next";
import { getLocalPosts } from "@/data/blog-posts";
import { SERVICES } from "@/lib/constants";
import { SURREY_TOWN_PAGES } from "@/data/locations-surrey-towns";
import { SW_LONDON_TOWN_PAGES } from "@/data/locations-sw-towns";
import { townPath } from "@/data/locations";

const BASE_URL = "https://tryfigures.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locationPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/locations`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/locations/surrey`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/locations/south-west-london`, changeFrequency: "monthly", priority: 0.85 },
    ...SURREY_TOWN_PAGES.map((t) => ({
      url: `${BASE_URL}${townPath("surrey", t.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...SW_LONDON_TOWN_PAGES.map((t) => ({
      url: `${BASE_URL}${townPath("south-west-london", t.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE_URL}/services/${s.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/fractionalcfo`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/startups`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/accountstax`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/mtdincometax`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/checklists`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/finance-dashboard`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/home-expense-calculator`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tax-deductible-expenses`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacypolicy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const now = Date.now();
  const blogPosts: MetadataRoute.Sitemap = getLocalPosts()
    // Never list a post before its publish date
    .filter((post) => new Date(post.publishedAt).getTime() <= now)
    .map((post) => ({
    url: `${BASE_URL}/blog/${post.slug.current}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...locationPages, ...blogPosts];
}

import type { MetadataRoute } from "next";
import { getLocalPosts } from "@/data/blog-posts";

const BASE_URL = "https://tryfigures.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/fractionalcfo`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/accountsandtax`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacypolicy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogPosts: MetadataRoute.Sitemap = getLocalPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...blogPosts];
}

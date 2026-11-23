import { client } from "@/sanity/lib/client";
import { postListQuery } from "@/sanity/lib/queries";
import { getLocalPosts } from "@/data/blog-posts";
import { mergePostLists, type PostListItem } from "@/lib/blog-posts-merge";

/** All published posts, newest first. Posts dated in the future are held back. */
export async function getAllPosts(): Promise<PostListItem[]> {
  let sanityPosts: PostListItem[] = [];
  try {
    sanityPosts = await client.fetch<PostListItem[]>(postListQuery);
  } catch {
    // use local posts only
  }
  const localPosts = getLocalPosts().map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    publishedAt: p.publishedAt,
    mainImage: p.mainImage,
    excerpt: p.excerpt,
  }));
  const now = Date.now();
  return mergePostLists(sanityPosts, localPosts).filter((p) => new Date(p.publishedAt).getTime() <= now);
}

export function readMinutes(words: number): number {
  return Math.max(2, Math.round(words / 220));
}

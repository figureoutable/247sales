export type PostListItem = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string | null;
  publishedAt: string;
  mainImage: string | null;
  excerpt: string | null;
};

export function mergePostLists(
  sanityPosts: PostListItem[],
  localPosts: PostListItem[]
): PostListItem[] {
  const bySlug = new Map<string, PostListItem>();

  for (const post of [...sanityPosts, ...localPosts]) {
    const slug = post.slug.current;
    const existing = bySlug.get(slug);
    if (
      !existing ||
      new Date(post.publishedAt).getTime() > new Date(existing.publishedAt).getTime()
    ) {
      bySlug.set(slug, post);
    }
  }

  return [...bySlug.values()].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

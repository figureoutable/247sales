import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { postListQuery } from "@/sanity/lib/queries";
import { getLocalPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights and updates from Figures — accounting and advisory for UK founders and small businesses.",
};

type PostListItem = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string | null;
  publishedAt: string;
  mainImage: string | null;
  excerpt: string | null;
};

async function getPosts(): Promise<PostListItem[]> {
  try {
    const sanityPosts = await client.fetch<PostListItem[]>(postListQuery);
    if (sanityPosts.length > 0) return sanityPosts;
  } catch {
    // fall through to local
  }
  return getLocalPosts().map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    publishedAt: p.publishedAt,
    mainImage: p.mainImage,
    excerpt: p.excerpt,
  }));
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Updates, guides, and thoughts from the Figures team.
        </p>

        {posts.length === 0 ? (
          <p className="mt-12 text-slate-600">
            No posts yet. Add content in Sanity to see your blog posts here.
          </p>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                {post.mainImage ? (
                  <div className="relative aspect-[16/10] bg-slate-100">
                    <Image
                      src={post.mainImage}
                      alt=""
                      fill
                      className="object-cover transition-transform group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/10] bg-slate-100" aria-hidden />
                )}
                <div className="p-6">
                  {post.category && (
                    <span className="text-xs font-medium uppercase tracking-wide text-primary">
                      {post.category}
                    </span>
                  )}
                  <h2 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <time
                    dateTime={post.publishedAt}
                    className="mt-2 block text-sm text-slate-500"
                  >
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  {post.excerpt && (
                    <p className="mt-3 text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

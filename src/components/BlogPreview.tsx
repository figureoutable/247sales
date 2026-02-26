import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { latestPostsQuery } from "@/sanity/lib/queries";

async function getLatestPosts() {
  try {
    return await client.fetch<Array<{
      _id: string;
      title: string;
      slug: { current: string };
      category: string | null;
      publishedAt: string;
      mainImage: string;
      excerpt: string | null;
    }>>(latestPostsQuery);
  } catch {
    return [];
  }
}

export async function BlogPreview() {
  const posts = await getLatestPosts();

  if (posts.length === 0) {
    return (
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-6 text-slate-600">
            No posts yet. Connect Sanity and add content to see your latest posts here.
          </p>
          <Link
            href="/blog"
            className="mt-4 inline-flex items-center text-base font-semibold text-primary hover:underline"
          >
            Go to blog
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From the blog
          </h2>
          <Link
            href="/blog"
            className="text-base font-semibold text-primary hover:underline shrink-0"
          >
            View all
          </Link>
        </div>
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
                <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

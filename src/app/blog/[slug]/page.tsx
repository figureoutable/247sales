import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

type Props = { params: Promise<{ slug: string }> };

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string | null;
  publishedAt: string;
  mainImage: string;
  body: PortableTextBlock[] | null;
  excerpt: string | null;
};

async function getPost(slug: string): Promise<Post | null> {
  try {
    return await client.fetch<Post | null>(postBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to blog
        </Link>
        {post.category && (
          <span className="mt-4 block text-xs font-medium uppercase tracking-wide text-primary">
            {post.category}
          </span>
        )}
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {post.title}
        </h1>
        <time
          dateTime={post.publishedAt}
          className="mt-4 block text-slate-500"
        >
          {new Date(post.publishedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        {post.mainImage && (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={post.mainImage}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        )}
        {post.body && (
          <div className="prose prose-slate mt-10 max-w-none prose-headings:font-bold prose-p:text-slate-600 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <PortableText value={post.body} />
          </div>
        )}
        {!post.body && post.excerpt && (
          <p className="mt-10 text-lg text-slate-600">{post.excerpt}</p>
        )}
      </div>
    </article>
  );
}

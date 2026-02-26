import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { getLocalPostBySlug } from "@/data/blog-posts";

type Props = { params: Promise<{ slug: string }> };

type SanityPost = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string | null;
  publishedAt: string;
  mainImage: string | null;
  body: PortableTextBlock[] | null;
  excerpt: string | null;
};

async function getPostFromSanity(slug: string): Promise<SanityPost | null> {
  try {
    return await client.fetch<SanityPost | null>(postBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sanityPost = await getPostFromSanity(slug);
  if (sanityPost) return { title: sanityPost.title, description: sanityPost.excerpt ?? undefined };
  const localPost = getLocalPostBySlug(slug);
  if (localPost) return { title: localPost.title, description: localPost.excerpt ?? undefined };
  return { title: "Post not found" };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const sanityPost = await getPostFromSanity(slug);
  const localPost = getLocalPostBySlug(slug);

  if (sanityPost) {
    return (
      <article className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-black hover:underline dark:text-white"
          >
            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to blog
          </Link>
          {sanityPost.category && (
            <span className="mt-4 block text-xs font-medium uppercase tracking-wide text-black dark:text-white">
              {sanityPost.category}
            </span>
          )}
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {sanityPost.title}
          </h1>
          <time dateTime={sanityPost.publishedAt} className="mt-4 block text-slate-500">
            {new Date(sanityPost.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          {sanityPost.mainImage && (
            <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={sanityPost.mainImage}
                alt=""
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          )}
          {sanityPost.body && (
            <div className="prose prose-slate mt-10 max-w-none prose-headings:font-bold prose-p:text-slate-600 prose-a:text-black prose-a:no-underline hover:prose-a:underline dark:prose-a:text-white">
              <PortableText value={sanityPost.body} />
            </div>
          )}
          {!sanityPost.body && sanityPost.excerpt && (
            <p className="mt-10 text-lg text-slate-600 dark:text-zinc-400">{sanityPost.excerpt}</p>
          )}
        </div>
      </article>
    );
  }

  if (localPost) {
    return (
      <article className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-black hover:underline dark:text-white"
          >
            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to blog
          </Link>
          {localPost.category && (
            <span className="mt-4 block text-xs font-medium uppercase tracking-wide text-black dark:text-white">
              {localPost.category}
            </span>
          )}
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {localPost.title}
          </h1>
          <time dateTime={localPost.publishedAt} className="mt-4 block text-slate-500">
            {new Date(localPost.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          {localPost.mainImage && (
            <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={localPost.mainImage}
                alt=""
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          )}
          <div className="prose prose-slate mt-10 max-w-none prose-p:text-slate-600 dark:prose-p:text-zinc-400">
            {localPost.body ? (
              localPost.body.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))
            ) : localPost.excerpt ? (
              <p className="text-lg">{localPost.excerpt}</p>
            ) : null}
          </div>
        </div>
      </article>
    );
  }

  notFound();
}

"use client";

import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";

const YOUTUBE_EMBED_ID = "opShRwVFX10";

export function Hero() {
  return (
    <section className="relative w-full bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Oddly Satisfying Accounting
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-slate-600 sm:text-xl">
          The accounting equivalent of a superhero saving your weekend, money and giving you peace of mind.
        </p>

        <div
          className="mx-auto mt-10 max-w-4xl"
          aria-label="Intro video: Welcome to Figures"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg ring-1 ring-slate-200/50">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_EMBED_ID}?rel=0`}
              title="Welcome to Figures – intro from Joshua Lee"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 sm:w-auto"
          >
            Schedule a call
          </a>
          <Link
            href="/services"
            className="inline-flex w-full items-center justify-center rounded-full border-2 border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-colors hover:border-black hover:bg-slate-50 hover:text-black sm:w-auto"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}

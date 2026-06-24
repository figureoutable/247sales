"use client";

import { CAL_LINK } from "@/lib/constants";
import { ChecklistsSection } from "@/components/ChecklistsSection";

const YOUTUBE_EMBED_ID = "opShRwVFX10";

export function Hero() {
  return (
    <section className="relative w-full bg-white px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 lg:pb-24 lg:pt-14">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Oddly Satisfying Accounting
        </h1>
        <p className="mx-auto mt-6 max-w-4xl text-lg font-light text-slate-600 sm:text-xl">
          Former <strong className="font-bold text-slate-900">EY accountants</strong> who&apos;ve advised{" "}
          <strong className="font-bold text-slate-900">Lloyds, UBS and Metro Bank</strong> bring that same expertise to
          small businesses in Surrey and South West London without the price tag.
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

        <div className="mx-auto mt-8 max-w-4xl space-y-2 text-lg font-light text-slate-600 sm:text-xl">
          <p>
            Your time matters.{" "}
            <strong className="font-bold text-slate-900">We respond within 7 business hours, guaranteed.</strong>
          </p>
          <p>If we don&apos;t, next month&apos;s fee is on us.</p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 sm:w-auto"
          >
            Schedule a call
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl">
        <ChecklistsSection />
      </div>
    </section>
  );
}

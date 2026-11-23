"use client";

import { useState } from "react";
import { CAL_LINK } from "@/lib/constants";
import { ChecklistsSection } from "@/components/ChecklistsSection";

const YOUTUBE_EMBED_ID = "opShRwVFX10";

export function Hero() {
  // Show a still image first; only load the YouTube player when someone presses play (much faster page load)
  const [playVideo, setPlayVideo] = useState(false);

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
            {playVideo ? (
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_EMBED_ID}?rel=0&autoplay=1`}
                title="Welcome to Figures – intro from Joshua Lee"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlayVideo(true)}
                aria-label="Play the intro video: Welcome to Figures"
                className="group absolute inset-0 h-full w-full cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${YOUTUBE_EMBED_ID}/hqdefault.jpg`}
                  alt="Welcome to Figures: why us in 49 seconds, with Joshua Lee"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-red-600 shadow-lg transition-transform group-hover:scale-105">
                  <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-white" aria-hidden>
                    <path d="M7 4.5v15l13-7.5z" />
                  </svg>
                </span>
              </button>
            )}
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

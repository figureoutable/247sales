"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { TESTIMONIALS } from "@/lib/constants";

const VISIBLE = 3;
const TOTAL = TESTIMONIALS.length;
const MAX_INDEX = Math.max(0, TOTAL - VISIBLE);
const GAP_PX = 24; // gap-6

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stepPx, setStepPx] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.getBoundingClientRect().width;
      setStepPx((w - (VISIBLE - 1) * GAP_PX) / VISIBLE + GAP_PX);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i >= MAX_INDEX ? 0 : i + 1));
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const go = (delta: number) => {
    setIndex((i) => {
      const next = i + delta;
      if (next < 0) return MAX_INDEX;
      if (next > MAX_INDEX) return 0;
      return next;
    });
  };

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          What our clients say
        </h2>

        <div className="relative mt-10">
          <div className="overflow-hidden" ref={containerRef}>
            <div
              className="flex gap-6 transition-transform duration-300 ease-out"
              style={{
                transform: stepPx ? `translateX(-${index * stepPx}px)` : undefined,
              }}
            >
              {TESTIMONIALS.map((t, i) => (
                <blockquote
                  key={i}
                  className="flex flex-shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50"
                  style={{ width: `calc(${100 / VISIBLE}% - ${(VISIBLE - 1) * GAP_PX / VISIBLE}px)` }}
                >
                  {t.image && (
                    <div className="mb-4 flex justify-center">
                      <div className="relative h-24 w-24 overflow-hidden rounded-full bg-amber-300 sm:h-28 sm:w-28">
                        <Image
                          src={t.image}
                          alt=""
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 640px) 96px, 112px"
                        />
                      </div>
                    </div>
                  )}
                  <p className="flex-1 text-slate-700 dark:text-zinc-300 sm:text-lg">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-4">
                    <cite className="not-italic font-semibold text-slate-900 dark:text-white">
                      {t.name}
                    </cite>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>

          {MAX_INDEX > 0 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-2 rounded-full border border-slate-200 bg-white p-2 shadow-md transition hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 sm:-translate-x-4"
                aria-label="Previous testimonials"
              >
                <svg className="h-5 w-5 text-slate-600 dark:text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-2 rounded-full border border-slate-200 bg-white p-2 shadow-md transition hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 sm:translate-x-4"
                aria-label="Next testimonials"
              >
                <svg className="h-5 w-5 text-slate-600 dark:text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {MAX_INDEX > 0 && (
            <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Testimonial slides">
              {Array.from({ length: MAX_INDEX + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-black dark:bg-white" : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-zinc-600"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          What our clients say
        </h2>
        <blockquote className="mt-10">
          {t.image && (
            <div className="mx-auto mb-6 flex justify-center">
              <div className="relative h-40 w-40 overflow-hidden rounded-full bg-amber-300 sm:h-48 sm:w-48">
                <Image
                  src={t.image}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 160px, 192px"
                />
              </div>
            </div>
          )}
          <p className="text-xl font-medium text-slate-700 sm:text-2xl">&ldquo;{t.quote}&rdquo;</p>
          <footer className="mt-6">
            <cite className="not-italic font-semibold text-slate-900">{t.name}</cite>
          </footer>
        </blockquote>
        <div className="mt-8 flex justify-center gap-2" role="tablist" aria-label="Testimonials">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-black" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

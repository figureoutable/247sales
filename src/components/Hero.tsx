"use client";

import Image from "next/image";
import { CAL_LINK } from "@/lib/constants";

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
          aria-label="Intro video: Welcome to Figures Chartered Accountants"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg ring-1 ring-slate-200/50">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_EMBED_ID}?rel=0`}
              title="Welcome to Figures Chartered Accountants – intro from Joshua Lee"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl space-y-2 text-lg font-light text-slate-600 sm:text-xl">
          <p>
            Your time matters.{" "}
            <strong className="font-bold text-slate-900">We respond within 5 business hours, guaranteed.</strong>
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

        <div className="mt-10">
          <p className="mb-6 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Free checklists for smarter accounting
          </p>
          <div className="grid gap-3 text-left sm:gap-4 sm:grid-cols-3">
          <a
            href="/checklists/new-company-checklist.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="overflow-hidden rounded-xl border border-emerald-200 bg-white shadow-sm transition-colors hover:border-emerald-300"
          >
            <div className="relative h-28 w-full bg-white sm:h-auto sm:aspect-[4/3]">
              <Image
                src="/checklists/previews/new-company-checklist.pdf.png"
                alt="Preview of New Company Checklist PDF"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="p-4 sm:p-5">
              <p className="text-sm font-semibold text-slate-900">New Company Checklist</p>
              <p className="mt-2 text-sm text-slate-600">Everything you need to set up your limited company correctly.</p>
            </div>
          </a>
          <a
            href="/checklists/self-assessment-checklist.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="overflow-hidden rounded-xl border border-emerald-200 bg-white shadow-sm transition-colors hover:border-emerald-300"
          >
            <div className="relative h-28 w-full bg-white sm:h-auto sm:aspect-[4/3]">
              <Image
                src="/checklists/previews/self-assessment-checklist.pdf.png"
                alt="Preview of Self Assessment Checklist PDF"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="p-4 sm:p-5">
              <p className="text-sm font-semibold text-slate-900">Self Assessment Checklist</p>
              <p className="mt-2 text-sm text-slate-600">Don&apos;t overpay or miss the deadline. Get it right first time.</p>
            </div>
          </a>
          <a
            href="/checklists/year-end-accounts-checklist.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="overflow-hidden rounded-xl border border-emerald-200 bg-white shadow-sm transition-colors hover:border-emerald-300"
          >
            <div className="relative h-28 w-full bg-white sm:h-auto sm:aspect-[4/3]">
              <Image
                src="/checklists/previews/year-end-accounts-checklist.pdf.png"
                alt="Preview of Year-End Accounts Checklist PDF"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="p-4 sm:p-5">
              <p className="text-sm font-semibold text-slate-900">Year-End Accounts Checklist</p>
              <p className="mt-2 text-sm text-slate-600">Know exactly what your accountant needs before they ask.</p>
            </div>
          </a>
          </div>
        </div>
      </div>
    </section>
  );
}

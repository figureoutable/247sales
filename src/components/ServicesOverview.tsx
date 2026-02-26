"use client";

import Link from "next/link";
import {
  Briefcase,
  LayoutDashboard,
  LineChart,
  Droplets,
  Presentation,
  CalendarRange,
  ShieldCheck,
  Users,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  "layout-dashboard": LayoutDashboard,
  "line-chart": LineChart,
  droplets: Droplets,
  presentation: Presentation,
  "calendar-range": CalendarRange,
  "shield-check": ShieldCheck,
  users: Users,
  "book-open": BookOpen,
};

export function ServicesOverview() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24" id="services">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            What we do
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-zinc-400">
            End-to-end accounting and tax so you can focus on running your business.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon] ?? Briefcase;
            return (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-black group-hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-white dark:group-hover:text-black">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                  {service.description}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center text-base font-semibold text-black hover:underline dark:text-white"
          >
            View all services
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

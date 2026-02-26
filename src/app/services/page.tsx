import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Services",
  description:
    "Fractional CFO, management reporting, FP&A, cash flow, board reporting, budgeting, statutory accounts, payroll, bookkeeping. Finance and accounting for UK businesses.",
};

export default function ServicesPage() {
  return (
    <div className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Our services
        </h1>
        <p className="mt-6 text-lg text-slate-600">
          End-to-end finance and accounting for UK founders and small businesses. Here’s what we offer.
        </p>

        <div className="mt-16 space-y-20">
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon] ?? Briefcase;
            return (
              <section
                key={service.id}
                id={service.id}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    {service.title}
                  </h2>
                </div>
                <p className="mt-4 text-slate-600">{service.description}</p>
              </section>
            );
          })}
        </div>

        <div className="mt-20 rounded-2xl bg-slate-50 p-8 text-center dark:bg-zinc-900/50">
          <p className="text-lg font-medium text-slate-900 dark:text-white">
            Not sure what you need? We’ll help you figure it out.
          </p>
          <a
            href="https://cal.com/figures/discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Schedule a call
          </a>
        </div>
      </div>
    </div>
  );
}

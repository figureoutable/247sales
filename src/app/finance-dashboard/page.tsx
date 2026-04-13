import type { Metadata } from "next";
import Link from "next/link";
import { FinanceDemoCarousel } from "@/components/finance-demo/FinanceDemoCarousel";
import { CAL_LINK, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Finance Dashboard Demo",
  description:
    "Interactive demo financial dashboards for SaaS, retail, and recruitment — income, expenses, tax timing, and KPIs.",
};

export default function FinanceDashboardPage() {
  return (
    <div
      className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      style={{ fontFamily: "var(--font-finance-inter), system-ui, sans-serif" }}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Custom finance dashboards specific to your business
          </h1>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-pretty text-slate-600 sm:text-xl">
            We build you custom financial dashboards. Clear numbers, no jargon, just the visibility you need to stay in
            control.
          </p>
        </header>

        <div className="mt-14">
          <FinanceDemoCarousel />
        </div>

        <footer className="mx-auto mt-16 max-w-xl border-t border-slate-200 pt-10 text-center">
          <p className="text-slate-600">
            Want this for your business? Book a call and we&apos;ll build you a dashboard specific to your business
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Book a discovery call
            </a>
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
            >
              Contact us
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-black underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

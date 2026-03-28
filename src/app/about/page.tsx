import type { Metadata } from "next";
import { CalEmbed } from "@/components/CalEmbed";

export const metadata: Metadata = {
  title: "About",
  description:
    "Josh co-founded Figures Chartered Accountants in 2023. EY Turnaround & Restructuring, Barclays, Crown Agents Bank. Credit Suisse, Metro Bank, Lloyds, UBS. Fractional CFO and accounting for UK founders.",
};

export default function AboutPage() {
  return (
    <div className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          About Figures Chartered Accountants
        </h1>

        <div className="mt-12 space-y-10 text-slate-600 dark:text-zinc-400">
          <p>
            Figures Chartered Accountants was founded in 2023 with a simple idea — that growing businesses deserve the same
            quality of financial thinking that big corporations pay millions for, without the price tag
            or the runaround.
          </p>

          <p>
            Before founding Figures Chartered Accountants, Josh worked at EY in Turnaround and Restructuring, working on some of the
            most high-profile engagements of recent years including Credit Suisse, Metro Bank and Lloyds Bank. Before that he trained
            in Assurance auditing companies such as UBS and Mizuho Investment Bank and spent time at Barclays and Crown Agents Bank in
            management accounting roles.
          </p>

          <p>
            He has seen first-hand what good financial management looks like — and what happens when
            it breaks down. That experience shapes everything about how Figures Chartered Accountants works.
          </p>

          <p>
            Today Figures Chartered Accountants is a team of three, serving founders and growing businesses across the UK.
            We provide fractional CFO services, management reporting, financial planning and core
            accounting — with Big Four rigour and the kind of responsiveness you would never get from
            a big firm.
          </p>
        </div>

        <div className="mt-16 rounded-2xl bg-slate-50 p-8 text-center dark:bg-zinc-900/50">
          <p className="text-lg font-medium text-slate-900 dark:text-white">
            Fancy a chat? Book a discovery call and we’ll tell you more.
          </p>
          <div className="mt-6">
            <CalEmbed className="mx-auto max-w-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

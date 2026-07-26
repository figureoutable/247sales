"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { CalEmbed } from "@/components/CalEmbed";

const BANNER_STORAGE_KEY = "mtd-banner-dismissed-2026-08-07";

const PHASES = [
  {
    id: "50k",
    threshold: 50000,
    label: "Over £50,000",
    from: "6 April 2026",
    basis: "Based on your 2024/25 tax return",
    status: "Mandatory",
    provisional: false,
  },
  {
    id: "30k",
    threshold: 30000,
    label: "Over £30,000",
    from: "6 April 2027",
    basis: "Based on your 2025/26 tax return",
    status: "Mandatory",
    provisional: false,
  },
  {
    id: "20k",
    threshold: 20000,
    label: "Over £20,000",
    from: "6 April 2028",
    basis: "Not yet confirmed in law",
    status: "Expected",
    provisional: true,
  },
] as const;

const STEPS = [
  {
    title: "Check if it applies to you",
    description: "Compare your gross income from self-employment and property to the thresholds above.",
    ours: false,
  },
  {
    title: "Choose MTD software and set up",
    description: "You'll need software that can keep digital records and send updates to HMRC. We can help you choose and set this up.",
    ours: false,
  },
  {
    title: "We'll request to become your agent",
    description: "We'll send a simple HMRC authorisation request and ask for access to your software. Once you approve both, we can handle MTD filings on your behalf. Existing clients usually already have this in place.",
    ours: true,
  },
  {
    title: "We draft each quarterly update",
    description: "Four times a year we prepare a short summary of your income and expenses. This is a draft for you to review, not a tax calculation.",
    ours: true,
  },
  {
    title: "You confirm the draft with us",
    description: "We walk through the figures together so you're happy everything looks right before anything is sent.",
    ours: false,
  },
  {
    title: "We submit to HMRC",
    description: "Once you've confirmed, we send the quarterly update on your behalf.",
    ours: true,
  },
  {
    title: "Confirm everything at year end",
    description: "A final declaration replaces the old Self Assessment tax return and confirms your position for the year.",
    ours: true,
  },
] as const;

const FAQS = [
  {
    question: "Is the threshold based on turnover or profit?",
    answer:
      "Turnover, your gross income before expenses. For example, £90,000 turnover with £10,000 profit still puts you over the £50,000 threshold, even though your actual taxable profit is well below it. Check the income figure on your tax return, not what you think of as profit.",
  },
  {
    question: "I have both rental income and a business, do I need to do this twice?",
    answer:
      "Each income source, rental and business, is reported separately behind the scenes, but you only deal with one submission.",
  },
  {
    question: "What happens if I miss the 7 August deadline?",
    answer:
      "No penalty points apply for late quarterly updates in the first year, 2026/27. Penalties still apply to late tax returns and late payments though, so it's still worth getting done.",
  },
  {
    question: "What software do I need?",
    answer:
      "Any HMRC-recognised MTD-compatible software — for example Xero. We'll help you choose and get it set up.",
  },
  {
    question: "Does a quarterly update mean I pay tax four times a year?",
    answer:
      "No. Quarterly updates don't calculate or trigger a tax bill. Payment dates stay 31 January and 31 July, exactly as before.",
  },
  {
    question: "What if my income drops below the threshold next year?",
    answer:
      "You stay on MTD until your qualifying income has been below the threshold for three consecutive tax years.",
  },
  {
    question: "Are other income streams like dividends in scope for MTD?",
    answer:
      "Dividends, savings interest and pension income are NOT in scope for the quarterly MTD updates. Those are only brought in at your year-end final declaration. Quarterly updates cover self-employment and property income only.",
  },
] as const;

function parseIncome(value: string): number | null {
  const cleaned = value.replace(/[£,\s]/g, "");
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function formatIncomeInput(value: string): string {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("en-GB");
}

function phaseForIncome(income: number): string {
  if (income > 50000) {
    return "Based on that figure, MTD is mandatory for you from 6 April 2026 (using your 2024/25 tax return).";
  }
  if (income > 30000) {
    return "Based on that figure, MTD is mandatory for you from 6 April 2027 (using your 2025/26 tax return), unless your income later rises above £50,000 sooner.";
  }
  if (income > 20000) {
    return "Based on that figure, you would fall into the proposed phase from 6 April 2028. That threshold is not yet confirmed in law, so treat this as provisional.";
  }
  return "Based on that figure, you are currently under the £20,000 proposed threshold. You do not need to prepare for MTD Income Tax yet, though rules can change.";
}

export function MtdIncomeTaxPage() {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [incomeInput, setIncomeInput] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(BANNER_STORAGE_KEY) === "1") {
        setBannerDismissed(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const income = useMemo(() => parseIncome(incomeInput), [incomeInput]);
  const phaseMessage = income === null ? null : phaseForIncome(income);

  function dismissBanner() {
    setBannerDismissed(true);
    try {
      sessionStorage.setItem(BANNER_STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/*
        TIME-SENSITIVE: Deadline banner for first MTD quarterly deadline (7 August 2026).
        Remove or update this section after 7 August 2026.
      */}
      {!bannerDismissed && (
        <div className="border-b border-teal-200 bg-teal-50">
          <div className="mx-auto flex max-w-6xl items-start gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="min-w-0 flex-1 text-sm text-teal-950 sm:text-base">
              <p>
                The first MTD quarterly deadline is{" "}
                <strong className="font-semibold">7 August 2026</strong>. This applies if your
                gross income from self-employment and property was over £50,000 last year. There is
                no penalty for missing this specific deadline in year one, so there is no need to
                panic — but it is worth sorting quickly.
              </p>
              <a
                href="#contact"
                className="mt-2 inline-block font-semibold text-teal-900 underline-offset-2 hover:underline"
              >
                Talk to us about getting ready
              </a>
            </div>
            <button
              type="button"
              onClick={dismissBanner}
              className="shrink-0 rounded-lg p-1.5 text-teal-800 transition-colors hover:bg-teal-100"
              aria-label="Dismiss deadline notice"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            <span className="block">Making Tax Digital for Income Tax</span>
            <span className="mt-2 block">Explained Simply</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 sm:text-xl">
            If you&apos;re a sole trader or landlord, this page tells you whether MTD affects you, and exactly what to do about it.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="#thresholds"
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:w-auto"
            >
              Check if this affects you
            </a>
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto"
            >
              Talk to us
            </a>
          </div>
        </div>
      </section>

      {/* Threshold checker */}
      <section
        id="thresholds"
        className="scroll-mt-24 border-t border-slate-200 bg-slate-50/40 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Does this affect you yet?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-600 sm:text-lg">
            MTD for Income Tax is based on your{" "}
            <strong className="font-semibold text-slate-800">gross income</strong> from
            self-employment and property combined — not profit.
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {PHASES.map((phase, index) => (
              <div
                key={phase.id}
                className={`flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-6 ${
                  index > 0 ? "border-t border-slate-100" : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg font-bold text-slate-900">{phase.label}</p>
                    {phase.provisional ? (
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-amber-900">
                        Proposed
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-slate-600">
                        {phase.status}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{phase.basis}</p>
                </div>
                <p className="text-sm font-medium text-slate-900 sm:text-right sm:shrink-0">
                  From {phase.from}
                </p>
              </div>
            ))}

            <div className="border-t border-slate-200 bg-slate-50 px-5 py-6 sm:px-8 sm:py-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <label
                  htmlFor="mtd-gross-income"
                  className="block min-w-0 flex-1 text-base font-medium text-slate-900"
                >
                  Your gross income from self-employment and property last year
                </label>
                <div className="relative w-full sm:w-56 sm:shrink-0">
                  <input
                    id="mtd-gross-income"
                    type="text"
                    inputMode="decimal"
                    value={incomeInput}
                    onChange={(e) => setIncomeInput(formatIncomeInput(e.target.value))}
                    placeholder="45,000"
                    className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-right text-base text-slate-900 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              {phaseMessage && (
                <p className="mt-5 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm leading-relaxed text-teal-950">
                  {phaseMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Six steps */}
      <section className="border-t border-slate-200 bg-slate-50/40 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            What you actually need to do
          </h2>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-700">
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white"
                aria-hidden
              />
              = you
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-[10px] font-semibold text-white"
                aria-hidden
              />
              = figures
            </span>
          </div>
          <ol className="mx-auto mt-12 max-w-2xl">
            {STEPS.map((step, index) => (
              <li key={step.title} className="relative flex gap-5 pb-10 last:pb-0">
                {index < STEPS.length - 1 && (
                  <div
                    className="absolute left-[1.15rem] top-10 bottom-0 w-px bg-slate-200"
                    aria-hidden
                  />
                )}
                <div
                  className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${
                    step.ours ? "bg-teal-600" : "bg-primary"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="min-w-0 pt-1">
                  <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-900 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-slate-50/40 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Common questions
          </h2>
          <div className="mt-10 divide-y divide-slate-200 border-t border-b border-slate-200">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-slate-700"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-slate-900">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Not sure where you stand? Let&apos;s talk it through
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Book a short call and we&apos;ll help you work out what applies and what to do next.
          </p>
          <CalEmbed className="mt-10" />
          <p className="mt-8 text-sm text-slate-500">
            Prefer email?{" "}
            <Link href="/contact" className="font-medium text-slate-700 underline-offset-2 hover:underline">
              Visit our contact page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="border-t border-slate-200 bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-slate-500">
          This page is general guidance correct as at July 2026. It is not a substitute for advice
          on your individual circumstances. Tax rules and thresholds may change. Please speak to us
          or another qualified adviser before relying on this information.
        </p>
      </footer>
    </div>
  );
}

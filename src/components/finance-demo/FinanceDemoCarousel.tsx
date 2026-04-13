"use client";

import { useState } from "react";
import { barbershopDemoBundle, recruitmentDemoBundle, saasDemoBundle } from "@/data/demo-bundles";
import { BarbershopLogo, RecruitmentLogo, RecruitmentMark } from "./DemoBrandLogos";
import { FinanceDemoDashboard, type FinanceDemoUiLabels } from "./FinanceDemoDashboard";
import { GloxLogo, GloxMark } from "./GloxLogo";

const SLIDES = [
  {
    id: "saas",
    label: "B2B SaaS",
    bundle: saasDemoBundle,
    logo: <GloxLogo size="md" />,
    ui: {
      companyName: "Glox.AI",
      metricsTabLabel: "SaaS Metrics",
      recurringTitle: "MRR",
      profitCardSub: "Gross profit",
      headcountUk: 2,
      headcountContractors: 3,
      contractorLocations: ["India (1)", "Philippines (1)", "Bulgaria (1)"],
      brandAccentHex: "#ea580c",
      sidebarCollapsible: true,
      sidebarCollapsedMark: <GloxMark size={28} />,
      showInvestorPortal: true,
    } satisfies FinanceDemoUiLabels,
  },
  {
    id: "barbershop",
    label: "Barber Shop",
    bundle: barbershopDemoBundle,
    logo: <BarbershopLogo size="md" />,
    ui: {
      companyName: "Istanbul Barbers",
      metricsTabLabel: "Shop Metrics",
      recurringTitle: "Monthly revenue",
      profitCardSub: "Gross profit after direct costs",
      headcountUk: 6,
      headcountContractors: 0,
      contractorLocations: [],
      overviewOnly: true,
      brandAccentHex: "#dc2626",
    } satisfies FinanceDemoUiLabels,
  },
  {
    id: "recruitment",
    label: "Recruitment",
    bundle: recruitmentDemoBundle,
    logo: <RecruitmentLogo size="md" />,
    ui: {
      companyName: "NorthStar Talent",
      metricsTabLabel: "Agency Metrics",
      recurringTitle: "Monthly fee income",
      profitCardSub: "After staff & commission costs",
      headcountUk: 3,
      headcountContractors: 2,
      contractorLocations: ["Poland (1)", "South Africa (1)"],
      sidebarCollapsible: true,
      sidebarCollapsedMark: <RecruitmentMark size={28} />,
      brandAccentHex: "#2563eb",
    } satisfies FinanceDemoUiLabels,
  },
] as const;

export function FinanceDemoCarousel() {
  const [i, setI] = useState(0);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setI((v) => (v - 1 + SLIDES.length) % SLIDES.length)}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-50"
            aria-label="Previous demo company"
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={() => setI((v) => (v + 1) % SLIDES.length)}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-50"
            aria-label="Next demo company"
          >
            Next →
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setI(idx)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                idx === i
                  ? s.id === "barbershop"
                    ? "bg-red-600 text-white"
                    : s.id === "saas"
                      ? "bg-orange-600 text-white"
                      : "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            width: `${SLIDES.length * 100}%`,
            transform: `translateX(-${(i * 100) / SLIDES.length}%)`,
          }}
        >
          {SLIDES.map((s) => (
            <div
              key={s.id}
              className="flex-shrink-0 px-0 sm:px-1"
              style={{ width: `${100 / SLIDES.length}%` }}
            >
              <FinanceDemoDashboard bundle={s.bundle} logo={s.logo} ui={s.ui} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

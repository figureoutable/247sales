import type { CSSProperties } from "react";

/** Colours for Recharts + KPI accents when a brand hex is active (Glox orange). */
export type ChartAccentPalette = {
  revenueBar: string;
  totalCostsBar: string;
  marginStroke: string;
  marginFill: string;
  marginFillOpacity: number;
  marginTooltipClass: string;
  ebitdaPositive: string;
  ebitdaTooltipPositiveClass: string;
  cashIn: string;
  cashOut: string;
  cashNetLine: string;
  cashNetPositiveClass: string;
  cashClosingLine: string;
  cashClosingPositiveClass: string;
  ltvBar: string;
  cacBar: string;
  ratioLine: string;
  mrrBar: string;
  arrLine: string;
  customersAreaStroke: string;
  customersAreaFill: string;
  trendSparkline: string;
  /** Stacked revenue: middle layer (e.g. new MRR). */
  stackMidStroke: string;
  stackMidFill: string;
  /** Stacked revenue: top layer (e.g. churn). */
  stackTopStroke: string;
  stackTopFill: string;
  /** Tailwind class for positive KPI subtext when using a brand palette (SaaS orange / recruitment blue). */
  positiveSubClass: string;
};

export const DEFAULT_PALETTE: ChartAccentPalette = {
  revenueBar: "#22c55e",
  totalCostsBar: "#0a0a0a",
  marginStroke: "#22c55e",
  marginFill: "#86efac",
  marginFillOpacity: 0.3,
  marginTooltipClass: "text-[#22c55e]",
  ebitdaPositive: "#22c55e",
  ebitdaTooltipPositiveClass: "text-[#22c55e]",
  cashIn: "#818cf8",
  cashOut: "#64748b",
  cashNetLine: "#4f46e5",
  cashNetPositiveClass: "text-emerald-600",
  cashClosingLine: "#4f46e5",
  cashClosingPositiveClass: "text-indigo-600",
  ltvBar: "#818cf8",
  cacBar: "#111827",
  ratioLine: "#6366f1",
  mrrBar: "#818cf8",
  arrLine: "#111827",
  customersAreaStroke: "#6366f1",
  customersAreaFill: "#818cf8",
  trendSparkline: "#22c55e",
  stackMidStroke: "#22c55e",
  stackMidFill: "#4ade80",
  stackTopStroke: "#f97316",
  stackTopFill: "#fb923c",
  positiveSubClass: "text-emerald-600",
};

/** Orange-forward palette aligned with Glox #ea580c. */
function orangePalette(hex: string): ChartAccentPalette {
  return {
    revenueBar: hex,
    totalCostsBar: "#57534e",
    marginStroke: hex,
    marginFill: "#fed7aa",
    marginFillOpacity: 0.55,
    marginTooltipClass: "text-orange-600",
    ebitdaPositive: hex,
    ebitdaTooltipPositiveClass: "text-orange-600",
    cashIn: "#fb923c",
    cashOut: "#78716c",
    cashNetLine: hex,
    cashNetPositiveClass: "text-orange-600",
    cashClosingLine: hex,
    cashClosingPositiveClass: "text-orange-600",
    ltvBar: "#fb923c",
    cacBar: "#292524",
    ratioLine: hex,
    mrrBar: "#fb923c",
    arrLine: "#431407",
    customersAreaStroke: hex,
    customersAreaFill: "#fdba74",
    trendSparkline: hex,
    stackMidStroke: "#ea580c",
    stackMidFill: "#ffedd5",
    stackTopStroke: "#9a3412",
    stackTopFill: "#fdba74",
    positiveSubClass: "text-orange-600",
  };
}

/** Blue-forward palette for recruitment demo (NorthStar-style). */
function bluePalette(hex: string): ChartAccentPalette {
  return {
    revenueBar: hex,
    totalCostsBar: "#475569",
    marginStroke: hex,
    marginFill: "#bfdbfe",
    marginFillOpacity: 0.5,
    marginTooltipClass: "text-blue-600",
    ebitdaPositive: hex,
    ebitdaTooltipPositiveClass: "text-blue-600",
    cashIn: "#60a5fa",
    cashOut: "#64748b",
    cashNetLine: hex,
    cashNetPositiveClass: "text-blue-600",
    cashClosingLine: hex,
    cashClosingPositiveClass: "text-blue-700",
    ltvBar: "#3b82f6",
    cacBar: "#0f172a",
    ratioLine: hex,
    mrrBar: "#60a5fa",
    arrLine: "#172554",
    customersAreaStroke: hex,
    customersAreaFill: "#93c5fd",
    trendSparkline: hex,
    stackMidStroke: "#2563eb",
    stackMidFill: "#dbeafe",
    stackTopStroke: "#1e40af",
    stackTopFill: "#bfdbfe",
    positiveSubClass: "text-blue-600",
  };
}

/** SaaS orange when `brandAccentHex` set; recruitment uses blue palette; barbershop stays default. */
export function resolveChartPalette(opts: {
  brandAccentHex?: string;
  isSeatBasedShop: boolean;
  isRecruitmentAgency: boolean;
}): ChartAccentPalette {
  if (opts.isSeatBasedShop || !opts.brandAccentHex) {
    return DEFAULT_PALETTE;
  }
  if (opts.isRecruitmentAgency) {
    return bluePalette(opts.brandAccentHex);
  }
  return orangePalette(opts.brandAccentHex);
}

export function isBrandedChartPalette(p: ChartAccentPalette): boolean {
  return p.trendSparkline !== DEFAULT_PALETTE.trendSparkline;
}

export function positiveSubStyle(palette: ChartAccentPalette, isPositive: boolean): CSSProperties | undefined {
  if (!isPositive) return undefined;
  if (!isBrandedChartPalette(palette)) return undefined;
  return { color: palette.trendSparkline };
}

export function positiveSubClassName(palette: ChartAccentPalette, isPositive: boolean): string {
  if (!isPositive) return "text-red-600";
  if (isBrandedChartPalette(palette)) return palette.positiveSubClass;
  return "text-emerald-600";
}

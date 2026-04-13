"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BarChart3,
  ChevronsLeft,
  ChevronsRight,
  FileText,
  FolderOpen,
  LayoutDashboard,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { buildAggregatedRows, estimatedCorpTaxOnOperatingProfit } from "@/lib/finance-demo/buildSeries";
import { formatCompactGbp, formatCurrency, formatNumber, formatPct } from "@/lib/finance-demo/formatters";
import type { PeriodMode } from "@/lib/finance-demo/aggregate";
import {
  getAccountsFilingDeadline,
  getDaysTillTaxDue,
  getNextVatReturnDueDate,
  getTaxDueDate,
} from "@/lib/finance-demo/taxUtils";
import type { FinanceDemoBundle } from "@/lib/finance-demo/model";
import { DashboardStatCard, MetricCard, NextDeadlinesCard, SectionHeader } from "./cards";
import {
  AgencyEbitdaMarginChart,
  AgencyInterviewsPlacementsChart,
  CashFlowComposedChart,
  ClosingCashChart,
  CustomerGrowthChart,
  GrossMarginChart,
  LtvCacChart,
  MrrArrChart,
  NrrChurnChart,
} from "./charts";
import {
  buildBarbershopRevenueStackRows,
  buildRecruitmentNfiStackRows,
  buildRevenueStackRows,
  BarbershopChairsCapacityCard,
  BarbershopOperatingCostMixPanel,
  BarbershopRevenueTrendStacked,
  buildBarbershopOpexTrendRows,
  CostsDonut,
  CurrencyDonut,
  RecruitmentPipelineCard,
  SaasSubscriberMixCard,
  RevenuePerChairDayChart,
  RecruitmentNfiMixComparisonCard,
  RecruitmentNfiTrendStacked,
  RevenueTrendStacked,
  type DonutSlice,
} from "./modern-charts";
import { InvestorPortalPanel } from "./InvestorPortalPanel";
import { PlStatementTable } from "./PlStatementTable";
import { RevenueForecasterPanel } from "./RevenueForecasterPanel";
import { ChartAccentProvider } from "./ChartAccentContext";
import { isBrandedChartPalette, positiveSubClassName, resolveChartPalette } from "./chartPalettes";

const PREPARED_BY = "Figures Chartered Accountants";

export type FinanceDemoUiLabels = {
  companyName: string;
  metricsTabLabel: string;
  recurringTitle: string;
  profitCardSub: string;
  headcountUk: number;
  headcountContractors: number;
  contractorLocations: string[];
  /** When true, only the Overview tab is shown (no sidebar / other sections). */
  overviewOnly?: boolean;
  /** Optional header accent (e.g. “Overview” suffix) — defaults to violet. */
  brandAccentHex?: string;
  /** Desktop sidebar can collapse to icon-only (e.g. carousel demos). */
  sidebarCollapsible?: boolean;
  /** Shown above the expand control when the sidebar is collapsed (desktop). */
  sidebarCollapsedMark?: ReactNode;
  /** When true, repeat plain `companyName` in the header after the logo. Default false (logo shows the styled name). */
  duplicateBrandInHeader?: boolean;
  /** Glox-style SaaS: extra sidebar tab with data-room upload UI. */
  showInvestorPortal?: boolean;
};

type TabId = "overview" | "pl" | "metrics" | "cashflow" | "forecaster" | "investor";

function MonthToggle({
  value,
  onChange,
  accentHex,
}: {
  value: PeriodMode;
  onChange: (p: PeriodMode) => void;
  accentHex?: string;
}) {
  const modes: PeriodMode[] = ["monthly", "quarterly", "annual"];
  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1 text-xs font-semibold sm:text-sm">
      {modes.map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => onChange(m)}
          className={`rounded-md px-3 py-1.5 capitalize transition-colors ${
            value === m
              ? accentHex
                ? "text-white shadow-sm"
                : "bg-violet-600 text-white shadow-sm"
              : "text-gray-600 hover:text-black"
          }`}
          style={value === m && accentHex ? { backgroundColor: accentHex } : undefined}
        >
          {m === "monthly" ? "Monthly" : m === "quarterly" ? "Quarterly" : "Annual"}
        </button>
      ))}
    </div>
  );
}

type FinanceDemoDashboardProps = {
  bundle: FinanceDemoBundle;
  logo: ReactNode;
  ui: FinanceDemoUiLabels;
};

export function FinanceDemoDashboard({ bundle, logo, ui }: FinanceDemoDashboardProps) {
  const [period, setPeriod] = useState<PeriodMode>("monthly");
  const [tab, setTab] = useState<TabId>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [asOf, setAsOf] = useState(bundle.months.length - 1);
  const overviewOnly = Boolean(ui.overviewOnly);
  const sidebarCollapsible = Boolean(ui.sidebarCollapsible);
  const navCompact = sidebarCollapsible && sidebarCollapsed;
  const effectiveTab: TabId = overviewOnly ? "overview" : tab;

  const rows = useMemo(() => buildAggregatedRows(bundle, period), [bundle, period]);
  const last = asOf;
  const isRecruitmentAgency = Boolean(bundle.recruitmentAgency);
  const ra = bundle.recruitmentAgency;
  const taxDue = getTaxDueDate(bundle.financialYearEnd);
  const daysLeft = getDaysTillTaxDue(bundle.financialYearEnd);
  const taxEstimate = estimatedCorpTaxOnOperatingProfit(bundle, last);

  const overviewDeadlineItems = useMemo(
    () =>
      [
        {
          id: "vat",
          label: "VAT return & payment",
          sublabel: "Quarterly — 1 month + 7 days after quarter end",
          date: bundle.nextVatReturnDueDate ?? getNextVatReturnDueDate(),
        },
        {
          id: "accounts",
          label: "Statutory accounts",
          sublabel: "Companies House · 9 months after year-end",
          date: getAccountsFilingDeadline(bundle.financialYearEnd),
        },
        {
          id: "ct",
          label: "Corporation tax",
          sublabel: "CT600 & payment",
          date: getTaxDueDate(bundle.financialYearEnd),
        },
      ].sort((a, b) => a.date.getTime() - b.date.getTime()),
    [bundle.financialYearEnd, bundle.nextVatReturnDueDate],
  );

  const sparkMrr = bundle.mrr.slice(Math.max(0, last - 5), last + 1);
  const sparkGp = bundle.grossProfit.slice(Math.max(0, last - 5), last + 1);

  const latestMrr = bundle.mrr[last];
  const latestMom = last > 0 ? bundle.momGrowthPct[last] : 0;
  const latestMargin = bundle.grossMarginPct[last];
  const latestLtvCac = bundle.ltvCacRatio[last];
  const latestPayback = bundle.cacPayback[last];
  const latestChurn = bundle.monthlyChurnPct[last];
  const latestCash = bundle.closingCash[last];
  const arrRun = bundle.mrr[last] * 12;
  const netMovement = last > 0 ? bundle.mrr[last] - bundle.mrr[last - 1] : 0;
  const customersNow = bundle.customers[last];
  const arpu = customersNow > 0 ? latestMrr / customersNow : 0;

  const burn = useMemo(() => {
    const slice = bundle.netCashMovement.slice(Math.max(0, last - 2), last + 1);
    const avg = slice.reduce((a, b) => a + Math.abs(Math.min(0, b)), 0) / Math.max(1, slice.length);
    return avg > 0 ? avg : Math.max(1, Math.abs(bundle.netCashMovement[last]) || 1);
  }, [bundle.netCashMovement, last]);

  const runwayMo = latestCash > 0 && burn > 0 ? latestCash / burn : 0;

  const navItems = useMemo(() => {
    const items: { id: TabId; label: string; Icon: typeof LayoutDashboard }[] = [
      { id: "overview", label: "Overview", Icon: LayoutDashboard },
      { id: "pl", label: "P&L", Icon: FileText },
      { id: "metrics", label: ui.metricsTabLabel, Icon: BarChart3 },
      { id: "cashflow", label: "Cash Flow", Icon: Wallet },
    ];
    if (ui.showInvestorPortal) {
      items.push({ id: "investor", label: "Investor Portal", Icon: FolderOpen });
    }
    items.push({ id: "forecaster", label: "Revenue Forecaster", Icon: TrendingUp });
    return items;
  }, [ui.metricsTabLabel, ui.showInvestorPortal]);

  useEffect(() => {
    if (tab === "investor" && !ui.showInvestorPortal) setTab("overview");
  }, [tab, ui.showInvestorPortal]);

  const start12 = Math.max(0, last - 11);
  const stackData = useMemo(
    () =>
      buildRevenueStackRows(bundle.mrr, bundle.customers, bundle.churnedCustomers, bundle.months, start12, last),
    [bundle, start12, last],
  );

  const recruitmentStackData = useMemo(() => {
    if (!ra) return null;
    return buildRecruitmentNfiStackRows(ra.permFeeIncome, ra.contractMarginIncome, bundle.months, start12, last);
  }, [ra, bundle.months, start12, last]);

  const recruitmentNfiMix = useMemo((): {
    current: DonutSlice[];
    prior: DonutSlice[] | null;
    priorMonthLabel: string | null;
  } | null => {
    if (!ra) return null;
    const at = (i: number): DonutSlice[] | null => {
      const p = ra.permFeeIncome[i] ?? 0;
      const c = ra.contractMarginIncome[i] ?? 0;
      const t = p + c;
      if (t <= 0) return null;
      return [
        { name: "Perm placement fees", value: Math.round(p), pct: (p / t) * 100, color: "#2563eb" },
        { name: "Contract margin", value: Math.round(c), pct: (c / t) * 100, color: "#bfdbfe" },
      ];
    };
    const current = at(last);
    if (!current) return null;
    const prior = last > 0 ? at(last - 1) : null;
    const priorMonthLabel = last > 0 ? (bundle.months[last - 1] ?? null) : null;
    return { current, prior, priorMonthLabel };
  }, [ra, last, bundle.months]);

  const recruitmentStaffOpexSlices = useMemo((): DonutSlice[] | null => {
    if (!ra) return null;
    const i = last;
    const ox = ra.recruitmentOpex;
    const rows: { name: string; value: number; color: string }[] = [
      { name: "Staff (salaries, commission & NI)", value: bundle.totalCogs[i] ?? 0, color: "#1e3a8a" },
      { name: "Office rent", value: ox.officeRent[i] ?? 0, color: "#1d4ed8" },
      { name: "Job boards & advertising", value: ox.jobBoardsAdvertising[i] ?? 0, color: "#2563eb" },
      { name: "CRM & tech", value: ox.crmTech[i] ?? 0, color: "#3b82f6" },
      { name: "BD & marketing", value: ox.bdMarketing[i] ?? 0, color: "#60a5fa" },
      { name: "Accountancy & compliance", value: ox.accountancyCompliance[i] ?? 0, color: "#64748b" },
      { name: "Insurance", value: ox.insurance[i] ?? 0, color: "#0ea5e9" },
      { name: "Phone & comms", value: ox.phoneComms[i] ?? 0, color: "#93c5fd" },
      { name: "Bank & misc", value: ox.bankMisc[i] ?? 0, color: "#cbd5e1" },
    ];
    const total = rows.reduce((s, r) => s + r.value, 0);
    if (total <= 0) return null;
    return rows.map((r) => ({
      name: r.name,
      value: Math.round(r.value),
      pct: (r.value / total) * 100,
      color: r.color,
    }));
  }, [bundle.totalCogs, last, ra]);

  const agencyPipelineChartData = useMemo(() => {
    if (!ra) return [];
    const out: Record<string, string | number>[] = [];
    for (let i = start12; i <= last; i++) {
      out.push({
        label: bundle.months[i] ?? "",
        interviews: ra.interviewsConducted[i] ?? 0,
        placements: ra.totalPlacements[i] ?? 0,
      });
    }
    return out;
  }, [bundle.months, last, ra, start12]);

  const agencyEbitdaMarginChartData = useMemo(() => {
    if (!ra) return [];
    const out: Record<string, string | number>[] = [];
    for (let i = start12; i <= last; i++) {
      out.push({
        label: bundle.months[i] ?? "",
        marginPct: (ra.ebitdaMarginPct[i] ?? 0) * 100,
      });
    }
    return out;
  }, [bundle.months, last, ra, start12]);

  const spikeLabel = useMemo(() => {
    if (isRecruitmentAgency) return undefined;
    let maxC = -1;
    let minC = 1e9;
    let idx = last;
    for (let i = start12; i <= last; i++) {
      const c = bundle.monthlyChurnPct[i];
      if (c > maxC) {
        maxC = c;
        idx = i;
      }
      if (c < minC) minC = c;
    }
    return maxC - minC > 0.15 ? bundle.months[idx] : undefined;
  }, [bundle.monthlyChurnPct, bundle.months, isRecruitmentAgency, start12, last]);

  const totalCostsMonth = bundle.totalCogs[last] + bundle.totalOpex[last];
  const isSeatBasedShop = Boolean(
    bundle.revenuePerChairPerDay?.length && bundle.revenuePerChairPerDay.length === bundle.months.length,
  );
  const chartPalette = useMemo(
    () =>
      resolveChartPalette({
        brandAccentHex: ui.brandAccentHex,
        isSeatBasedShop,
        isRecruitmentAgency,
      }),
    [ui.brandAccentHex, isSeatBasedShop, isRecruitmentAgency],
  );
  const seatDayNow = isSeatBasedShop ? (bundle.revenuePerChairPerDay![last] ?? 0) : 0;
  const seatDayPrev = isSeatBasedShop && last > 0 ? (bundle.revenuePerChairPerDay![last - 1] ?? seatDayNow) : seatDayNow;
  const seatDayMomPct = seatDayPrev > 0 ? ((seatDayNow - seatDayPrev) / seatDayPrev) * 100 : 0;
  const payrollEst = isRecruitmentAgency ? bundle.totalCogs[last] : totalCostsMonth * 0.733;
  const costSlices: DonutSlice[] = useMemo(() => {
    const branded = isBrandedChartPalette(chartPalette);
    const hex = ui.brandAccentHex ?? "#ea580c";
    return [
      { name: "Payroll", value: totalCostsMonth * 0.733, pct: 73.3, color: branded ? hex : "#6366f1" },
      { name: "Software & infra", value: totalCostsMonth * 0.118, pct: 11.8, color: branded ? "#fdba74" : "#d97706" },
      { name: "Marketing", value: totalCostsMonth * 0.095, pct: 9.5, color: branded ? chartPalette.stackMidStroke : "#22c55e" },
      { name: "G&A", value: totalCostsMonth * 0.055, pct: 5.5, color: "#9ca3af" },
    ];
  }, [chartPalette, totalCostsMonth, ui.brandAccentHex]);

  const usdShare = 0.78;
  const gbpShare = 0.22;
  const fx = 1.268;
  const currencySlices: DonutSlice[] = useMemo(() => {
    if (ui.brandAccentHex && !isSeatBasedShop) {
      return [
        {
          name: "USD revenue (equiv. £)",
          value: latestMrr * usdShare,
          pct: usdShare * 100,
          color: ui.brandAccentHex,
        },
        {
          name: "GBP revenue",
          value: latestMrr * gbpShare,
          pct: gbpShare * 100,
          color: "#e5e7eb",
        },
      ];
    }
    return [
      { name: "USD revenue (equiv. £)", value: latestMrr * usdShare, pct: usdShare * 100, color: "#3b82f6" },
      { name: "GBP revenue", value: latestMrr * gbpShare, pct: gbpShare * 100, color: "#22c55e" },
    ];
  }, [gbpShare, isSeatBasedShop, latestMrr, ui.brandAccentHex, usdShare]);

  const seatRevChartData = useMemo(() => {
    const v = bundle.revenuePerChairPerDay;
    if (!v || v.length !== bundle.months.length) return null;
    const out: { label: string; perSeatDay: number }[] = [];
    for (let i = start12; i <= last; i++) {
      out.push({ label: bundle.months[i] ?? "", perSeatDay: v[i] ?? 0 });
    }
    return out;
  }, [bundle.months, bundle.revenuePerChairPerDay, start12, last]);

  const shopRevenueStackData = useMemo(() => {
    const o = bundle.ownerServiceRevenue;
    const c = bundle.chairRentRevenue;
    if (!o?.length || o.length !== bundle.months.length || !c?.length || c.length !== bundle.months.length) {
      return null;
    }
    return buildBarbershopRevenueStackRows(o, c, bundle.months, start12, last);
  }, [bundle.chairRentRevenue, bundle.months, bundle.ownerServiceRevenue, start12, last]);

  const shopCostDonutSlices = useMemo((): DonutSlice[] | null => {
    const c = bundle.shopOperatingCosts;
    if (!c?.rentRates?.length || c.rentRates.length !== bundle.months.length) return null;
    const i = last;
    const rows: { name: string; value: number; color: string }[] = [
      { name: "Rent & business rates", value: c.rentRates[i] ?? 0, color: "#7f1d1d" },
      { name: "Utilities", value: c.utilities[i] ?? 0, color: "#b91c1c" },
      { name: "Consumables (blades, colour, etc.)", value: c.consumables[i] ?? 0, color: "#dc2626" },
      { name: "Insurance", value: c.insurance[i] ?? 0, color: "#e11d48" },
      { name: "Cleaning & sundries", value: c.cleaning[i] ?? 0, color: "#f43f5e" },
      { name: "Marketing", value: c.marketing[i] ?? 0, color: "#fb7185" },
      { name: "Accountancy & bank", value: c.professionalAndBank[i] ?? 0, color: "#fda4af" },
    ];
    const total = rows.reduce((s, r) => s + r.value, 0);
    if (total <= 0) {
      return rows.map((r) => ({ name: r.name, value: Math.round(r.value), pct: 0, color: r.color }));
    }
    return rows.map((r) => ({
      name: r.name,
      value: Math.round(r.value),
      pct: (r.value / total) * 100,
      color: r.color,
    }));
  }, [bundle.months.length, bundle.shopOperatingCosts, last]);

  const shopCostTrendData = useMemo(() => {
    const c = bundle.shopOperatingCosts;
    if (!c?.rentRates?.length || c.rentRates.length !== bundle.months.length) return null;
    return buildBarbershopOpexTrendRows(c, bundle.months, start12, last);
  }, [bundle.months, bundle.shopOperatingCosts, start12, last]);

  const monthSelect = (
    <label className="flex items-center gap-2 text-sm text-gray-600">
      <span className="hidden sm:inline">As of</span>
      <select
        value={asOf}
        onChange={(e) => setAsOf(Number(e.target.value))}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 font-semibold text-gray-900 shadow-sm"
      >
        {bundle.months.map((m, i) => (
          <option key={m} value={i}>
            {m}
          </option>
        ))}
      </select>
    </label>
  );

  const placeholder = (title: string) => (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
      <p className="text-lg font-semibold text-gray-900">{title}</p>
      <p className="mt-2 max-w-md text-sm text-gray-600">
        Demo view — in a live build this would connect to your data, documents, or forecast model.
      </p>
    </div>
  );

  const inner = (
    <>
      <header className="flex flex-col gap-3 border-b border-gray-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="flex-shrink-0">{logo}</span>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-gray-900 sm:text-xl">
              {ui.duplicateBrandInHeader === true ? (
                <>
                  {ui.companyName}{" "}
                </>
              ) : (
                <span className="sr-only">{ui.companyName}</span>
              )}
              <span
                className={`${ui.duplicateBrandInHeader ? "ml-2 " : ""}font-semibold ${ui.brandAccentHex ? "" : "text-violet-700"}`}
                style={ui.brandAccentHex ? { color: ui.brandAccentHex } : undefined}
              >
                {effectiveTab === "overview" ? "Overview" : `· ${navItems.find((n) => n.id === effectiveTab)?.label ?? ""}`}
              </span>
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="hidden text-xs text-gray-500 md:inline">{PREPARED_BY}</span>
          {monthSelect}
        </div>
      </header>

      {effectiveTab !== "overview" && effectiveTab !== "investor" && (
        <div className="flex items-center justify-end border-b border-gray-100 bg-gray-50/80 px-4 py-2 lg:px-6">
          <div className="hidden lg:block">
            <MonthToggle value={period} onChange={setPeriod} accentHex={ui.brandAccentHex} />
          </div>
        </div>
      )}

      <div className="flex-1 space-y-8 overflow-y-auto bg-[#f3f4f6] p-4 lg:space-y-10 lg:p-6">
        {effectiveTab === "overview" && (
          <>
            <section
              className={`grid grid-cols-2 gap-3 md:grid-cols-3 ${
                isRecruitmentAgency ? "lg:grid-cols-5" : isSeatBasedShop ? "lg:grid-cols-6" : "lg:grid-cols-4"
              }`}
            >
              <DashboardStatCard
                title={ui.recurringTitle}
                value={formatCurrency(latestMrr)}
                sub={`${latestMom >= 0 ? "+" : ""}${formatPct(Math.abs(latestMom))} vs last month`}
                subClassName={positiveSubClassName(chartPalette, latestMom >= 0)}
              />
              <DashboardStatCard
                title={isRecruitmentAgency ? "Annualised NFI" : "ARR (run rate)"}
                value={formatCompactGbp(arrRun)}
                sub={latestMom >= 5 ? "Strong growth trajectory" : "On track vs plan"}
                subClassName={positiveSubClassName(chartPalette, true)}
              />
              <DashboardStatCard
                title="Cash position"
                value={formatCompactGbp(latestCash)}
                sub={
                  runwayMo > 0 && latestCash > 0
                    ? `~${runwayMo.toFixed(1)} months runway`
                    : "Monitor cash & burn closely"
                }
                subClassName="text-gray-500"
              />
              <DashboardStatCard
                title="Est. tax bill"
                value={taxEstimate <= 0 ? "£0" : formatCompactGbp(taxEstimate)}
                sub={`CT @ 25% · ${taxEstimate <= 0 ? "No CT on a loss-making month (demo)" : "25% of operating profit (selected month)"}`}
                subClassName="text-gray-500"
              />
              {isRecruitmentAgency ? (
                <DashboardStatCard
                  title="When tax is due"
                  value={daysLeft < 0 ? "Overdue" : String(daysLeft)}
                  sub={
                    daysLeft < 0
                      ? `Was due ${taxDue.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
                      : `Due date: ${taxDue.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
                  }
                  subClassName={daysLeft < 0 ? "text-red-600" : "text-gray-500"}
                />
              ) : isSeatBasedShop ? (
                <>
                  <DashboardStatCard
                    title="Net revenue mvmt"
                    value={`${netMovement >= 0 ? "+" : ""}${formatCurrency(netMovement)}`}
                    sub="vs prior month (total takings)"
                    subClassName="text-gray-500"
                  />
                  <DashboardStatCard
                    title="When tax is due"
                    value={daysLeft < 0 ? "Overdue" : String(daysLeft)}
                    sub={
                      daysLeft < 0
                        ? `Was due ${taxDue.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
                        : `Due date: ${taxDue.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
                    }
                    subClassName={daysLeft < 0 ? "text-red-600" : "text-gray-500"}
                  />
                </>
              ) : null}
            </section>

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {shopRevenueStackData ? (
                <BarbershopRevenueTrendStacked data={shopRevenueStackData} />
              ) : recruitmentStackData ? (
                <RecruitmentNfiTrendStacked data={recruitmentStackData} />
              ) : (
                <RevenueTrendStacked
                  data={stackData}
                  spikeLabel={spikeLabel}
                  brandAccent={Boolean(ui.brandAccentHex && !isSeatBasedShop)}
                />
              )}
              {seatRevChartData ? (
                <RevenuePerChairDayChart
                  data={seatRevChartData}
                  seatCount={bundle.seatCount ?? 6}
                />
              ) : recruitmentNfiMix ? (
                <RecruitmentNfiMixComparisonCard
                  slicesCurrent={recruitmentNfiMix.current}
                  slicesPrior={recruitmentNfiMix.prior}
                  currentMonthLabel={bundle.months[last] ?? ""}
                  priorMonthLabel={recruitmentNfiMix.priorMonthLabel}
                  fxNote="Share of net fee income from permanent placements vs contract margin (from model)."
                />
              ) : (
                <CurrencyDonut
                  slices={currencySlices}
                  fxNote={`Blended view: ${formatPct(usdShare * 100)} USD / ${formatPct(gbpShare * 100)} GBP (demo split). FX (avg) ${fx}.`}
                />
              )}
            </section>

            <section
              className={`grid grid-cols-2 gap-3 md:grid-cols-3 ${
                isRecruitmentAgency ? "lg:grid-cols-4" : isSeatBasedShop ? "lg:grid-cols-4" : "lg:grid-cols-4"
              }`}
            >
              {!isRecruitmentAgency && !isSeatBasedShop ? (
                <DashboardStatCard
                  title="Net revenue mvmt"
                  value={`${netMovement >= 0 ? "+" : ""}${formatCurrency(netMovement)}`}
                  sub="New − churn + expansion (demo)"
                  subClassName="text-gray-500"
                />
              ) : null}
              {isSeatBasedShop ? (
                <>
                  <DashboardStatCard
                    title="Gross margin"
                    value={formatPct(latestMargin)}
                    sub={latestMargin >= 80 ? "After consumables (ex-VAT)" : "Room to improve vs plan"}
                    subClassName={latestMargin >= 80 ? positiveSubClassName(chartPalette, true) : "text-gray-500"}
                  />
                  <DashboardStatCard
                    title="Est. customers (month)"
                    value={formatNumber(customersNow)}
                    sub="Model footfall incl. chair renters"
                    subClassName="text-gray-500"
                  />
                  <DashboardStatCard
                    title="Revenue per chair / day"
                    value={`£${seatDayNow.toFixed(2)}`}
                    sub={`${seatDayMomPct >= 0 ? "+" : ""}${formatPct(Math.abs(seatDayMomPct))} vs prior month · ${bundle.seatCount ?? 6} chairs`}
                    subClassName={positiveSubClassName(chartPalette, seatDayMomPct >= 0)}
                  />
                  <DashboardStatCard
                    title="Operating costs"
                    value={formatCurrency(totalCostsMonth)}
                    sub={`Rent, utilities, marketing & shop opex · ${bundle.months[last]}`}
                    subClassName="text-gray-500"
                  />
                </>
              ) : isRecruitmentAgency && ra ? (
                <>
                  <DashboardStatCard
                    title="Gross margin"
                    value={formatPct(latestMargin)}
                    sub="NFI after staff costs (agency view)"
                    subClassName={latestMargin >= 45 ? positiveSubClassName(chartPalette, true) : "text-gray-500"}
                  />
                  <DashboardStatCard
                    title="Placement conversion"
                    value={formatPct((ra.placementConversionRate[last] ?? 0) * 100)}
                    sub="Placements ÷ interviews (model)"
                    subClassName="text-gray-500"
                  />
                  <DashboardStatCard
                    title="Avg perm fee / placement"
                    value={formatCurrency(ra.avgPermFeePerPlacement[last] ?? 0)}
                    sub={`${formatNumber(ra.permPlacements[last] ?? 0)} perm deals · ${bundle.months[last]}`}
                    subClassName="text-gray-500"
                  />
                  <DashboardStatCard
                    title="Staff cost % of NFI"
                    value={formatPct((ra.staffCostPctNfi[last] ?? 0) * 100)}
                    sub="Target: below 65% (model note)"
                    subClassName={
                      (ra.staffCostPctNfi[last] ?? 1) <= 0.65
                        ? positiveSubClassName(chartPalette, true)
                        : "text-amber-600"
                    }
                  />
                </>
              ) : (
                <>
                  <DashboardStatCard
                    title="Gross margin"
                    value={formatPct(latestMargin)}
                    sub={latestMargin >= 80 ? "Healthy margin profile" : "Room to improve"}
                    subClassName={latestMargin >= 80 ? positiveSubClassName(chartPalette, true) : "text-gray-500"}
                  />
                  <DashboardStatCard
                    title="Monthly churn"
                    value={formatPct(latestChurn)}
                    sub="Target: lower is better"
                    subClassName="text-gray-500"
                  />
                </>
              )}
              {!isRecruitmentAgency && !isSeatBasedShop ? (
                <DashboardStatCard
                  title="When tax is due"
                  value={daysLeft < 0 ? "Overdue" : String(daysLeft)}
                  sub={
                    daysLeft < 0
                      ? `Was due ${taxDue.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
                      : `Due date: ${taxDue.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
                  }
                  subClassName={daysLeft < 0 ? "text-red-600" : "text-gray-500"}
                />
              ) : null}
            </section>

            <section className="flex flex-col gap-6">
              {shopCostDonutSlices && shopCostTrendData ? (
                <>
                  <BarbershopOperatingCostMixPanel
                    title="Operating cost mix"
                    periodSuffix={bundle.months[last]}
                    slices={shopCostDonutSlices}
                    trendData={shopCostTrendData}
                  />
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <BarbershopChairsCapacityCard totalChairs={bundle.seatCount ?? ui.headcountUk} />
                    <NextDeadlinesCard items={overviewDeadlineItems} />
                  </div>
                </>
              ) : recruitmentStaffOpexSlices && ra ? (
                <>
                  <CostsDonut
                    title="Cost mix (staff + opex)"
                    periodSuffix={bundle.months[last]}
                    slices={recruitmentStaffOpexSlices}
                  />
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <RecruitmentPipelineCard
                      periodSuffix={bundle.months[last] ?? ""}
                      permPlacements={ra.permPlacements[last] ?? 0}
                      contractPlacements={Math.max(
                        0,
                        (ra.totalPlacements[last] ?? 0) - (ra.permPlacements[last] ?? 0),
                      )}
                      interviewsConducted={ra.interviewsConducted[last] ?? 0}
                      placementConversionRate={ra.placementConversionRate[last] ?? 0}
                      avgTimeToFillDays={ra.avgTimeToFillDays[last] ?? 0}
                      permBarColor={ui.brandAccentHex ?? "#2563eb"}
                      contractBarColor="#7dd3fc"
                    />
                    <NextDeadlinesCard items={overviewDeadlineItems} />
                  </div>
                </>
              ) : (
                <>
                  <CostsDonut
                    title="Costs breakdown"
                    periodSuffix={bundle.months[last]}
                    slices={costSlices.map((s) => ({ ...s, value: Math.round(s.value) }))}
                    layout="bars"
                  />
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <SaasSubscriberMixCard
                      periodSuffix={bundle.months[last]}
                      totalCustomers={customersNow}
                      newInMonth={bundle.newCustomers[last] ?? 0}
                      churnedInMonth={bundle.churnedCustomers[last] ?? 0}
                    />
                    <NextDeadlinesCard items={overviewDeadlineItems} />
                  </div>
                </>
              )}
            </section>
          </>
        )}

        {effectiveTab === "pl" && (
          <PlStatementTable
            bundle={bundle}
            period={period}
            asOfMonthIndex={last}
            variant={isRecruitmentAgency ? "recruitment" : isSeatBasedShop ? "barbershop" : "saas"}
            accentHex={ui.brandAccentHex}
          />
        )}

        {effectiveTab === "metrics" && (
          <>
            {isRecruitmentAgency && ra ? (
              <>
                <SectionHeader>Agency performance</SectionHeader>
                <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <MrrArrChart
                    data={rows.overview}
                    title="Net fee income & annualised run-rate"
                    barName="NFI (avg in period)"
                    lineName="Annualised (×12)"
                  />
                  <AgencyInterviewsPlacementsChart data={agencyPipelineChartData} />
                </div>
                <SectionHeader>Placements & efficiency</SectionHeader>
                <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <CustomerGrowthChart
                    data={rows.overview}
                    title="Placements & new contract starts"
                    totalName="Total placements"
                    newName="New contract starts"
                  />
                  <AgencyEbitdaMarginChart data={agencyEbitdaMarginChartData} />
                </div>
                <SectionHeader>Snapshot</SectionHeader>
                <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  <MetricCard
                    title="EBITDA margin"
                    value={formatPct((ra.ebitdaMarginPct[last] ?? 0) * 100)}
                    subLabel="From financial model"
                  />
                  <MetricCard
                    title="Avg time to fill (perm)"
                    value={`${ra.avgTimeToFillDays[last] ?? 0} days`}
                    subLabel="Model assumption"
                  />
                  <MetricCard
                    title="Revenue / consultant"
                    value={formatCurrency(ra.revenuePerConsultant[last] ?? 0)}
                    subLabel="NFI ÷ headcount"
                  />
                  <MetricCard
                    title="Commission paid"
                    value={formatCurrency(ra.totalCommissionPaid[last] ?? 0)}
                    subLabel={bundle.months[last]}
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <LtvCacChart data={rows.kpi} />
                  <GrossMarginChart data={rows.pl} />
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Metric</th>
                        <th className="px-4 py-3 text-left font-semibold">{bundle.months[last]}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {(
                        [
                          ["Net fee income (NFI)", formatCurrency(bundle.mrr[last])],
                          ["Annualised NFI (×12)", formatCurrency(bundle.arr[last])],
                          ["Total placements", formatNumber(bundle.customers[last])],
                          ["Perm placements", formatNumber(ra.permPlacements[last] ?? 0)],
                          ["Interviews conducted", formatNumber(ra.interviewsConducted[last] ?? 0)],
                          ["Placement conversion", formatPct((ra.placementConversionRate[last] ?? 0) * 100)],
                          ["MoM NFI growth", formatPct(bundle.momGrowthPct[last])],
                          ["Gross margin", formatPct(bundle.grossMarginPct[last])],
                          ["Staff cost % of NFI", formatPct((ra.staffCostPctNfi[last] ?? 0) * 100)],
                          ["Avg perm fee / deal", formatCurrency(ra.avgPermFeePerPlacement[last] ?? 0)],
                          ["Est. cost / placement (proxy)", formatCurrency(bundle.cac[last])],
                          ["Fee proxy vs cost (×)", `${bundle.ltvCacRatio[last].toFixed(1)}x`],
                        ] as const
                      ).map(([k, v]) => (
                        <tr key={k}>
                          <td className="px-4 py-2 font-medium text-gray-800">{k}</td>
                          <td className="px-4 py-2 tabular-nums">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <SectionHeader>Performance</SectionHeader>
                <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <MrrArrChart data={rows.overview} />
                  <CustomerGrowthChart data={rows.overview} />
                </div>
                <SectionHeader>Snapshot</SectionHeader>
                <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  <MetricCard
                    title="LTV : CAC"
                    value={`${latestLtvCac.toFixed(1)}x`}
                    subLabel="Target: 3x+"
                    badge={latestLtvCac >= 3 ? "Above target" : undefined}
                  />
                  <MetricCard title="Payback" value={`${latestPayback.toFixed(1)} mo`} subLabel="Months to recover CAC" />
                  <MetricCard
                    title="Gross margin"
                    value={formatPct(latestMargin)}
                    subLabel="Target: 80%+"
                    badge={latestMargin >= 80 ? "Strong" : undefined}
                  />
                  <MetricCard title="Churn" value={formatPct(latestChurn)} subLabel="Monthly (demo)" />
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <LtvCacChart data={rows.kpi} />
                  <NrrChurnChart data={rows.kpi} />
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Metric</th>
                        <th className="px-4 py-3 text-left font-semibold">{bundle.months[last]}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {[
                        [ui.recurringTitle, formatCurrency(bundle.mrr[last])],
                        ["ARR (×12)", formatCurrency(bundle.arr[last])],
                        ["Customers", formatNumber(bundle.customers[last])],
                        ["MoM growth", formatPct(bundle.momGrowthPct[last])],
                        ["Churn", formatPct(bundle.monthlyChurnPct[last])],
                        ["NRR", formatPct(bundle.nrr[last])],
                        ["CAC", formatCurrency(bundle.cac[last])],
                        ["LTV", formatCurrency(bundle.ltv[last])],
                        ["LTV : CAC", `${bundle.ltvCacRatio[last].toFixed(1)}x`],
                        ["CAC payback (mo)", bundle.cacPayback[last].toFixed(1)],
                      ].map(([k, v]) => (
                        <tr key={k}>
                          <td className="px-4 py-2 font-medium text-gray-800">{k}</td>
                          <td className="px-4 py-2 tabular-nums">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        )}

        {effectiveTab === "cashflow" && (
          <>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <CashFlowComposedChart data={rows.cash} />
              <ClosingCashChart data={rows.cash} />
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
              <table className="min-w-full text-left text-sm">
                <thead className="sticky top-0 bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Period</th>
                    <th className="px-4 py-3 font-semibold">Cash in</th>
                    <th className="px-4 py-3 font-semibold">Cash out</th>
                    <th className="px-4 py-3 font-semibold">Net</th>
                    <th className="px-4 py-3 font-semibold">Closing</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.cash.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-2 font-medium">{r.label}</td>
                      <td className={`px-4 py-2 ${chartPalette.cashNetPositiveClass}`}>
                        {formatCurrency(Number(r.inflows))}
                      </td>
                      <td className="px-4 py-2">{formatCurrency(Number(r.outflows))}</td>
                      <td
                        className={`px-4 py-2 ${Number(r.net) < 0 ? "text-red-600" : chartPalette.cashNetPositiveClass}`}
                      >
                        {formatCurrency(Number(r.net))}
                      </td>
                      <td className={`px-4 py-2 ${Number(r.closing) < 0 ? "text-red-600" : "text-gray-900"}`}>
                        {formatCurrency(Number(r.closing))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {effectiveTab === "forecaster" && (
          <RevenueForecasterPanel bundle={bundle} asOfIndex={last} brandAccentHex={ui.brandAccentHex} />
        )}

        {effectiveTab === "investor" && ui.showInvestorPortal && (
          <InvestorPortalPanel accentHex={ui.brandAccentHex} preparedBy={PREPARED_BY} />
        )}

        <div className="border-t border-gray-200 bg-white px-4 py-3 text-xs text-gray-600 sm:text-sm">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <span>Prepared by {PREPARED_BY}</span>
            <span className="text-gray-500">Demo only — illustrative data</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <ChartAccentProvider palette={chartPalette}>
    <div className="finance-demo-root flex min-h-[760px] w-full max-w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg lg:flex-row">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
        {overviewOnly ? (
          <span className="min-w-0 flex-1 text-sm font-semibold text-gray-900">{ui.companyName}</span>
        ) : (
          <button
            type="button"
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium"
            onClick={() => setMobileOpen(true)}
          >
            Menu
          </button>
        )}
        {monthSelect}
      </div>

      {!overviewOnly && mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal>
          <button type="button" className="absolute inset-0 bg-black/40" aria-label="Close" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-[min(100%,280px)] flex-col bg-white p-4 shadow-xl">
            <div className="mb-4">{logo}</div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.Icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                      tab === item.id
                        ? ui.brandAccentHex
                          ? "text-white"
                          : "bg-violet-600 text-white"
                        : ui.brandAccentHex
                          ? "text-gray-600 hover:bg-gray-100/80"
                          : "text-gray-600 hover:bg-violet-50"
                    }`}
                    style={tab === item.id && ui.brandAccentHex ? { backgroundColor: ui.brandAccentHex } : undefined}
                    onClick={() => {
                      setTab(item.id);
                      setMobileOpen(false);
                    }}
                  >
                    <Icon className="h-4 w-4 shrink-0 opacity-90" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <p className="mt-auto pt-6 text-xs text-gray-500">{PREPARED_BY}</p>
          </div>
        </div>
      )}

      {!overviewOnly && (
        <aside
          className={`hidden flex-shrink-0 flex-col border-r border-gray-200 bg-[#fafafa] motion-safe:transition-[width] motion-safe:duration-200 motion-safe:ease-out lg:flex ${
            navCompact ? "w-[4.5rem]" : "w-56 xl:w-64"
          }`}
        >
          {sidebarCollapsible ? (
            navCompact ? (
              <div className="flex flex-col items-center gap-2 border-b border-gray-100 px-2 py-3">
                <span className="flex shrink-0 items-center justify-center">
                  {ui.sidebarCollapsedMark ?? (
                    <LayoutDashboard className="h-7 w-7 text-gray-400" aria-hidden />
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => setSidebarCollapsed(false)}
                  className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-200/80 hover:text-gray-900"
                  aria-label="Expand navigation menu"
                  title="Expand menu"
                >
                  <ChevronsRight className="h-4 w-4" strokeWidth={2.25} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 border-b border-gray-100 py-2 pl-3 pr-1">
                <div className="min-w-0 flex-1 overflow-hidden">{logo}</div>
                <button
                  type="button"
                  onClick={() => setSidebarCollapsed(true)}
                  className="shrink-0 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-200/70 hover:text-gray-800"
                  aria-label="Collapse navigation menu"
                  title="Collapse menu"
                >
                  <ChevronsLeft className="h-4 w-4" strokeWidth={2.25} />
                </button>
              </div>
            )
          ) : (
            <div className="border-b border-gray-100 p-4">{logo}</div>
          )}
          <nav className={`flex flex-1 flex-col gap-0.5 p-2 ${navCompact ? "items-center" : ""}`}>
            {navItems.map((item) => {
              const Icon = item.Icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  title={item.label}
                  aria-label={item.label}
                  aria-current={active ? "page" : undefined}
                  className={`flex rounded-lg text-sm font-medium transition-colors motion-safe:transition-colors ${
                    navCompact ? "w-10 justify-center px-0 py-2.5" : "w-full items-center gap-2 px-3 py-2.5 text-left"
                  } ${
                    active
                      ? ui.brandAccentHex
                        ? "text-white shadow-sm"
                        : "bg-violet-600 text-white shadow-sm"
                      : ui.brandAccentHex
                        ? "text-gray-600 hover:bg-gray-100/80"
                        : "text-gray-600 hover:bg-violet-100/60"
                  }`}
                  style={active && ui.brandAccentHex ? { backgroundColor: ui.brandAccentHex } : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0 opacity-90" />
                  {!navCompact ? <span className="truncate">{item.label}</span> : null}
                </button>
              );
            })}
          </nav>
          {!navCompact ? (
            <div className="border-t border-gray-200 p-3">
              <p className="text-[10px] leading-relaxed text-gray-500">{PREPARED_BY}</p>
              <p className="mt-1 text-[10px] text-gray-400">Client demo dashboard</p>
            </div>
          ) : null}
        </aside>
      )}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#f3f4f6]">{inner}</div>

      {!overviewOnly && effectiveTab !== "investor" && (
        <div className="flex border-t border-gray-200 bg-white px-4 py-2 lg:hidden">
          <MonthToggle value={period} onChange={setPeriod} accentHex={ui.brandAccentHex} />
        </div>
      )}
    </div>
    </ChartAccentProvider>
  );
}

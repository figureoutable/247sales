"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ShopOperatingCostsSeries } from "@/lib/finance-demo/model";
import { formatCurrency, formatK, formatNumber, formatPct } from "@/lib/finance-demo/formatters";
import { useChartAccent } from "./ChartAccentContext";
import { isBrandedChartPalette } from "./chartPalettes";
import { ChartTooltipBox } from "./ChartTooltipBox";

export type StackRevRow = { label: string; baseMrr: number; newMrr: number; churnMrr: number };

export type ShopStackRevRow = { label: string; ownerServices: number; chairRent: number };

export type RecruitmentNfiStackRow = { label: string; permFees: number; contractMargin: number };

export function buildRecruitmentNfiStackRows(
  perm: number[],
  contract: number[],
  months: string[],
  start: number,
  end: number,
): RecruitmentNfiStackRow[] {
  const out: RecruitmentNfiStackRow[] = [];
  for (let i = start; i <= end; i++) {
    out.push({
      label: months[i] ?? "",
      permFees: perm[i] ?? 0,
      contractMargin: contract[i] ?? 0,
    });
  }
  return out;
}

/** Stacked NFI: perm placement fees vs contract margin (from recruitment model). */
export function RecruitmentNfiTrendStacked({ data }: { data: RecruitmentNfiStackRow[] }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-1 text-sm font-semibold text-gray-500">Net fee income by source (last {data.length} months)</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 12, right: 12, left: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke="#6b7280" />
          <YAxis tickFormatter={(v) => formatK(Number(v))} tick={{ fontSize: 10 }} stroke="#6b7280" />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <ChartTooltipBox>
                  <p className="font-semibold text-gray-900">{label}</p>
                  {payload.map((p) => (
                    <p key={String(p.dataKey)} className="text-sm text-gray-700">
                      {p.name}: {formatCurrency(Number(p.value))}
                    </p>
                  ))}
                  <p className="mt-1 border-t border-gray-100 pt-1 text-sm font-medium text-gray-900">
                    Total: {formatCurrency(payload.reduce((s, p) => s + Number(p.value), 0))}
                  </p>
                </ChartTooltipBox>
              ) : null
            }
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="permFees"
            name="Perm placement fees"
            stackId="1"
            stroke="#1e40af"
            fill="#2563eb"
            fillOpacity={0.92}
            isAnimationActive
          />
          <Area
            type="monotone"
            dataKey="contractMargin"
            name="Contract margin"
            stackId="1"
            stroke="#38bdf8"
            fill="#e0f2fe"
            fillOpacity={0.95}
            isAnimationActive
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function buildBarbershopRevenueStackRows(
  owner: number[],
  chair: number[],
  months: string[],
  start: number,
  end: number,
): ShopStackRevRow[] {
  const out: ShopStackRevRow[] = [];
  for (let i = start; i <= end; i++) {
    out.push({
      label: months[i] ?? "",
      ownerServices: owner[i] ?? 0,
      chairRent: chair[i] ?? 0,
    });
  }
  return out;
}

/** Stacked monthly takings: owner cutting vs rented chairs (all GBP, from P&L). */
export function BarbershopRevenueTrendStacked({ data }: { data: ShopStackRevRow[] }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-1 text-sm font-semibold text-gray-500">Monthly takings by source (last {data.length} months)</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 12, right: 12, left: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke="#6b7280" />
          <YAxis tickFormatter={(v) => formatK(Number(v))} tick={{ fontSize: 10 }} stroke="#6b7280" />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <ChartTooltipBox>
                  <p className="font-semibold text-gray-900">{label}</p>
                  {payload.map((p) => (
                    <p key={String(p.dataKey)} className="text-sm text-gray-700">
                      {p.name}: {formatCurrency(Number(p.value))}
                    </p>
                  ))}
                  <p className="mt-1 border-t border-gray-100 pt-1 text-sm font-medium text-gray-900">
                    Total: {formatCurrency(payload.reduce((s, p) => s + Number(p.value), 0))}
                  </p>
                </ChartTooltipBox>
              ) : null
            }
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="ownerServices"
            name="Owner cuts (ex-VAT)"
            stackId="1"
            stroke="#991b1b"
            fill="#dc2626"
            fillOpacity={0.92}
            isAnimationActive
          />
          <Area
            type="monotone"
            dataKey="chairRent"
            name="Chair rent (VAT-exempt)"
            stackId="1"
            stroke="#fca5a5"
            fill="#fee2e2"
            fillOpacity={0.95}
            isAnimationActive
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RevenueTrendStacked({
  data,
  spikeLabel,
  brandAccent,
}: {
  data: StackRevRow[];
  spikeLabel?: string;
  /** Orange stack (e.g. Glox.AI); default violet. */
  brandAccent?: boolean;
}) {
  const pal = useChartAccent();
  const baseStroke = brandAccent ? "#c2410c" : "#6366f1";
  const baseFill = brandAccent ? "#fb923c" : "#818cf8";
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-1 text-sm font-semibold text-gray-500">Revenue trend (last {data.length} months)</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 12, right: 12, left: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke="#6b7280" />
          <YAxis tickFormatter={(v) => formatK(Number(v))} tick={{ fontSize: 10 }} stroke="#6b7280" />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <ChartTooltipBox>
                  <p className="font-semibold text-gray-900">{label}</p>
                  {payload.map((p) => (
                    <p key={String(p.dataKey)} className="text-sm text-gray-700">
                      {p.name}: {formatCurrency(Number(p.value))}
                    </p>
                  ))}
                </ChartTooltipBox>
              ) : null
            }
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="baseMrr"
            name="MRR (base)"
            stackId="1"
            stroke={baseStroke}
            fill={baseFill}
            fillOpacity={0.85}
            isAnimationActive
          />
          <Area
            type="monotone"
            dataKey="newMrr"
            name="New MRR"
            stackId="1"
            stroke={pal.stackMidStroke}
            fill={pal.stackMidFill}
            fillOpacity={0.9}
            isAnimationActive
          />
          <Area
            type="monotone"
            dataKey="churnMrr"
            name="Churn impact"
            stackId="1"
            stroke={pal.stackTopStroke}
            fill={pal.stackTopFill}
            fillOpacity={0.75}
            isAnimationActive
          />
          {spikeLabel ? <ReferenceLine x={spikeLabel} stroke="#ef4444" strokeDasharray="4 4" label={{ value: "Churn spike", fill: "#ef4444", fontSize: 10 }} /> : null}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export type DonutSlice = { name: string; value: number; pct: number; color: string };

function MixPie({
  slices,
  innerRadius = 52,
  outerRadius = 80,
  withLegend = false,
}: {
  slices: DonutSlice[];
  innerRadius?: number;
  outerRadius?: number;
  withLegend?: boolean;
}) {
  return (
    <PieChart>
      <Pie
        data={slices}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        paddingAngle={2}
        isAnimationActive
      >
        {slices.map((s, i) => (
          <Cell key={i} fill={s.color} stroke="#fff" strokeWidth={2} />
        ))}
      </Pie>
      <Tooltip
        content={({ active, payload }) =>
          active && payload?.[0] ? (
            <ChartTooltipBox>
              <p className="font-semibold">{String((payload[0].payload as DonutSlice).name)}</p>
              <p className="text-gray-700">{formatCurrency(Number((payload[0].payload as DonutSlice).value))}</p>
              <p className="text-gray-500">{formatPct(Number((payload[0].payload as DonutSlice).pct))} of total</p>
            </ChartTooltipBox>
          ) : null
        }
      />
      {withLegend ? <Legend /> : null}
    </PieChart>
  );
}

export function CurrencyDonut({
  slices,
  fxNote,
  title = "Revenue by currency",
}: {
  slices: DonutSlice[];
  fxNote?: string;
  title?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-1 text-sm font-semibold text-gray-500">{title}</h3>
      <ResponsiveContainer width="100%" height={260}>
        <MixPie slices={slices} innerRadius={58} outerRadius={88} withLegend />
      </ResponsiveContainer>
      {fxNote && <p className="mt-1 text-center text-xs text-gray-500">{fxNote}</p>}
    </div>
  );
}

/** Recruitment overview: perm vs contract mix for selected month vs prior month (side by side). */
export function RecruitmentNfiMixComparisonCard({
  slicesCurrent,
  slicesPrior,
  currentMonthLabel,
  priorMonthLabel,
  fxNote,
}: {
  slicesCurrent: DonutSlice[];
  slicesPrior: DonutSlice[] | null;
  currentMonthLabel: string;
  priorMonthLabel: string | null;
  fxNote?: string;
}) {
  const compare = Boolean(slicesPrior);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-1 text-sm font-semibold text-gray-500">NFI mix: perm vs contract</h3>
      {compare ? (
        <>
          <div className="mt-2 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
            <div className="min-w-0">
              <p className="mb-1 text-center text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Prior · {priorMonthLabel?.trim() ? priorMonthLabel : "Previous"}
              </p>
              <div className="w-full min-w-0">
                <ResponsiveContainer width="100%" height={220}>
                  <MixPie slices={slicesPrior!} innerRadius={46} outerRadius={72} />
                </ResponsiveContainer>
              </div>
            </div>
            <div className="min-w-0">
              <p className="mb-1 text-center text-[11px] font-semibold uppercase tracking-wide text-gray-700">
                Selected · {currentMonthLabel}
              </p>
              <div className="w-full min-w-0">
                <ResponsiveContainer width="100%" height={220}>
                  <MixPie slices={slicesCurrent} innerRadius={46} outerRadius={72} />
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 border-t border-gray-100 pt-3 text-xs text-gray-600">
            {slicesCurrent.map((s) => (
              <li key={s.name} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-sm ring-1 ring-gray-200/80" style={{ backgroundColor: s.color }} />
                {s.name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <MixPie slices={slicesCurrent} innerRadius={58} outerRadius={88} withLegend />
        </ResponsiveContainer>
      )}
      {fxNote && <p className="mt-2 text-center text-xs text-gray-500">{fxNote}</p>}
    </div>
  );
}

export type SeatRevPoint = { label: string; perSeatDay: number };

function fmtSeatDayGbp(n: number) {
  return `£${n.toFixed(2)}`;
}

/** Barbershop-style: total monthly revenue ÷ working days ÷ chair count (all GBP). */
export function RevenuePerChairDayChart({
  data,
  seatCount,
  footnote,
}: {
  data: SeatRevPoint[];
  seatCount: number;
  footnote?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-1 text-sm font-semibold text-gray-500">Revenue per chair per day</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10 }}
            stroke="#6b7280"
            interval="preserveStartEnd"
            minTickGap={36}
          />
          <YAxis
            tickFormatter={(v) => formatCurrency(Math.round(Number(v)))}
            tick={{ fontSize: 10 }}
            stroke="#6b7280"
            width={44}
          />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.[0] ? (
                <ChartTooltipBox>
                  <p className="font-semibold text-gray-900">{label}</p>
                  <p className="text-red-600">{fmtSeatDayGbp(Number(payload[0].value))}</p>
                  <p className="text-xs text-gray-500">Per chair, ex-VAT · {seatCount} chairs in model</p>
                </ChartTooltipBox>
              ) : null
            }
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="perSeatDay"
            name="£ / chair / day"
            stroke="#dc2626"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#ffffff", strokeWidth: 2, stroke: "#dc2626" }}
            activeDot={{ r: 5, strokeWidth: 2, stroke: "#ffffff", fill: "#dc2626" }}
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
      {footnote ? (
        <p className="mt-1 text-center text-xs text-gray-500">{footnote}</p>
      ) : (
        <p className="mt-1 text-center text-xs text-gray-500">
          All revenue in GBP. Based on model working days and {seatCount} chairs (incl. owner chair).
        </p>
      )}
    </div>
  );
}

/** Chair layout for the barbershop model (1 owner + renters on remaining chairs). */
export function BarbershopChairsCapacityCard({ totalChairs }: { totalChairs: number }) {
  const ownerChairs = 1;
  const renterChairs = Math.max(0, totalChairs - ownerChairs);
  const t = totalChairs > 0 ? totalChairs : 1;
  const ownerPct = (ownerChairs / t) * 100;
  const renterPct = (renterChairs / t) * 100;
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h3 className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-500">Floor & chair economics</h3>
      <p className="mb-4 text-xs leading-snug text-gray-500">
        How trading capacity splits between the owner and fee-paying renters (shop P&amp;L model).
      </p>
      <div className="space-y-3.5">
        <div>
          <div className="mb-1 flex justify-between gap-3 text-sm font-medium text-gray-800">
            <span className="min-w-0 leading-snug">Owner chair · cuts &amp; colour (direct sales)</span>
            <span className="shrink-0 tabular-nums">{ownerChairs}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-red-600 transition-all" style={{ width: `${ownerPct}%` }} />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between gap-3 text-sm font-medium text-gray-800">
            <span className="min-w-0 leading-snug">Rented chairs · weekly chair fee (independents)</span>
            <span className="shrink-0 tabular-nums">{renterChairs}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-red-200 transition-all" style={{ width: `${renterPct}%` }} />
          </div>
        </div>
        <p className="border-t border-gray-100 pt-3 text-xs leading-relaxed text-gray-500">
          Independents pay a fixed weekly fee per chair; the owner&apos;s chair drives service takings (ex-VAT).{" "}
          <span className="font-medium text-gray-600">{totalChairs} chairs</span> in this demo model.
        </p>
      </div>
    </div>
  );
}

/** SaaS overview companion: subscriber base vs new logos (uses chart accent when branded e.g. Glox). */
export function SaasSubscriberMixCard({
  periodSuffix,
  totalCustomers,
  newInMonth,
  churnedInMonth,
}: {
  periodSuffix?: string;
  totalCustomers: number;
  newInMonth: number;
  churnedInMonth: number;
}) {
  const pal = useChartAccent();
  const branded = isBrandedChartPalette(pal);
  const estimatedCarryBase = Math.max(0, totalCustomers - newInMonth);
  const t = Math.max(1, totalCustomers);
  const carryPct = (estimatedCarryBase / t) * 100;
  const newPct = (newInMonth / t) * 100;
  const primaryBar = branded ? pal.trendSparkline : "#4f46e5";
  const secondaryBar = branded ? pal.customersAreaFill : "#a5b4fc";

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h3 className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-500">
        Subscriber mix{periodSuffix ? ` (${periodSuffix})` : ""}
      </h3>
      <p className="mb-4 text-xs leading-snug text-gray-500">
        Estimated carry-forward base vs new logos; ties to MRR movement in the demo model.
      </p>
      <div className="space-y-3.5">
        <div>
          <div className="mb-1 flex justify-between gap-3 text-sm font-medium text-gray-800">
            <span className="min-w-0 leading-snug">Est. continuing subscribers (excl. new this month)</span>
            <span className="shrink-0 tabular-nums">{formatNumber(estimatedCarryBase)}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full transition-all" style={{ width: `${carryPct}%`, backgroundColor: primaryBar }} />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between gap-3 text-sm font-medium text-gray-800">
            <span className="min-w-0 leading-snug">New customers (month)</span>
            <span className="shrink-0 tabular-nums">{formatNumber(newInMonth)}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full transition-all" style={{ width: `${newPct}%`, backgroundColor: secondaryBar }} />
          </div>
        </div>
        <p className="border-t border-gray-100 pt-3 text-xs leading-relaxed text-gray-500">
          <span className="font-medium text-gray-600">{formatNumber(totalCustomers)} active</span> at period end · churned{" "}
          <span className="tabular-nums">{formatNumber(churnedInMonth)}</span> this month (demo).
        </p>
      </div>
    </div>
  );
}

export type CostsMixLayout = "split" | "stacked" | "bars";

/** Barbershop opex lines: keys align with `ShopOperatingCostsSeries` and trend row objects. */
const BARBERSHOP_OPEX_CHART_LINES: { dataKey: keyof ShopOperatingCostsSeries; name: string; color: string }[] = [
  { dataKey: "rentRates", name: "Rent & business rates", color: "#7f1d1d" },
  { dataKey: "utilities", name: "Utilities", color: "#b91c1c" },
  { dataKey: "consumables", name: "Consumables", color: "#dc2626" },
  { dataKey: "insurance", name: "Insurance", color: "#e11d48" },
  { dataKey: "cleaning", name: "Cleaning & sundries", color: "#f43f5e" },
  { dataKey: "marketing", name: "Marketing", color: "#fb7185" },
  { dataKey: "professionalAndBank", name: "Accountancy & bank", color: "#fda4af" },
];

export type BarbershopOpexTrendRow = {
  label: string;
  rentRates: number;
  utilities: number;
  consumables: number;
  insurance: number;
  cleaning: number;
  marketing: number;
  professionalAndBank: number;
};

export function buildBarbershopOpexTrendRows(
  c: ShopOperatingCostsSeries,
  months: string[],
  start: number,
  end: number,
): BarbershopOpexTrendRow[] {
  const out: BarbershopOpexTrendRow[] = [];
  for (let i = start; i <= end; i++) {
    out.push({
      label: months[i] ?? "",
      rentRates: c.rentRates[i] ?? 0,
      utilities: c.utilities[i] ?? 0,
      consumables: c.consumables[i] ?? 0,
      insurance: c.insurance[i] ?? 0,
      cleaning: c.cleaning[i] ?? 0,
      marketing: c.marketing[i] ?? 0,
      professionalAndBank: c.professionalAndBank[i] ?? 0,
    });
  }
  return out;
}

/**
 * Istanbul Barbers only: donut + as-of breakdown on the left; multi-line chart of each opex line
 * over the visible window on the right (reduces empty space vs stacked donut-on-top).
 */
export function BarbershopOperatingCostMixPanel({
  title,
  periodSuffix,
  slices,
  trendData,
}: {
  title: string;
  periodSuffix?: string;
  slices: DonutSlice[];
  trendData: BarbershopOpexTrendRow[];
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <CostsMixHeader title={title} periodSuffix={periodSuffix} />
      <p className="mb-4 text-xs leading-snug text-gray-500">
        Mix for the month in the header; trend lines use the same colours (last 12 months in view).
      </p>
      <div className="space-y-5">
        <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,210px)_minmax(0,1fr)] lg:items-start lg:gap-7">
          <div className="mx-auto w-full max-w-[200px] shrink-0 lg:mx-0">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={slices}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={2}
                  isAnimationActive
                >
                  {slices.map((s, i) => (
                    <Cell key={i} fill={s.color} stroke="#fff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.[0] ? (
                      <ChartTooltipBox>
                        <p className="font-semibold">{String(payload[0].name)}</p>
                        <p className="text-gray-700">{formatPct(Number((payload[0].payload as DonutSlice).pct))}</p>
                        <p className="text-gray-600">{formatCurrency(Number(payload[0].value))}</p>
                      </ChartTooltipBox>
                    ) : null
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="min-w-0">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Month-by-month (£)
            </p>
            <div className="h-[300px] w-full min-h-[240px] min-w-0 sm:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 4, right: 8, left: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 9 }}
                    stroke="#9ca3af"
                    interval="preserveStartEnd"
                    minTickGap={28}
                    angle={-35}
                    textAnchor="end"
                    height={52}
                  />
                  <YAxis tickFormatter={(v) => formatK(Number(v))} tick={{ fontSize: 10 }} stroke="#9ca3af" width={44} />
                  <Tooltip
                    content={({ active, payload, label }) =>
                      active && payload?.length ? (
                        <ChartTooltipBox>
                          <p className="font-semibold text-gray-900">{label}</p>
                          <ul className="mt-1 max-h-48 space-y-0.5 overflow-y-auto text-xs">
                            {payload
                              .filter((p) => Number(p.value) > 0)
                              .sort((a, b) => Number(b.value) - Number(a.value))
                              .map((p) => (
                                <li key={String(p.dataKey)} className="flex justify-between gap-4 tabular-nums">
                                  <span className="text-gray-600">{p.name}</span>
                                  <span className="font-medium text-gray-900">{formatCurrency(Number(p.value))}</span>
                                </li>
                              ))}
                          </ul>
                        </ChartTooltipBox>
                      ) : null
                    }
                  />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 8 }} iconType="line" />
                  {BARBERSHOP_OPEX_CHART_LINES.map(({ dataKey, name, color }) => (
                    <Line
                      key={dataKey}
                      type="monotone"
                      dataKey={dataKey}
                      name={name}
                      stroke={color}
                      strokeWidth={1.75}
                      dot={false}
                      isAnimationActive
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {slices.map((s) => (
            <div key={s.name} className="flex items-start gap-2.5 rounded-md border border-gray-100 bg-gray-50/50 px-3 py-2.5">
              <span
                className="mt-[0.35rem] h-2.5 w-2.5 shrink-0 rounded-full shadow-sm ring-2 ring-white"
                style={{ backgroundColor: s.color }}
                aria-hidden
              />
              <span className="min-w-0 flex-1 text-[13px] leading-relaxed text-gray-700">{s.name}</span>
              <span className="shrink-0 text-right text-[12px] tabular-nums tracking-tight text-gray-700">
                <span className="font-semibold text-gray-900">{formatPct(s.pct)}</span>
                <span className="mx-1 text-gray-300" aria-hidden>
                  ·
                </span>
                <span className="font-medium text-gray-600">{formatCurrency(s.value)}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CostsMixHeader({
  title,
  periodSuffix,
}: {
  title: string;
  periodSuffix?: string;
}) {
  return (
    <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.08em] text-gray-600">
      <span className="block leading-tight">{title}</span>
      {periodSuffix ? (
        <span className="mt-1.5 block text-[11px] font-semibold tracking-wide text-gray-500">
          ({periodSuffix.trim().toUpperCase()})
        </span>
      ) : null}
    </h3>
  );
}

function DonutFigure({ slices }: { slices: DonutSlice[] }) {
  return (
    <div className="mx-auto w-full max-w-[240px] xl:mx-0">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={slices}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={78}
            paddingAngle={2}
            isAnimationActive
          >
            {slices.map((s, i) => (
              <Cell key={i} fill={s.color} stroke="#fff" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) =>
              active && payload?.[0] ? (
                <ChartTooltipBox>
                  <p className="font-semibold">{String(payload[0].name)}</p>
                  <p className="text-gray-700">{formatPct(Number((payload[0].payload as DonutSlice).pct))}</p>
                  <p className="text-gray-600">{formatCurrency(Number(payload[0].value))}</p>
                </ChartTooltipBox>
              ) : null
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function CostsSliceList({ slices, className }: { slices: DonutSlice[]; className?: string }) {
  return (
    <ul
      className={`min-w-0 list-none overflow-hidden rounded-lg border border-gray-100/80 bg-gray-50/40 ${className ?? ""}`}
    >
      {slices.map((s) => (
        <li
          key={s.name}
          className="flex items-start gap-3 border-b border-gray-100/90 px-3 py-3.5 last:border-b-0 sm:gap-4 sm:px-4 sm:py-4"
        >
          <span
            className="mt-[0.35rem] h-2.5 w-2.5 shrink-0 rounded-full shadow-sm ring-2 ring-white"
            style={{ backgroundColor: s.color }}
            aria-hidden
          />
          <span className="min-w-0 flex-1 text-[13px] leading-relaxed text-gray-700">{s.name}</span>
          <span className="shrink-0 self-start pt-[0.2rem] text-right text-[13px] tabular-nums tracking-tight text-gray-700 sm:min-w-[9.5rem]">
            <span className="font-semibold text-gray-900">{formatPct(s.pct)}</span>
            <span className="mx-1.5 font-normal text-gray-300" aria-hidden>
              ·
            </span>
            <span className="font-medium text-gray-600">{formatCurrency(s.value)}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CostsDonut({
  title,
  periodSuffix,
  slices,
  layout = "split",
}: {
  title: string;
  /** e.g. month label shown as “(DEC 25)” under the title */
  periodSuffix?: string;
  slices: DonutSlice[];
  /**
   * `split` — donut + side list (recruitment-style).
   * `stacked` — donut centred, full-width breakdown below (barbershop).
   * `bars` — horizontal bar rows only, no donut (SaaS).
   */
  layout?: CostsMixLayout;
}) {
  if (layout === "bars") {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <CostsMixHeader title={title} periodSuffix={periodSuffix} />
        <div className="space-y-4">
          {slices.map((s) => (
            <div key={s.name} className="min-w-0">
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 text-sm">
                <span className="min-w-0 font-medium leading-snug text-gray-800">{s.name}</span>
                <span className="shrink-0 tabular-nums text-[13px] text-gray-600">
                  <span className="font-semibold text-gray-900">{formatPct(s.pct)}</span>
                  <span className="mx-1.5 text-gray-300" aria-hidden>
                    ·
                  </span>
                  <span>{formatCurrency(s.value)}</span>
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full min-w-0 rounded-full transition-[width] duration-500 ease-out"
                  style={{ width: `${Math.min(100, Math.max(0, s.pct))}%`, backgroundColor: s.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (layout === "stacked") {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <CostsMixHeader title={title} periodSuffix={periodSuffix} />
        <div className="flex flex-col gap-8">
          <div className="mx-auto w-full max-w-[260px] shrink-0">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={slices}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={56}
                  outerRadius={88}
                  paddingAngle={2}
                  isAnimationActive
                >
                  {slices.map((s, i) => (
                    <Cell key={i} fill={s.color} stroke="#fff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.[0] ? (
                      <ChartTooltipBox>
                        <p className="font-semibold">{String(payload[0].name)}</p>
                        <p className="text-gray-700">{formatPct(Number((payload[0].payload as DonutSlice).pct))}</p>
                        <p className="text-gray-600">{formatCurrency(Number(payload[0].value))}</p>
                      </ChartTooltipBox>
                    ) : null
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <CostsSliceList slices={slices} />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <CostsMixHeader title={title} periodSuffix={periodSuffix} />
      {/*
        Stack chart + legend until xl: in a 2-col dashboard each card is only ~half width at lg,
        so a side-by-side legend overlaps labels with figures. xl+ has enough room for donut + list.
      */}
      <div className="grid min-w-0 grid-cols-1 gap-8 xl:grid-cols-[minmax(0,200px)_minmax(0,1fr)] xl:items-start xl:gap-10">
        <DonutFigure slices={slices} />
        <CostsSliceList slices={slices} />
      </div>
    </div>
  );
}

/** Agency overview companion to cost mix — placements split + pipeline KPIs (recruitment demo). */
export function RecruitmentPipelineCard({
  periodSuffix,
  permPlacements,
  contractPlacements,
  interviewsConducted,
  placementConversionRate,
  avgTimeToFillDays,
  permBarColor = "#2563eb",
  contractBarColor = "#7dd3fc",
}: {
  periodSuffix: string;
  permPlacements: number;
  contractPlacements: number;
  interviewsConducted: number;
  placementConversionRate: number;
  avgTimeToFillDays: number;
  /** Progress bar fill for perm placements (defaults to brand blue). */
  permBarColor?: string;
  /** Progress bar fill for contract placements (lighter blue). */
  contractBarColor?: string;
}) {
  const placementTotal = permPlacements + contractPlacements;
  const permPct = placementTotal ? (permPlacements / placementTotal) * 100 : 0;
  const contractPct = placementTotal ? (contractPlacements / placementTotal) * 100 : 0;
  const conversionPct = placementConversionRate * 100;

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-500">
        Placements & pipeline{periodSuffix ? ` (${periodSuffix})` : ""}
      </h3>
      <p className="mb-4 text-xs text-gray-500">Perm vs contract starts · interview funnel (model)</p>
      <div className="space-y-4">
        <div>
          <div className="mb-1 flex justify-between text-sm font-medium text-gray-800">
            <span>Perm placements</span>
            <span>{formatNumber(permPlacements)}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full transition-all" style={{ width: `${permPct}%`, backgroundColor: permBarColor }} />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-sm font-medium text-gray-800">
            <span>Contract / temp placements</span>
            <span>{formatNumber(contractPlacements)}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full transition-all" style={{ width: `${contractPct}%`, backgroundColor: contractBarColor }} />
          </div>
        </div>
        <div className="border-t border-gray-100 pt-3">
          <p className="text-xs font-semibold uppercase text-gray-500">Pipeline & speed</p>
          <dl className="mt-2 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between gap-4">
              <dt className="text-gray-600">Interviews conducted</dt>
              <dd className="tabular-nums font-semibold text-gray-900">{formatNumber(interviewsConducted)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-600">Placement conversion</dt>
              <dd className="tabular-nums font-semibold text-gray-900">{formatPct(conversionPct)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-600">Avg. time to fill</dt>
              <dd className="tabular-nums font-semibold text-gray-900">
                {avgTimeToFillDays > 0 ? `${formatNumber(avgTimeToFillDays)} days` : "—"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

/** Build stacked rows that sum to each month’s MRR (demo composition). */
export function buildRevenueStackRows(
  mrr: number[],
  customers: number[],
  churned: number[],
  months: string[],
  start: number,
  end: number,
): StackRevRow[] {
  const out: StackRevRow[] = [];
  for (let i = start; i <= end; i++) {
    const arpu = customers[i] > 0 ? mrr[i] / customers[i] : 0;
    const prevM = i > 0 ? mrr[i - 1] : mrr[i];
    const prevCust = i > 0 ? customers[i - 1] : customers[i];
    const arpuPrev = prevCust > 0 ? prevM / prevCust : arpu;
    let churnMrr = Math.min(prevM * 0.35, churned[i] * arpuPrev);
    let newMrr = Math.max(0, mrr[i] - prevM + churnMrr * 0.6);
    let baseMrr = Math.max(0, mrr[i] - newMrr - churnMrr);
    const sum = baseMrr + newMrr + churnMrr;
    if (sum > 0 && Math.abs(sum - mrr[i]) > 1) {
      const k = mrr[i] / sum;
      baseMrr *= k;
      newMrr *= k;
      churnMrr *= k;
    }
    out.push({ label: months[i], baseMrr, newMrr, churnMrr });
  }
  return out;
}

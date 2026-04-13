"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency, formatK, formatPct } from "@/lib/finance-demo/formatters";
import { useChartAccent } from "./ChartAccentContext";
import { isBrandedChartPalette } from "./chartPalettes";
import { ChartTooltipBox } from "./ChartTooltipBox";

type Row = Record<string, string | number | undefined>;

const cashTickStroke = { fontSize: 11, fill: "#64748b" };
const cashLegendStyle = { color: "#475569", fontSize: 12, paddingTop: 8 };

/** Every `step` months plus final label — shared by cash charts for consistent X ticks. */
function cashMonthTicks(data: Row[], step = 4): string[] {
  const labels = data.map((r) => String(r.label));
  if (!labels.length) return [];
  const picks: string[] = [];
  for (let i = 0; i < labels.length; i += step) picks.push(labels[i]!);
  if (picks[picks.length - 1] !== labels[labels.length - 1]) picks.push(labels[labels.length - 1]!);
  return picks;
}

const legendLight = { color: "#374151", fontSize: 12 };
const legendDark = { color: "#d1d5db", fontSize: 12 };
const tickLight = { fontSize: 11, fill: "#6b7280" };
const tickDark = { fontSize: 11, fill: "#9ca3af" };
const axisStrokeLight = "#6b7280";
const axisStrokeDark = "#525252";
const gridLight = "#e5e7eb";
const gridDark = "#374151";

export function MrrArrChart({
  data,
  title = "Recurring revenue & annual run-rate",
  barName = "Monthly (avg in period)",
  lineName = "ARR (from avg)",
}: {
  data: Row[];
  title?: string;
  barName?: string;
  lineName?: string;
}) {
  const pal = useChartAccent();
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-gray-500">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="#6b7280" />
          <YAxis tickFormatter={(v) => formatK(Number(v))} tick={{ fontSize: 11 }} stroke="#6b7280" />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <ChartTooltipBox>
                  <p className="font-semibold text-gray-900">{label}</p>
                  {payload.map((p) => (
                    <p key={String(p.dataKey)} className="text-gray-700">
                      {p.name}: {typeof p.value === "number" ? formatCurrency(p.value) : p.value}
                    </p>
                  ))}
                </ChartTooltipBox>
              ) : null
            }
          />
          <Legend />
          <Bar dataKey="mrr" name={barName} fill={pal.mrrBar} radius={[4, 4, 0, 0]} isAnimationActive />
          <Line type="monotone" dataKey="arr" name={lineName} stroke={pal.arrLine} strokeWidth={2} dot={false} isAnimationActive />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CustomerGrowthChart({
  data,
  title = "Customers & new adds",
  totalName = "Total",
  newName = "New (in period)",
}: {
  data: Row[];
  title?: string;
  totalName?: string;
  newName?: string;
}) {
  const pal = useChartAccent();
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-gray-500">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="#6b7280" />
          <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <ChartTooltipBox>
                  <p className="font-semibold">{label}</p>
                  {payload.map((p) => (
                    <p key={String(p.dataKey)} className="text-gray-700">
                      {p.name}: {p.value}
                    </p>
                  ))}
                </ChartTooltipBox>
              ) : null
            }
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="customers"
            name={totalName}
            stroke={pal.customersAreaStroke}
            fill={pal.customersAreaFill}
            fillOpacity={0.25}
            isAnimationActive
          />
          <Line type="monotone" dataKey="newCustomers" name={newName} stroke={pal.arrLine} strokeWidth={2} strokeDasharray="4 4" dot={false} isAnimationActive />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Recruitment: interviews (bars) vs placements (line) — monthly window. */
export function AgencyInterviewsPlacementsChart({ data }: { data: Row[] }) {
  const pal = useChartAccent();
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-gray-500">Pipeline: interviews vs placements</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="#6b7280" />
          <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <ChartTooltipBox>
                  <p className="font-semibold text-gray-900">{label}</p>
                  {payload.map((p) => (
                    <p key={String(p.dataKey)} className="text-gray-700">
                      {p.name}: {p.value}
                    </p>
                  ))}
                </ChartTooltipBox>
              ) : null
            }
          />
          <Legend />
          <Bar dataKey="interviews" name="Interviews conducted" fill="#cbd5e1" radius={[4, 4, 0, 0]} isAnimationActive />
          <Line
            type="monotone"
            dataKey="placements"
            name="Total placements"
            stroke={pal.ratioLine}
            strokeWidth={2}
            dot={false}
            isAnimationActive
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Recruitment: EBITDA margin % from model (decimal series stored as ratio). */
export function AgencyEbitdaMarginChart({ data }: { data: Row[] }) {
  const pal = useChartAccent();
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-gray-500">EBITDA margin %</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="#6b7280" />
          <YAxis tickFormatter={(v) => formatPct(Number(v))} tick={{ fontSize: 11 }} stroke="#6b7280" domain={[0, "auto"]} />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.[0] ? (
                <ChartTooltipBox>
                  <p className="font-semibold text-gray-900">{label}</p>
                  <p className="text-gray-700">{formatPct(Number(payload[0].value))}</p>
                </ChartTooltipBox>
              ) : null
            }
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="marginPct"
            name="EBITDA margin"
            stroke={pal.ratioLine}
            strokeWidth={2}
            dot={false}
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RevenueExpenseChart({ data, variant = "light" }: { data: Row[]; variant?: "light" | "dark" }) {
  const pal = useChartAccent();
  const dark = variant === "dark";
  return (
    <div
      className={
        dark
          ? "rounded-xl border border-neutral-700 bg-[#0a0a0a] p-4 shadow-sm"
          : "rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
      }
    >
      <h3 className={`mb-3 text-sm font-semibold ${dark ? "text-white" : "text-gray-500"}`}>Revenue vs total costs</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={dark ? gridDark : gridLight} />
          <XAxis dataKey="label" tick={dark ? tickDark : tickLight} stroke={dark ? axisStrokeDark : axisStrokeLight} />
          <YAxis
            tickFormatter={(v) => formatK(Number(v))}
            tick={dark ? tickDark : tickLight}
            stroke={dark ? axisStrokeDark : axisStrokeLight}
          />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <ChartTooltipBox variant={dark ? "dark" : "light"}>
                  <p className={`font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{label}</p>
                  {payload.map((p) => (
                    <p key={String(p.dataKey)} className={dark ? "text-gray-300" : "text-gray-700"}>
                      {p.name}: {formatCurrency(Number(p.value))}
                    </p>
                  ))}
                  <p className={`mt-1 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                    Gap:{" "}
                    {formatCurrency(
                      Number(payload.find((p) => p.dataKey === "revenue")?.value ?? 0) -
                        Number(payload.find((p) => p.dataKey === "totalCosts")?.value ?? 0),
                    )}
                  </p>
                </ChartTooltipBox>
              ) : null
            }
          />
          <Legend wrapperStyle={dark ? legendDark : legendLight} />
          <Bar dataKey="revenue" name="Revenue" fill={pal.revenueBar} radius={[4, 4, 0, 0]} isAnimationActive />
          <Bar dataKey="totalCosts" name="Total costs" fill={dark ? "#d1d5db" : pal.totalCostsBar} radius={[4, 4, 0, 0]} isAnimationActive />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function GrossMarginChart({ data, variant = "light" }: { data: Row[]; variant?: "light" | "dark" }) {
  const pal = useChartAccent();
  const dark = variant === "dark";
  const vals = data.length ? data.map((d) => Number(d.grossMarginPct)) : [75];
  const lo = Math.max(0, Math.floor(Math.min(...vals, 60) - 5));
  const hi = Math.min(100, Math.ceil(Math.max(...vals, 80) + 5));
  return (
    <div
      className={
        dark
          ? "rounded-xl border border-neutral-700 bg-[#0a0a0a] p-4 shadow-sm"
          : "rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
      }
    >
      <h3 className={`mb-3 text-sm font-semibold ${dark ? "text-white" : "text-gray-500"}`}>Gross margin %</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={dark ? gridDark : gridLight} />
          <XAxis dataKey="label" tick={dark ? tickDark : tickLight} stroke={dark ? axisStrokeDark : axisStrokeLight} />
          <YAxis
            domain={[lo, hi]}
            tickFormatter={(v) => `${v}%`}
            tick={dark ? tickDark : tickLight}
            stroke={dark ? axisStrokeDark : axisStrokeLight}
          />
          <ReferenceLine
            y={80}
            stroke={dark ? "#9ca3af" : "#0a0a0a"}
            strokeDasharray="4 4"
            label={{ value: "Target 80%", position: "right", fill: dark ? "#9ca3af" : "#6b7280", fontSize: 11 }}
          />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.[0] ? (
                <ChartTooltipBox variant={dark ? "dark" : "light"}>
                  <p className={`font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{label}</p>
                  <p className={dark ? "text-emerald-400" : pal.marginTooltipClass}>{formatPct(Number(payload[0].value))}</p>
                </ChartTooltipBox>
              ) : null
            }
          />
          <Legend wrapperStyle={dark ? legendDark : legendLight} />
          <Area
            type="monotone"
            dataKey="grossMarginPct"
            name="Gross margin"
            stroke={pal.marginStroke}
            fill={dark ? "#166534" : pal.marginFill}
            fillOpacity={dark ? 0.45 : pal.marginFillOpacity}
            isAnimationActive
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function EbitdaChart({ data, variant = "light" }: { data: Row[]; variant?: "light" | "dark" }) {
  const pal = useChartAccent();
  const dark = variant === "dark";
  return (
    <div
      className={
        dark
          ? "rounded-xl border border-neutral-700 bg-[#0a0a0a] p-4 shadow-sm"
          : "rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
      }
    >
      <h3 className={`mb-3 text-sm font-semibold ${dark ? "text-white" : "text-gray-500"}`}>EBITDA by period</h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={dark ? gridDark : gridLight} />
          <XAxis dataKey="label" tick={dark ? tickDark : tickLight} stroke={dark ? axisStrokeDark : axisStrokeLight} />
          <YAxis
            tickFormatter={(v) => formatK(Number(v))}
            tick={dark ? tickDark : tickLight}
            stroke={dark ? axisStrokeDark : axisStrokeLight}
          />
          <ReferenceLine y={0} stroke={dark ? "#6b7280" : "#9ca3af"} strokeDasharray="3 3" />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.[0] ? (
                <ChartTooltipBox variant={dark ? "dark" : "light"}>
                  <p className={`font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{label}</p>
                  <p
                    className={
                      Number(payload[0].value) < 0
                        ? "text-red-400"
                        : dark
                          ? "text-emerald-400"
                          : pal.ebitdaTooltipPositiveClass
                    }
                  >
                    {formatCurrency(Number(payload[0].value))}
                  </p>
                  <p className={dark ? "text-gray-400" : "text-gray-600"}>
                    Margin: {formatPct(Number(payload[0].payload?.ebitdaMargin ?? 0))}
                  </p>
                </ChartTooltipBox>
              ) : null
            }
          />
          <Legend wrapperStyle={dark ? legendDark : legendLight} />
          <Bar dataKey="ebitda" name="EBITDA" radius={[4, 4, 0, 0]} isAnimationActive>
            {data.map((entry, i) => (
              <Cell key={i} fill={Number((entry as Row).ebitda) < 0 ? "#ef4444" : pal.ebitdaPositive} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CashFlowComposedChart({ data }: { data: Row[] }) {
  const pal = useChartAccent();
  const xTicks = useMemo(() => cashMonthTicks(data, 4), [data]);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-gray-500">Cash in vs out & net movement</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: 4, bottom: 6 }} barGap={2} barCategoryGap="18%">
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="label"
            type="category"
            ticks={xTicks}
            tick={cashTickStroke}
            stroke="#94a3b8"
            tickLine={false}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <YAxis
            tickFormatter={(v) => formatK(Number(v))}
            tick={cashTickStroke}
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
            width={56}
          />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <ChartTooltipBox>
                  <p className="font-semibold text-gray-900">{label}</p>
                  {payload.map((p) => (
                    <p
                      key={String(p.dataKey)}
                      className={
                        String(p.dataKey) === "net"
                          ? Number(p.value) < 0
                            ? "text-rose-600"
                            : pal.cashNetPositiveClass
                          : "text-gray-700"
                      }
                    >
                      {p.name}: {formatCurrency(Number(p.value))}
                    </p>
                  ))}
                </ChartTooltipBox>
              ) : null
            }
          />
          <Legend wrapperStyle={cashLegendStyle} />
          <Bar
            dataKey="inflows"
            name="Cash in"
            fill={pal.cashIn}
            radius={[5, 5, 0, 0]}
            barSize={18}
            isAnimationActive
          />
          <Bar
            dataKey="outflows"
            name="Cash out"
            fill={pal.cashOut}
            radius={[5, 5, 0, 0]}
            barSize={18}
            isAnimationActive
          />
          <Line
            type="monotone"
            dataKey="net"
            name="Net movement"
            stroke={pal.cashNetLine}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff", fill: pal.cashNetLine }}
            isAnimationActive
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ClosingCashChart({ data }: { data: Row[] }) {
  const pal = useChartAccent();
  const xTicks = useMemo(() => cashMonthTicks(data, 4), [data]);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-gray-500">Closing cash balance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 4, bottom: 6 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="label"
            type="category"
            ticks={xTicks}
            tick={cashTickStroke}
            stroke="#94a3b8"
            tickLine={false}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <YAxis
            tickFormatter={(v) => formatK(Number(v))}
            tick={cashTickStroke}
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
            width={56}
          />
          <ReferenceLine y={0} stroke="#cbd5e1" strokeWidth={1} />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.[0] ? (
                <ChartTooltipBox>
                  <p className="font-semibold text-gray-900">{label}</p>
                  <p className={Number(payload[0].value) < 0 ? "text-rose-600" : pal.cashClosingPositiveClass}>
                    Closing: {formatCurrency(Number(payload[0].value))}
                  </p>
                </ChartTooltipBox>
              ) : null
            }
          />
          <Legend wrapperStyle={cashLegendStyle} />
          <Line
            type="monotone"
            dataKey="closing"
            name="Closing cash"
            stroke={pal.cashClosingLine}
            strokeWidth={2.75}
            dot={false}
            activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff", fill: pal.cashClosingLine }}
            legendType="plainline"
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LtvCacChart({ data }: { data: Row[] }) {
  const pal = useChartAccent();
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-gray-500">LTV vs CAC & ratio</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="#6b7280" />
          <YAxis yAxisId="left" tickFormatter={(v) => formatK(Number(v))} tick={{ fontSize: 11 }} stroke="#6b7280" />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#6b7280" />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <ChartTooltipBox>
                  <p className="font-semibold">{label}</p>
                  {payload.map((p) => (
                    <p key={String(p.dataKey)} className="text-gray-700">
                      {p.name}: {typeof p.value === "number" && p.dataKey === "ratio" ? `${p.value}x` : formatCurrency(Number(p.value))}
                    </p>
                  ))}
                </ChartTooltipBox>
              ) : null
            }
          />
          <Legend />
          <Bar yAxisId="left" dataKey="ltv" name="LTV" fill={pal.ltvBar} radius={[4, 4, 0, 0]} isAnimationActive />
          <Bar yAxisId="left" dataKey="cac" name="CAC" fill={pal.cacBar} radius={[4, 4, 0, 0]} isAnimationActive />
          <Line yAxisId="right" type="monotone" dataKey="ratio" name="LTV:CAC" stroke={pal.ratioLine} strokeDasharray="4 4" dot={false} isAnimationActive />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function NrrChurnChart({ data }: { data: Row[] }) {
  const pal = useChartAccent();
  const nrrVals = data.length ? data.map((d) => Number(d.nrr)) : [95];
  const churnVals = data.length ? data.map((d) => Number(d.churn)) : [5];
  const nrrLo = Math.max(70, Math.floor(Math.min(...nrrVals, 95) - 2));
  const nrrHi = Math.min(110, Math.ceil(Math.max(...nrrVals, 102) + 2));
  const churnHi = Math.max(15, Math.ceil(Math.max(...churnVals, 8) + 2));
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-gray-500">Retention & churn</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 8, right: 12, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="#6b7280" />
          <YAxis
            yAxisId="nrr"
            domain={[nrrLo, nrrHi]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 11 }}
            stroke="#6b7280"
          />
          <YAxis
            yAxisId="churn"
            orientation="right"
            domain={[0, churnHi]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 11 }}
            stroke="#6b7280"
          />
          <ReferenceLine
            yAxisId="nrr"
            y={100}
            stroke="#9ca3af"
            strokeDasharray="3 3"
            label={{ value: "100% NRR", fontSize: 10, fill: "#6b7280" }}
          />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <ChartTooltipBox>
                  <p className="font-semibold">{label}</p>
                  {payload.map((p) => (
                    <p key={String(p.dataKey)} className="text-gray-700">
                      {p.name}: {formatPct(Number(p.value))}
                    </p>
                  ))}
                </ChartTooltipBox>
              ) : null
            }
          />
          <Legend />
          <Line
            yAxisId="nrr"
            type="monotone"
            dataKey="nrr"
            name="NRR / retention index"
            stroke={isBrandedChartPalette(pal) ? pal.ratioLine : "#16a34a"}
            strokeWidth={2}
            dot={false}
            isAnimationActive
          />
          <Line
            yAxisId="churn"
            type="monotone"
            dataKey="churn"
            name="Churn %"
            stroke="#dc2626"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
            isAnimationActive
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

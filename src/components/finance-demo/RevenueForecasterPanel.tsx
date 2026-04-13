"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { FinanceDemoBundle } from "@/lib/finance-demo/model";
import { formatCompactGbp, formatCurrency, formatK, formatNumber, formatPct } from "@/lib/finance-demo/formatters";
import { ChartTooltipBox } from "./ChartTooltipBox";

type ScenarioKey = "base" | "bad" | "best";

export type ForecasterInputs = {
  marketingPerMonth: number;
  cac: number;
  ltv: number;
  churnMonthly: number;
  monthsForward: number;
};

function clampChurn(n: number) {
  return Math.min(0.5, Math.max(0, n));
}

function parseDigitsInt(raw: string): number | null {
  const digits = raw.replace(/,/g, "").replace(/[^\d]/g, "");
  if (digits === "") return null;
  const n = parseInt(digits, 10);
  return Number.isFinite(n) ? Math.min(Number.MAX_SAFE_INTEGER, n) : null;
}

/** Blurred: en-GB grouping (e.g. 60,000). Focused: plain digits for editing. */
function formatIntInputDisplay(n: number, focused: boolean): string {
  const r = Math.round(Number.isFinite(n) ? n : 0);
  if (focused) return String(r);
  return formatNumber(r);
}

function seedFromBundle(bundle: FinanceDemoBundle, asOf: number): ForecasterInputs {
  const cac = bundle.cac[asOf] ?? 1200;
  const ltv = bundle.ltv[asOf] ?? 5000;
  const churnPct = bundle.monthlyChurnPct[asOf] ?? 2;
  return {
    marketingPerMonth: 60_000,
    cac: Math.max(1, Math.round(cac)),
    ltv: Math.max(1, Math.round(ltv)),
    churnMonthly: clampChurn(churnPct / 100),
    monthsForward: 12,
  };
}

function templateFor(scenario: ScenarioKey, base: ForecasterInputs): ForecasterInputs {
  if (scenario === "base") return { ...base };
  if (scenario === "bad") {
    return {
      ...base,
      marketingPerMonth: Math.round(base.marketingPerMonth * 0.85),
      churnMonthly: clampChurn(base.churnMonthly * 1.45),
      monthsForward: base.monthsForward,
    };
  }
  return {
    ...base,
    marketingPerMonth: Math.round(base.marketingPerMonth * 1.15),
    churnMonthly: clampChurn(base.churnMonthly * 0.75),
    monthsForward: base.monthsForward,
  };
}

function runProjection(
  startMrr: number,
  startClients: number,
  inputs: ForecasterInputs,
): { label: string; revenue: number; clients: number; kind: "historical" | "forecast" }[] {
  const { marketingPerMonth, cac, churnMonthly, monthsForward } = inputs;
  const out: { label: string; revenue: number; clients: number; kind: "historical" | "forecast" }[] = [];
  let mrr = startMrr;
  let clients = Math.max(1, startClients);
  const safeCac = Math.max(1, cac);
  const churn = clampChurn(churnMonthly);

  for (let i = 1; i <= monthsForward; i++) {
    const arpu = clients > 0 ? mrr / clients : 0;
    const newClients = marketingPerMonth / safeCac;
    mrr = mrr * (1 - churn) + newClients * arpu;
    clients = clients * (1 - churn) + newClients;
    out.push({
      label: `F+${i}`,
      revenue: mrr,
      clients,
      kind: "forecast",
    });
  }
  return out;
}

const CLIENTS_TEAL = "#14b8a6";

export function RevenueForecasterPanel({
  bundle,
  asOfIndex,
  brandAccentHex,
}: {
  bundle: FinanceDemoBundle;
  asOfIndex: number;
  brandAccentHex?: string;
}) {
  const seed = useMemo(() => seedFromBundle(bundle, asOfIndex), [bundle, asOfIndex]);
  const [scenario, setScenario] = useState<ScenarioKey>("base");
  const [savedSlots, setSavedSlots] = useState<Partial<Record<ScenarioKey, ForecasterInputs>>>({});
  const [inputs, setInputs] = useState<ForecasterInputs>(() => seed);
  const [intFocus, setIntFocus] = useState<"marketing" | "cac" | "ltv" | null>(null);

  useEffect(() => {
    setInputs(seed);
    setSavedSlots({});
    setScenario("base");
  }, [seed]);

  const startMrr = bundle.mrr[asOfIndex] ?? 0;
  const startClients = Math.max(1, bundle.customers[asOfIndex] ?? 1);
  const startingMonthLabel = bundle.months[asOfIndex] ?? "—";

  const onScenarioChange = useCallback(
    (next: ScenarioKey) => {
      setScenario(next);
      const fromSlot = savedSlots[next];
      setInputs(fromSlot ?? templateFor(next, seed));
    },
    [savedSlots, seed],
  );

  const historical = useMemo(() => {
    const n = Math.min(6, asOfIndex + 1);
    const out: { label: string; revenue: number; clients: number; kind: "historical" | "forecast" }[] = [];
    for (let k = 0; k < n; k++) {
      const i = asOfIndex - (n - 1) + k;
      if (i < 0) continue;
      out.push({
        label: bundle.months[i] ?? `M${i}`,
        revenue: bundle.mrr[i] ?? 0,
        clients: bundle.customers[i] ?? 0,
        kind: "historical",
      });
    }
    return out;
  }, [asOfIndex, bundle.customers, bundle.months, bundle.mrr]);

  const forecast = useMemo(
    () => runProjection(startMrr, startClients, inputs),
    [startMrr, startClients, inputs],
  );

  const chartData = useMemo(() => [...historical, ...forecast], [historical, forecast]);

  const end = forecast[forecast.length - 1];
  const endingMrr = end?.revenue ?? startMrr;
  const endingClients = end?.clients ?? startClients;
  const projectedArr = endingMrr * 12;
  const ltvCac = inputs.cac > 0 ? inputs.ltv / inputs.cac : 0;

  const accent = brandAccentHex ?? "#7c3aed";
  const revenueStroke = brandAccentHex ?? "#7c3aed";

  const btnPrimary = {
    backgroundColor: accent,
    color: "#fff",
  } as const;

  const btnOutline = {
    borderColor: accent,
    color: accent,
  } as const;

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <p className="text-sm text-gray-600">
          Amend inputs, then save/load them as Base, Bad, or Best case. Choose how many months to forecast forward.
        </p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end">
          <label className="flex min-w-[160px] flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Scenario
            <select
              value={scenario}
              onChange={(e) => onScenarioChange(e.target.value as ScenarioKey)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm"
            >
              <option value="base">Base case</option>
              <option value="bad">Bad case</option>
              <option value="best">Best case</option>
            </select>
          </label>
          <label className="flex min-w-[120px] flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Months forward
            <input
              type="number"
              min={1}
              max={36}
              value={inputs.monthsForward}
              onChange={(e) =>
                setInputs((s) => ({ ...s, monthsForward: Math.min(36, Math.max(1, Number(e.target.value) || 1)) }))
              }
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-900 shadow-sm"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-opacity hover:opacity-90"
              style={btnPrimary}
              onClick={() => setSavedSlots((s) => ({ ...s, base: { ...inputs } }))}
            >
              Save to base
            </button>
            <button
              type="button"
              className="rounded-lg border-2 bg-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-gray-50"
              style={btnOutline}
              onClick={() => {
                const b = savedSlots.base;
                if (b) setInputs({ ...b });
              }}
            >
              Load base
            </button>
            <button
              type="button"
              className="rounded-lg border-2 bg-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-gray-50"
              style={btnOutline}
              onClick={() => setSavedSlots((s) => {
                const { base: _, ...rest } = s;
                return rest;
              })}
            >
              Clear base
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <label className="flex min-h-0 flex-col gap-1">
            <span className="flex min-h-10 items-end text-xs font-semibold leading-snug text-gray-700">
              Marketing spend / month
            </span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={formatIntInputDisplay(inputs.marketingPerMonth, intFocus === "marketing")}
              onFocus={() => setIntFocus("marketing")}
              onBlur={() => setIntFocus(null)}
              onChange={(e) => {
                const parsed = parseDigitsInt(e.target.value);
                setInputs((s) => ({
                  ...s,
                  marketingPerMonth: parsed === null ? 0 : Math.max(0, parsed),
                }));
              }}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-sm tabular-nums"
            />
            <span className="min-h-[2.75rem] text-xs leading-snug text-gray-500">
              Planned monthly acquisition budget.
            </span>
          </label>
          <label className="flex min-h-0 flex-col gap-1">
            <span
              className="flex min-h-10 items-end text-xs font-semibold leading-snug text-gray-700"
              title="Customer acquisition cost (CAC)"
            >
              Acquisition cost&nbsp;(CAC)
            </span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={formatIntInputDisplay(inputs.cac, intFocus === "cac")}
              onFocus={() => setIntFocus("cac")}
              onBlur={() => setIntFocus(null)}
              onChange={(e) => {
                const parsed = parseDigitsInt(e.target.value);
                setInputs((s) => ({
                  ...s,
                  cac: parsed === null ? 1 : Math.max(1, parsed),
                }));
              }}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-sm tabular-nums"
            />
            <span className="min-h-[2.75rem] text-xs leading-snug text-gray-500">
              Used with marketing spend to estimate customers acquired.
            </span>
          </label>
          <label className="flex min-h-0 flex-col gap-1">
            <span className="flex min-h-10 items-end text-xs font-semibold leading-snug text-gray-700">
              Lifetime value (LTV)
            </span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={formatIntInputDisplay(inputs.ltv, intFocus === "ltv")}
              onFocus={() => setIntFocus("ltv")}
              onBlur={() => setIntFocus(null)}
              onChange={(e) => {
                const parsed = parseDigitsInt(e.target.value);
                setInputs((s) => ({
                  ...s,
                  ltv: parsed === null ? 1 : Math.max(1, parsed),
                }));
              }}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-sm tabular-nums"
            />
            <span className="min-h-[2.75rem] text-xs leading-snug text-gray-500">
              Assumed customer lifetime value per acquired customer.
            </span>
          </label>
          <label className="flex min-h-0 flex-col gap-1">
            <span className="flex min-h-10 items-end text-xs font-semibold leading-snug text-gray-700">
              Churn / month
            </span>
            <input
              type="number"
              min={0}
              max={0.5}
              step={0.005}
              value={inputs.churnMonthly}
              onChange={(e) =>
                setInputs((s) => ({ ...s, churnMonthly: clampChurn(Number(e.target.value) || 0) }))
              }
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-sm"
            />
            <span className="min-h-[2.75rem] text-xs leading-snug text-gray-500">
              Share of revenue expected to be lost each month from cancellations or contraction.
            </span>
          </label>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">Historical + projected revenue</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-100 bg-gray-50/80 p-3">
            <p className="text-xs font-medium text-gray-500">Current revenue (starting base)</p>
            <p className="mt-1 text-lg font-bold tabular-nums text-gray-900">{formatCurrency(startMrr)}</p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-gray-50/80 p-3">
            <p className="text-xs font-medium text-gray-500">Forecast horizon</p>
            <p className="mt-1 text-lg font-bold tabular-nums text-gray-900">{inputs.monthsForward} months</p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-gray-50/80 p-3">
            <p className="text-xs font-medium text-gray-500">Starting month</p>
            <p className="mt-1 text-lg font-bold tabular-nums text-gray-900">{startingMonthLabel}</p>
          </div>
        </div>
        <div className="mt-6 h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 16, left: 4, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10 }}
                stroke="#6b7280"
                interval="preserveStartEnd"
                minTickGap={28}
                angle={-30}
                textAnchor="end"
                height={48}
              />
              <YAxis
                yAxisId="left"
                tickFormatter={(v) => formatK(Number(v))}
                tick={{ fontSize: 10 }}
                stroke="#6b7280"
                width={52}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(v) => formatNumber(Math.round(v))}
                tick={{ fontSize: 10 }}
                stroke="#6b7280"
                width={44}
              />
              <Tooltip
                content={({ active, payload, label }) =>
                  active && payload?.length ? (
                    <ChartTooltipBox>
                      <p className="font-semibold text-gray-900">{label}</p>
                      {payload.map((p) => (
                        <p key={String(p.dataKey)} className="text-sm text-gray-700">
                          {p.name}:{" "}
                          {p.dataKey === "revenue" ? formatCurrency(Number(p.value)) : formatNumber(Math.round(Number(p.value)))}
                        </p>
                      ))}
                    </ChartTooltipBox>
                  ) : null
                }
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name="Revenue (£)"
                stroke={revenueStroke}
                strokeWidth={2.5}
                dot={{ r: 2, fill: "#fff", strokeWidth: 2, stroke: revenueStroke }}
                activeDot={{ r: 4, stroke: "#fff", strokeWidth: 2, fill: revenueStroke }}
                isAnimationActive
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="clients"
                name="Clients"
                stroke={CLIENTS_TEAL}
                strokeWidth={2.5}
                dot={{ r: 2, fill: "#fff", strokeWidth: 2, stroke: CLIENTS_TEAL }}
                activeDot={{ r: 4, stroke: "#fff", strokeWidth: 2, fill: CLIENTS_TEAL }}
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">Projection summary</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-5">
          <SummaryStat label="Ending projected MRR" value={formatCurrency(endingMrr)} accent={accent} />
          <SummaryStat label="Projected ARR" value={formatCompactGbp(projectedArr)} accent={accent} />
          <SummaryStat label="Ending projected clients" value={formatNumber(Math.round(endingClients))} accent={accent} />
          <SummaryStat label="Churn input" value={formatPct(inputs.churnMonthly * 100)} accent={accent} />
          <SummaryStat label="LTV:CAC ratio" value={`${ltvCac.toFixed(2)}x`} accent={accent} />
        </div>
      </section>
    </div>
  );
}

function SummaryStat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div
      className="rounded-lg border border-gray-100 border-t-[3px] border-solid p-3"
      style={{ borderTopColor: accent }}
    >
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-base font-bold tabular-nums text-gray-900">{value}</p>
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { getBuckets, sumByIndices, type PeriodMode } from "@/lib/finance-demo/aggregate";
import type { FinanceDemoBundle } from "@/lib/finance-demo/model";
import { formatCurrency, formatPct } from "@/lib/finance-demo/formatters";
import {
  buildPlStatementRows,
  formatPlColumnHeader,
  weightedEbitdaMargin,
  weightedGrossMargin,
  type PlRow,
  type PlVariant,
} from "./plStatementModel";

function cellClass(n: number, isPct: boolean): string {
  if (isPct) return "text-gray-800";
  if (n < 0) return "text-red-600";
  return "text-gray-900";
}

function flattenIndices(buckets: { indices: number[] }[]): number[] {
  const s = new Set<number>();
  for (const b of buckets) {
    for (const i of b.indices) s.add(i);
  }
  return [...s].sort((a, b) => a - b);
}

export function PlStatementTable({
  bundle,
  period,
  asOfMonthIndex,
  variant,
  accentHex,
}: {
  bundle: FinanceDemoBundle;
  period: PeriodMode;
  asOfMonthIndex: number;
  variant: PlVariant;
  accentHex?: string;
}) {
  const { columnLabels, rows, flatIdx } = useMemo(() => {
    const buckets = getBuckets(bundle.months, period);
    const last = asOfMonthIndex;
    const endB = buckets.findIndex((b) => b.indices.includes(last));
    const endIdx = endB === -1 ? buckets.length - 1 : endB;
    const startIdx = Math.max(0, endIdx - 5);
    const visible = buckets.slice(startIdx, endIdx + 1);
    const columnLabels = visible.map((b) => formatPlColumnHeader(b.label));
    const rows = buildPlStatementRows(bundle, visible, variant);
    const flatIdx = flattenIndices(visible);
    return { columnLabels, rows, flatIdx };
  }, [bundle, period, asOfMonthIndex, variant]);

  const { sumRev, sumGp, sumEbitda } = useMemo(() => {
    return {
      sumRev: sumByIndices(bundle.revenue, flatIdx),
      sumGp: sumByIndices(bundle.grossProfit, flatIdx),
      sumEbitda: sumByIndices(bundle.ebitda, flatIdx),
    };
  }, [bundle, flatIdx]);

  const totalLabel =
    period === "monthly" ? "6M total" : period === "quarterly" ? "Period total" : "Total";

  const totalColBg = accentHex ? { backgroundColor: `${accentHex}12` } : { backgroundColor: "rgb(245 243 255)" };

  const renderRow = (row: PlRow, idx: number) => {
    if (row.kind === "section") {
      return (
        <tr key={`s-${idx}`} className="bg-gray-50">
          <th
            colSpan={columnLabels.length + 2}
            scope="colgroup"
            className="border-b border-gray-200 px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-gray-600"
          >
            {row.label}
          </th>
        </tr>
      );
    }

    if (row.kind === "percent") {
      const wGp = weightedGrossMargin(sumRev, sumGp);
      const wE = weightedEbitdaMargin(sumRev, sumEbitda);
      const totalVal = row.label.includes("Gross") ? wGp : wE;
      return (
        <tr key={`p-${idx}`} className="border-b border-gray-100">
          <th
            scope="row"
            className="sticky left-0 z-[1] whitespace-nowrap bg-white px-3 py-2.5 text-left text-sm text-gray-700 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.08)]"
          >
            {row.label}
          </th>
          {row.values.map((v, i) => (
            <td
              key={i}
              className={`px-3 py-2.5 text-right text-sm tabular-nums ${cellClass(v, true)}`}
            >
              {formatPct(v)}
            </td>
          ))}
          <td
            className="px-3 py-2.5 text-right text-sm font-semibold tabular-nums text-gray-900"
            style={totalColBg}
          >
            {formatPct(totalVal)}
          </td>
        </tr>
      );
    }

    const lineTotal = row.values.reduce((a, b) => a + b, 0);

    return (
      <tr key={`l-${idx}`} className="border-b border-gray-100">
        <th
          scope="row"
          className={`sticky left-0 z-[1] max-w-[min(100vw,14rem)] bg-white px-3 py-2.5 text-left text-sm leading-snug text-gray-800 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.08)] sm:max-w-none ${row.bold ? "font-bold" : "font-normal"}`}
        >
          {row.label}
        </th>
        {row.values.map((v, i) => (
          <td
            key={i}
            className={`whitespace-nowrap px-3 py-2.5 text-right text-sm tabular-nums ${row.bold ? "font-bold" : ""} ${cellClass(v, false)}`}
          >
            {formatCurrency(v)}
          </td>
        ))}
        <td
          className={`whitespace-nowrap px-3 py-2.5 text-right text-sm tabular-nums ${row.bold ? "font-bold" : ""} ${cellClass(lineTotal, false)}`}
          style={totalColBg}
        >
          {formatCurrency(lineTotal)}
        </td>
      </tr>
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th
                scope="col"
                className="sticky left-0 z-20 bg-gray-50 px-3 py-3 text-xs font-bold uppercase tracking-wide text-gray-600 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.08)]"
              >
                Line item
              </th>
              {columnLabels.map((lab) => (
                <th
                  key={lab}
                  scope="col"
                  className="whitespace-nowrap px-3 py-3 text-right text-xs font-bold uppercase tracking-wide text-gray-600"
                >
                  {lab}
                </th>
              ))}
              <th
                scope="col"
                className="whitespace-nowrap px-3 py-3 text-right text-xs font-bold uppercase tracking-wide text-gray-700"
                style={totalColBg}
              >
                {totalLabel}
              </th>
            </tr>
          </thead>
          <tbody>{rows.map((r, i) => renderRow(r, i))}</tbody>
        </table>
      </div>
      <p className="border-t border-gray-100 px-4 py-3 text-xs text-gray-500">
        Demo P&amp;L — line splits are illustrative where the model only stores subtotals. Figures follow your
        selected period (monthly / quarterly / annual) and &ldquo;As of&rdquo; month.
      </p>
    </div>
  );
}

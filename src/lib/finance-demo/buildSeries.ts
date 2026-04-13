import type { PeriodMode } from "./aggregate";
import { getBuckets, sumByIndices, weightedGrossMarginPct } from "./aggregate";
import type { FinanceDemoBundle } from "./model";

export type ChartRow = Record<string, string | number>;

export function buildAggregatedRows(bundle: FinanceDemoBundle, period: PeriodMode) {
  const buckets = getBuckets(bundle.months, period);
  const n = buckets.length;

  const mrrSeries = buckets.map((b) =>
    b.indices.length === 1
      ? bundle.mrr[b.indices[0]]
      : sumByIndices(bundle.mrr, b.indices) / b.indices.length,
  );

  const momFromMrr = mrrSeries.map((m, i) => (i === 0 ? 0 : ((m - mrrSeries[i - 1]) / mrrSeries[i - 1]) * 100));

  const overview: ChartRow[] = buckets.map((b, i) => ({
    label: b.label,
    mrr: mrrSeries[i],
    arr: mrrSeries[i] * 12,
    momGrowthPct: period === "monthly" ? bundle.momGrowthPct[b.indices[b.indices.length - 1]] : momFromMrr[i],
    customers: bundle.customers[b.indices[b.indices.length - 1]],
    newCustomers: sumByIndices(bundle.newCustomers, b.indices),
    churned: sumByIndices(bundle.churnedCustomers, b.indices),
  }));

  const pl: ChartRow[] = buckets.map((b) => {
    const rev = sumByIndices(bundle.revenue, b.indices);
    const cogs = sumByIndices(bundle.totalCogs, b.indices);
    const opex = sumByIndices(bundle.totalOpex, b.indices);
    const gp = sumByIndices(bundle.grossProfit, b.indices);
    const ebitda = sumByIndices(bundle.ebitda, b.indices);
    const margin = rev === 0 ? 0 : weightedGrossMarginPct(bundle.grossProfit, bundle.revenue, b.indices);
    return {
      label: b.label,
      revenue: rev,
      totalCosts: cogs + opex,
      grossMarginPct: margin,
      ebitda,
      ebitdaMargin: rev === 0 ? 0 : (ebitda / rev) * 100,
    };
  });

  const cash: ChartRow[] = buckets.map((b) => ({
    label: b.label,
    inflows: sumByIndices(bundle.cashInflows, b.indices),
    outflows: sumByIndices(bundle.cashOutflows, b.indices),
    net: sumByIndices(bundle.netCashMovement, b.indices),
    closing: bundle.closingCash[b.indices[b.indices.length - 1]],
  }));

  const kpi: ChartRow[] = buckets.map((b, i) => ({
    label: b.label,
    ltv: sumByIndices(bundle.ltv, b.indices) / b.indices.length,
    cac: sumByIndices(bundle.cac, b.indices) / b.indices.length,
    ratio: sumByIndices(bundle.ltvCacRatio, b.indices) / b.indices.length,
    nrr: sumByIndices(bundle.nrr, b.indices) / b.indices.length,
    churn: sumByIndices(bundle.monthlyChurnPct, b.indices) / b.indices.length,
  }));

  const last = bundle.months.length - 1;

  return {
    overview,
    pl,
    cash,
    kpi,
    lastIndex: last,
    bucketCount: n,
  };
}

/** UK main CT rate for the demo KPI (simplified: no marginal bands). */
const CT_MAIN_RATE = 0.25;

/**
 * Illustrative corporation tax for the selected month: 25% × operating profit (zero if loss-making).
 * Replaces cumulative “profitable months only” logic so the dashboard matches a simple headline rule.
 */
export function estimatedCorpTaxOnOperatingProfit(bundle: FinanceDemoBundle, monthIndex: number): number {
  const p = bundle.operatingProfit[monthIndex];
  if (p == null || Number.isNaN(p)) return 0;
  return Math.max(0, p) * CT_MAIN_RATE;
}

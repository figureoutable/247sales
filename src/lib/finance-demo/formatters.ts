export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

/** Y-axis style: £300.0k, £1,200.0k (en-GB grouping on the thousands figure). */
export const formatK = (n: number) => {
  if (Math.abs(n) < 1000) {
    return formatCurrency(Math.round(n));
  }
  const thousands = n / 1000;
  const body = new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(thousands);
  return `£${body}k`;
};

export const formatPct = (n: number) => `${n.toFixed(1)}%`;

export const formatNumber = (n: number) => new Intl.NumberFormat("en-GB").format(Math.round(n));

/** Compact £ for large KPIs (e.g. £1.22M, £391.6k). */
export function formatCompactGbp(n: number): string {
  const sign = n < 0 ? "-" : "";
  const v = Math.abs(n);
  if (v >= 1_000_000) return `${sign}£${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1000) return `${sign}£${(v / 1000).toFixed(v >= 100_000 ? 0 : 1)}k`;
  return `${sign}£${Math.round(v)}`;
}

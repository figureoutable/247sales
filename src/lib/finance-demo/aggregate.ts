export type PeriodMode = "monthly" | "quarterly" | "annual";

export type PeriodBucket = { label: string; indices: number[] };

/** "Jan 24" / "Jan 23" → full calendar year (labels use two-digit years). */
function calendarYearFromMonthLabel(monthLabel: string): number {
  const parts = monthLabel.trim().split(/\s+/);
  const yy = Number(parts[1]);
  return 2000 + yy;
}

export function getBuckets(months: string[], mode: PeriodMode): PeriodBucket[] {
  if (mode === "monthly") {
    return months.map((label, i) => ({ label, indices: [i] }));
  }
  if (mode === "quarterly") {
    const buckets: PeriodBucket[] = [];
    for (let start = 0; start < months.length; start += 3) {
      const indices = [start, start + 1, start + 2].filter((i) => i < months.length);
      const year = calendarYearFromMonthLabel(months[start] ?? "");
      const posInYear = start % 12;
      const q = Math.floor(posInYear / 3) + 1;
      buckets.push({ label: `Q${q} ${year}`, indices });
    }
    return buckets;
  }
  const yearToIndices = new Map<number, number[]>();
  for (let i = 0; i < months.length; i++) {
    const y = calendarYearFromMonthLabel(months[i] ?? "");
    if (!yearToIndices.has(y)) yearToIndices.set(y, []);
    yearToIndices.get(y)!.push(i);
  }
  return [...yearToIndices.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([year, indices]) => ({ label: String(year), indices }));
}

export function sumByIndices(values: number[], indices: number[]): number {
  return indices.reduce((s, i) => s + (values[i] ?? 0), 0);
}

export function avgByIndices(values: number[], indices: number[]): number {
  if (indices.length === 0) return 0;
  return sumByIndices(values, indices) / indices.length;
}

export function weightedGrossMarginPct(
  grossProfit: number[],
  revenue: number[],
  indices: number[],
): number {
  const gp = sumByIndices(grossProfit, indices);
  const rev = sumByIndices(revenue, indices);
  return rev === 0 ? 0 : (gp / rev) * 100;
}

export function mapBuckets<T>(buckets: PeriodBucket[], fn: (indices: number[]) => T): T[] {
  return buckets.map((b) => fn(b.indices));
}

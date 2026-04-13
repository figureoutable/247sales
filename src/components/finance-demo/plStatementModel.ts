import type { PeriodBucket } from "@/lib/finance-demo/aggregate";
import { sumByIndices } from "@/lib/finance-demo/aggregate";
import type { FinanceDemoBundle } from "@/lib/finance-demo/model";

export type PlRow =
  | { kind: "section"; label: string }
  | { kind: "line"; label: string; bold?: boolean; values: number[] }
  | { kind: "percent"; label: string; values: number[] };

function agg(arr: number[] | undefined, indices: number[]): number {
  if (!arr?.length) return 0;
  return sumByIndices(arr, indices);
}

/** "Jan 25" → "JAN-25" */
export function formatPlColumnHeader(label: string): string {
  const p = label.trim().split(/\s+/);
  if (p.length >= 2) {
    return `${p[0]!.toUpperCase()}-${p[1]!.toUpperCase()}`;
  }
  return label.toUpperCase();
}

export type PlVariant = "saas" | "barbershop" | "recruitment";

export function buildPlStatementRows(
  bundle: FinanceDemoBundle,
  visibleBuckets: PeriodBucket[],
  variant: PlVariant,
): PlRow[] {
  const idxList = visibleBuckets.map((b) => b.indices);

  const pick = (fn: (indices: number[]) => number) => idxList.map(fn);

  const revenue = pick((ix) => agg(bundle.revenue, ix));
  const totalCogs = pick((ix) => agg(bundle.totalCogs, ix));
  const grossProfit = pick((ix) => agg(bundle.grossProfit, ix));
  const totalOpex = pick((ix) => agg(bundle.totalOpex, ix));
  const ebitda = pick((ix) => agg(bundle.ebitda, ix));
  const operatingProfit = pick((ix) => agg(bundle.operatingProfit, ix));

  const grossMarginPct = pick((ix) => {
    const r = agg(bundle.revenue, ix);
    const gp = agg(bundle.grossProfit, ix);
    return r > 0 ? (gp / r) * 100 : 0;
  });

  const ebitdaMarginPct = pick((ix) => {
    const r = agg(bundle.revenue, ix);
    const e = agg(bundle.ebitda, ix);
    return r > 0 ? (e / r) * 100 : 0;
  });

  const rows: PlRow[] = [];

  if (variant === "saas") {
    rows.push({ kind: "section", label: "Revenue" });
    rows.push({
      kind: "line",
      label: "Subscription revenue (primary)",
      values: pick((ix) => agg(bundle.revenue, ix) * 0.58),
    });
    rows.push({
      kind: "line",
      label: "Subscription revenue (addons & upgrades)",
      values: pick((ix) => agg(bundle.revenue, ix) * 0.42),
    });
    rows.push({ kind: "line", label: "Total revenue", bold: true, values: revenue });

    rows.push({ kind: "section", label: "Cost of sales" });
    rows.push({
      kind: "line",
      label: "Payment processing & platform fees",
      values: pick((ix) => agg(bundle.totalCogs, ix) * 0.42),
    });
    rows.push({
      kind: "line",
      label: "Hosting & infrastructure",
      values: pick((ix) => agg(bundle.totalCogs, ix) * 0.58),
    });
    rows.push({ kind: "line", label: "Total cost of sales", bold: true, values: totalCogs });

    rows.push({ kind: "line", label: "Gross profit", bold: true, values: grossProfit });
    rows.push({ kind: "percent", label: "Gross margin %", values: grossMarginPct });

    rows.push({ kind: "section", label: "Operating expenses" });
    rows.push({
      kind: "line",
      label: "UK payroll (salary + NIC)",
      values: pick((ix) => agg(bundle.totalOpex, ix) * 0.48),
    });
    rows.push({
      kind: "line",
      label: "Overseas contractor costs",
      values: pick((ix) => agg(bundle.totalOpex, ix) * 0.22),
    });
    rows.push({
      kind: "line",
      label: "Software & infrastructure",
      values: pick((ix) => agg(bundle.totalOpex, ix) * 0.14),
    });
    rows.push({
      kind: "line",
      label: "Sales & marketing",
      values: pick((ix) => agg(bundle.totalOpex, ix) * 0.10),
    });
    rows.push({
      kind: "line",
      label: "General & administrative",
      values: pick((ix) => agg(bundle.totalOpex, ix) * 0.06),
    });
    rows.push({ kind: "line", label: "Total operating expenses", bold: true, values: totalOpex });

    rows.push({ kind: "line", label: "EBITDA", bold: true, values: ebitda });
    rows.push({ kind: "percent", label: "EBITDA margin %", values: ebitdaMarginPct });

    rows.push({ kind: "line", label: "Net profit / (loss)", bold: true, values: operatingProfit });
    return rows;
  }

  if (variant === "barbershop") {
    const own = bundle.ownerServiceRevenue;
    const chair = bundle.chairRentRevenue;
    const shop = bundle.shopOperatingCosts;

    rows.push({ kind: "section", label: "Revenue" });
    if (own?.length && chair?.length) {
      rows.push({ kind: "line", label: "Owner services (cuts & colour)", values: pick((ix) => agg(own, ix)) });
      rows.push({ kind: "line", label: "Chair rental (independents)", values: pick((ix) => agg(chair, ix)) });
    } else {
      rows.push({
        kind: "line",
        label: "Service & rental takings (split)",
        values: pick((ix) => agg(bundle.revenue, ix) * 0.62),
      });
      rows.push({
        kind: "line",
        label: "Other takings",
        values: pick((ix) => agg(bundle.revenue, ix) * 0.38),
      });
    }
    rows.push({ kind: "line", label: "Total revenue", bold: true, values: revenue });

    rows.push({ kind: "section", label: "Cost of sales" });
    if (shop?.consumables?.length) {
      const consRaw = pick((ix) => agg(shop.consumables, ix));
      const cons = consRaw.map((c, i) => Math.min(c, totalCogs[i] ?? 0));
      rows.push({ kind: "line", label: "Consumables (blades, colour, etc.)", values: cons });
      rows.push({
        kind: "line",
        label: "Other direct costs",
        values: totalCogs.map((t, i) => Math.max(0, t - (cons[i] ?? 0))),
      });
    } else {
      rows.push({
        kind: "line",
        label: "Direct costs",
        values: totalCogs,
      });
    }
    rows.push({ kind: "line", label: "Total cost of sales", bold: true, values: totalCogs });

    rows.push({ kind: "line", label: "Gross profit", bold: true, values: grossProfit });
    rows.push({ kind: "percent", label: "Gross margin %", values: grossMarginPct });

    rows.push({ kind: "section", label: "Operating expenses" });
    if (shop) {
      rows.push({ kind: "line", label: "Rent & business rates", values: pick((ix) => agg(shop.rentRates, ix)) });
      rows.push({ kind: "line", label: "Utilities", values: pick((ix) => agg(shop.utilities, ix)) });
      rows.push({ kind: "line", label: "Insurance", values: pick((ix) => agg(shop.insurance, ix)) });
      rows.push({ kind: "line", label: "Cleaning & sundries", values: pick((ix) => agg(shop.cleaning, ix)) });
      rows.push({ kind: "line", label: "Marketing", values: pick((ix) => agg(shop.marketing, ix)) });
      rows.push({
        kind: "line",
        label: "Accountancy & bank",
        values: pick((ix) => agg(shop.professionalAndBank, ix)),
      });
      rows.push({
        kind: "line",
        label: "Other shop opex",
        values: pick((ix) => {
          const t = agg(bundle.totalOpex, ix);
          const s =
            agg(shop.rentRates, ix) +
            agg(shop.utilities, ix) +
            agg(shop.insurance, ix) +
            agg(shop.cleaning, ix) +
            agg(shop.marketing, ix) +
            agg(shop.professionalAndBank, ix);
          return Math.max(0, t - s);
        }),
      });
    } else {
      rows.push({
        kind: "line",
        label: "Shop operating costs",
        values: totalOpex,
      });
    }
    rows.push({ kind: "line", label: "Total operating expenses", bold: true, values: totalOpex });

    rows.push({ kind: "line", label: "EBITDA", bold: true, values: ebitda });
    rows.push({ kind: "percent", label: "EBITDA margin %", values: ebitdaMarginPct });
    rows.push({ kind: "line", label: "Net profit / (loss)", bold: true, values: operatingProfit });
    return rows;
  }

  // recruitment
  const ra = bundle.recruitmentAgency;
  if (!ra) return [];
  const ox = ra.recruitmentOpex;

  rows.push({ kind: "section", label: "Net fee income" });
  rows.push({ kind: "line", label: "Permanent placement fees", values: pick((ix) => agg(ra.permFeeIncome, ix)) });
  rows.push({
    kind: "line",
    label: "Contract & temp margin",
    values: pick((ix) => agg(ra.contractMarginIncome, ix)),
  });
  rows.push({ kind: "line", label: "Total net fee income", bold: true, values: revenue });

  rows.push({ kind: "section", label: "Cost of delivery" });
  rows.push({
    kind: "line",
    label: "Staff (salaries, commission & NI)",
    values: pick((ix) => agg(bundle.totalCogs, ix)),
  });
  rows.push({ kind: "line", label: "Total cost of delivery", bold: true, values: totalCogs });

  rows.push({ kind: "line", label: "Gross profit", bold: true, values: grossProfit });
  rows.push({ kind: "percent", label: "Gross margin %", values: grossMarginPct });

  rows.push({ kind: "section", label: "Operating expenses" });
  rows.push({ kind: "line", label: "Office rent", values: pick((ix) => agg(ox.officeRent, ix)) });
  rows.push({
    kind: "line",
    label: "Job boards & advertising",
    values: pick((ix) => agg(ox.jobBoardsAdvertising, ix)),
  });
  rows.push({ kind: "line", label: "CRM & tech", values: pick((ix) => agg(ox.crmTech, ix)) });
  rows.push({ kind: "line", label: "BD & marketing", values: pick((ix) => agg(ox.bdMarketing, ix)) });
  rows.push({
    kind: "line",
    label: "Accountancy & compliance",
    values: pick((ix) => agg(ox.accountancyCompliance, ix)),
  });
  rows.push({ kind: "line", label: "Insurance", values: pick((ix) => agg(ox.insurance, ix)) });
  rows.push({ kind: "line", label: "Phone & comms", values: pick((ix) => agg(ox.phoneComms, ix)) });
  rows.push({ kind: "line", label: "Bank & misc", values: pick((ix) => agg(ox.bankMisc, ix)) });
  rows.push({ kind: "line", label: "Total operating expenses", bold: true, values: totalOpex });

  rows.push({ kind: "line", label: "EBITDA", bold: true, values: ebitda });
  rows.push({ kind: "percent", label: "EBITDA margin %", values: ebitdaMarginPct });
  rows.push({ kind: "line", label: "Net profit / (loss)", bold: true, values: operatingProfit });

  return rows;
}

/** Weighted margin for total column */
export function weightedGrossMargin(sumRev: number, sumGp: number): number {
  return sumRev > 0 ? (sumGp / sumRev) * 100 : 0;
}

export function weightedEbitdaMargin(sumRev: number, sumEbitda: number): number {
  return sumRev > 0 ? (sumEbitda / sumRev) * 100 : 0;
}

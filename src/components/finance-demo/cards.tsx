"use client";

import { differenceInDays, startOfDay } from "date-fns";
import { useEffect, useState, type CSSProperties } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
} from "recharts";
import { useChartAccent } from "./ChartAccentContext";
import { isBrandedChartPalette } from "./chartPalettes";
import { ChartTooltipBox } from "./ChartTooltipBox";

/** Matches overview KPI tiles: white card, muted label, bold value. */
export function DashboardStatCard({
  title,
  value,
  sub,
  subClassName = "text-gray-500",
  subStyle,
  trend,
}: {
  title: string;
  value: string;
  sub?: string;
  subClassName?: string;
  subStyle?: CSSProperties;
  trend?: number[];
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-w-0 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-transform duration-200 hover:scale-[1.01]">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</p>
      <p className="mt-2 break-words text-2xl font-bold tabular-nums tracking-tight text-gray-900 sm:text-3xl">{value}</p>
      {sub && (
        <p className={`mt-1 text-sm ${subClassName}`} style={subStyle}>
          {sub}
        </p>
      )}
      {mounted && trend && trend.length > 0 && <TrendSparkline values={trend} />}
    </div>
  );
}

function TrendSparkline({ values }: { values: number[] }) {
  const pal = useChartAccent();
  return (
    <div className="mt-3 h-12 min-h-[48px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={values.map((v, i) => ({ i, v }))} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <RTooltip
            content={({ active, payload }) =>
              active && payload?.[0] ? (
                <ChartTooltipBox>
                  <p className="font-medium tabular-nums">{Number(payload[0].value).toFixed(0)}</p>
                </ChartTooltipBox>
              ) : null
            }
          />
          <Line type="monotone" dataKey="v" stroke={pal.trendSparkline} strokeWidth={2} dot={false} isAnimationActive />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

type MetricCardProps = {
  title: string;
  value: string;
  subLabel: string;
  badge?: string;
};

export function MetricCard({ title, value, subLabel, badge }: MetricCardProps) {
  const pal = useChartAccent();
  const branded = isBrandedChartPalette(pal);
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-transform duration-200 hover:scale-[1.01]">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</p>
      <p className="mt-2 text-xl font-bold tabular-nums tracking-tight text-gray-900 sm:text-2xl">{value}</p>
      <p className="mt-1 text-sm text-gray-600">{subLabel}</p>
      {badge && (
        <span
          className={
            branded
              ? "mt-2 inline-block rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-900"
              : "mt-2 inline-block rounded-full bg-[#dcfce7] px-2 py-0.5 text-xs font-semibold text-[#14532d]"
          }
        >
          {badge}
        </span>
      )}
    </div>
  );
}

export function SectionHeader({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-semibold text-gray-500">{children}</h2>;
}

export type DeadlineRow = {
  id: string;
  label: string;
  sublabel?: string;
  date: Date;
};

/** Overview companion: VAT, accounts, corporation tax — sorted soonest first. */
export function NextDeadlinesCard({ items }: { items: DeadlineRow[] }) {
  const today = startOfDay(new Date());
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h3 className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-500">Next deadlines</h3>
      <p className="mb-4 text-xs leading-snug text-gray-500">
        Illustrative UK dates — confirm with your accountant.
      </p>
      <ul className="list-none space-y-0">
        {items.map((item) => {
          const d0 = startOfDay(item.date);
          const days = differenceInDays(d0, today);
          const urgency =
            days < 0 ? "text-red-600" : days <= 30 ? "text-amber-700" : "text-gray-600";
          const daysLabel =
            days < 0
              ? `${Math.abs(days)}d overdue`
              : days === 0
                ? "Due today"
                : `In ${days} day${days === 1 ? "" : "s"}`;

          return (
            <li
              key={item.id}
              className="flex flex-col gap-1 border-b border-gray-100 py-3.5 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                {item.sublabel ? (
                  <p className="mt-0.5 text-xs leading-snug text-gray-500">{item.sublabel}</p>
                ) : null}
              </div>
              <div className="flex shrink-0 flex-col items-start gap-0.5 sm:items-end">
                <p className="text-sm font-semibold tabular-nums text-gray-900">{fmt(item.date)}</p>
                <p className={`text-xs font-medium tabular-nums ${urgency}`}>{daysLabel}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

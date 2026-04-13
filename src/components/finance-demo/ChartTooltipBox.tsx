"use client";

import type { ReactNode } from "react";

type ChartTooltipBoxProps = {
  children: ReactNode;
  /** Use on dark chart cards (P&L overview-style). */
  variant?: "light" | "dark";
};

export function ChartTooltipBox({ children, variant = "light" }: ChartTooltipBoxProps) {
  return (
    <div
      className={
        variant === "dark"
          ? "rounded-lg border border-neutral-600 bg-neutral-900 p-3 text-sm text-gray-100 shadow-xl"
          : "rounded-lg border border-gray-200 bg-white p-3 text-sm shadow-md text-gray-900"
      }
      style={{ fontFamily: "var(--font-finance-inter), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}

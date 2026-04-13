"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ChartAccentPalette } from "./chartPalettes";
import { DEFAULT_PALETTE } from "./chartPalettes";

const ChartAccentContext = createContext<ChartAccentPalette>(DEFAULT_PALETTE);

export function ChartAccentProvider({
  palette,
  children,
}: {
  palette: ChartAccentPalette;
  children: ReactNode;
}) {
  return <ChartAccentContext.Provider value={palette}>{children}</ChartAccentContext.Provider>;
}

export function useChartAccent() {
  return useContext(ChartAccentContext);
}

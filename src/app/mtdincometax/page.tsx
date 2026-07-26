import type { Metadata } from "next";
import { MtdIncomeTaxPage } from "@/components/MtdIncomeTaxPage";

export const metadata: Metadata = {
  title: "Making Tax Digital for Income Tax",
  description:
    "Plain-English guide to Making Tax Digital for Income Tax (MTD IT) for sole traders and landlords. Check thresholds, timelines, and how Figures can help.",
};

export default function MtdIncomeTaxRoutePage() {
  return <MtdIncomeTaxPage />;
}

import type { Metadata } from "next";
import { AboutS0, AboutS1, AboutS2, AboutS3, AboutS4 } from "@/components/redesign/generated/About";

export const metadata: Metadata = {
  title: { absolute: "Joshua Lee, ICAS Chartered Accountant | Figures" },
  alternates: { canonical: "/about" },
  description:
    "Josh co-founded Figures in 2023. EY Turnaround & Restructuring, Barclays, Crown Agents Bank. Credit Suisse, Metro Bank, Lloyds, UBS. Fractional CFO and accounting for UK founders.",
};

export default function AboutPage() {
  return (
    <>
      <AboutS0 />
      <AboutS1 />
      <AboutS2 />
      <AboutS3 />
      <AboutS4 />
    </>
  );
}

import type { Metadata } from "next";
import { StartupsS0, StartupsS1, StartupsS2, StartupsS3, StartupsS4, StartupsS5 } from "@/components/redesign/generated/Startups";

export const metadata: Metadata = {
  title: "Startup Accountants & Fractional CFO for UK Founders",
  description: "Accounting and fractional CFO support for UK founders, funded startups and their investors. Board packs, cash flow forecasts and investor reporting.",
  alternates: { canonical: "/startups" },
};

export default function StartupsPage() {
  return (
    <>
      <StartupsS0 />
      <StartupsS1 />
      <StartupsS2 />
      <StartupsS3 />
      <StartupsS4 />
      <StartupsS5 />
    </>
  );
}

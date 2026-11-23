import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax-Deductible Expenses UK: 100 You Can Claim",
  alternates: { canonical: "/tax-deductible-expenses" },
  description:
    "A reference guide to 100 common tax-deductible expenses for UK sole traders, self-employed individuals, and limited company directors.",
};

export default function TaxDeductibleExpensesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

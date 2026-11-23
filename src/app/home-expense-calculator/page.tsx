import type { Metadata } from "next";
import { HomeExpenseCalculator } from "@/components/HomeExpenseCalculator";

export const metadata: Metadata = {
  title: "Working From Home Tax Calculator (UK)",
  description:
    "Work out what you can claim for working from home. Apportion rent, utilities, council tax and other household costs for your home office.",
  alternates: { canonical: "/home-expense-calculator" },
};

export default function HomeExpenseCalculatorPage() {
  return (
    <div className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <HomeExpenseCalculator />
    </div>
  );
}

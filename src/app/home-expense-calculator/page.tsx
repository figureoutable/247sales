import type { Metadata } from "next";
import { HomeExpenseCalculator } from "@/components/HomeExpenseCalculator";

export const metadata: Metadata = {
  title: "Home Expense Calculator",
  description:
    "Calculate your fair share of household expenses for one room. Apportion rent, utilities, council tax and other home costs for use-of-home or home office calculations.",
};

export default function HomeExpenseCalculatorPage() {
  return (
    <div className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <HomeExpenseCalculator />
    </div>
  );
}

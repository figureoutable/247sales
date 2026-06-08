import type { Metadata } from "next";
import { ChecklistsSection } from "@/components/ChecklistsSection";

export const metadata: Metadata = {
  title: "Accounting Checklists",
  description:
    "Free year-end accounts, self assessment, and new company checklists for UK founders and small businesses.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ChecklistsPage() {
  return (
    <div className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <ChecklistsSection />
      </div>
    </div>
  );
}

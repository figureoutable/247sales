import type { Metadata } from "next";
import { ToolsS0, ToolsS1, ToolsS2, ToolsS3 } from "@/components/redesign/generated/Tools";

export const metadata: Metadata = {
  title: "Free Accounting Checklists for UK Small Businesses",
  description:
    "Free year-end accounts, self assessment, and new company checklists for UK founders and small businesses.",
  alternates: { canonical: "/checklists" },
};

export default function ChecklistsPage() {
  return (
    <>
      <ToolsS0 />
      <ToolsS1 />
      <ToolsS2 />
      <ToolsS3 />
    </>
  );
}

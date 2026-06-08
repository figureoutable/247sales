export type Checklist = {
  id: string;
  title: string;
  subtitle: string;
  pdfHref: string;
  previewSrc: string;
  previewAlt: string;
};

export const CHECKLISTS: Checklist[] = [
  {
    id: "year-end",
    title: "Year-End Accounts Checklist",
    subtitle: "Know exactly what your accountant needs before they ask.",
    pdfHref: "/checklists/year-end-accounts-checklist.pdf",
    previewSrc: "/checklists/previews/year-end-accounts-checklist.pdf.png",
    previewAlt: "Preview of Year-End Accounts Checklist PDF",
  },
  {
    id: "self-assessment",
    title: "Self Assessment Checklist",
    subtitle: "Don't overpay or miss the deadline. Get it right first time.",
    pdfHref: "/checklists/self-assessment-checklist.pdf",
    previewSrc: "/checklists/previews/self-assessment-checklist.pdf.png",
    previewAlt: "Preview of Self Assessment Checklist PDF",
  },
  {
    id: "new-company",
    title: "New Company Checklist",
    subtitle: "Everything you need to set up your limited company correctly.",
    pdfHref: "/checklists/new-company-checklist.pdf",
    previewSrc: "/checklists/previews/new-company-checklist.pdf.png",
    previewAlt: "Preview of New Company Checklist PDF",
  },
];

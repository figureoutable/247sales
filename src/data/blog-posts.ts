/**
 * Local blog posts (used when Sanity is not populated).
 * 2 posts per week for 8 weeks, backdated.
 * Amended posts (local-17 to local-20) use long-form SEO bodies from blog-post-bodies.ts.
 */

import { bodyLocal17, bodyLocal18, bodyLocal19, bodyLocal20 } from "./blog-post-bodies";
import {
  bodyLocal1,
  bodyLocal2,
  bodyLocal3,
  bodyLocal4,
  bodyLocal5,
  bodyLocal6,
  bodyLocal7,
  bodyLocal8,
  bodyLocal9,
  bodyLocal10,
  bodyLocal11,
  bodyLocal12,
  bodyLocal13,
  bodyLocal14,
  bodyLocal15,
  bodyLocal16,
} from "./blog-post-bodies-remaining";
import { GENERATED_POSTS } from "./generated-posts";
import {
  bodyLocal21,
  bodyLocal22,
  bodyLocal23,
  bodyLocal24,
  bodyLocal25,
  bodyLocal26,
} from "./blog-post-bodies-batch2";

export type LocalPost = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string | null;
  publishedAt: string;
  mainImage: string | null;
  excerpt: string | null;
  body: string | null; // plain text paragraphs for local posts
};

export const LOCAL_BLOG_POSTS: LocalPost[] = [
  {
    _id: "local-1",
    title: "Tax deductible expenses for limited companies UK",
    slug: { current: "what-expenses-tax-deductible-limited-companies-uk" },
    category: "Compliance",
    publishedAt: "2025-01-02T09:00:00.000Z",
    mainImage: "/blog/year-end-accounts.jpg",
    excerpt:
      "What expenses are tax deductible for limited companies in the UK? Allowable costs, records, and common mistakes for directors.",
    body: bodyLocal1,
  },
  {
    _id: "local-2",
    title: "Business financial planning UK small business",
    slug: { current: "business-financial-planning-uk-small-business" },
    category: "Cash Flow",
    publishedAt: "2025-01-05T10:00:00.000Z",
    mainImage: "/blog/cash-flow-13-weeks.jpg",
    excerpt:
      "Business financial planning for UK small businesses: what to include, how often to update, and how to use the plan.",
    body: bodyLocal2,
  },
  {
    _id: "local-3",
    title: "How does VAT work for small businesses UK",
    slug: { current: "how-does-vat-work-small-businesses-uk" },
    category: "VAT",
    publishedAt: "2025-01-09T09:00:00.000Z",
    mainImage: "/blog/vat-digital-services.jpg",
    excerpt:
      "How does VAT work for small businesses in the UK? Registration, rates, returns, and the main schemes explained.",
    body: bodyLocal3,
  },
  {
    _id: "local-4",
    title: "What is a management account UK",
    slug: { current: "what-is-management-account-uk" },
    category: "Reporting",
    publishedAt: "2025-01-12T11:00:00.000Z",
    mainImage: "/blog/management-accounts-plain-english.jpg",
    excerpt:
      "What is a management account in the UK? What it should include and how to use it for your small business.",
    body: bodyLocal4,
  },
  {
    _id: "local-5",
    title: "Director salary vs dividend tax efficiency UK",
    slug: { current: "director-salary-vs-dividend-tax-efficiency-uk" },
    category: "Payroll",
    publishedAt: "2025-01-16T09:00:00.000Z",
    mainImage: "/blog/paye-payroll.jpg",
    excerpt:
      "Director salary vs dividend tax efficiency in the UK: how to pay yourself from your limited company in a tax-efficient way.",
    body: bodyLocal5,
  },
  {
    _id: "local-6",
    title: "How to improve profit margins small business UK",
    slug: { current: "how-to-improve-profit-margins-small-business-uk" },
    category: "FP&A",
    publishedAt: "2025-01-19T10:00:00.000Z",
    mainImage: "/blog/budgeting-growth.jpg",
    excerpt:
      "How to improve profit margins for a small business in the UK: gross margin, pricing, costs, and what to track.",
    body: bodyLocal6,
  },
  {
    _id: "local-7",
    title: "Corporation tax rate UK 2025",
    slug: { current: "corporation-tax-rate-uk-2025" },
    category: "Tax",
    publishedAt: "2025-01-23T09:00:00.000Z",
    mainImage: "/blog/corporation-tax-year-end.jpg",
    excerpt:
      "Corporation tax rate in the UK for 2025: main rate, small profits rate, and how they apply to your company.",
    body: bodyLocal7,
  },
  {
    _id: "local-8",
    title: "Fractional CFO UK small business",
    slug: { current: "fractional-cfo-uk-small-business" },
    category: "Leadership",
    publishedAt: "2025-01-26T11:00:00.000Z",
    mainImage: "/blog/fractional-cfo.jpg",
    excerpt:
      "Fractional CFO for UK small businesses: what they do, when you need one, and how to get the most from the relationship.",
    body: bodyLocal8,
  },
  {
    _id: "local-9",
    title: "Reclaiming VAT on business expenses UK",
    slug: { current: "reclaiming-vat-business-expenses-uk" },
    category: "Bookkeeping",
    publishedAt: "2025-01-30T09:00:00.000Z",
    mainImage: "/blog/xero-bookkeeping.jpg",
    excerpt:
      "Reclaiming VAT on business expenses in the UK: what you can claim, what to keep, and common mistakes to avoid.",
    body: bodyLocal9,
  },
  {
    _id: "local-10",
    title: "KPIs for small business UK",
    slug: { current: "kpis-small-business-uk" },
    category: "Reporting",
    publishedAt: "2025-02-02T10:00:00.000Z",
    mainImage: "/blog/investor-reporting.jpg",
    excerpt:
      "KPIs for small businesses in the UK: what to measure, how to present them, and how to avoid overload.",
    body: bodyLocal10,
  },
  {
    _id: "local-11",
    title: "Sole trader vs limited company UK 2025",
    slug: { current: "sole-trader-vs-limited-company-uk-2025" },
    category: "Tax",
    publishedAt: "2025-02-06T09:00:00.000Z",
    mainImage: "/blog/self-assessment-deadline.jpg",
    excerpt:
      "Sole trader vs limited company in the UK for 2025: tax, liability, admin, and when to choose which structure.",
    body: bodyLocal11,
  },
  {
    _id: "local-12",
    title: "Monthly management accounts what should they include",
    slug: { current: "monthly-management-accounts-what-include" },
    category: "Reporting",
    publishedAt: "2025-02-09T11:00:00.000Z",
    mainImage: "/blog/management-accounts-do.jpg",
    excerpt:
      "What should monthly management accounts include for a UK small business? P&L, cash, KPIs, and commentary.",
    body: bodyLocal12,
  },
  {
    _id: "local-13",
    title: "VAT flat rate scheme explained",
    slug: { current: "vat-flat-rate-scheme-explained" },
    category: "VAT",
    publishedAt: "2025-02-13T09:00:00.000Z",
    mainImage: "/blog/vat-schemes.jpg",
    excerpt:
      "VAT flat rate scheme explained for UK small businesses: how it works, who it suits, and how to decide.",
    body: bodyLocal13,
  },
  {
    _id: "local-14",
    title: "How to scale a small business UK finance",
    slug: { current: "how-to-scale-small-business-uk-finance" },
    category: "Cash Flow",
    publishedAt: "2025-02-16T10:00:00.000Z",
    mainImage: "/blog/runway-burn.jpg",
    excerpt:
      "How to scale a small business in the UK from a finance perspective: funding, cash flow, and the numbers that matter.",
    body: bodyLocal14,
  },
  {
    _id: "local-15",
    title: "VAT return UK how to complete",
    slug: { current: "vat-return-uk-how-to-complete" },
    category: "Compliance",
    publishedAt: "2025-02-20T09:00:00.000Z",
    mainImage: "/blog/statutory-accounts.jpg",
    excerpt:
      "How to complete a VAT return in the UK: what to include, how to calculate the figures, and how to submit on time.",
    body: bodyLocal15,
  },
  {
    _id: "local-16",
    title: "Best accounting software for small business UK",
    slug: { current: "best-accounting-software-small-business-uk" },
    category: "Systems",
    publishedAt: "2025-02-23T11:00:00.000Z",
    mainImage: "/blog/finance-stack.jpg",
    excerpt:
      "Best accounting software for small businesses in the UK: what to look for and how to get the most from it.",
    body: bodyLocal16,
  },
  {
    _id: "local-17",
    title: "Cash flow forecast for small business UK",
    slug: { current: "cash-flow-forecast-small-business-uk" },
    category: "Cash Flow",
    publishedAt: "2025-02-26T10:00:00.000Z",
    mainImage: "/blog/quarterly-forecast.jpg",
    excerpt:
      "How to build and use a cash flow forecast for your small business in the UK. Stay ahead of shortfalls and plan for tax and growth.",
    body: bodyLocal17,
  },
  {
    _id: "local-18",
    title: "When is corporation tax due UK?",
    slug: { current: "when-is-corporation-tax-due-uk" },
    category: "Tax",
    publishedAt: "2025-03-01T09:00:00.000Z",
    mainImage: "/blog/making-tax-digital.jpg",
    excerpt:
      "When is corporation tax due in the UK? Payment and filing deadlines, plus how they fit with Making Tax Digital and other key dates.",
    body: bodyLocal18,
  },
  {
    _id: "local-19",
    title: "How to read a profit and loss statement UK",
    slug: { current: "how-to-read-profit-and-loss-statement-uk" },
    category: "Reporting",
    publishedAt: "2025-03-04T11:00:00.000Z",
    mainImage: "/blog/read-pl-five-mins.jpg",
    excerpt:
      "How to read a profit and loss statement in the UK: structure, key lines, and what to look at first. Plain English guide for founders and SME owners.",
    body: bodyLocal19,
  },
  {
    _id: "local-20",
    title: "How to pay yourself as a UK company director",
    slug: { current: "pay-yourself-limited-company-director-uk" },
    category: "Compliance",
    publishedAt: "2025-03-08T09:00:00.000Z",
    mainImage: "/blog/directors-loans.jpg",
    excerpt:
      "How to pay yourself as a limited company director in the UK: salary, dividends, and director's loans explained. Get it right with expert guidance.",
    body: bodyLocal20,
  },
  {
    _id: "local-21",
    title: "VAT registration threshold UK 2025",
    slug: { current: "vat-registration-threshold-uk-2025" },
    category: "VAT",
    publishedAt: "2025-02-25T09:00:00.000Z",
    mainImage: "/blog/vat-digital-services.jpg",
    excerpt:
      "VAT registration threshold UK 2025: what the limit is, what counts towards it, and what to do when you reach it.",
    body: bodyLocal21,
  },
  {
    _id: "local-22",
    title: "Do I need to register for VAT UK",
    slug: { current: "do-i-need-to-register-for-vat-uk" },
    category: "VAT",
    publishedAt: "2025-02-28T10:00:00.000Z",
    mainImage: "/blog/vat-schemes.jpg",
    excerpt:
      "Do I need to register for VAT in the UK? How to decide, when it is compulsory, and when voluntary registration makes sense.",
    body: bodyLocal22,
  },
  {
    _id: "local-23",
    title: "R&D tax credits UK small business",
    slug: { current: "r-and-d-tax-credits-uk-small-business" },
    category: "Tax",
    publishedAt: "2025-03-02T09:00:00.000Z",
    mainImage: "/blog/corporation-tax-year-end.jpg",
    excerpt:
      "R&D tax credits for UK small businesses: who qualifies, what you can claim, and how to submit a successful claim.",
    body: bodyLocal23,
  },
  {
    _id: "local-24",
    title: "Capital allowances explained UK",
    slug: { current: "capital-allowances-explained-uk" },
    category: "Tax",
    publishedAt: "2025-03-05T10:00:00.000Z",
    mainImage: "/blog/making-tax-digital.jpg",
    excerpt:
      "Capital allowances explained for UK businesses: AIA, full expensing, writing down allowances, and how to claim.",
    body: bodyLocal24,
  },
  {
    _id: "local-25",
    title: "How to set up payroll UK for the first time",
    slug: { current: "how-to-set-up-payroll-uk" },
    category: "Payroll",
    publishedAt: "2025-03-07T09:00:00.000Z",
    mainImage: "/blog/paye-payroll.jpg",
    excerpt:
      "How to set up payroll in the UK for the first time: HMRC registration, software, RTI, and auto-enrolment step by step.",
    body: bodyLocal25,
  },
  {
    _id: "local-26",
    title: "HMRC penalties and how to avoid them UK",
    slug: { current: "hmrc-penalties-how-to-avoid-them-uk" },
    category: "Compliance",
    publishedAt: "2025-03-10T10:00:00.000Z",
    mainImage: "/blog/statutory-accounts.jpg",
    excerpt:
      "HMRC penalties for UK businesses: corporation tax, VAT, self-assessment, and PAYE. What triggers them and how to avoid them.",
    body: bodyLocal26,
  },
];


const ALL_POSTS: LocalPost[] = [
  ...LOCAL_BLOG_POSTS,
  ...(GENERATED_POSTS as LocalPost[]),
];

export function getLocalPosts(): LocalPost[] {
  return [...ALL_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getLocalPostBySlug(slug: string): LocalPost | null {
  return ALL_POSTS.find((p) => p.slug.current === slug) ?? null;
}

export function getLocalLatestPosts(count: number): LocalPost[] {
  return getLocalPosts().slice(0, count);
}

/**
 * Local blog posts (used when Sanity is not populated).
 * 2 posts per week for 8 weeks, backdated.
 */

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
    title: "Why your year-end accounts don’t have to be a nightmare",
    slug: { current: "year-end-accounts-dont-have-to-be-nightmare" },
    category: "Compliance",
    publishedAt: "2025-01-02T09:00:00.000Z",
    mainImage: "/blog/year-end-accounts.jpg",
    excerpt:
      "Year-end can feel like a scramble. With the right preparation and a clear timeline, it doesn’t have to. Here’s how we keep it simple for our clients.",
    body: "Year-end can feel like a scramble. With the right preparation and a clear timeline, it doesn’t have to. Here’s how we keep it simple for our clients.\n\nStart by closing off your books month by month so there are no surprises. Keep a checklist of what your accountant needs — bank statements, invoices, payroll records — and send them in one go. At Figures we aim to turn around year-end accounts within a few weeks, with a clear explanation of the numbers so you know exactly where you stand.",
  },
  {
    _id: "local-2",
    title: "Cash flow forecasting: why 13 weeks beats 12 months",
    slug: { current: "cash-flow-forecasting-13-weeks-beats-12-months" },
    category: "Cash Flow",
    publishedAt: "2025-01-05T10:00:00.000Z",
    mainImage: "/blog/cash-flow-13-weeks.jpg",
    excerpt:
      "A 13-week rolling cash forecast is often more useful than an annual budget when it comes to day-to-day decisions. Here’s why.",
    body: "A 13-week rolling cash forecast is often more useful than an annual budget when it comes to day-to-day decisions. Here’s why.\n\nIt’s short enough to stay accurate and long enough to spot pinch points. You update it every week or fortnight, so you’re always looking at a realistic picture. We use 13-week forecasts with our clients to flag gaps early, plan for tax and payroll, and avoid surprises.",
  },
  {
    _id: "local-3",
    title: "VAT on digital services: what UK sellers need to know",
    slug: { current: "vat-digital-services-uk-sellers" },
    category: "VAT",
    publishedAt: "2025-01-09T09:00:00.000Z",
    mainImage: "/blog/vat-digital-services.jpg",
    excerpt:
      "Selling digital services to EU customers? The rules have changed. We break down place of supply and when you need to register.",
    body: "Selling digital services to EU customers? The rules have changed. We break down place of supply and when you need to register.\n\nGenerally, B2B sales are VAT-free (reverse charge), while B2C sales can mean VAT in the customer’s country. The VAT OSS scheme lets you report and pay EU VAT in one return. If you’re not sure whether you’re in scope, it’s worth getting it checked — the last thing you want is a surprise assessment.",
  },
  {
    _id: "local-4",
    title: "Management accounts in plain English",
    slug: { current: "management-accounts-plain-english" },
    category: "Reporting",
    publishedAt: "2025-01-12T11:00:00.000Z",
    mainImage: "/blog/management-accounts-plain-english.jpg",
    excerpt:
      "Management accounts shouldn’t require a decoder ring. Here’s what we include in ours and how we present them so you can act on the numbers.",
    body: "Management accounts shouldn’t require a decoder ring. Here’s what we include in ours and how we present them so you can act on the numbers.\n\nWe focus on profit and loss, cash flow, and key metrics in a one-page summary. Actual vs budget and a short commentary help you see where you’re ahead or behind. The goal is to get them to you within five working days of month-end so you can make decisions while the numbers are still fresh.",
  },
  {
    _id: "local-5",
    title: "PAYE and payroll: staying on the right side of HMRC",
    slug: { current: "paye-payroll-right-side-hmrc" },
    category: "Payroll",
    publishedAt: "2025-01-16T09:00:00.000Z",
    mainImage: "/blog/paye-payroll.jpg",
    excerpt:
      "RTI, P45s, and year-end — payroll has a lot of moving parts. We outline what needs to happen when so nothing gets missed.",
    body: "RTI, P45s, and year-end — payroll has a lot of moving parts. We outline what needs to happen when so nothing gets missed.\n\nSubmit your FPS on or before payday, run the year-end process before the 19 April deadline, and keep records for at least three years. If you’re new to employing people or taking a salary from your own company, it’s worth getting the process set up correctly from day one.",
  },
  {
    _id: "local-6",
    title: "Budgeting for growth: setting targets that stick",
    slug: { current: "budgeting-for-growth-targets-that-stick" },
    category: "FP&A",
    publishedAt: "2025-01-19T10:00:00.000Z",
    mainImage: "/blog/budgeting-growth.jpg",
    excerpt:
      "A good budget is one the team actually uses. We share how we build annual budgets and quarterly reforecasts that stay relevant.",
    body: "A good budget is one the team actually uses. We share how we build annual budgets and quarterly reforecasts that stay relevant.\n\nStart with revenue assumptions you can defend, then layer in costs. Revisit the budget every quarter so it doesn’t drift into fiction. We work with founders to build budgets that tie into their strategy and to track actuals so they know when to adjust.",
  },
  {
    _id: "local-7",
    title: "Corporation tax: what to do before the year end",
    slug: { current: "corporation-tax-before-year-end" },
    category: "Tax",
    publishedAt: "2025-01-23T09:00:00.000Z",
    mainImage: "/blog/corporation-tax-year-end.jpg",
    excerpt:
      "A few checks before your company year-end can save tax and avoid last-minute stress. We run through the essentials.",
    body: "A few checks before your company year-end can save tax and avoid last-minute stress. We run through the essentials.\n\nLook at capital allowances, R&D relief if you qualify, and any accruals or prepayments that might affect the profit. Get your records in order so your accountant can file the return and computation on time. Missing the filing deadline can mean penalties and interest.",
  },
  {
    _id: "local-8",
    title: "When to hire a fractional CFO",
    slug: { current: "when-to-hire-fractional-cfo" },
    category: "Leadership",
    publishedAt: "2025-01-26T11:00:00.000Z",
    mainImage: "/blog/fractional-cfo.jpg",
    excerpt:
      "You don’t need a full-time finance director to get senior-level input. A fractional CFO can fill the gap without the full-time cost.",
    body: "You don’t need a full-time finance director to get senior-level input. A fractional CFO can fill the gap without the full-time cost.\n\nIf you’re making big decisions — fundraising, acquisitions, scaling — and want someone who owns the numbers and can challenge the board, a fractional CFO can sit alongside your leadership team for a set number of days per month. We help founders get that level of support without the overhead of a permanent hire.",
  },
  {
    _id: "local-9",
    title: "Xero tips for cleaner bookkeeping",
    slug: { current: "xero-tips-cleaner-bookkeeping" },
    category: "Bookkeeping",
    publishedAt: "2025-01-30T09:00:00.000Z",
    mainImage: "/blog/xero-bookkeeping.jpg",
    excerpt:
      "Small habits in Xero can save hours at month-end. Bank rules, recurring invoices, and a simple filing routine go a long way.",
    body: "Small habits in Xero can save hours at month-end. Bank rules, recurring invoices, and a simple filing routine go a long way.\n\nSet up bank rules to auto-match common transactions, use recurring invoices for retainer clients, and reconcile at least weekly so it doesn’t pile up. If your books are in good shape, your management accounts and year-end become straightforward.",
  },
  {
    _id: "local-10",
    title: "Investor reporting: what to put in the pack",
    slug: { current: "investor-reporting-what-to-put-in-pack" },
    category: "Reporting",
    publishedAt: "2025-02-02T10:00:00.000Z",
    mainImage: "/blog/investor-reporting.jpg",
    excerpt:
      "Investors want to see the right numbers and a clear narrative. We outline what to include in a board or investor pack.",
    body: "Investors want to see the right numbers and a clear narrative. We outline what to include in a board or investor pack.\n\nCover revenue, burn, runway, and key metrics. Add a short commentary on what’s going well and what you’re working on. Keep it consistent month to month so they can track progress. We help founders build investor-ready packs that tell the story without drowning in detail.",
  },
  {
    _id: "local-11",
    title: "Self assessment deadline: don’t leave it to January",
    slug: { current: "self-assessment-deadline-dont-leave-january" },
    category: "Tax",
    publishedAt: "2025-02-06T09:00:00.000Z",
    mainImage: "/blog/self-assessment-deadline.jpg",
    excerpt:
      "The 31 January deadline catches people out every year. Get your return and payment sorted earlier and avoid the rush.",
    body: "The 31 January deadline catches people out every year. Get your return and payment sorted earlier and avoid the rush.\n\nIf you’re in self assessment, gather your records (P60s, bank interest, rental income, etc.) and get them to your accountant well before Christmas. That way you know your tax bill in good time and can plan for the payment. Late filing and late payment both attract penalties.",
  },
  {
    _id: "local-12",
    title: "What management accounts should do for you",
    slug: { current: "what-management-accounts-should-do" },
    category: "Reporting",
    publishedAt: "2025-02-09T11:00:00.000Z",
    mainImage: "/blog/management-accounts-do.jpg",
    excerpt:
      "Management accounts aren’t just for the accountant. They should help you run the business. Here’s what good looks like.",
    body: "Management accounts aren’t just for the accountant. They should help you run the business. Here’s what good looks like.\n\nYou need to see profit, cash, and the main drivers of both. Actual vs budget tells you if you’re on track. A forward look (e.g. 13-week cash) helps you plan. We design packs so that the leadership team can read and use them without a finance degree.",
  },
  {
    _id: "local-13",
    title: "VAT schemes: standard vs flat rate vs cash",
    slug: { current: "vat-schemes-standard-flat-rate-cash" },
    category: "VAT",
    publishedAt: "2025-02-13T09:00:00.000Z",
    mainImage: "/blog/vat-schemes.jpg",
    excerpt:
      "Choosing the right VAT scheme can save you time and sometimes tax. We compare the main options for small businesses.",
    body: "Choosing the right VAT scheme can save you time and sometimes tax. We compare the main options for small businesses.\n\nStandard scheme: you report output and input VAT in full. Flat rate: you pay a fixed percentage of turnover. Cash accounting: you account for VAT when money moves. The best choice depends on your margins, payment patterns, and admin capacity. We can run the numbers and recommend.",
  },
  {
    _id: "local-14",
    title: "Runway and burn: the two numbers that matter most",
    slug: { current: "runway-and-burn-two-numbers-that-matter" },
    category: "Cash Flow",
    publishedAt: "2025-02-16T10:00:00.000Z",
    mainImage: "/blog/runway-burn.jpg",
    excerpt:
      "Runway and burn rate tell you how long you can keep going at current spend. We explain how to calculate and monitor them.",
    body: "Runway and burn rate tell you how long you can keep going at current spend. We explain how to calculate and monitor them.\n\nBurn rate is typically monthly cash outflow (excluding one-offs). Runway is cash in the bank divided by burn. Update both regularly and stress-test with different scenarios. We build rolling cash forecasts so our clients always know where they stand.",
  },
  {
    _id: "local-15",
    title: "Statutory accounts: what Companies House and HMRC need",
    slug: { current: "statutory-accounts-companies-house-hmrc" },
    category: "Compliance",
    publishedAt: "2025-02-20T09:00:00.000Z",
    mainImage: "/blog/statutory-accounts.jpg",
    excerpt:
      "Your year-end accounts have to satisfy both Companies House and HMRC. We summarise what goes where and by when.",
    body: "Your year-end accounts have to satisfy both Companies House and HMRC. We summarise what goes where and by when.\n\nCompanies House needs a set of accounts (usually filleted for small companies) within nine months of the year end. HMRC needs the corporation tax return and computation within 12 months. The same underlying figures feed both; we prepare accounts that meet both requirements and file on your behalf.",
  },
  {
    _id: "local-16",
    title: "Building a finance stack that scales",
    slug: { current: "finance-stack-that-scales" },
    category: "Systems",
    publishedAt: "2025-02-23T11:00:00.000Z",
    mainImage: "/blog/finance-stack.jpg",
    excerpt:
      "Xero, Dext, payroll software, and reporting tools — how to wire them together so your finance function grows with you.",
    body: "Xero, Dext, payroll software, and reporting tools — how to wire them together so your finance function grows with you.\n\nStart with a solid core: accounting software and bank feeds. Add expense and receipt capture, then payroll, then reporting and forecasting as you need them. We help founders choose and connect the right tools so the stack stays clean and scalable.",
  },
];

export function getLocalPosts(): LocalPost[] {
  return [...LOCAL_BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getLocalPostBySlug(slug: string): LocalPost | null {
  return LOCAL_BLOG_POSTS.find((p) => p.slug.current === slug) ?? null;
}

export function getLocalLatestPosts(count: number): LocalPost[] {
  return getLocalPosts().slice(0, count);
}

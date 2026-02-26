export const SITE_NAME = "Figures";
export const TAGLINE = "Oddly Satisfying Accounting.";
export const CAL_LINK = "https://cal.com/figures/discovery";

export const SOCIAL_LINKS = {
  youtube: "https://youtube.com/@tryfigures",
  x: "https://x.com/tryfigures",
  tiktok: "https://tiktok.com/@tryfigures",
  instagram: "https://instagram.com/tryfigures",
  linkedin: "https://linkedin.com/company/tryfigures",
} as const;

export const CONTACT_EMAIL = "joshua@tryfigures.com";

export const SERVICES = [
  {
    id: "fractional-cfo",
    title: "Fractional CFO",
    icon: "briefcase",
    description:
      "Senior finance leadership without the full-time cost. We sit alongside your leadership team, own the numbers and help you make better decisions faster.",
  },
  {
    id: "management-reporting",
    title: "Management Reporting",
    icon: "layout-dashboard",
    description:
      "Monthly board packs delivered within 5 working days. Actual vs budget, cash flow, KPIs and forward forecast — presented clearly so the whole team can act on it.",
  },
  {
    id: "financial-planning-analysis",
    title: "Financial Planning & Analysis",
    icon: "line-chart",
    description:
      "Budgets, scenario models and rolling forecasts so you always know where the business is heading and what levers to pull.",
  },
  {
    id: "cash-flow-management",
    title: "Cash Flow Management",
    icon: "droplets",
    description:
      "13-week rolling cash forecasts and early warning monitoring. We make sure you never run out of runway unexpectedly.",
  },
  {
    id: "board-investor-reporting",
    title: "Board & Investor Reporting",
    icon: "presentation",
    description:
      "Investor-ready reporting packs and board presentations that tell the right story with the right numbers behind them.",
  },
  {
    id: "budgeting-forecasting",
    title: "Budgeting & Forecasting",
    icon: "calendar-range",
    description:
      "Annual budgets and quarterly reforecasts built with your team. Clear targets, realistic assumptions and a plan everyone can work to.",
  },
  {
    id: "statutory-accounts-tax",
    title: "Statutory Accounts & Tax",
    icon: "shield-check",
    description:
      "Year-end accounts, corporation tax and VAT handled accurately and on time. Compliance sorted so you can focus on growth.",
  },
  {
    id: "payroll-paye",
    title: "Payroll & PAYE",
    icon: "users",
    description:
      "Payroll processed accurately every month with RTI submissions and HMRC correspondence handled on your behalf.",
  },
  {
    id: "bookkeeping-xero",
    title: "Bookkeeping & Xero",
    icon: "book-open",
    description:
      "Clean, organised books updated regularly so your numbers are always ready when you need them. We work in Xero and connect your whole finance stack.",
  },
] as const;

export const WHY_FIGURES_ROWS = [
  { aspect: "Response time", figures: "Same day", others: "Days or weeks" },
  { aspect: "Open hours", figures: "Flexible, when you need us", others: "9–5 only" },
  { aspect: "Communication", figures: "Plain English, no jargon", others: "Heavy on the acronyms" },
  { aspect: "Pricing", figures: "Transparent, fixed where possible", others: "Hourly, unpredictable" },
  { aspect: "Support style", figures: "Proactive, part of your team", others: "Reactive, once a year" },
] as const;

// Placeholder testimonials – replace with real copy when provided
export const TESTIMONIALS = [
  {
    name: "Kabir",
    role: "Founder",
    quote:
      "I had fallen behind with HMRC and it was causing a lot of stress. I did not know who to speak to or how serious the situation was. Josh took over straight away, spoke to HMRC on my behalf, and explained what was happening at each step. Everything was brought up to date quickly and I finally felt relieved knowing it was all under control!",
    image: "/testimonials/kabir.png",
  },
  {
    name: "Adam",
    role: "Director",
    quote:
      "When I started my business, I had no real understanding of accounting at all. I was guessing most of the time and hoping nothing would go wrong. Josh took the time to explain my numbers in simple terms and showed me what actually mattered. I now understand how my business is performing, make decisions with confidence, and do not feel lost anymore.",
    image: "/testimonials/adam.png",
  },
  {
    name: "Janvi",
    role: "Locum Pharmacist",
    quote:
      "As a locum pharmacist working in the NHS, I always found self-assessments stressful and confusing. Josh explained everything clearly, handled the return efficiently, and made sure I understood what mattered. I now feel confident that my tax is done properly and no longer worry about getting it wrong.",
    image: "/testimonials/janvi.png",
  },
  {
    name: "Christian",
    role: "Entrepreneur",
    quote:
      "I came to Josh after getting fed up with my old accountant. It was hard to get replies and I never really knew how the business was doing. Josh explained everything clearly and set things up so I could see my numbers properly. Now I always know where I stand and I feel much more confident making decisions.",
    image: "/testimonials/christian.png",
  },
] as const;

// Placeholder FAQ – replace with your copy when provided
export const FAQ_ITEMS = [
  { q: "What does Figures do?", a: "We provide accounting and advisory for UK founders and small businesses — from bookkeeping and VAT to year-end accounts and tax. Think of us as your in-house finance team, without the overhead." },
  { q: "Who do you work with?", a: "Limited companies, sole traders, and landlords. If you're running a UK business or have UK tax to sort, we can help." },
  { q: "How is pricing structured?", a: "We offer transparent, fixed-fee packages where possible so you know what you're paying. For more complex work we'll agree a scope and price upfront." },
  { q: "Where are you based?", a: "We're based in Surrey and work with clients across the UK remotely. We're happy to meet in person when it helps." },
  { q: "How do I get started?", a: "Book a discovery call via the link on our site. We'll chat about your situation and how we can help, with no obligation." },
  { q: "Do you use Xero or QuickBooks?", a: "We work with both and other leading tools. We'll use what you already have or recommend the best fit for your size and sector." },
  { q: "What's your turnaround time?", a: "We aim for same-day responses on routine queries and clear timelines on larger pieces of work. No disappearing for weeks." },
  { q: "Can you help with one-off projects?", a: "Yes. Whether it's a one-time cleanup, a capital allowances claim, or advice on a specific decision, we can take on project work." },
] as const;

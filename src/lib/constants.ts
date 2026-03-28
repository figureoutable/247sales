export const SITE_NAME = "Figures Chartered Accountants";
export const TAGLINE = "Oddly Satisfying Accounting";
export const CAL_LINK = "https://cal.com/figures/discoverycall";

export const SOCIAL_LINKS = {
  youtube: "https://youtube.com/@tryfigures",
  x: "https://x.com/tryfigures",
  tiktok: "https://tiktok.com/@tryfigures",
  instagram: "https://instagram.com/tryfigures",
  linkedin: "https://linkedin.com/company/tryfigures",
} as const;

export const CONTACT_EMAIL = "joshua@tryfigures.com";
export const CONTACT_PHONE_DISPLAY = "+44 7775 081123";
export const CONTACT_PHONE_TEL = "+447775081123";

export const SERVICES = [
  {
    id: "statutory-accounts-tax",
    title: "Statutory Accounts & Tax",
    icon: "shield-check",
    description:
      "Year-end accounts, corporation tax and VAT handled accurately and on time. Compliance sorted so you can focus on growth.",
    detail:
      "We prepare year-end accounts to Companies House and HMRC standards, file corporation tax returns and computations, and manage VAT returns and registrations. Deadlines are tracked and met so you stay compliant without the last-minute scramble.",
    whoFor: "Limited companies that want compliance done properly and on time.",
  },
  {
    id: "payroll-paye",
    title: "Payroll & PAYE",
    icon: "users",
    description:
      "Payroll processed accurately every month with RTI submissions and HMRC correspondence handled on your behalf.",
    detail:
      "We run payroll (including director-only), submit FPS and EPS to HMRC, and handle P45s, P60s and year-end. We deal with HMRC queries on your behalf so you don't have to. You get a clear summary each month and your team gets paid on time.",
    whoFor: "Employers who want payroll and PAYE sorted without the admin headache.",
  },
  {
    id: "bookkeeping-xero",
    title: "Bookkeeping & Xero",
    icon: "book-open",
    description:
      "Clean, organised books updated regularly so your numbers are always ready when you need them. We work in Xero and connect your whole finance stack.",
    detail:
      "We keep your books in Xero — coding transactions, reconciling banks, and keeping records tidy. We link in your bank feeds, expenses, and other tools so the finance stack works as one. When you need management accounts or year-end, the data is already there.",
    whoFor: "Businesses that want their books in good shape without doing it themselves.",
  },
  {
    id: "fractional-cfo",
    title: "Fractional CFO",
    icon: "briefcase",
    description:
      "Senior finance leadership without the full-time cost. We sit alongside your leadership team, own the numbers and help you make better decisions faster.",
    detail:
      "Whether you're scaling up, raising funding, or navigating a tricky period, you get the strategic input of an experienced CFO without the salary. We attend board meetings when needed, challenge assumptions, and make sure the numbers support the story you're telling.",
    whoFor: "Founders and leadership teams who want strategic finance input without a full-time hire.",
  },
  {
    id: "management-reporting",
    title: "Management Reporting",
    icon: "layout-dashboard",
    description:
      "Monthly board packs. Actual vs budget, cash flow, KPIs and forward forecast — presented clearly so the whole team can act on it.",
    detail:
      "We pull together your management accounts, variance analysis, and cash position into a pack you can actually use. No jargon, no delay. You get a consistent format every month so you can spot trends and make decisions quickly.",
    whoFor: "Leadership teams and boards who need reliable, timely numbers to run the business.",
  },
  {
    id: "vat",
    title: "VAT",
    icon: "receipt",
    description:
      "VAT registration, returns and advice. We handle the paperwork and deadlines so you stay compliant and reclaim what you're owed.",
    detail:
      "We register you for VAT when the time's right, prepare and submit your VAT returns on time, and advise on schemes (standard, flat rate, cash accounting). We make sure you don't overpay or miss reclaims.",
    whoFor: "UK businesses that are VAT-registered or need to register and want it done properly.",
  },
  {
    id: "cash-flow-management",
    title: "Cash Flow Management",
    icon: "droplets",
    description:
      "13-week rolling cash forecasts and early warning monitoring. We make sure you never run out of runway unexpectedly.",
    detail:
      "We maintain a rolling 13-week cash forecast updated with your latest numbers and assumptions. We flag pinch points early so you can act — whether that's chasing invoices, delaying spend, or arranging funding. No nasty surprises.",
    whoFor: "Founders and FDs who need to stay on top of cash and avoid running out of runway.",
  },
  {
    id: "board-investor-reporting",
    title: "Board & Investor Reporting",
    icon: "presentation",
    description:
      "Investor-ready reporting packs and board presentations that tell the right story with the right numbers behind them.",
    detail:
      "We prepare the financials and commentary for board packs and investor updates. Clear narrative, consistent metrics, and numbers that stack up. We can present in person or support you so you're confident when investors or the board ask questions.",
    whoFor: "Companies with a board or external investors who expect clear, professional reporting.",
  },
  {
    id: "budgeting-forecasting",
    title: "Budgeting & Forecasting",
    icon: "calendar-range",
    description:
      "Annual budgets and quarterly reforecasts built with your team. Clear targets, realistic assumptions and a plan everyone can work to.",
    detail:
      "We work with you to build an annual budget that reflects your strategy and is grounded in realistic assumptions. Through the year we run quarterly reforecasts so the plan stays relevant. The result is a shared view of where you're heading and what good looks like.",
    whoFor: "Teams that want a clear financial plan and regular check-ins against it.",
  },
] as const;

export const WHY_FIGURES_ROWS = [
  { aspect: "Response time", figures: "Same day", others: "Days or weeks" },
  { aspect: "Open hours", figures: "8am to 8pm", others: "9–5 only" },
  { aspect: "Communication", figures: "Plain English, no jargon", others: "Heavy on the acronyms" },
  { aspect: "Pricing", figures: "Transparent, fixed where possible", others: "Hourly, unpredictable" },
  { aspect: "Support style", figures: "Proactive, part of your team", others: "Reactive, once a year" },
] as const;

// Placeholder testimonials – replace with real copy when provided
export const TESTIMONIALS = [
  {
    name: "Kabir",
    role: "Property",
    quote:
      "I had fallen behind with HMRC and it was causing a lot of stress. I did not know who to speak to or how serious the situation was. Josh took over straight away, spoke to HMRC on my behalf, and explained what was happening at each step. Everything was brought up to date quickly and I finally felt relieved knowing it was all under control!",
    image: "/testimonials/kabir.png",
  },
  {
    name: "Adam",
    role: "Camera business",
    quote:
      "When I started my business, I had no real understanding of accounting at all. I was guessing most of the time and hoping nothing would go wrong. Josh took the time to explain my numbers in simple terms and showed me what actually mattered. I now understand how my business is performing, make decisions with confidence, and do not feel lost anymore.",
    image: "/testimonials/adam.png",
  },
  {
    name: "Janvi",
    role: "Locum pharmacy",
    quote:
      "As a locum pharmacist working in the NHS, I always found self-assessments stressful and confusing. Josh explained everything clearly, handled the return efficiently, and made sure I understood what mattered. I now feel confident that my tax is done properly and no longer worry about getting it wrong.",
    image: "/testimonials/janvi.png",
  },
  {
    name: "Christian",
    role: "Jewellery ecommerce",
    quote:
      "I came to Josh after getting fed up with my old accountant. It was hard to get replies and I never really knew how the business was doing. Josh explained everything clearly and set things up so I could see my numbers properly. Now I always know where I stand and I feel much more confident making decisions.",
    image: "/testimonials/christian.png",
  },
  {
    name: "Ben",
    role: "Logistics",
    quote:
      "Running a logistics business means I don't have time to be chasing my accountant for updates. Since moving to Figures, that's never been an issue. Josh is proactive, responsive, and always explains things in plain English. My year-end accounts and corporation tax are handled efficiently and I always know exactly where I stand. Genuinely one of the best decisions I've made for the business.",
    image: "/testimonials/ben.png",
  },
  {
    name: "Jack",
    role: "Marketing agency",
    quote:
      "As someone who runs their own marketing agency, I understand the value of clear communication and delivering on time. Josh does both. Every deadline is met, every question gets a fast and clear answer, and I never feel like I'm being kept in the dark about my own finances. It's refreshing to have an accountant who actually gets what running a small business looks like.",
    image: "/testimonials/jack.png",
  },
  {
    name: "Tony",
    role: "Tutoring",
    quote:
      "I used to dread self-assessment season. Josh made the whole process painless. He was quick to get everything sorted, kept me updated throughout, and made sure I understood what I was paying and why. Really glad I found Figures.",
    image: "/testimonials/tony.png",
  },
  {
    name: "Rebecca",
    role: "Dog walking",
    quote:
      "Josh handles all my accounts and tax for my dog walking business and honestly takes a huge weight off my shoulders. The turnaround is always quick, communication is brilliant, and nothing ever feels rushed or like I'm just another client. He takes the time to actually explain things properly, which I really appreciate as someone who isn't very numbers-savvy. Couldn't recommend enough.",
    image: "/testimonials/rebecca.png",
  },
  {
    name: "Jon",
    role: "Carpenter",
    quote:
      "I'm a carpenter, I know wood, not spreadsheets. Before coming to Figures, tax returns and keeping on top of my numbers felt like a nightmare. Josh sorted everything out quickly, kept me in the loop the whole way through, and made sure I actually understood what was going on with my finances. Communication is brilliant and nothing ever feels like too much trouble. Proper good service from start to finish.",
    image: "/testimonials/jon.png",
  },
] as const;

// Placeholder FAQ – replace with your copy when provided
export const FAQ_ITEMS = [
  { q: "What does Figures Chartered Accountants do?", a: "We provide accounting and advisory for UK founders and small businesses — from bookkeeping and VAT to year-end accounts and tax. Think of us as your in-house finance team, without the overhead." },
  { q: "Who do you work with?", a: "Limited companies, sole traders, and landlords. If you're running a UK business or have UK tax to sort, we can help." },
  { q: "How is pricing structured?", a: "We offer transparent, fixed-fee packages where possible so you know what you're paying. For more complex work we'll agree a scope and price upfront." },
  { q: "Where are you based?", a: "We're based in Surrey and work with clients across the UK remotely. We're happy to meet in person when it helps." },
  { q: "How do I get started?", a: "Book a discovery call via the link on our site. We'll chat about your situation and how we can help, with no obligation." },
  { q: "Do you use Xero or QuickBooks?", a: "We work with both and other leading tools. We'll use what you already have or recommend the best fit for your size and sector." },
  { q: "What's your turnaround time?", a: "We aim for same-day responses on routine queries and clear timelines on larger pieces of work. No disappearing for weeks." },
  { q: "Can you help with one-off projects?", a: "Yes. Whether it's a one-time cleanup, a capital allowances claim, or advice on a specific decision, we can take on project work." },
] as const;

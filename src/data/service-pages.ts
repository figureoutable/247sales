import { SERVICES } from "@/lib/constants";

type ServiceId = (typeof SERVICES)[number]["id"];

export type ServicePageContent = {
  intro: string;
  whatWeDo: string[];
  howWeWork: string[];
  itemsToNote: string[];
  whatWeNeedFromYou: string[];
  typicalTimeline: string[];
  extraCopy: string[];
  faqs: { q: string; a: string }[];
};

export const SERVICE_PAGES: Record<ServiceId, ServicePageContent> = {
  "statutory-accounts-tax": {
    intro:
      "Year-end accounts and corporation tax done properly and filed on time. We take the compliance off your plate and keep things clear, tidy, and HMRC-ready.",
    whatWeDo: [
      "Prepare statutory accounts for Companies House",
      "Prepare corporation tax computation and file your CT600 with HMRC",
      "Confirm key deadlines and manage the filing timeline end-to-end",
      "Review your bookkeeping, adjust where needed, and keep your numbers clean",
      "Answer questions in plain English so you understand what is being filed",
    ],
    howWeWork: [
      "Kick-off: confirm your year end, filing deadlines, and what has already been done",
      "Records review: reconcile key balances and request anything missing",
      "Drafts: we prepare accounts and tax drafts and flag anything that needs a decision",
      "Approval: you approve the final versions",
      "Filing: we file to Companies House and HMRC and confirm submission receipts",
    ],
    itemsToNote: [
      "We can work with Xero or your current bookkeeping setup, but clean records speed everything up.",
      "Corporation tax is normally due 9 months and 1 day after your period end, even though the return filing deadline is later.",
      "Director loan accounts, dividends, and expenses need to be recorded correctly to avoid issues later.",
    ],
    whatWeNeedFromYou: [
      "Access to bookkeeping (ideally Xero) and supporting documents",
      "Bank statements and loan statements where relevant",
      "Dividend paperwork if dividends were paid",
      "Any year-end questions answered promptly (we keep these to a minimum)",
    ],
    typicalTimeline: [
      "Most year ends are completed within a few weeks once records are ready.",
      "If bookkeeping is behind or reconciliations are incomplete, we agree a clean-up plan first.",
    ],
    extraCopy: [
      "Statutory accounts are more than a box-ticking exercise. They are the formal record of how your company performed in the year, and they need to reconcile back to your bookkeeping and supporting evidence. When the underlying records are clean, the year end is straightforward. When they are not, it becomes time-consuming and stressful. Our approach is to make sure the foundations are right so you can file with confidence and move on.",
      "We also focus on the practical side: deadlines, cash flow, and clarity. Corporation tax is usually due before the CT600 filing deadline, so we help you understand what is due and when. If something unusual is sitting in the accounts (director loans, dividends, one-off transactions), we flag it early and explain the options in plain English so there are no surprises later.",
    ],
    faqs: [
      {
        q: "Do you handle both Companies House and HMRC filings?",
        a: "Yes. We prepare and file statutory accounts to Companies House and the corporation tax return/computation to HMRC.",
      },
      {
        q: "Can you help if my bookkeeping is messy?",
        a: "Yes. We will either tidy it as part of the year-end process or recommend a quick bookkeeping clean-up first, depending on the state of the records.",
      },
      {
        q: "What software do you use?",
        a: "We commonly work in Xero, but we can support other setups. If you're unsure, we will advise the simplest path.",
      },
      {
        q: "What do you need from me?",
        a: "Usually access to records plus answers to a small set of questions (dividends, director loans, unusual transactions).",
      },
    ],
  },
  "payroll-paye": {
    intro:
      "Payroll run accurately, RTI filed on time, and HMRC kept happy. Whether you are a director-only company or you have a team, we keep payroll smooth and predictable.",
    whatWeDo: [
      "Run payroll (monthly/weekly) and issue payslips",
      "Submit RTI (FPS/EPS) to HMRC on time",
      "Handle starters/leavers, P45s and P60s",
      "Support statutory payments where relevant (SSP, SMP etc.)",
      "Help with auto-enrolment admin alongside payroll",
    ],
    howWeWork: [
      "Set up: confirm pay frequency, tax codes, NI categories, pension provider, and pay dates",
      "Each pay run: we confirm any changes, process payroll, send payslips, and submit RTI",
      "After payroll: we confirm what is due to HMRC and when",
      "Year end: we complete year-end steps and issue P60s",
    ],
    itemsToNote: [
      "RTI submissions must be filed on or before payday.",
      "Employment Allowance rules can be nuanced (e.g. director-only companies often do not qualify).",
      "Auto-enrolment duties apply once you have eligible employees.",
    ],
    whatWeNeedFromYou: [
      "Employee details (start dates, NI numbers, addresses, pay rates)",
      "Any changes each period (bonuses, overtime, leavers, new starters)",
      "Pension provider details (if applicable)",
    ],
    typicalTimeline: [
      "Setup is usually quick once we have the employee list and pay dates.",
      "Ongoing runs follow your pay calendar; we work backwards from payday to keep approvals simple.",
    ],
    extraCopy: [
      "Payroll is one of those areas where small mistakes compound. A late RTI submission, an incorrect tax code, or a missed pension duty can create a trail of admin and HMRC follow-up. We keep the process simple: confirm changes, run payroll, file RTI, and tell you exactly what is due and when. The result is a predictable payroll rhythm for you and your team.",
      "For director-only companies, the goal is often tax efficiency and compliance rather than complexity. We can run a clean director payroll alongside your year-end accounts and tax, and coordinate with dividends so everything is documented properly and your records stay consistent.",
    ],
    faqs: [
      {
        q: "Can you run payroll for a director-only company?",
        a: "Yes. We can run a simple director payroll and keep RTI compliant, then coordinate with dividends as needed.",
      },
      {
        q: "Do you handle pensions?",
        a: "We can support auto-enrolment admin and payroll deductions. If you need help choosing a provider, we will point you to suitable options.",
      },
      {
        q: "What happens if we miss a deadline?",
        a: "We structure the process so you do not. If we are waiting on approvals or last-minute changes, we will flag the risk early.",
      },
      {
        q: "Do you use Xero payroll?",
        a: "We can, and we also support other payroll tools depending on your setup.",
      },
    ],
  },
  "bookkeeping-xero": {
    intro:
      "Clean, organised books in Xero so your numbers are always ready. We keep transactions coded properly, bank reconciliations up to date, and a tidy audit trail behind the scenes.",
    whatWeDo: [
      "Bank reconciliations and transaction coding",
      "Receipt capture and supplier bill workflows (where needed)",
      "VAT-ready records and clean supporting evidence",
      "Month-end tidy-ups so reporting is meaningful",
      "A finance stack that actually connects (bank feeds, expense tools, payroll, reporting)",
    ],
    howWeWork: [
      "Initial tidy-up: confirm accounts, tracking categories, and rules",
      "Ongoing cadence: weekly or monthly bookkeeping depending on volume",
      "Month-end checks: reconcile key balance sheet items and flag anomalies",
      "Handover: you get clear outputs (and your year end is far easier)",
    ],
    itemsToNote: [
      "Good bookkeeping is what makes VAT, management accounts, and year-end painless.",
      "We can work with your existing chart of accounts or propose a cleaner structure.",
      "If you have multiple revenue streams, we can set up tracking categories to make reporting useful.",
    ],
    whatWeNeedFromYou: [
      "Access to Xero (or we can help you set it up)",
      "Bank and card feeds connected where possible",
      "A simple process for uploading receipts and invoices",
      "Clarity on what is business vs personal (especially for director expenses)",
    ],
    typicalTimeline: [
      "A tidy-up can take a few days to a few weeks depending on backlog and complexity.",
      "Once clean, ongoing bookkeeping becomes quick and predictable.",
    ],
    extraCopy: [
      "Good bookkeeping is not about perfection, it is about reliability. When transactions are coded consistently and reconciliations are up to date, you can actually trust your P&L, your cash position, and your VAT returns. That means better decisions and fewer last-minute scrambles when a deadline hits.",
      "We also build for scalability. As your transaction volume increases, manual processes break. We help you set up bank rules, receipt capture, and a simple workflow so your finance stack works as one system. The goal is tidy records now, and a structure that does not fall apart as you grow.",
    ],
    faqs: [
      {
        q: "Do you only work with Xero?",
        a: "Xero is our default, but we can support other setups. If you want simplicity, we will usually recommend moving to Xero.",
      },
      {
        q: "Can you clean up historic bookkeeping?",
        a: "Yes. We can do a catch-up and then move to a regular cadence.",
      },
      {
        q: "Will this help my VAT and year end?",
        a: "Yes. Clean books are the foundation for accurate VAT returns, management accounts, and year-end filings.",
      },
      {
        q: "How often do you do bookkeeping?",
        a: "Usually weekly or monthly, depending on transaction volume and how quickly you want reporting.",
      },
    ],
  },
  "fractional-cfo": {
    intro:
      "Senior finance leadership without the full-time cost. We help you make better decisions, plan ahead, and keep the story behind the numbers credible to investors, lenders, and stakeholders.",
    whatWeDo: [
      "Cash and runway planning (with early warning signals)",
      "Decision support: pricing, hiring, growth trade-offs, margin analysis",
      "Fundraising support and investor narrative (numbers that stack up)",
      "Board-level reporting and monthly finance leadership",
      "Finance systems and process improvements as you scale",
    ],
    howWeWork: [
      "Discovery: understand your business model, constraints, and goals",
      "Baseline: clean reporting so you trust the numbers",
      "Cadence: regular check-ins, metrics review, and priorities for the month",
      "Delivery: clear outputs (packs, forecasts, analyses) that help you act",
    ],
    itemsToNote: [
      "Fractional CFO works best with a clear cadence and a small set of decision priorities.",
      "If your bookkeeping is behind, we will fix the foundation first so forecasts and packs are reliable.",
      "You do not need complexity; you need clarity and consistency.",
    ],
    whatWeNeedFromYou: [
      "Access to reporting (Xero, bank, payroll, key metrics) and your current KPIs",
      "A view of pipeline/revenue drivers and payment terms",
      "Regular time with you (and optionally your ops/sales lead) for decision-making",
    ],
    typicalTimeline: [
      "Week 1-2: baseline reporting and cash visibility.",
      "Weeks 3-4: first pack/forecast and decision support cadence.",
    ],
    extraCopy: [
      "A fractional CFO should make decisions easier. That means turning numbers into clarity: what is really driving performance, what the constraints are, and what you can do next. We focus on the metrics that matter, keep the reporting consistent, and help you prioritise actions that move cash and profitability in the right direction.",
      "If you are raising funding or reporting to stakeholders, credibility matters. We help you build a narrative that matches the numbers and stands up to scrutiny. That might mean tightening reporting, improving forecasting, or pressure-testing assumptions before you take them into a board meeting or investor conversation.",
    ],
    faqs: [
      {
        q: "Is this only for venture-backed startups?",
        a: "No. It is useful for any growing business that needs senior finance thinking without a full-time hire.",
      },
      {
        q: "What outputs do we get?",
        a: "Typically a monthly pack, cash forecast, KPI tracking, and ad-hoc analysis for key decisions.",
      },
      {
        q: "How many days per month do you work with us?",
        a: "It depends on what you need. We agree a simple scope and cadence up front and adjust as the business evolves.",
      },
      {
        q: "Can you join board meetings?",
        a: "Yes, where it is helpful. We can support preparation and attend to help explain the numbers.",
      },
    ],
  },
  "management-reporting": {
    intro:
      "Monthly packs that help you run the business. Clear P&L, cash, key KPIs, and commentary in plain English, delivered on a consistent schedule so you can spot trends quickly.",
    whatWeDo: [
      "Monthly management accounts and KPI dashboards",
      "Variance analysis (actual vs budget, trend lines, what changed and why)",
      "Cash position and short-term cash planning",
      "Plain-English narrative and action points",
      "Pack formats suitable for founders, boards, and investors",
    ],
    howWeWork: [
      "Set the pack: choose KPIs and the structure that matters to you",
      "Fix the source: make sure bookkeeping and data inputs are reliable",
      "Monthly cadence: close the month, produce the pack, review together",
      "Iterate: refine as your business evolves",
    ],
    itemsToNote: [
      "Consistency beats complexity: the same format each month makes patterns obvious.",
      "Management accounts are only as good as the underlying bookkeeping and coding.",
      "We keep the narrative tight: what happened, why, and what you do next.",
    ],
    whatWeNeedFromYou: [
      "Access to bookkeeping (Xero) and bank",
      "Agreement on KPI definitions (so the numbers mean the same thing each month)",
      "Any monthly context (one-offs, major changes, new hires, pricing shifts)",
    ],
    typicalTimeline: [
      "First pack: usually within the first month after setup and clean data inputs.",
      "Ongoing: delivered on a fixed schedule agreed with you.",
    ],
    extraCopy: [
      "Management accounts are only valuable if they are timely and actionable. We design packs so you can see performance quickly: what changed, why it changed, and what decisions it implies. That might be adjusting pricing, tightening costs, focusing on a segment, or fixing collection issues that are hurting cash.",
      "We keep the format consistent month to month. That consistency is what makes trends obvious. Over time, the pack becomes a tool you and your team actually use, not a PDF that gets filed away. If you need board-ready reporting, we can shape the same core numbers into a narrative suitable for investors and stakeholders.",
    ],
    faqs: [
      {
        q: "What is included in a typical pack?",
        a: "P&L, balance sheet summary, cash summary, KPI dashboard, and commentary with actions and risks.",
      },
      {
        q: "Can you tailor KPIs to our business model?",
        a: "Yes. We will help define KPIs that reflect how your business actually makes money and spends cash.",
      },
      {
        q: "Is this the same as statutory accounts?",
        a: "No. Statutory accounts are annual compliance. Management accounts are operational reporting to run the business.",
      },
      {
        q: "Do you present this to our board or investors?",
        a: "Yes, we can help prepare and present where needed.",
      },
    ],
  },
  vat: {
    intro:
      "VAT registration, scheme selection, and returns handled properly. We keep you compliant, avoid nasty surprises, and make sure you reclaim what you are entitled to.",
    whatWeDo: [
      "VAT registration and deregistration",
      "Advice on schemes (standard, flat rate, cash accounting, annual accounting)",
      "Prepare and submit VAT returns on time",
      "MTD-compliant record-keeping setup and checks",
      "Support with HMRC queries and VAT clean-ups",
    ],
    howWeWork: [
      "Assess: confirm whether you need to register and which scheme fits",
      "Set up: ensure MTD compliance and clean VAT coding in bookkeeping",
      "Return cadence: gather inputs, review, submit, and confirm payment/refund position",
      "Ongoing: monitor threshold, anomalies, and scheme suitability as you grow",
    ],
    itemsToNote: [
      "VAT thresholds are based on rolling 12-month taxable turnover, not the tax year.",
      "Schemes can save time (and sometimes tax), but the wrong scheme can cost you.",
      "Good VAT starts with clean bookkeeping and consistent coding.",
    ],
    whatWeNeedFromYou: [
      "Access to bookkeeping and bank feeds",
      "Clarity on what you sell and where your customers are (UK/overseas)",
      "Any unusual transactions flagged early (imports/exports, large purchases)",
    ],
    typicalTimeline: [
      "Registration: typically a few weeks depending on HMRC processing times.",
      "Returns: we work to your quarterly/monthly schedule with clear deadlines.",
    ],
    extraCopy: [
      "VAT is easiest when the bookkeeping is set up correctly. Most issues we see come from inconsistent coding, missing evidence, or misunderstanding what is taxable vs exempt. We put simple rules in place so your VAT position reflects reality and your returns are straightforward to review and submit.",
      "We also help you choose the right approach for your business. The flat rate scheme can simplify admin but it is not always the cheapest. Cash accounting can improve cash flow for businesses with slow-paying customers. We will explain the trade-offs and recommend the option that fits your customer base and margins.",
    ],
    faqs: [
      {
        q: "Do you handle VAT registration?",
        a: "Yes. We can register you, advise on scheme choice, and then manage ongoing returns.",
      },
      {
        q: "Can you help if our VAT has been done incorrectly?",
        a: "Yes. We can review, correct coding, and advise on amendments where needed.",
      },
      {
        q: "Do you support flat rate scheme decisions?",
        a: "Yes. We will model the impact and advise whether it suits your business.",
      },
      {
        q: "Do you deal with HMRC queries?",
        a: "Yes, we can support responses and provide the documentation HMRC requests.",
      },
    ],
  },
  "cash-flow-management": {
    intro:
      "A rolling 13-week cash forecast and early warning monitoring so you always know where you stand. We help you avoid surprises and make decisions with cash, not hope.",
    whatWeDo: [
      "Build and maintain a 13-week rolling cash forecast",
      "Track actual vs forecast and refine assumptions",
      "Flag pinch points early with clear actions",
      "Support decisions: hiring, spend, pricing, payment terms, funding needs",
      "Optional runway and scenario modelling",
    ],
    howWeWork: [
      "Build: connect bank data and key drivers (invoices, payroll, tax, spend)",
      "Cadence: weekly updates for the next 4-6 weeks, then rolling updates",
      "Actions: we agree what to do when a pinch point is identified",
      "Refine: forecasts improve quickly once you track variance consistently",
    ],
    itemsToNote: [
      "A forecast is only useful if it is updated. We focus on a simple weekly rhythm.",
      "Tax payments (VAT, PAYE, corporation tax) are often the biggest predictable outflows.",
      "Payment terms and debtor management often matter more than headline profitability.",
    ],
    whatWeNeedFromYou: [
      "Bank access and a list of recurring costs (payroll, rent, software, loans)",
      "Visibility of invoice pipeline and expected receipts",
      "Agreement on who owns actions (collections, spending decisions, funding)",
    ],
    typicalTimeline: [
      "Initial forecast: typically within 1-2 weeks once inputs are available.",
      "Then updated weekly on an agreed day and time.",
    ],
    extraCopy: [
      "Cash flow management is about control. A rolling 13-week forecast gives you visibility early enough to act, whether that is chasing invoices, delaying spend, adjusting payment terms, or lining up funding. We focus on a simple rhythm so the forecast stays current and useful rather than becoming stale.",
      "We build forecasts around your real cash drivers: payroll, VAT and PAYE dates, recurring costs, and expected receipts. Over time, tracking actual vs forecast improves accuracy and makes the forecast a reliable decision tool, not just an exercise in guesswork.",
    ],
    faqs: [
      {
        q: "Is this only for businesses in trouble?",
        a: "No. High-growth businesses use cash forecasts to plan hiring, marketing spend, and tax payments without surprises.",
      },
      {
        q: "Do you use a spreadsheet or software?",
        a: "We can use a spreadsheet or a forecasting tool depending on complexity. The important part is cadence and accuracy.",
      },
      {
        q: "How often is it updated?",
        a: "Weekly is typical. The next few weeks matter most, so we keep it tight and current.",
      },
      {
        q: "Will it include VAT and PAYE dates?",
        a: "Yes. We include all predictable tax outflows so the forecast reflects real cash.",
      },
    ],
  },
  "board-investor-reporting": {
    intro:
      "Investor-ready packs and board reporting that tell the right story with numbers that stack up. We help you present performance clearly and answer questions confidently.",
    whatWeDo: [
      "Board packs: monthly/quarterly performance updates",
      "Investor updates: metrics, narrative, and forward-looking view",
      "KPI definitions and consistency (so you do not change the goalposts)",
      "Budget vs actual and variance commentary",
      "Fundraising support materials where required",
    ],
    howWeWork: [
      "Define audience: board, lenders, investors, internal leadership",
      "Define metrics: choose the handful that genuinely matter",
      "Build pack: consistent structure and clean narrative",
      "Review cadence: we iterate until it is crisp and repeatable",
    ],
    itemsToNote: [
      "Boards care about clarity: what happened, why, risks, and what you are doing next.",
      "Consistency matters more than perfection: same definitions, same format.",
      "A pack should be easy to read quickly and hard to misinterpret.",
    ],
    whatWeNeedFromYou: [
      "Access to financials and KPIs (and how you define them today)",
      "Context: product roadmap, sales pipeline, operational constraints",
      "Any board/investor expectations (templates, metrics, deadlines)",
    ],
    typicalTimeline: [
      "First pack: usually within a month once data sources are reliable.",
      "Then delivered on the board/investor schedule (monthly or quarterly).",
    ],
    extraCopy: [
      "Boards and investors do not want more numbers, they want the right numbers and a clear explanation. We build packs that are easy to scan, hard to misinterpret, and anchored to consistent KPI definitions. That means fewer distractions, better questions, and more productive decisions.",
      "We also support the narrative. If performance is strong, we help you explain why it is repeatable. If it is under pressure, we help you frame the plan, the risks, and the actions you are taking. Good reporting builds trust, which matters when you need support, investment, or patience from stakeholders.",
    ],
    faqs: [
      {
        q: "Can you help with investor updates as well as board packs?",
        a: "Yes. We can prepare a board pack and a lighter investor update version depending on what you need.",
      },
      {
        q: "Do you attend meetings?",
        a: "We can. Some clients want us in the room to explain the numbers and answer questions.",
      },
      {
        q: "What if our KPIs are not well defined?",
        a: "That is common. We will help define them so reporting is consistent and meaningful.",
      },
      {
        q: "Can you help with fundraising materials?",
        a: "Yes. We can support financial narrative, metrics, and the model behind the story.",
      },
    ],
  },
  "budgeting-forecasting": {
    intro:
      "Annual budgets and quarterly reforecasts that stay useful. We build a plan your team actually uses, then keep it updated so decisions are made with current numbers.",
    whatWeDo: [
      "Build an annual budget grounded in realistic assumptions",
      "Quarterly reforecasts (or more frequent where needed)",
      "Scenario planning (what if revenue drops, what if we hire, what if spend increases)",
      "Tie forecast to cash impact (not just profit)",
      "Support targets, accountability, and performance tracking",
    ],
    howWeWork: [
      "Understand drivers: revenue model, pricing, capacity, margins, costs",
      "Build: a simple model with clear assumptions and sensitivity",
      "Align: agree targets and what will be tracked monthly",
      "Reforecast: incorporate actuals and update forward view each quarter",
    ],
    itemsToNote: [
      "A budget is a plan; a forecast is the updated reality. We help you use both.",
      "Keeping assumptions explicit makes updates fast and avoids confusion.",
      "Most businesses benefit from a 12-month view with a detailed next quarter.",
    ],
    whatWeNeedFromYou: [
      "Your current pricing, pipeline assumptions, and cost base",
      "Any planned hires or major spend decisions",
      "Agreement on which KPIs and targets matter most",
    ],
    typicalTimeline: [
      "Initial budget build: typically 1-3 weeks depending on complexity and stakeholder inputs.",
      "Reforecast: quarterly sessions, usually faster once the model exists.",
    ],
    extraCopy: [
      "A budget is useful when it reflects how your business actually operates. We build plans from the drivers up: pricing, conversion, capacity, delivery costs, and headcount. That makes the plan easier to update and more credible when you are explaining performance internally or externally.",
      "We also tie the plan to cash. Profitability is important, but cash timing is what keeps you safe. By linking assumptions to receipts, tax dates, and spend, you get a plan that helps you avoid surprises and make decisions early, not after the bank balance forces your hand.",
    ],
    faqs: [
      {
        q: "Do you build this in a spreadsheet?",
        a: "Usually yes for speed and transparency, unless your business needs a dedicated planning tool.",
      },
      {
        q: "How often should we reforecast?",
        a: "Quarterly is typical. If things change quickly, monthly reforecasts for a short period can be sensible.",
      },
      {
        q: "Can you include hiring and headcount planning?",
        a: "Yes. Headcount is usually the biggest cost driver, so we build it in clearly.",
      },
      {
        q: "Will it include cash flow?",
        a: "Yes. We tie the plan to cash so you understand runway and timing of tax payments.",
      },
    ],
  },
};


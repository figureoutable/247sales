"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Expense = { name: string; description: string };
type Category = { title: string; expenses: Expense[] };
type EntityType = "soleTrader" | "limitedCompany";

const EXPENSE_DATA: Record<EntityType, Category[]> = {
  soleTrader: [
    {
      title: "Office and workspace",
      expenses: [
        {
          name: "Use-of-home simplified expenses",
          description:
            "Flat-rate allowance of £6, £10 or £26 per week based on hours worked at home under HMRC simplified expenses.",
        },
        {
          name: "Use-of-home actual costs",
          description:
            "Proportion of rent, mortgage interest, utilities and council tax for a dedicated home office used for trade.",
        },
        {
          name: "Home office electricity",
          description:
            "Business share of electricity for lighting, heating and equipment in your home workspace.",
        },
        {
          name: "Home office heating",
          description:
            "Apportioned gas or oil heating costs attributable to the room or area used for business.",
        },
        {
          name: "Council tax apportionment",
          description:
            "Business percentage of council tax when part of your home is used regularly and exclusively for trade.",
        },
        {
          name: "Commercial office rent",
          description:
            "Rent for a separate studio, shop or office premises used wholly for your sole trade.",
        },
        {
          name: "Serviced office membership",
          description:
            "Hot-desk or serviced office fees where the space is used for client meetings and business activity.",
        },
        {
          name: "Office cleaning",
          description:
            "Cleaning costs for your dedicated business workspace at home or in separately rented premises.",
        },
        {
          name: "Office stationery and supplies",
          description:
            "Paper, pens, folders, envelopes and general consumables used in running your business.",
        },
        {
          name: "Business water rates share",
          description:
            "Apportioned water charges where your home office or trade activity increases household water use.",
        },
      ],
    },
    {
      title: "Travel and vehicles",
      expenses: [
        {
          name: "Mileage allowance (car)",
          description:
            "45p per mile for the first 10,000 business miles and 25p thereafter using HMRC approved mileage rates.",
        },
        {
          name: "Mileage allowance (motorcycle)",
          description:
            "24p per mile for qualifying business journeys made on a motorcycle instead of claiming actual costs.",
        },
        {
          name: "Mileage allowance (bicycle)",
          description:
            "20p per mile for business journeys by bicycle under HMRC approved mileage rates.",
        },
        {
          name: "Vehicle running costs",
          description:
            "Fuel, insurance, servicing, repairs and road tax claimed instead of mileage if more tax-efficient.",
        },
        {
          name: "Public transport fares",
          description:
            "Train, bus, tube and tram fares for journeys that are wholly and necessarily for business.",
        },
        {
          name: "Parking and tolls",
          description:
            "Business parking fees, congestion charges, ULEZ and road tolls on qualifying trade journeys.",
        },
        {
          name: "Hotel accommodation",
          description:
            "Overnight stays when travelling on business away from your normal place of work.",
        },
        {
          name: "Subsistence on business trips",
          description:
            "Reasonable meal and refreshment costs during overnight business travel or extended away days.",
        },
        {
          name: "Taxi and ride-hailing",
          description:
            "Taxi or ride-hailing fares for business journeys between workplaces, sites or client locations.",
        },
        {
          name: "Short-term vehicle hire",
          description:
            "Car or van hire charges where the vehicle is used exclusively for business purposes.",
        },
      ],
    },
    {
      title: "Technology and equipment",
      expenses: [
        {
          name: "Computer and laptop",
          description:
            "Purchase cost or capital allowances on computers used to carry on your sole trade.",
        },
        {
          name: "Mobile phone (business use)",
          description:
            "Contract, SIM and handset costs apportioned to the percentage of business use.",
        },
        {
          name: "Broadband (business share)",
          description:
            "Reasonable proportion of home broadband attributable to your business activity.",
        },
        {
          name: "Software subscriptions",
          description:
            "Accounting, design, CRM, productivity and industry software used in your trade.",
        },
        {
          name: "Cloud storage and hosting",
          description:
            "Dropbox, Google Workspace, website hosting and backup services for business files.",
        },
        {
          name: "Printer and consumables",
          description:
            "Printer purchase and ink or toner for invoices, records and client documents.",
        },
        {
          name: "IT support and repairs",
          description:
            "Technical support, servicing and repair of equipment used in your business.",
        },
        {
          name: "Annual Investment Allowance items",
          description:
            "Plant and machinery qualifying for 100% AIA deduction in the year of purchase.",
        },
        {
          name: "Small tools and equipment",
          description:
            "Lower-value tools and equipment deductible under cash basis or revenue rules.",
        },
        {
          name: "Website domain and SSL",
          description:
            "Domain registration, renewal and security certificates for your business website.",
        },
      ],
    },
    {
      title: "Professional services",
      expenses: [
        {
          name: "Accountant fees",
          description:
            "Fees for preparing self-assessment tax returns, accounts and business tax advice.",
        },
        {
          name: "Bookkeeper fees",
          description:
            "Costs of recording transactions, reconciling bank accounts and maintaining business records.",
        },
        {
          name: "Legal advice (business)",
          description:
            "Solicitor fees for contracts, terms of business, debt recovery and trade disputes.",
        },
        {
          name: "Professional membership fees",
          description:
            "Subscriptions to professional bodies required or directly relevant to your trade.",
        },
        {
          name: "Professional indemnity insurance",
          description:
            "PI insurance cover required for regulated professions or client-facing advisory work.",
        },
        {
          name: "Public liability insurance",
          description:
            "Insurance against third-party injury or property damage arising from your business activities.",
        },
        {
          name: "Trade-specific licences",
          description:
            "Licensing and registration fees legally required to carry on your sole trade.",
        },
        {
          name: "Tax dispute professional fees",
          description:
            "Accountant or tax adviser fees for HMRC enquiries and appeals relating to your trade.",
        },
        {
          name: "CPD and skills maintenance training",
          description:
            "Courses that update existing professional skills rather than train you in a new trade.",
        },
        {
          name: "Business consultancy",
          description:
            "One-off advice on pricing, operations or strategy directly related to your sole trade.",
        },
      ],
    },
    {
      title: "Marketing and advertising",
      expenses: [
        {
          name: "Website design and build",
          description:
            "Agency or freelancer fees to create, redesign or maintain your business website.",
        },
        {
          name: "Online advertising",
          description:
            "Paid search, social media and display advertising promoting your products or services.",
        },
        {
          name: "Print advertising",
          description:
            "Newspaper, magazine, leaflet drops and local directory adverts for your business.",
        },
        {
          name: "Business cards and stationery",
          description:
            "Branded business cards, letterheads and compliment slips used for trade promotion.",
        },
        {
          name: "Networking and trade show fees",
          description:
            "Admission to expos, trade fairs and networking events to promote your business.",
        },
        {
          name: "Promotional materials",
          description:
            "Brochures, flyers, banners and leaflets distributed to prospective customers.",
        },
        {
          name: "Marketing photography",
          description:
            "Product, portfolio or headshot photography used in your business marketing.",
        },
        {
          name: "Social media management tools",
          description:
            "Scheduling, analytics and design subscriptions for your business social accounts.",
        },
        {
          name: "Local sponsorship",
          description:
            "Sponsorship of events or teams where your business name is clearly advertised.",
        },
        {
          name: "Email marketing platform",
          description:
            "Mailchimp, Klaviyo or similar services used to market your business to subscribers.",
        },
      ],
    },
    {
      title: "Staff and employment costs",
      expenses: [
        {
          name: "Subcontractor payments",
          description:
            "Payments to self-employed subcontractors for work that forms part of your trade.",
        },
        {
          name: "Casual labour",
          description:
            "Wages paid to temporary helpers for specific jobs connected to your business.",
        },
        {
          name: "Agency worker fees",
          description:
            "Charges from employment agencies for temporary staff supporting your sole trade.",
        },
        {
          name: "Employee wages",
          description:
            "Gross wages paid to employees engaged in your sole trader business.",
        },
        {
          name: "Employer National Insurance",
          description:
            "Class 1 secondary NIC paid on employee earnings above secondary threshold.",
        },
        {
          name: "Auto-enrolment pension contributions",
          description:
            "Employer pension contributions for eligible employees under workplace pensions rules.",
        },
        {
          name: "Payroll bureau fees",
          description:
            "Outsourced payroll processing and RTI filing when you employ staff.",
        },
        {
          name: "Staff training",
          description:
            "Training courses for employees that relate directly to your business operations.",
        },
        {
          name: "Reimbursed employee expenses",
          description:
            "Mileage, subsistence and other expenses reimbursed to employees on business duties.",
        },
        {
          name: "Recruitment advertising",
          description:
            "Job board listings and adverts when hiring employees for your sole trade.",
        },
      ],
    },
    {
      title: "Finance and banking",
      expenses: [
        {
          name: "Business bank account charges",
          description:
            "Monthly account fees, transaction charges and CHAPS fees on a dedicated business account.",
        },
        {
          name: "Business loan interest",
          description:
            "Interest on loans and overdrafts used wholly and exclusively for business purposes.",
        },
        {
          name: "Hire purchase interest",
          description:
            "Interest element of hire purchase agreements on assets used in your trade.",
        },
        {
          name: "Credit card charges (business)",
          description:
            "Interest and annual fees on credit cards used solely for business spending.",
        },
        {
          name: "Payment processing fees",
          description:
            "Stripe, PayPal, SumUp and card terminal charges on your business sales.",
        },
        {
          name: "Bad debts written off",
          description:
            "Irrecoverable trade debts from customers written off against your business income.",
        },
        {
          name: "Invoice financing fees",
          description:
            "Factoring or invoice discounting fees for advancing cash against trade debtors.",
        },
        {
          name: "Foreign exchange charges",
          description:
            "Bank FX fees and spreads on currency conversion for business transactions.",
        },
        {
          name: "Merchant terminal rental",
          description:
            "Monthly rental of card payment terminals used to take customer payments.",
        },
        {
          name: "Accounting software subscription",
          description:
            "Xero, QuickBooks or FreeAgent subscriptions for bookkeeping and VAT returns.",
        },
      ],
    },
    {
      title: "Health and wellbeing",
      expenses: [
        {
          name: "Eye test (display screen work)",
          description:
            "Eye examinations where you regularly use a screen as an integral part of your trade.",
        },
        {
          name: "Protective gloves and masks",
          description:
            "PPE worn solely for business activities in trades with health and safety requirements.",
        },
        {
          name: "Safety boots and footwear",
          description:
            "Protective footwear required by health and safety rules for your trade.",
        },
        {
          name: "High-visibility clothing",
          description:
            "Hi-vis jackets and vests required for site, roadside or warehouse work.",
        },
        {
          name: "Hard hats and helmets",
          description:
            "Head protection required on construction, engineering or industrial job sites.",
        },
        {
          name: "Hearing protection",
          description:
            "Ear defenders or plugs where workplace noise is a hazard in your trade.",
        },
        {
          name: "Sunscreen (outdoor trades)",
          description:
            "Sun protection accepted by HMRC as a reasonable expense for outdoor tradespeople.",
        },
        {
          name: "First aid supplies",
          description:
            "First aid kits and refills kept at your business premises or work vehicle.",
        },
        {
          name: "Occupational health screening",
          description:
            "Legally mandated medical checks for regulated activities such as driving or food handling.",
        },
        {
          name: "Thermal workwear",
          description:
            "Insulated clothing solely required for outdoor business work in cold conditions.",
        },
      ],
    },
    {
      title: "Clothing and uniform",
      expenses: [
        {
          name: "Branded uniforms",
          description:
            "Clothing carrying your business logo that is not suitable for everyday private wear.",
        },
        {
          name: "Protective overalls",
          description:
            "Overalls and coveralls used exclusively in workshop, factory or dirty environments.",
        },
        {
          name: "Chef whites and kitchen wear",
          description:
            "Kitchen uniforms required for catering and food preparation businesses.",
        },
        {
          name: "Performance costumes",
          description:
            "Costumes used solely for professional performances, acting or entertainment work.",
        },
        {
          name: "Uniform laundry costs",
          description:
            "Cleaning costs for specialist protective or branded clothing used only for work.",
        },
        {
          name: "Replacement uniform items",
          description:
            "Renewing worn branded or protective workwear essential to your trade.",
        },
        {
          name: "Embroidered work polo shirts",
          description:
            "Branded shirts provided to staff or worn by you that are clearly business uniform.",
        },
        {
          name: "Trade aprons",
          description:
            "Protective aprons for hairdressing, catering, crafts and similar sole trades.",
        },
        {
          name: "Clinical scrubs",
          description:
            "Scrubs worn exclusively for private healthcare or beauty treatment work.",
        },
        {
          name: "Professional uniform hire",
          description:
            "Rental of uniforms or protective clothing required for your business activities.",
        },
      ],
    },
    {
      title: "Miscellaneous business costs",
      expenses: [
        {
          name: "Postage and packaging",
          description:
            "Royal Mail, courier and packaging materials for sending goods and documents to clients.",
        },
        {
          name: "Trade publications",
          description:
            "Industry magazines and journals that keep you informed in your business sector.",
        },
        {
          name: "Chamber of Commerce membership",
          description:
            "Local chamber or business network subscriptions that support your trade.",
        },
        {
          name: "Trade waste disposal",
          description:
            "Commercial waste collection and recycling from your business premises or van.",
        },
        {
          name: "Promotional business gifts",
          description:
            "Small gifts bearing your business advertisement costing £50 or less per recipient per year.",
        },
        {
          name: "Stock and raw materials",
          description:
            "Materials and components consumed in producing goods or delivering services for sale.",
        },
        {
          name: "Packaging materials",
          description:
            "Boxes, tape, labels and protective packaging for dispatching customer orders.",
        },
        {
          name: "Insurance policy excess",
          description:
            "Excess paid on a business insurance claim related to your trade.",
        },
        {
          name: "Trademark renewal fees",
          description:
            "Renewal costs for registered trademarks used in your sole trader business.",
        },
        {
          name: "Plant and machinery repairs",
          description:
            "Repair and maintenance of tools and equipment used to carry on your trade.",
        },
      ],
    },
  ],
  limitedCompany: [
    {
      title: "Office and workspace",
      expenses: [
        {
          name: "Commercial office rent",
          description:
            "Rent paid by the company for offices, workshops or retail premises used for trade.",
        },
        {
          name: "Service charges and ground rent",
          description:
            "Building service charges and ground rent on company-occupied business premises.",
        },
        {
          name: "Business rates",
          description:
            "Non-domestic rates levied on property used by the company for business purposes.",
        },
        {
          name: "Office utilities",
          description:
            "Electricity, gas and water supplied to company offices and charged to the company.",
        },
        {
          name: "Office cleaning and hygiene",
          description:
            "Contract cleaning, waste bins and hygiene services for company workspace.",
        },
        {
          name: "Office furniture and fittings",
          description:
            "Desks, chairs, shelving and fittings capitalised or expensed by the company.",
        },
        {
          name: "Meeting room hire",
          description:
            "External meeting room rental booked and paid for by the company.",
        },
        {
          name: "Co-working space fees",
          description:
            "Company membership of shared workspace providers for staff and directors.",
        },
        {
          name: "Office refreshments",
          description:
            "Tea, coffee and water provided in the office, generally treated as trivial benefits.",
        },
        {
          name: "Reception and security services",
          description:
            "Front desk, access control and building security contracted by the company.",
        },
      ],
    },
    {
      title: "Travel and vehicles",
      expenses: [
        {
          name: "Company car running costs",
          description:
            "Fuel, servicing, insurance and repairs on vehicles owned or leased by the company.",
        },
        {
          name: "Company car fuel benefit",
          description:
            "Fuel paid by the company for directors or employees, reportable as a benefit in kind.",
        },
        {
          name: "Director mileage reimbursement",
          description:
            "Approved mileage payments from the company to directors using personal cars on business.",
        },
        {
          name: "Electric vehicle charging",
          description:
            "Workplace or public charging costs for company-owned or leased electric vehicles.",
        },
        {
          name: "Rail and air travel",
          description:
            "Train and flight tickets booked by the company for directors and staff on business.",
        },
        {
          name: "Hotels for business trips",
          description:
            "Accommodation costs for directors and employees travelling on company business.",
        },
        {
          name: "Subsistence (overnight travel)",
          description:
            "Meal costs during overnight UK or overseas business travel for company personnel.",
        },
        {
          name: "Congestion and ULEZ charges",
          description:
            "Congestion charge, ULEZ and clean air zone fees on company vehicles for business use.",
        },
        {
          name: "Vehicle lease payments",
          description:
            "Contract hire and finance lease rentals on cars and vans provided by the company.",
        },
        {
          name: "Pool car expenses",
          description:
            "Running costs of pool cars made available for business travel without private use.",
        },
      ],
    },
    {
      title: "Technology and equipment",
      expenses: [
        {
          name: "Laptops and computers",
          description:
            "Devices purchased or leased by the company for directors and employees.",
        },
        {
          name: "Company mobile phones",
          description:
            "Handsets and contracts paid by the company, often exempt from BIK if business use only.",
        },
        {
          name: "Server and network infrastructure",
          description:
            "On-premise servers, switches and cabling owned and maintained by the company.",
        },
        {
          name: "Software licences (SaaS)",
          description:
            "Microsoft 365, Adobe Creative Cloud and other subscriptions paid by the company.",
        },
        {
          name: "Cyber security services",
          description:
            "Antivirus, endpoint protection, firewalls and penetration testing for company IT.",
        },
        {
          name: "Annual Investment Allowance",
          description:
            "100% capital allowance on qualifying plant and machinery purchased by the company.",
        },
        {
          name: "Full expensing",
          description:
            "Enhanced first-year allowance on eligible new main rate plant and machinery assets.",
        },
        {
          name: "R&D capital equipment",
          description:
            "Equipment used in qualifying research and development projects by the company.",
        },
        {
          name: "Video conferencing equipment",
          description:
            "Cameras, microphones and displays installed in company meeting rooms.",
        },
        {
          name: "IT asset disposal (WEEE)",
          description:
            "Compliant recycling and data-wiping of replaced company electronic equipment.",
        },
      ],
    },
    {
      title: "Professional services",
      expenses: [
        {
          name: "Auditors fees",
          description:
            "Statutory audit fees where required or voluntarily commissioned by the company.",
        },
        {
          name: "Accountant and tax advisor fees",
          description:
            "Preparation of company accounts, corporation tax returns and tax planning advice.",
        },
        {
          name: "Company secretarial services",
          description:
            "Maintaining statutory registers, minutes and filing confirmation statements.",
        },
        {
          name: "Commercial solicitors fees",
          description:
            "Contracts, shareholders agreements, property leases and employment law advice.",
        },
        {
          name: "HR consultancy",
          description:
            "External HR support on contracts, policies, grievances and redundancies.",
        },
        {
          name: "Employers liability insurance",
          description:
            "Statutory employers liability insurance covering injury claims by employees.",
        },
        {
          name: "Directors and officers insurance",
          description:
            "D&O insurance protecting company directors against certain liability claims.",
        },
        {
          name: "Companies House filing fees",
          description:
            "Confirmation statement, incorporation and other statutory filing charges.",
        },
        {
          name: "Patent Box advisory fees",
          description:
            "Specialist tax advice on claiming Patent Box relief on qualifying profits.",
        },
        {
          name: "R&D tax credit consultancy",
          description:
            "Professional fees for preparing and supporting HMRC R&D relief claims.",
        },
      ],
    },
    {
      title: "Marketing and advertising",
      expenses: [
        {
          name: "Digital marketing campaigns",
          description:
            "PPC, paid social and programmatic advertising run through the company accounts.",
        },
        {
          name: "PR agency retainer",
          description:
            "Public relations services promoting the company brand and leadership.",
        },
        {
          name: "Trade show exhibition costs",
          description:
            "Stand hire, build, graphics and staff costs at industry exhibitions.",
        },
        {
          name: "Corporate website development",
          description:
            "Agency fees for designing and building the company's marketing website.",
        },
        {
          name: "Branded merchandise",
          description:
            "Promotional items such as pens, mugs and tote bags bearing company branding.",
        },
        {
          name: "SEO and content marketing",
          description:
            "Agency retainers and tool subscriptions for search optimisation and content.",
        },
        {
          name: "Corporate video production",
          description:
            "Promotional and explainer videos produced for the company's marketing.",
        },
        {
          name: "Customer referral incentives",
          description:
            "Structured referral fees and affiliate commissions paid to acquire customers.",
        },
        {
          name: "Market research surveys",
          description:
            "Commissioned research to inform company product and market strategy.",
        },
        {
          name: "Corporate sponsorship agreements",
          description:
            "Sponsorship deals providing measurable brand exposure for the company.",
        },
      ],
    },
    {
      title: "Staff and employment costs",
      expenses: [
        {
          name: "Director salaries",
          description:
            "Salaries paid through PAYE to working directors for duties performed for the company.",
        },
        {
          name: "Employer National Insurance",
          description:
            "Class 1 secondary NIC on employee and director salaries above the secondary threshold.",
        },
        {
          name: "Employer pension contributions",
          description:
            "Auto-enrolment and voluntary employer contributions to workplace pension schemes.",
        },
        {
          name: "Employee bonuses",
          description:
            "Performance and discretionary bonuses processed through company payroll.",
        },
        {
          name: "Statutory maternity pay",
          description:
            "SMP paid to eligible employees, with most amounts recoverable from HMRC.",
        },
        {
          name: "Apprenticeship levy",
          description:
            "Levy at 0.5% on payroll over £3 million, offset by apprenticeship training spend.",
        },
        {
          name: "Recruitment agency fees",
          description:
            "Fees for permanent hires and executive search charged to the company.",
        },
        {
          name: "Staff training and development",
          description:
            "Courses, qualifications and conferences funded by the employer for staff.",
        },
        {
          name: "Agency and temporary staff",
          description:
            "Costs of agency workers and contractors engaged via PAYE umbrella arrangements.",
        },
        {
          name: "Taxable employee benefits",
          description:
            "Benefits in kind such as gym or medical plans where employer reports via P11D.",
        },
      ],
    },
    {
      title: "Finance and banking",
      expenses: [
        {
          name: "Bank interest on company loans",
          description:
            "Interest on commercial loans, overdrafts and revolving credit facilities.",
        },
        {
          name: "Invoice discounting charges",
          description:
            "Fees and interest for financing trade receivables through invoice discounting.",
        },
        {
          name: "Merchant acquirer fees",
          description:
            "Card processing and interchange fees on sales collected by the company.",
        },
        {
          name: "Foreign exchange losses (trade)",
          description:
            "Losses on settling foreign currency trade debts and commercial transactions.",
        },
        {
          name: "Specific bad debts written off",
          description:
            "Identified irrecoverable trade debts written off from company debtors.",
        },
        {
          name: "Directors loan account interest",
          description:
            "Interest credited by the company on overdrawn directors loan accounts.",
        },
        {
          name: "Finance lease interest",
          description:
            "Finance charge element in lease agreements for company assets.",
        },
        {
          name: "Bank charges and transfer fees",
          description:
            "Account fees, CHAPS, SWIFT and international payment charges on company accounts.",
        },
        {
          name: "Trade credit insurance",
          description:
            "Premiums to insure the company's trade debtors against customer default.",
        },
        {
          name: "Corporate credit card fees",
          description:
            "Annual card fees and FX charges on company credit cards used for business.",
        },
      ],
    },
    {
      title: "Health and wellbeing",
      expenses: [
        {
          name: "Private medical insurance (employees)",
          description:
            "PMI premiums paid by the company, taxable as a benefit in kind on employees.",
        },
        {
          name: "Employee Assistance Programme",
          description:
            "Confidential counselling and support service funded by the company for staff.",
        },
        {
          name: "Cycle to Work scheme",
          description:
            "Salary sacrifice bicycles and safety equipment provided under the government scheme.",
        },
        {
          name: "Workplace flu vaccinations",
          description:
            "Company-funded flu jabs offered to employees during the winter season.",
        },
        {
          name: "Employee eye tests (DSE)",
          description:
            "Eye examinations for employees who regularly use display screen equipment.",
        },
        {
          name: "Occupational health services",
          description:
            "OH referrals, fitness-for-work assessments and case management for employees.",
        },
        {
          name: "Company gym membership",
          description:
            "Gym subscriptions paid by the employer and reported as a taxable benefit in kind.",
        },
        {
          name: "Mental health first aid training",
          description:
            "Training employees as mental health first aiders in the workplace.",
        },
        {
          name: "Health cash plans",
          description:
            "Dental, optical and physio cash plans provided as employee benefits.",
        },
        {
          name: "On-site physiotherapy",
          description:
            "Physiotherapy sessions funded by the company for employee wellbeing.",
        },
      ],
    },
    {
      title: "Clothing and uniform",
      expenses: [
        {
          name: "Company-branded uniforms",
          description:
            "Uniforms provided to staff that are not suitable for private use, often BIK-exempt.",
        },
        {
          name: "Employer-provided PPE",
          description:
            "Protective clothing and equipment supplied by the company for workplace safety.",
        },
        {
          name: "Uniform laundry allowance",
          description:
            "Flat-rate or actual cleaning costs reimbursed for qualifying work uniforms.",
        },
        {
          name: "Theatre and film wardrobe",
          description:
            "Costumes provided by a production company for performers and crew.",
        },
        {
          name: "Kitchen staff uniforms",
          description:
            "Chef jackets, hats and kitchen wear supplied to catering company employees.",
        },
        {
          name: "Embroidered staff polo shirts",
          description:
            "Branded shirts issued to employees that clearly identify company uniform.",
        },
        {
          name: "Safety boots (employer provided)",
          description:
            "Protective footwear issued to warehouse, factory and construction site staff.",
        },
        {
          name: "High-vis company jackets",
          description:
            "Branded high-visibility jackets issued to employees working on sites.",
        },
        {
          name: "Uniform hire and rental",
          description:
            "Rented uniforms for cleaning, manufacturing or hospitality company staff.",
        },
        {
          name: "Scheduled PPE replacement",
          description:
            "Regular renewal of employer-provided helmets, gloves and protective equipment.",
        },
      ],
    },
    {
      title: "Miscellaneous business costs",
      expenses: [
        {
          name: "R&D revenue expenditure",
          description:
            "Qualifying day-to-day R&D costs eligible for enhanced corporation tax deduction.",
        },
        {
          name: "Patent registration costs",
          description:
            "Fees for registering and maintaining company patents and intellectual property.",
        },
        {
          name: "Trade body subscriptions",
          description:
            "Company membership fees for industry associations and professional bodies.",
        },
        {
          name: "Qualifying charitable donations",
          description:
            "Donations to UK charities deductible against company profits for corporation tax.",
        },
        {
          name: "ICO data protection fee",
          description:
            "Annual fee paid to the Information Commissioner's Office by the company.",
        },
        {
          name: "Staff suggestion scheme awards",
          description:
            "Tax-free staff suggestion awards made within HMRC approved scheme limits.",
        },
        {
          name: "Annual staff party (£150 head)",
          description:
            "Christmas or annual event exempt from BIK if cost is £150 or less per head.",
        },
        {
          name: "Legal settlement costs (trade)",
          description:
            "Settlements paid in connection with disputes arising from company trade.",
        },
        {
          name: "Pension scheme administration",
          description:
            "Setup and ongoing admin fees for the company's workplace pension scheme.",
        },
        {
          name: "PAYE settlement agreement costs",
          description:
            "Tax and Class 1 NIC settled by the company under a HMRC PAYE settlement agreement.",
        },
      ],
    },
  ],
};

export default function TaxDeductibleExpensesPage() {
  const [entityType, setEntityType] = useState<EntityType | null>(null);
  const [openCategories, setOpenCategories] = useState<Set<number>>(new Set());

  function toggleCategory(index: number) {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  function selectEntityType(type: EntityType) {
    setEntityType(type);
    setOpenCategories(new Set());
  }

  const categories = entityType ? EXPENSE_DATA[entityType] : [];

  return (
    <div className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900">Tax Deductible Expenses</h1>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={() => selectEntityType("soleTrader")}
            className={`flex-1 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
              entityType === "soleTrader"
                ? "bg-primary text-white"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            Sole Trader / Self-Employed
          </button>
          <button
            type="button"
            onClick={() => selectEntityType("limitedCompany")}
            className={`flex-1 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
              entityType === "limitedCompany"
                ? "bg-primary text-white"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            Limited Company Director
          </button>
        </div>

        {!entityType && (
          <p className="mt-8 text-base text-slate-600">
            Select your situation above to see expenses relevant to you.
          </p>
        )}

        {entityType && (
          <>
            <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              This list is for general guidance only and applies to UK taxpayers. Eligibility
              depends on your specific circumstances. Always confirm with a qualified accountant
              before making a claim.
            </div>

            <div className="mt-8 divide-y divide-slate-200 border-t border-slate-200">
              {categories.map((category, index) => {
                const isOpen = openCategories.has(index);
                return (
                  <div key={category.title}>
                    <button
                      type="button"
                      onClick={() => toggleCategory(index)}
                      className="flex w-full items-center justify-between py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base font-semibold text-slate-900">
                        {category.title}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <ul className="pb-4 space-y-4">
                        {category.expenses.map((expense) => (
                          <li key={expense.name}>
                            <p className="font-semibold text-slate-900">{expense.name}</p>
                            <p className="mt-1 text-sm text-slate-600">{expense.description}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

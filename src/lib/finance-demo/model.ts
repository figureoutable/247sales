/** Shared shape for all three demo companies (static TS data). */

export type FinanceDemoBundle = {
  months: string[];
  financialYearEnd: Date;
  /**
   * When set, used for the “VAT return & payment” row on the overview deadlines card.
   * Otherwise the dashboard uses a rolling quarterly estimate from today.
   */
  nextVatReturnDueDate?: Date;
  corpTaxRate: number;
  revenue: number[];
  totalCogs: number[];
  grossProfit: number[];
  grossMarginPct: number[];
  totalOpex: number[];
  ebitda: number[];
  operatingProfit: number[];
  corpTax: number[];
  cashInflows: number[];
  cashOutflows: number[];
  netCashMovement: number[];
  closingCash: number[];
  mrr: number[];
  arr: number[];
  momGrowthPct: number[];
  customers: number[];
  newCustomers: number[];
  churnedCustomers: number[];
  monthlyChurnPct: number[];
  nrr: number[];
  cac: number[];
  ltv: number[];
  ltvCacRatio: number[];
  cacPayback: number[];
  /** Barbershop / seat-based model: KPI £ per chair per working day (same length as `months`). */
  revenuePerChairPerDay?: number[];
  /** Chairs in the model (for chart footnote). */
  seatCount?: number;
  /** Barbershop P&L split (same length as `months`). */
  ownerServiceRevenue?: number[];
  chairRentRevenue?: number[];
  /** Barbershop operating cost lines from P&L (monthly, ex-VAT where applicable). */
  shopOperatingCosts?: ShopOperatingCostsSeries;
  /** Recruitment agency: perm + contract NFI, placements, and opex lines (same length as `months`). */
  recruitmentAgency?: RecruitmentAgencySeries;
};

/** Operating expense lines from recruitment P&L (excludes staff costs). */
export type RecruitmentOpexSeries = {
  officeRent: number[];
  jobBoardsAdvertising: number[];
  crmTech: number[];
  bdMarketing: number[];
  accountancyCompliance: number[];
  insurance: number[];
  phoneComms: number[];
  bankMisc: number[];
};

export type RecruitmentAgencySeries = {
  permFeeIncome: number[];
  contractMarginIncome: number[];
  totalPlacements: number[];
  permPlacements: number[];
  interviewsConducted: number[];
  placementConversionRate: number[];
  avgPermFeePerPlacement: number[];
  revenuePerConsultant: number[];
  staffCostPctNfi: number[];
  ebitdaMarginPct: number[];
  totalCommissionPaid: number[];
  avgTimeToFillDays: number[];
  recruitmentOpex: RecruitmentOpexSeries;
};

/** One series per P&L line; each array aligns with `months`. */
export type ShopOperatingCostsSeries = {
  rentRates: number[];
  utilities: number[];
  consumables: number[];
  insurance: number[];
  cleaning: number[];
  marketing: number[];
  professionalAndBank: number[];
};

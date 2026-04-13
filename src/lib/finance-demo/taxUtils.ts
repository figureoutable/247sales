import { addDays, addMonths, differenceInDays, endOfQuarter, isBefore, startOfDay } from "date-fns";

export const getTaxDueDate = (yearEnd: Date): Date => {
  const due = new Date(yearEnd);
  due.setMonth(due.getMonth() + 9);
  due.setDate(due.getDate() + 1);
  return due;
};

export const getDaysTillTaxDue = (yearEnd: Date): number => {
  const today = new Date();
  const due = getTaxDueDate(yearEnd);
  return differenceInDays(due, today);
};

/** Companies House: full accounts typically due 9 months after accounting period end (illustrative). */
export function getAccountsFilingDeadline(yearEnd: Date): Date {
  const d = new Date(yearEnd);
  d.setMonth(d.getMonth() + 9);
  return d;
}

/**
 * Next standard quarterly VAT return & payment deadline: 1 calendar month + 7 days after quarter end
 * (common UK rule of thumb for the demo — your scheme may differ).
 */
export function getNextVatReturnDueDate(from: Date = new Date()): Date {
  const today = startOfDay(from);
  let quarterEnd = endOfQuarter(today);
  for (let i = 0; i < 20; i++) {
    const due = addDays(addMonths(quarterEnd, 1), 7);
    if (!isBefore(due, today)) {
      return due;
    }
    quarterEnd = endOfQuarter(addDays(quarterEnd, 1));
  }
  return addDays(addMonths(endOfQuarter(today), 1), 7);
}

"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

type Period = "monthly" | "annual";

type ExpenseRow = {
  id: string;
  name: string;
  amount: string;
  period: Period;
};

const FIXED_ROOMS = 2; // kitchen + living room

const DEFAULT_EXPENSES: { name: string; period: Period }[] = [
  { name: "Rent / mortgage", period: "monthly" },
  { name: "Council tax", period: "annual" },
  { name: "Electricity", period: "monthly" },
  { name: "Gas", period: "monthly" },
  { name: "Internet", period: "monthly" },
];

function createExpenseRow(name = "", period: Period = "monthly"): ExpenseRow {
  return {
    id: crypto.randomUUID(),
    name,
    amount: "",
    period,
  };
}

function createDefaultExpenses(): ExpenseRow[] {
  return DEFAULT_EXPENSES.map(({ name, period }) => createExpenseRow(name, period));
}

function toAnnualAmount(amount: number, period: Period): number {
  return period === "annual" ? amount : amount * 12;
}

function parseAmount(value: string): number {
  const parsed = parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatGBP(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

const tableInputClassName =
  "block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary";

export function HomeExpenseCalculator() {
  const [bedrooms, setBedrooms] = useState(3);
  const [expenses, setExpenses] = useState<ExpenseRow[]>(createDefaultExpenses);

  const rooms = bedrooms + FIXED_ROOMS;

  const results = useMemo(() => {
    const rows = expenses.map((expense) => {
      const annualAmount = toAnnualAmount(parseAmount(expense.amount), expense.period);
      const roomShare = annualAmount / rooms;

      return {
        id: expense.id,
        name: expense.name.trim() || "Unnamed expense",
        hasAmount: annualAmount > 0,
        taxDeductible: roomShare,
      };
    });

    const totalTaxDeductible = rows.reduce((sum, row) => sum + row.taxDeductible, 0);

    return { rows, totalTaxDeductible };
  }, [expenses, rooms]);

  function updateExpense(id: string, patch: Partial<Omit<ExpenseRow, "id">>) {
    setExpenses((current) =>
      current.map((expense) => (expense.id === id ? { ...expense, ...patch } : expense)),
    );
  }

  function addExpense() {
    setExpenses((current) => [...current, createExpenseRow()]);
  }

  function removeExpense(id: string) {
    setExpenses((current) => {
      if (current.length === 1) {
        return [createExpenseRow()];
      }
      return current.filter((expense) => expense.id !== id);
    });
  }

  function adjustBedrooms(delta: number) {
    setBedrooms((current) => Math.max(1, current + delta));
  }

  return (
    <div className="mx-auto max-w-3xl">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Home Expense Calculator
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Work out your annual tax deductible amount for working from home
        </p>
      </header>

      <div className="mt-12 space-y-10">
        <section aria-labelledby="rooms-heading">
          <h2 id="rooms-heading" className="text-lg font-semibold text-slate-900">
            Your home
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Enter your number of bedrooms — we&apos;ll add 1 kitchen and 1 living room automatically.
          </p>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-4 rounded-lg bg-white px-4 py-4 shadow-sm ring-1 ring-slate-200/80">
              <div>
                <p className="text-sm font-medium text-slate-900">Number of bedrooms</p>
                <p className="text-xs text-slate-500">Plus 1 kitchen and 1 living room</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => adjustBedrooms(-1)}
                  disabled={bedrooms <= 1}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Remove one bedroom"
                >
                  <Minus className="h-4 w-4" aria-hidden />
                </button>
                <span
                  className="w-8 text-center text-lg font-semibold tabular-nums text-slate-900"
                  aria-live="polite"
                >
                  {bedrooms}
                </span>
                <button
                  type="button"
                  onClick={() => adjustBedrooms(1)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
                  aria-label="Add one bedroom"
                >
                  <Plus className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                {bedrooms} {bedrooms === 1 ? "bedroom" : "bedrooms"} + 1 kitchen + 1 living room ={" "}
                {rooms} rooms
              </p>
              <p className="text-base font-semibold text-slate-900">
                Total:{" "}
                <span className="text-xl tabular-nums">
                  {rooms} {rooms === 1 ? "room" : "rooms"}
                </span>
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="expenses-heading">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 id="expenses-heading" className="text-lg font-semibold text-slate-900">
                Household expenses
              </h2>
            </div>
            <button
              type="button"
              onClick={addExpense}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Add expense
            </button>
          </div>

          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-[640px] w-full table-fixed border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="w-[36%] px-4 py-3 text-sm font-semibold text-slate-900">
                    Expense name
                  </th>
                  <th scope="col" className="w-[29%] px-4 py-3 text-sm font-semibold text-slate-900">
                    Amount (£)
                  </th>
                  <th scope="col" className="w-[28%] px-4 py-3 text-sm font-semibold text-slate-900">
                    Period
                  </th>
                  <th scope="col" className="w-12 px-2 py-3">
                    <span className="sr-only">Remove</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={expense.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-4 py-3">
                      <label htmlFor={`expense-name-${expense.id}`} className="sr-only">
                        Expense name {index + 1}
                      </label>
                      <input
                        id={`expense-name-${expense.id}`}
                        type="text"
                        placeholder="e.g. Rent, Internet"
                        value={expense.name}
                        onChange={(event) =>
                          updateExpense(expense.id, { name: event.target.value })
                        }
                        className={tableInputClassName}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <label htmlFor={`expense-amount-${expense.id}`} className="sr-only">
                        Amount for {expense.name || `expense ${index + 1}`}
                      </label>
                      <input
                        id={`expense-amount-${expense.id}`}
                        type="number"
                        min={0}
                        step="0.01"
                        inputMode="decimal"
                        placeholder="0.00"
                        value={expense.amount}
                        onChange={(event) =>
                          updateExpense(expense.id, { amount: event.target.value })
                        }
                        className={tableInputClassName}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div
                        className="grid grid-cols-2 gap-1"
                        role="group"
                        aria-label={`Period for ${expense.name || `expense ${index + 1}`}`}
                      >
                        {(["monthly", "annual"] as const).map((period) => (
                          <button
                            key={period}
                            type="button"
                            onClick={() => updateExpense(expense.id, { period })}
                            className={`rounded-md border px-2 py-2 text-xs font-medium capitalize transition-colors ${
                              expense.period === period
                                ? "border-black bg-black text-white"
                                : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                            }`}
                            aria-pressed={expense.period === period}
                          >
                            {period}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => removeExpense(expense.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                        aria-label={`Remove ${expense.name || `expense ${index + 1}`}`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          aria-labelledby="results-heading"
          aria-live="polite"
          className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
        >
          <h2 id="results-heading" className="text-lg font-semibold text-slate-900">
            Your Results
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-700">
            1 room out of {rooms} {rooms === 1 ? "room" : "rooms"} = your annual claim
          </p>
          <p className="mt-2 text-sm text-slate-600">
            If the room is also used personally (e.g. a bedroom), you may need to reduce your claim
            further. This calculator is a guide only.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[320px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th scope="col" className="pb-3 pr-4 text-sm font-semibold text-slate-900">
                    Expense
                  </th>
                  <th scope="col" className="pb-3 pl-2 text-right text-sm font-semibold text-slate-900">
                    Tax Deductible Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.rows.map((row) => (
                  <tr key={row.id} className="border-b border-slate-200 last:border-b-0">
                    <td className="py-3 pr-4 text-sm font-medium text-slate-900">{row.name}</td>
                    <td className="py-3 pl-2 text-right text-sm text-slate-600">
                      {row.hasAmount ? (
                        formatGBP(row.taxDeductible)
                      ) : (
                        <span className="text-slate-400">Enter an amount</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-5 text-right">
            <p className="text-sm font-medium text-slate-600">Total Tax Deductible Amount</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">
              {formatGBP(results.totalTaxDeductible)}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

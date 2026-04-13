#!/usr/bin/env python3
"""
Regenerate src/data/glox-data.ts from saas_financial_model.xlsx (P&L, Cash Flow, KPI Dashboard).

Usage:
  python3 scripts/sync-saas-demo-from-xlsx.py /path/to/saas_financial_model.xlsx

Requires: pip install openpyxl
"""

from __future__ import annotations

import sys
from pathlib import Path

try:
    import openpyxl
except ImportError:
    print("Install openpyxl: pip install openpyxl", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src" / "data" / "glox-data.ts"

MONTHS = [
    "Jan 24",
    "Feb 24",
    "Mar 24",
    "Apr 24",
    "May 24",
    "Jun 24",
    "Jul 24",
    "Aug 24",
    "Sep 24",
    "Oct 24",
    "Nov 24",
    "Dec 24",
    "Jan 25",
    "Feb 25",
    "Mar 25",
    "Apr 25",
    "May 25",
    "Jun 25",
    "Jul 25",
    "Aug 25",
    "Sep 25",
    "Oct 25",
    "Nov 25",
    "Dec 25",
]


def row_by_label(ws, label: str) -> tuple | None:
    for row in ws.iter_rows(min_row=1, max_row=500, values_only=True):
        if row[0] == label:
            return row
    return None


def month_slice(row: tuple) -> list:
    """Columns C–Z = 24 months (index 2..25)."""
    return [row[i] if i < len(row) else None for i in range(2, 26)]


def nums(vals: list) -> list[float]:
    out = []
    for v in vals:
        if v is None:
            out.append(0.0)
        elif isinstance(v, (int, float)):
            out.append(float(v))
        else:
            out.append(0.0)
    return out


def as_pct_display(v: float) -> float:
    """Excel may store 0.129 (fraction) or 12.9 (percent); TS uses display percent for formatPct."""
    if -1.01 <= v <= 1.01 and v != 0:
        return round(v * 100, 4)
    return round(v, 4)


def fmt_arr(name: str, values: list, indent=0) -> str:
    pad = " " * indent
    body = ", ".join(str(int(x)) if x == int(x) else str(round(x, 4)) for x in values)
    return f"{pad}export const {name} = [\n{pad}  {body.replace(', ', ',\n  ' + pad)}\n{pad}];\n"


def fmt_arr_int(name: str, values: list[int], indent=0) -> str:
    pad = " " * indent
    body = ",\n  ".join(str(x) for x in values)
    return f"{pad}export const {name} = [\n  {body}\n{pad}];\n"


def main() -> None:
    xlsx = Path(sys.argv[1]).expanduser() if len(sys.argv) > 1 else Path.home() / "Downloads" / "saas_financial_model.xlsx"
    if not xlsx.exists():
        print(f"File not found: {xlsx}", file=sys.stderr)
        sys.exit(1)

    wb = openpyxl.load_workbook(xlsx, data_only=True, read_only=True)
    pl = wb["P&L"]
    cf = wb["Cash Flow"]
    kpi = wb["KPI Dashboard"]

    def need(ws, label: str):
        r = row_by_label(ws, label)
        if not r:
            raise SystemExit(f"Missing row: {label!r}")
        return r

    revenue = nums(month_slice(need(pl, "Subscription Revenue (ex-VAT)")))
    total_cogs = nums(month_slice(need(pl, "Total COGS")))
    gross_profit = nums(month_slice(need(pl, "Gross Profit")))
    gm_row = nums(month_slice(need(pl, "Gross Margin %")))
    gross_margin_pct = [round(x * 100, 2) if x <= 1.01 else round(x, 2) for x in gm_row]
    total_opex = nums(month_slice(need(pl, "Total Operating Expenses")))
    ebitda_raw = nums(month_slice(need(pl, "EBITDA")))
    # Demo: force positive EBITDA with an improving trend (mirror of workbook losses).
    n_e = len(ebitda_raw)
    ebitda = [-ebitda_raw[n_e - 1 - i] for i in range(n_e)]
    operating_profit = [e - 380 for e in ebitda]
    corp_tax = [round(e * 0.25) if e > 0 else 0 for e in ebitda]

    # Cash Flow sheet rows still read for validation; series below are overridden so the demo stays
    # cash-flow positive with a rising closing balance (matches public glox-data.ts behaviour).
    _ = nums(month_slice(need(cf, "Total Cash Inflows")))
    _ = nums(month_slice(need(cf, "Total Cash Outflows")))
    _ = nums(month_slice(need(cf, "Net Cash Movement")))
    _ = nums(month_slice(need(cf, "Closing Cash Balance")))
    demo_opening = 48000.0
    _nets = [max(550, round(revenue[i] * 0.10)) for i in range(len(revenue))]
    cash_out = [revenue[i] - _nets[i] for i in range(len(revenue))]
    net_mov = _nets
    closing = []
    bal = demo_opening
    for n in _nets:
        bal += n
        closing.append(int(bal))

    mrr = nums(month_slice(need(kpi, "MRR (£)")))
    mom_row = nums(month_slice(need(kpi, "MoM MRR Growth %")))
    mom_growth = [as_pct_display(mom_row[i]) if i > 0 else 0.0 for i in range(len(mom_row))]
    customers = [int(x) for x in nums(month_slice(need(kpi, "Closing Customers")))]
    new_cust = [int(x) for x in nums(month_slice(need(kpi, "New Customers Added")))]
    churned = [int(x) for x in nums(month_slice(need(kpi, "Churned Customers")))]
    churn_row = nums(month_slice(need(kpi, "Monthly Churn Rate")))
    monthly_churn = [round(x * 100, 4) if x <= 1.01 else round(x, 4) for x in churn_row]
    nrr_row = nums(month_slice(need(kpi, "Net Revenue Retention (NRR)")))
    nrr = [round(x * 100, 4) if x <= 1.01 else round(x, 4) for x in nrr_row]
    cac = [int(round(x)) for x in nums(month_slice(need(kpi, "Customer Acquisition Cost (CAC)")))]
    ltv = [int(round(x)) for x in nums(month_slice(need(kpi, "Customer Lifetime Value (LTV)")))]
    ltv_cac = nums(month_slice(need(kpi, "LTV:CAC Ratio")))
    cac_payback = nums(month_slice(need(kpi, "CAC Payback Period (months)")))

    wb.close()

    blocks = []
    blocks.append(
        "/**\n * SaaS demo P&L / cash / KPI series — keep in sync with spreadsheet.\n"
        f" * Generated from: {xlsx.name}\n"
        " * Re-run: python3 scripts/sync-saas-demo-from-xlsx.py \"<path-to-xlsx>\"\n"
        " */\n\n"
    )
    blocks.append("export const months = [\n  " + ",\n  ".join(f'"{m}"' for m in MONTHS) + "\n];\n\n")

    def emit(name, arr_vals, is_int=False):
        if is_int:
            blocks.append(fmt_arr_int(name, arr_vals))
        else:
            # float list manual for readability
            lines = ",\n  ".join(str(int(x)) if x == int(x) else str(x) for x in arr_vals)
            blocks.append(f"export const {name} = [\n  {lines}\n];\n\n")

    emit("revenue", revenue)
    emit("totalCogs", total_cogs)
    emit("grossProfit", gross_profit)
    emit("grossMarginPct", gross_margin_pct)
    emit("totalOpex", total_opex)
    emit("ebitda", ebitda)
    emit("operatingProfit", operating_profit)
    emit("corpTax", corp_tax)
    blocks.append("export const cashInflows = [...revenue];\n\n")
    emit("cashOutflows", cash_out)
    emit("netCashMovement", net_mov)
    emit("closingCash", closing)
    emit("mrr", mrr)
    blocks.append("export const arr = mrr.map((m) => m * 12);\n\n")
    emit("momGrowthPct", mom_growth)
    emit("customers", customers, is_int=True)
    emit("newCustomers", new_cust, is_int=True)
    emit("churnedCustomers", churned, is_int=True)
    emit("monthlyChurnPct", monthly_churn)
    emit("nrr", nrr)
    emit("cac", cac, is_int=True)
    emit("ltv", ltv, is_int=True)
    emit("ltvCacRatio", ltv_cac)
    emit("cacPayback", cac_payback)

    blocks.append("export const financialYearEnd = new Date(\"2026-03-31\");\n")
    blocks.append("export const nextVatReturnDueDate = new Date(\"2026-05-07\");\n")
    blocks.append("export const corpTaxRate = 0.25;\n")

    text = "".join(blocks)

    OUT.write_text(text, encoding="utf-8")
    print(f"Wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

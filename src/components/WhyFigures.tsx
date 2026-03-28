import { WHY_FIGURES_ROWS } from "@/lib/constants";

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconCross({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
  );
}

export function WhyFigures() {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Why Figures Chartered Accountants?
        </h2>
        <p className="mt-4 text-center text-lg text-slate-600">
          We’re not your typical accountant. Here’s how we compare.
        </p>
        <div className="mt-12 overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200" role="table">
            <thead>
              <tr className="bg-slate-50">
                <th scope="col" className="px-4 py-4 text-left text-sm font-semibold text-slate-900 sm:px-6">
                  Aspect
                </th>
                <th scope="col" className="px-4 py-4 text-left text-sm font-semibold text-slate-900 sm:px-6">
                  Figures
                </th>
                <th scope="col" className="px-4 py-4 text-left text-sm font-semibold text-slate-600 sm:px-6">
                  Other accountants
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {WHY_FIGURES_ROWS.map((row, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                    {row.aspect}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700 sm:px-6">
                    <span className="inline-flex items-start gap-2">
                      <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600/85" />
                      <span>{row.figures}</span>
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-500 sm:px-6">
                    <span className="inline-flex items-start gap-2">
                      <IconCross className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500/75" />
                      <span>{row.others}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

import { WHY_FIGURES_ROWS } from "@/lib/constants";

export function WhyFigures() {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Why Figures?
        </h2>
        <p className="mt-4 text-center text-lg text-slate-600">
          We’re not your typical accountant. Here’s how we compare.
        </p>
        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
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
                    {row.figures}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-500 sm:px-6">
                    {row.others}
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

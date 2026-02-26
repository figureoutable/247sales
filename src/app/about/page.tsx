import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
  description:
    "Josh founded Figures in 2022 in Surrey. EY, Barclays, Crown Agents Bank. FTX, Credit Suisse, UBS, Metro Bank, Lloyds. Making accounting oddly satisfying for founders.",
};

export default function AboutPage() {
  return (
    <div className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          About Figures
        </h1>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">Josh’s background</h2>
          <p className="mt-4 text-slate-600">
            Josh built his career in restructuring and management accounting before founding Figures. 
            He spent years at <strong>EY</strong> (restructuring), <strong>Barclays</strong> (management accounting), 
            and <strong>Crown Agents Bank</strong>, where he led finance and saw first-hand how opaque and slow 
            traditional accounting can feel for growing businesses.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">Notable engagements</h2>
          <p className="mt-4 text-slate-600">
            His experience includes high-profile engagements with <strong>FTX</strong>, <strong>Credit Suisse</strong>, 
            <strong> UBS</strong>, <strong>Metro Bank</strong>, and <strong>Lloyds Bank</strong>. That background gives 
            him the rigour and clarity to handle complex situations — but he’s chosen to focus on what he enjoys most: 
            helping founders and small businesses get accounting that actually works for them.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">The Figures story</h2>
          <p className="mt-4 text-slate-600">
            Figures was founded in <strong>2022</strong> in <strong>Surrey</strong>. We’re a team of three: 
            approachable, responsive, and committed to plain English. We’re not a big-four outfit — we’re the 
            kind of accountant you can message when something’s on your mind and get a same-day reply.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">Our mission</h2>
          <p className="mt-4 text-slate-600">
            We want to make accounting <strong>oddly satisfying</strong> for founders and small businesses. 
            That means clear numbers, no jargon, transparent pricing, and support that feels like part of your 
            team — not a once-a-year form-filling exercise.
          </p>
        </section>

        <div className="mt-16 rounded-2xl bg-slate-50 p-8 text-center">
          <p className="text-lg font-medium text-slate-900">
            Fancy a chat? Book a discovery call and we’ll tell you more.
          </p>
          <a
            href="https://cal.com/figures/discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Schedule a call
          </a>
        </div>
      </div>
    </div>
  );
}

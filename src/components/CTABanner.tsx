import { CAL_LINK } from "@/lib/constants";

export function CTABanner() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl rounded-3xl bg-primary px-6 py-16 text-center sm:px-12 sm:py-20">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Schedule a call & find out more
        </h2>
        <p className="mt-4 text-lg text-white/90">
          No obligation. We’ll chat about your situation and how we can help.
        </p>
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-primary shadow-sm transition-colors hover:bg-slate-100"
        >
          Book a discovery call
        </a>
      </div>
    </section>
  );
}

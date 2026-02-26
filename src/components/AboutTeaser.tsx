import Link from "next/link";
import Image from "next/image";

export function AboutTeaser() {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full sm:h-48 sm:w-48">
          <Image
            src="/josh.png"
            alt="Josh"
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 160px, 192px"
            priority
          />
        </div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Meet Josh
        </h2>
        <p className="mt-6 text-lg text-slate-600">
          Josh co-founded Figures in 2023 after building his career at EY (restructuring), Barclays, and Crown Agents Bank. He brings big-firm rigour and small-team responsiveness so you get advice you can trust, without the corporate runaround.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-flex items-center text-base font-semibold text-primary hover:underline"
        >
          Read the full story
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

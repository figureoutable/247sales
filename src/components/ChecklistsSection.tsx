import Image from "next/image";
import { CHECKLISTS } from "@/data/checklists";

export function ChecklistsSection({ className }: { className?: string }) {
  return (
    <section className={className} aria-labelledby="checklists-heading">
      <h2
        id="checklists-heading"
        className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
      >
        Free checklists for smarter accounting
      </h2>
      <div className="mt-12 grid gap-3 text-left sm:grid-cols-3 sm:gap-4">
        {CHECKLISTS.map((checklist) => (
          <a
            key={checklist.id}
            href={checklist.pdfHref}
            download
            className="group overflow-hidden rounded-xl border border-emerald-200 bg-white shadow-sm transition-colors hover:border-emerald-300"
          >
            <div className="relative h-28 w-full bg-white sm:aspect-[4/3] sm:h-auto">
              <Image
                src={checklist.previewSrc}
                alt={checklist.previewAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="p-4 sm:p-5">
              <p className="text-sm font-semibold text-slate-900 group-hover:text-black">
                {checklist.title}
              </p>
              <p className="mt-2 text-sm text-slate-600">{checklist.subtitle}</p>
              <p className="mt-3 text-sm font-medium text-emerald-700">Download PDF</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

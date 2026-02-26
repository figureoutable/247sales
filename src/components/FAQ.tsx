"use client";

import { FAQ_ITEMS } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible defaultValue="item-0" className="mt-12 space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="rounded-xl border border-slate-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <AccordionTrigger className="py-4 text-left text-base font-semibold text-slate-900 hover:no-underline dark:text-white">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-zinc-400">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { CalEmbed } from "@/components/CalEmbed";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Figures. Send a message or schedule a discovery call. UK accounting and advisory for founders and small businesses.",
};

export default function ContactPage() {
  return (
    <div className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Get in touch
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Send us a message or book a call. We’ll get back to you quickly.
        </p>
        <ContactForm />

        <section className="mt-16" aria-labelledby="book-call-heading">
          <h2 id="book-call-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Or book a call directly
          </h2>
          <p className="mt-2 text-slate-600">
            Pick a time that works for you — no need to leave this page.
          </p>
          <CalEmbed className="mt-6" />
        </section>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-12 max-w-xl">
      <h2 className="text-lg font-semibold text-slate-900">Send a message</h2>
      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4"
        aria-label="Contact form"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-full bg-black px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-70"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "sent" && (
          <p className="text-sm text-green-600" role="status">
            Thanks — we’ll be in touch soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600" role="alert">
            Something went wrong. Please try again or email us directly.
          </p>
        )}
      </form>
      <p className="mt-8 text-sm text-slate-600">
        You can also email us directly at{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-medium text-black hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
      </p>
    </div>
  );
}

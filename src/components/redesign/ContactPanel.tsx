"use client";

import Link from "next/link";
import { useState } from "react";
import { CAL_LINK, CONTACT_EMAIL } from "@/lib/constants";

const INPUT = { width: "100%", minHeight: 52, boxSizing: "border-box", padding: "0 16px", border: "1.5px solid #D4D4D4", borderRadius: 12, fontFamily: "inherit", fontSize: 16, fontWeight: 400, background: "#FFFFFF", color: "#0A0A0A" } as const;
const LABEL = { display: "flex", flexDirection: "column", gap: 8, fontSize: 15, fontWeight: 700 } as const;

function Way({ href, label, value, note, icon, external }: { href: string; label: string; value: string; note: string; icon: React.ReactNode; external?: boolean }) {
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "20px 0", borderTop: "1px solid #2E2E2E", textDecoration: "none", color: "#FFFFFF" }}>
      <span aria-hidden="true" style={{ flex: "none", width: 44, height: 44, borderRadius: 12, background: "#FFDD4F", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B5B5B5" }}>{label}</span>
        <strong style={{ fontSize: 18, overflowWrap: "anywhere" }}>{value}</strong>
        <span style={{ fontSize: 14, color: "#B5B5B5" }}>{note}</span>
      </span>
    </a>
  );
}

/** The contact form (name, email, your query) and the "reach us directly" panel. */
export function ContactPanel() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setErrorDetail(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.get("name"), email: data.get("email"), message: data.get("message") }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      let message = `Request failed (${res.status}).`;
      try {
        const body = (await res.json()) as { error?: unknown };
        if (typeof body.error === "string" && body.error.trim()) message = body.error.trim();
      } catch {
        /* keep default */
      }
      setErrorDetail(message);
      setStatus("error");
    } catch {
      setErrorDetail("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <section style={{ background: "#FFFFFF", padding: "24px 0 88px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "stretch" }}>
        <form onSubmit={handleSubmit} aria-label="Contact form" style={{ flex: "1.4 1 520px", minWidth: 0, boxSizing: "border-box", background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: 24, padding: 36, display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em", fontWeight: 800 }}>Send us a message</h2>
          <p style={{ margin: "-8px 0 0", fontSize: 16, lineHeight: 1.6, color: "#525252" }}>We&rsquo;ll come back to you within 1 business day.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <label style={{ ...LABEL, flex: "1 1 260px" }}>
              Your name
              <input name="name" type="text" required autoComplete="name" placeholder="Jane Smith" style={INPUT} />
            </label>
            <label style={{ ...LABEL, flex: "1 1 260px" }}>
              Email
              <input name="email" type="email" required autoComplete="email" placeholder="jane@company.co.uk" style={INPUT} />
            </label>
          </div>
          <label style={LABEL}>
            Your query
            <textarea name="message" rows={6} required placeholder="How can we help?" style={{ ...INPUT, minHeight: 150, padding: "14px 16px", resize: "vertical" }} />
          </label>
          <button type="submit" disabled={status === "sending"} style={{ minHeight: 56, border: 0, borderRadius: 999, background: "#0A0A0A", color: "#FFFFFF", fontFamily: "inherit", fontSize: 17, fontWeight: 700, cursor: "pointer", opacity: status === "sending" ? 0.7 : 1 }}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {status === "sent" && (
            <p role="status" style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#15803D" }}>
              Thanks. We&rsquo;ll be in touch within 1 business day.
            </p>
          )}
          {status === "error" && errorDetail && (
            <p role="alert" style={{ margin: 0, fontSize: 15, color: "#B91C1C" }}>
              {errorDetail} You can also email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#0A0A0A", fontWeight: 700 }}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          )}
          <p style={{ margin: "-6px 0 0", fontSize: 13, lineHeight: 1.5, color: "#525252" }}>
            We only use your details to reply to you. See our{" "}
            <Link href="/privacypolicy" style={{ color: "#525252" }}>
              privacy policy
            </Link>
            .
          </p>
        </form>

        <div style={{ flex: "1 1 360px", minWidth: 0, boxSizing: "border-box", background: "#0A0A0A", borderRadius: 24, padding: 36, display: "flex", flexDirection: "column" }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 24, letterSpacing: "-0.02em", fontWeight: 800, color: "#FFFFFF" }}>Or reach us directly</h2>
          <Way href={`mailto:${CONTACT_EMAIL}`} label="Email" value={CONTACT_EMAIL} note="We reply within 1 business day" icon={<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>} />
          <Way href={CAL_LINK} external label="Book a call" value="Free 30-minute discovery call" note="Pick a time that suits you" icon={<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>} />
          <div style={{ marginTop: "auto", paddingTop: 24 }}>
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, boxSizing: "border-box", padding: "0 26px", borderRadius: 999, background: "#FFDD4F", color: "#0A0A0A", fontSize: 16, fontWeight: 700, textDecoration: "none" }}>
              Book your free call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

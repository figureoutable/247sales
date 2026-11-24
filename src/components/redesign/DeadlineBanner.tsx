"use client";

import Link from "next/link";

type Message = { text: string; cta: string; href: string };

/** Picks the next tax deadline from today's date, so the banner never goes stale. */
function messageFor(now: Date): Message {
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const md = m * 100 + d;
  if (md >= 1101 || md <= 131) {
    if (m === 1 && d <= 31) {
      const left = 31 - d;
      if (left === 0) return { text: "Self Assessment is due today.", cta: "Get yours filed", href: "/services/self-assessment" };
      if (left <= 14) return { text: `${left} day${left === 1 ? "" : "s"} left to file your Self Assessment.`, cta: "Get yours off your desk", href: "/services/self-assessment" };
    }
    return { text: "Self Assessment is due 31 January.", cta: "Get yours off your desk", href: "/services/self-assessment" };
  }
  if (md <= 405) return { text: "The tax year ends 5 April.", cta: "Plan before it's too late", href: "/contact" };
  if (md <= 731) return { text: "Second payment on account is due 31 July.", cta: "Check what you owe", href: "/contact" };
  if (md <= 1005) return { text: "Newly self-employed? Register for Self Assessment by 5 October.", cta: "We can do it for you", href: "/services/self-assessment" };
  return { text: "Get ahead of January.", cta: "Book your Self Assessment now", href: "/services/self-assessment" };
}

export function DeadlineBanner() {
  const msg = messageFor(new Date());
  return (
    <div suppressHydrationWarning style={{ background: "#0A0A0A", color: "#FFFFFF", padding: "10px 24px", textAlign: "center", fontSize: 14, fontWeight: 600 }}>
      <span suppressHydrationWarning>{msg.text}</span>{" "}
      <Link suppressHydrationWarning href={msg.href} style={{ color: "#FFDD4F", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>
        {msg.cta}
      </Link>
    </div>
  );
}

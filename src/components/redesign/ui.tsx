import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { CAL_LINK } from "@/lib/constants";

/** Shared building blocks for the redesigned pages. Colours and sizes match the design. */
export const C = {
  ink: "#0A0A0A",
  mute: "#525252",
  line: "#E5E5E5",
  yellow: "#FFDD4F",
  alt: "#FAFAF7",
  green: "#15803D",
  dim: "#B5B5B5",
} as const;

export const WRAP: CSSProperties = { maxWidth: 1200, margin: "0 auto", padding: "0 24px", boxSizing: "border-box" };

export function SmartLink({ href, style, children, ...rest }: { href: string; style?: CSSProperties; children: ReactNode; "aria-label"?: string }) {
  const external = /^(https?:|mailto:|tel:|#)/.test(href) || href.endsWith(".pdf");
  if (external) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} style={style} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} style={style} {...rest}>
      {children}
    </Link>
  );
}

export function Arrow() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Check({ color = C.green }: { color?: string }) {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: 3 }}>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

export function Section({ children, bg = "#FFFFFF", pad = "88px 0", id }: { children: ReactNode; bg?: string; pad?: string; id?: string }) {
  return (
    <section id={id} style={{ background: bg, padding: pad }}>
      <div style={WRAP}>{children}</div>
    </section>
  );
}

export function Eyebrow({ children, color = C.mute }: { children: ReactNode; color?: string }) {
  return <p style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color }}>{children}</p>;
}

export function H1({ children }: { children: ReactNode }) {
  return <h1 style={{ margin: 0, fontSize: "clamp(38px, 4.6vw, 58px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 800, maxWidth: 820 }}>{children}</h1>;
}

export function H2({ children, color = C.ink }: { children: ReactNode; color?: string }) {
  return <h2 style={{ margin: 0, fontSize: "clamp(28px, 3.6vw, 42px)", lineHeight: 1.12, letterSpacing: "-0.025em", fontWeight: 800, color, maxWidth: 760 }}>{children}</h2>;
}

export function Lead({ children, color = C.mute, maxWidth = 680 }: { children: ReactNode; color?: string; maxWidth?: number }) {
  return <p style={{ margin: "18px 0 0", fontSize: 19, lineHeight: 1.6, color, maxWidth }}>{children}</p>;
}

export function Para({ children }: { children: ReactNode }) {
  return <p style={{ margin: "16px 0 0", fontSize: 17, lineHeight: 1.7, color: "#262626", maxWidth: 720 }}>{children}</p>;
}

type BtnKind = "dark" | "yellow" | "ghost" | "ghostWhite";
export function Btn({ children, href = CAL_LINK, kind = "dark", big = true }: { children: ReactNode; href?: string; kind?: BtnKind; big?: boolean }) {
  const kinds: Record<BtnKind, CSSProperties> = {
    dark: { background: C.ink, color: "#FFFFFF", border: `2px solid ${C.ink}` },
    yellow: { background: C.yellow, color: C.ink, border: `2px solid ${C.yellow}` },
    ghost: { background: "transparent", color: C.ink, border: `2px solid ${C.ink}` },
    ghostWhite: { background: "transparent", color: "#FFFFFF", border: "2px solid #FFFFFF" },
  };
  return (
    <SmartLink
      href={href}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, minHeight: 44, boxSizing: "border-box", padding: big ? "18px 30px" : "13px 22px", borderRadius: 999, fontSize: big ? 17 : 15, fontWeight: 700, textDecoration: "none", ...kinds[kind] }}
    >
      {children}
    </SmartLink>
  );
}

export function TextLink({ children, href, color = C.ink }: { children: ReactNode; href: string; color?: string }) {
  return (
    <SmartLink href={href} style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, fontSize: 16, fontWeight: 700, color, textDecoration: "underline", textUnderlineOffset: 4 }}>
      {children} <Arrow />
    </SmartLink>
  );
}

export function CheckList({ items, color = C.ink, tick = C.green }: { items: ReactNode[]; color?: string; tick?: string }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: 12, fontSize: 16, lineHeight: 1.5, color }}>
          <Check color={tick} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Row({ children, gap = "24px", mt = 40 }: { children: ReactNode; gap?: string; mt?: number }) {
  return <div style={{ display: "flex", flexWrap: "wrap", gap, marginTop: mt }}>{children}</div>;
}

export function Card({ children, bg = "#FFFFFF", flex = "1 1 300px", pad = 28, border = C.line }: { children: ReactNode; bg?: string; flex?: string; pad?: number; border?: string }) {
  return <div style={{ flex, boxSizing: "border-box", background: bg, border: `1px solid ${border}`, borderRadius: 20, padding: pad, display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>;
}

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22, fontSize: 14, color: C.mute }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "inline-flex", gap: 8 }}>
          {i > 0 && <span aria-hidden="true">/</span>}
          {item.href ? (
            <Link href={item.href} style={{ color: C.mute }}>
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function Guarantee() {
  return (
    <p style={{ margin: "22px 0 0", display: "flex", gap: 10, fontSize: 15, lineHeight: 1.5 }}>
      <Check />
      <span>
        <strong>We respond within 1 business day.</strong> If we don&rsquo;t, next month&rsquo;s fee is on us.
      </span>
    </p>
  );
}

export function CtaBand({ title, text, button = "Book a free discovery call" }: { title: string; text: string; button?: string }) {
  return (
    <Section bg={C.yellow} pad="72px 0">
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
        <div style={{ flex: "1 1 480px" }}>
          <H2>{title}</H2>
          <Lead color={C.ink}>{text}</Lead>
        </div>
        <Btn>
          {button} <Arrow />
        </Btn>
      </div>
    </Section>
  );
}

export function FaqGrid({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Row gap="0 56px" mt={32}>
      {items.map((item) => (
        <div key={item.q} style={{ flex: "1 1 460px", boxSizing: "border-box", padding: "24px 0", borderTop: `1px solid ${C.line}` }}>
          <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>{item.q}</h3>
          <p style={{ margin: "10px 0 0", fontSize: 16, lineHeight: 1.65, color: C.mute }}>{item.a}</p>
        </div>
      ))}
    </Row>
  );
}

export const NEXT_STEPS = [
  { title: "We reply within 1 business day", text: "A real accountant reads your message, not a call centre." },
  { title: "A short call", text: "We talk through your situation and what you need. No obligation." },
  { title: "Your fixed quote", text: "You get a clear price upfront, so there are no surprises later." },
];

export function Steps({ items = NEXT_STEPS }: { items?: { title: string; text: string }[] }) {
  return (
    <Row gap="32px">
      {items.map((s, i) => (
        <div key={s.title} style={{ flex: "1 1 260px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ width: 44, height: 44, borderRadius: 999, background: C.yellow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800 }}>{i + 1}</span>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{s.title}</h3>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: C.mute }}>{s.text}</p>
        </div>
      ))}
    </Row>
  );
}

export function Tile({ title, text, href, label = "Learn more", tag }: { title: string; text?: string | null; href: string; label?: string; tag?: string }) {
  return (
    <SmartLink href={href} style={{ flex: "1 1 300px", boxSizing: "border-box", background: "#FFFFFF", border: `1px solid ${C.line}`, borderRadius: 20, padding: 26, display: "flex", flexDirection: "column", gap: 10, textDecoration: "none", color: C.ink }}>
      {tag && <span style={{ alignSelf: "flex-start", background: C.yellow, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", padding: "5px 10px", borderRadius: 6 }}>{tag}</span>}
      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{title}</h3>
      {text && <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: C.mute }}>{text}</p>}
      <span style={{ marginTop: "auto", paddingTop: 8, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 700 }}>
        {label} <Arrow />
      </span>
    </SmartLink>
  );
}

export function Pill({ children, href }: { children: ReactNode; href: string }) {
  return (
    <SmartLink href={href} style={{ display: "inline-flex", alignItems: "center", minHeight: 44, boxSizing: "border-box", padding: "0 16px", background: C.alt, border: `1px solid ${C.line}`, borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none", color: C.ink }}>
      {children}
    </SmartLink>
  );
}

export function DarkCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Card bg={C.ink} flex="1 1 360px" pad={32} border={C.ink}>
      <p style={{ margin: 0, fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.yellow }}>{label}</p>
      {children}
    </Card>
  );
}

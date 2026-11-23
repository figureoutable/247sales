"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CAL_LINK, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/constants";
import { DeadlineBanner } from "@/components/redesign/DeadlineBanner";

const SMALL_BUSINESS = [
  { label: "Statutory Accounts & Tax", text: "Year-end accounts and corporation tax", href: "/accountstax" },
  { label: "Self Assessment", text: "Tax returns for sole traders and landlords", href: "/services/self-assessment" },
  { label: "Bookkeeping & Xero", text: "Clean books, always up to date", href: "/services/bookkeeping-xero" },
  { label: "VAT", text: "Registration, returns and advice", href: "/services/vat" },
  { label: "Payroll & PAYE", text: "Monthly payroll and HMRC filings", href: "/services/payroll-paye" },
  { label: "Making Tax Digital", text: "Get ready for quarterly reporting", href: "/mtdincometax" },
];

const STARTUPS = [
  { label: "Fractional CFO", text: "Senior finance without the full-time cost", href: "/fractionalcfo" },
  { label: "Management Reporting", text: "Monthly board packs and KPIs", href: "/services/management-reporting" },
  { label: "Cash Flow Management", text: "13-week rolling forecasts", href: "/services/cash-flow-management" },
  { label: "Board & Investor Reporting", text: "Investor-ready packs", href: "/services/board-investor-reporting" },
  { label: "Budgeting & Forecasting", text: "Annual budgets and reforecasts", href: "/services/budgeting-forecasting" },
  { label: "Custom Finance Dashboard", text: "Your numbers, live", href: "/finance-dashboard" },
];

const NAV_LINKS = [
  { href: "/startups", label: "Startups & VC" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

type HeaderProps = {
  /** Hide Services + main nav links (e.g. focused landing pages). Logo and phone/CTA stay. */
  hideMainNav?: boolean;
};

function Chevron() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ServiceColumn({ title, items, onPick }: { title: string; items: typeof SMALL_BUSINESS; onPick: () => void }) {
  return (
    <div style={{ flex: "1 1 250px", display: "flex", flexDirection: "column", gap: 2 }}>
      <p style={{ margin: "0 0 6px", padding: "0 12px", fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#525252" }}>{title}</p>
      {items.map((item) => (
        <Link key={item.label} href={item.href} onClick={onPick} className="rounded-[10px] hover:bg-[#FAFAF7]" style={{ display: "flex", flexDirection: "column", gap: 2, padding: "10px 12px", textDecoration: "none", color: "#0A0A0A" }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>{item.label}</span>
          <span style={{ fontSize: 13, lineHeight: 1.4, color: "#525252" }}>{item.text}</span>
        </Link>
      ))}
    </div>
  );
}

export function Header({ hideMainNav = false }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const close = () => {
    setServicesOpen(false);
    setMobileOpen(false);
  };
  const navLink = (active: boolean) => ({ display: "inline-flex", alignItems: "center", minHeight: 44, fontSize: 15, fontWeight: active ? 800 : 600, color: "#0A0A0A", textDecoration: "none" }) as const;

  return (
    <>
      <DeadlineBanner />
      <header className="sticky top-0" style={{ zIndex: 40, background: "#FFFFFF", borderBottom: "1px solid #E5E5E5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px 28px" }}>
          <Link href="/" aria-label="Figures home" style={{ display: "inline-flex", alignItems: "center", minHeight: 44 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/redesign/logo-black.png" alt="Figures" style={{ height: 30, width: "auto", display: "block" }} />
          </Link>

          {!hideMainNav && (
            <nav aria-label="Main" className="hidden md:flex" style={{ alignItems: "center", gap: "4px 28px" }}>
              <div style={{ position: "relative" }} onMouseLeave={() => setServicesOpen(false)}>
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((v) => !v)}
                  onMouseEnter={() => setServicesOpen(true)}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, minHeight: 44, padding: 0, border: 0, background: "transparent", fontFamily: "inherit", fontSize: 15, fontWeight: pathname.startsWith("/services") ? 800 : 600, color: "#0A0A0A", cursor: "pointer" }}
                >
                  Services <Chevron />
                </button>
                {servicesOpen && (
                  <div style={{ position: "absolute", top: 44, left: -24, zIndex: 50, paddingTop: 8 }}>
                    <div style={{ width: 600, maxWidth: "calc(100vw - 32px)", boxSizing: "border-box", background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: 20, boxShadow: "0 24px 48px -16px rgba(10,10,10,0.25)", padding: 16 }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 12px" }}>
                        <ServiceColumn title="Small businesses" items={SMALL_BUSINESS} onPick={close} />
                        <ServiceColumn title="Startups & investors" items={STARTUPS} onPick={close} />
                      </div>
                      <div style={{ marginTop: 12, padding: "14px 12px 4px", borderTop: "1px solid #E5E5E5", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                        <Link href="/services" onClick={close} style={{ display: "inline-flex", alignItems: "center", minHeight: 44, fontSize: 15, fontWeight: 700, color: "#0A0A0A" }}>
                          View all services
                        </Link>
                        <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", minHeight: 44, boxSizing: "border-box", padding: "0 18px", borderRadius: 999, background: "#FFDD4F", fontSize: 14, fontWeight: 700, textDecoration: "none", color: "#0A0A0A" }}>
                          Book a free call
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} style={navLink(pathname === l.href || pathname.startsWith(l.href + "/"))}>
                  {l.label}
                </Link>
              ))}
            </nav>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "12px 20px" }}>
            <a href={`tel:${CONTACT_PHONE_TEL}`} className="hidden lg:inline-flex" style={{ alignItems: "center", minHeight: 44, fontSize: 15, fontWeight: 700, color: "#0A0A0A", textDecoration: "none", whiteSpace: "nowrap" }}>
              {CONTACT_PHONE_DISPLAY}
            </a>
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex" style={{ alignItems: "center", justifyContent: "center", minHeight: 44, boxSizing: "border-box", padding: "13px 22px", borderRadius: 999, fontSize: 15, fontWeight: 700, textDecoration: "none", background: "#FFDD4F", color: "#0A0A0A", whiteSpace: "nowrap" }}>
              Book a free call
            </a>
            {!hideMainNav && (
              <button type="button" className="inline-flex md:hidden" aria-expanded={mobileOpen} aria-controls="mobile-menu" onClick={() => setMobileOpen((v) => !v)} style={{ width: 44, height: 44, alignItems: "center", justifyContent: "center", border: 0, borderRadius: 12, background: "transparent", color: "#0A0A0A", cursor: "pointer" }}>
                <span className="sr-only">Menu</span>
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            )}
          </div>
        </div>

        {!hideMainNav && mobileOpen && (
          <div id="mobile-menu" className="md:hidden" style={{ borderTop: "1px solid #E5E5E5", background: "#FFFFFF", maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "16px 24px 24px" }}>
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} onClick={close} style={{ display: "flex", alignItems: "center", minHeight: 48, fontSize: 17, fontWeight: 700, color: "#0A0A0A", textDecoration: "none" }}>
                  {l.label}
                </Link>
              ))}
              <p style={{ margin: "14px 0 4px", fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#525252" }}>Services</p>
              {[...SMALL_BUSINESS, ...STARTUPS].map((s) => (
                <Link key={s.label} href={s.href} onClick={close} style={{ display: "flex", alignItems: "center", minHeight: 44, fontSize: 16, fontWeight: 600, color: "#0A0A0A", textDecoration: "none" }}>
                  {s.label}
                </Link>
              ))}
              <Link href="/services" onClick={close} style={{ display: "flex", alignItems: "center", minHeight: 44, fontSize: 16, fontWeight: 700, color: "#0A0A0A" }}>
                View all services
              </Link>
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 52, borderRadius: 999, background: "#FFDD4F", fontSize: 16, fontWeight: 700, textDecoration: "none", color: "#0A0A0A" }}>
                Book a free call
              </a>
              <a href={`tel:${CONTACT_PHONE_TEL}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 48, fontSize: 16, fontWeight: 700, color: "#0A0A0A", textDecoration: "none" }}>
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

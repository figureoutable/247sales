"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, SERVICES } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const serviceLinks = SERVICES.map((s) => ({ href: `/services/${s.id}`, label: s.title }));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="Figures Chartered Accountants home">
          <span className="flex h-12 items-center overflow-hidden rounded-sm bg-white px-1 sm:h-14">
            <Image
              src="/figures-logo.jpg"
              alt="Figures"
              width={200}
              height={56}
              className="h-12 w-auto object-left object-contain sm:h-14"
              priority
              unoptimized
            />
          </span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-8" aria-label="Main">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                pathname?.startsWith("/services") ? "text-black" : "text-slate-600 hover:text-black"
              }`}
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {servicesOpen && (
              <div
                role="menu"
                className="absolute left-0 top-full z-50 w-[320px] pt-2"
              >
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                  <div className="p-2">
                    <Link
                      href="/services"
                      role="menuitem"
                      className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                      onClick={() => setServicesOpen(false)}
                    >
                      View all services
                    </Link>
                    <div className="my-2 h-px bg-slate-200" />
                    <div className="grid gap-1">
                      {serviceLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-black"
                          onClick={() => setServicesOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                pathname === href ? "text-black" : "text-slate-600 hover:text-black"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={`tel:${CONTACT_PHONE_TEL}`}
            className="hidden whitespace-nowrap text-sm font-bold text-slate-600 transition-colors hover:text-black sm:inline-block"
          >
            {CONTACT_PHONE_DISPLAY}
          </a>
          <a
            href="https://cal.com/figures/discoverycall"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 sm:inline-block"
          >
            Schedule a call
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Menu</span>
            {open ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`border-t border-slate-200 bg-white md:hidden ${open ? "block" : "hidden"}`}
        aria-hidden={!open}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          <Link
            href="/services"
            className={`rounded-lg px-4 py-3 text-sm font-medium ${
              pathname?.startsWith("/services") ? "bg-slate-100 text-black" : "text-slate-600 hover:bg-slate-50"
            }`}
            onClick={() => setOpen(false)}
          >
            Services
          </Link>
          <div className="ml-2 flex flex-col gap-1">
            {serviceLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-4 py-3 text-sm font-medium ${
                pathname === href ? "bg-slate-100 text-black" : "text-slate-600 hover:bg-slate-50"
              }`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2">
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="rounded-lg px-4 py-3 text-center text-sm font-bold text-slate-600 hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              {CONTACT_PHONE_DISPLAY}
            </a>
            <a
              href="https://cal.com/figures/discoverycall"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black px-4 py-3 text-center text-sm font-medium text-white hover:bg-slate-800"
              onClick={() => setOpen(false)}
            >
              Schedule a call
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

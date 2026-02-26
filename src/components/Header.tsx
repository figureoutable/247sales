"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="figures home">
          <span className="flex h-12 items-center overflow-hidden sm:h-14">
            <Image
              src="/figures-logo.jpg"
              alt="figures"
              width={200}
              height={56}
              className="h-12 w-auto scale-110 object-left object-contain sm:h-14 sm:scale-[1.15]"
              priority
            />
          </span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-8" aria-label="Main">
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

        <div className="flex items-center gap-4">
          <a
            href="https://cal.com/figures/discovery"
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
          <a
            href="https://cal.com/figures/discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 rounded-full bg-black px-4 py-3 text-center text-sm font-medium text-white hover:bg-slate-800"
            onClick={() => setOpen(false)}
          >
            Schedule a call
          </a>
        </div>
      </div>
    </header>
  );
}

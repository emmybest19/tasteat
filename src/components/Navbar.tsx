"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig, whatsappLink } from "@/config/site";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Menu" },
  { href: "/contact", label: "Contact" },
  { href: "/complaints", label: "Complaints" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)} aria-label={siteConfig.name}>
          <Image src="/images/logo-trimmed.png" alt="TastEat" width={448} height={138} priority className="h-9 w-auto sm:h-10" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isActive(l.href)
                  ? "bg-surface-active text-primary"
                  : "text-ink/70 hover:bg-surface-soft hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink(`Hi ${siteConfig.name}! I'd like to make an order.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-call px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-call-dark sm:inline-flex"
          >
            Give us a call
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-ink md:hidden"
          >
            <span className="text-2xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-cream md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-base font-semibold ${
                  isActive(l.href)
                    ? "bg-surface-active text-primary"
                    : "text-ink/80 hover:bg-surface-soft"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={whatsappLink(`Hi ${siteConfig.name}! I'd like to make an order.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 rounded-lg bg-call px-4 py-3 text-center text-base font-bold text-white"
            >
              Call on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

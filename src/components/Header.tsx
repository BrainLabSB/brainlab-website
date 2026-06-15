"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { nav, type Locale } from "@/lib/translations";

interface HeaderProps { locale: Locale; }

export default function Header({ locale }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = nav[locale];
  const otherLocale: Locale = locale === "en" ? "it" : "en";

  function switchLocalePath(target: Locale): string {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  }

  const links = [
    { href: `/${locale}/come-lavoriamo`, label: t.how },
    { href: `/${locale}/ambiti`, label: t.domains },
    { href: `/${locale}/modelli`, label: t.models },
    { href: `/${locale}/ai-enablement`, label: t.enablement },
    { href: `/${locale}/azienda`, label: t.about },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0.85rem 3rem",
      background: "rgba(12,15,20,0.88)",
      backdropFilter: "blur(24px)",
      borderBottom: "1px solid var(--dark-border)",
    }}>
      {/* Logo */}
      <Link href={`/${locale}`}>
        <Image src="/logo_color2.png" alt="Brainlab" width={130} height={36}
          style={{ objectFit: "contain", height: "36px", width: "auto" }} priority />
      </Link>

      {/* Center links — desktop */}
      <ul style={{ display: "flex", gap: "2.25rem", listStyle: "none", fontSize: "0.82rem", fontWeight: 500 }}
        className="nav-desktop">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href}
              style={{ color: "var(--dark-text-sec)", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dark-text-sec)")}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right: switcher + CTA + hamburger */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Language switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px", fontSize: "0.63rem", letterSpacing: "0.07em", fontWeight: 700 }}>
          <span style={{ color: "#fff", background: "var(--primary)", padding: "0.22rem 0.55rem", borderRadius: "4px" }}>
            {locale.toUpperCase()}
          </span>
          <Link href={switchLocalePath(otherLocale)}
            style={{ color: "var(--dark-text-muted)", padding: "0.22rem 0.55rem", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dark-text-muted)")}>
            {otherLocale.toUpperCase()}
          </Link>
        </div>

        {/* CTA — desktop */}
        <Link href={`/${locale}/contatti`}
          className="btn-primary nav-desktop"
          style={{ padding: "0.55rem 1.4rem", borderRadius: "var(--radius-pill)", fontSize: "0.78rem" }}>
          {t.cta}
        </Link>

        {/* Hamburger — mobile */}
        <button onClick={() => setOpen(!open)} className="nav-mobile-btn"
          style={{ background: "none", border: "1px solid var(--dark-border)", borderRadius: "var(--radius-sm)",
            padding: "0.5rem", color: "var(--dark-text)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center" }}
          aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ position: "fixed", top: "65px", left: 0, right: 0,
          background: "rgba(12,15,20,0.97)", backdropFilter: "blur(24px)",
          borderBottom: "1px solid var(--dark-border)", padding: "1.5rem 3rem 2rem",
          display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ fontSize: "1rem", fontWeight: 500, color: "var(--dark-text-sec)" }}>
              {l.label}
            </a>
          ))}
          <Link href={`/${locale}/contatti`} className="btn-primary"
            style={{ alignSelf: "flex-start", marginTop: "0.5rem" }} onClick={() => setOpen(false)}>
            {t.cta}
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) { .nav-mobile-btn { display: none !important; } }
        @media (max-width: 768px) { .nav-desktop { display: none !important; } }
      `}</style>
    </nav>
  );
}

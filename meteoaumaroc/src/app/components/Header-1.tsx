"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/lib/LanguageContext";
import { LOCALES } from "@/app/lib/i18n";

export default function Header_1() {
  const { locale, setLocale, t, isRTL, tempUnit, setTempUnit } = useLanguage();
  const [dark, setDark]       = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  /* ── Init dark mode from localStorage ── */
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close lang dropdown on outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const navLinks = [
    { href: "/",            label: t("nav.home")    },
    { href: "/cities",      label: t("nav.cities")  },
    { href: "/pages/faq",   label: t("nav.faq")     },
    { href: "/pages/contact", label: t("nav.contact") },
  ];

  const currentLocale = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <>
      {/* ── Fixed nav bar ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled
            ? dark ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.95)"
            : dark ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`
            : "1px solid transparent",
          transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.12)" : "none",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 68,
            gap: "1rem",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0 }}>
            <Image
              src="/assets/img/logo-01.png"
              alt="MeteoAuMaroc"
              width={160}
              height={52}
              style={{ height: 44, width: "auto", display: "block" }}
            />
          </Link>

          {/* Desktop nav links */}
          <nav
            style={{
              display: "flex",
              gap: "0.25rem",
              alignItems: "center",
            }}
            className="hidden lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "0.45rem 0.9rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: dark ? "rgba(255,255,255,0.85)" : "var(--color-text)",
                  textDecoration: "none",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    dark ? "rgba(255,255,255,0.08)" : "rgba(3,105,161,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = dark
                    ? "rgba(255,255,255,0.85)"
                    : "var(--color-text)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>

            {/* Language switcher */}
            <div ref={langRef} style={{ position: "relative" }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "var(--radius-full)",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "var(--color-border)"}`,
                  background: dark ? "rgba(255,255,255,0.06)" : "var(--color-surface)",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: dark ? "#f1f5f9" : "var(--color-text)",
                  transition: "background 0.2s",
                }}
                aria-label="Change language"
              >
                <Image
                  src={`https://flagcdn.com/w20/${currentLocale.code === "en" ? "gb" : currentLocale.code === "ar" ? "ma" : "fr"}.png`}
                  alt={currentLocale.code}
                  width={18}
                  height={13}
                  style={{ width: 18, height: "auto", borderRadius: 2 }}
                  unoptimized
                />
                <span>{currentLocale.label}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 2 }}>
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {langOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    [isRTL ? "left" : "right"]: 0,
                    background: dark ? "#1e293b" : "#fff",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "var(--color-border)"}`,
                    borderRadius: "var(--radius-md)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    zIndex: 100,
                    overflow: "hidden",
                    minWidth: 140,
                  }}
                >
                  {LOCALES.map((loc) => (
                    <button
                      key={loc.code}
                      onClick={() => { setLocale(loc.code); setLangOpen(false); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        width: "100%",
                        padding: "0.6rem 1rem",
                        border: "none",
                        background: locale === loc.code
                          ? dark ? "rgba(56,189,248,0.12)" : "var(--color-primary-light)"
                          : "transparent",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                        fontWeight: locale === loc.code ? 700 : 500,
                        color: locale === loc.code
                          ? "var(--color-primary)"
                          : dark ? "#f1f5f9" : "var(--color-text)",
                        textAlign: isRTL ? "right" : "left",
                        transition: "background 0.15s",
                      }}
                    >
                      <Image
                        src={`https://flagcdn.com/w20/${loc.code === "en" ? "gb" : loc.code === "ar" ? "ma" : "fr"}.png`}
                        alt={loc.code}
                        width={18}
                        height={13}
                        style={{ width: 18, height: "auto", borderRadius: 2 }}
                        unoptimized
                      />
                      <span>{loc.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* °C / °F toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: dark ? "rgba(255,255,255,0.06)" : "var(--color-bg)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "var(--color-border)"}`,
                borderRadius: "var(--radius-full)",
                padding: "3px",
                gap: 2,
              }}
              role="group"
              aria-label="Temperature unit"
            >
              {(["C", "F"] as const).map((unit) => (
                <button
                  key={unit}
                  onClick={() => setTempUnit(unit)}
                  aria-pressed={tempUnit === unit}
                  style={{
                    padding: "0.2rem 0.55rem",
                    borderRadius: "var(--radius-full)",
                    border: "none",
                    background: tempUnit === unit
                      ? dark ? "#0ea5e9" : "var(--color-primary)"
                      : "transparent",
                    color: tempUnit === unit
                      ? "#fff"
                      : dark ? "rgba(255,255,255,0.5)" : "var(--color-text-muted)",
                    fontWeight: tempUnit === unit ? 700 : 500,
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
                    lineHeight: 1.4,
                    letterSpacing: "0.01em",
                  }}
                >
                  °{unit}
                </button>
              ))}
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "var(--radius-full)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "var(--color-border)"}`,
                background: dark ? "rgba(255,255,255,0.06)" : "var(--color-surface)",
                cursor: "pointer",
                fontSize: "1.05rem",
                transition: "background 0.2s, border 0.2s",
                color: dark ? "#fbbf24" : "#64748b",
              }}
            >
              {dark ? "☀️" : "🌙"}
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "0.5rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span style={{ display: "block", width: 22, height: 2, background: dark ? "#f1f5f9" : "var(--color-text)", borderRadius: 2, transition: "transform 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
              <span style={{ display: "block", width: 22, height: 2, background: dark ? "#f1f5f9" : "var(--color-text)", borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
              <span style={{ display: "block", width: 22, height: 2, background: dark ? "#f1f5f9" : "var(--color-text)", borderRadius: 2, transition: "transform 0.2s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              background: dark ? "#0f172a" : "#fff",
              borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "var(--color-border)"}`,
              padding: "0.75rem 0 1rem",
            }}
          >
            <div className="container">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "0.65rem 0.5rem",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: dark ? "rgba(255,255,255,0.85)" : "var(--color-text)",
                    textDecoration: "none",
                    borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "var(--color-border)"}`,
                  }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile °C / °F */}
              <div style={{ padding: "0.75rem 0.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.875rem", color: dark ? "rgba(255,255,255,0.6)" : "var(--color-text-muted)", fontWeight: 500 }}>
                  {locale === "ar" ? "وحدة الحرارة" : locale === "en" ? "Temperature unit" : "Unité de température"}
                </span>
                <div style={{ display: "flex", background: dark ? "rgba(255,255,255,0.06)" : "var(--color-bg)", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "var(--color-border)"}`, borderRadius: "var(--radius-full)", padding: "3px", gap: 2 }}>
                  {(["C", "F"] as const).map((unit) => (
                    <button
                      key={unit}
                      onClick={() => setTempUnit(unit)}
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "var(--radius-full)",
                        border: "none",
                        background: tempUnit === unit ? (dark ? "#0ea5e9" : "var(--color-primary)") : "transparent",
                        color: tempUnit === unit ? "#fff" : dark ? "rgba(255,255,255,0.5)" : "var(--color-text-muted)",
                        fontWeight: tempUnit === unit ? 700 : 500,
                        fontSize: "0.82rem",
                        cursor: "pointer",
                        transition: "background 0.2s, color 0.2s",
                      }}
                    >
                      °{unit}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to push content below the fixed nav */}
      <div style={{ height: 68 }} aria-hidden />
    </>
  );
}

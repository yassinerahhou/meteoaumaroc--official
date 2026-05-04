"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/lib/LanguageContext";
import { LOCALES } from "@/app/lib/i18n";

export default function Navbar() {
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
    { href: `/${locale}`,            label: t("nav.home")    },
    { href: `/${locale}/cities`,      label: t("nav.cities")  },
    { href: `/${locale}/pages/faq`,   label: t("nav.faq")     },
    { href: `/${locale}/pages/contact`, label: t("nav.contact") },
  ];

  const currentLocale = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <>
      {/* ── Fixed nav bar ── */}
      <header
        className={scrolled ? "glass" : ""}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled 
            ? (dark ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.75)")
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"}`
            : "1px solid transparent",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: scrolled ? "var(--shadow-lg)" : "none",
          direction: isRTL ? "rtl" : "ltr",
          height: 72,
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            gap: "1.5rem",
          }}
        >
          {/* Logo */}
          <Link href={`/${locale}`} style={{ flexShrink: 0, transition: "transform 0.3s ease" }} className="hover:scale-105">
            <Image
              src="/assets/img/logo-01.png"
              alt="MeteoAuMaroc"
              width={190}
              height={64}
              style={{ height: 56, width: "auto", display: "block" }}
            />
          </Link>

          {/* Desktop nav links */}
          <nav
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
            className="hidden lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "0.5rem 1.1rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: dark ? "rgba(255,255,255,0.85)" : "var(--color-text)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    dark ? "rgba(255,255,255,0.06)" : "rgba(14, 165, 233, 0.08)";
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>

            {/* Language switcher */}
            <div ref={langRef} style={{ position: "relative" }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 0.875rem",
                  borderRadius: "var(--radius-full)",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "var(--color-border)"}`,
                  background: dark ? "rgba(255,255,255,0.05)" : "rgba(255, 255, 255, 0.5)",
                  cursor: "pointer",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  color: dark ? "#f1f5f9" : "var(--color-text)",
                  transition: "all 0.2s ease",
                  boxShadow: "var(--shadow-sm)",
                }}
                className="hover:border-primary"
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
                <span className="max-sm:hidden">{currentLocale.label}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: "transform 0.3s", transform: langOpen ? "rotate(180deg)" : "none" }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {langOpen && (
                <div
                  className="glass"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    [isRTL ? "left" : "right"]: 0,
                    borderRadius: "var(--radius-md)",
                    zIndex: 100,
                    overflow: "hidden",
                    minWidth: 160,
                    animation: "dropdownFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {LOCALES.map((loc) => (
                    <button
                      key={loc.code}
                      onClick={() => { setLocale(loc.code); setLangOpen(false); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "none",
                        background: locale === loc.code
                          ? "var(--color-primary-light)"
                          : "transparent",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        fontWeight: locale === loc.code ? 700 : 500,
                        color: locale === loc.code
                          ? "var(--color-primary)"
                          : dark ? "#f1f5f9" : "var(--color-text)",
                        textAlign: isRTL ? "right" : "left",
                        transition: "all 0.2s ease",
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
                background: dark ? "rgba(255,255,255,0.05)" : "rgba(0, 0, 0, 0.03)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "var(--color-border)"}`,
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
                    padding: "0.3rem 0.75rem",
                    borderRadius: "var(--radius-full)",
                    border: "none",
                    background: tempUnit === unit
                      ? "var(--color-primary)"
                      : "transparent",
                    color: tempUnit === unit
                      ? "#fff"
                      : dark ? "rgba(255,255,255,0.5)" : "var(--color-text-muted)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    lineHeight: 1,
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
                width: 40,
                height: 40,
                borderRadius: "var(--radius-full)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "var(--color-border)"}`,
                background: dark ? "rgba(255,255,255,0.05)" : "rgba(255, 255, 255, 0.5)",
                cursor: "pointer",
                fontSize: "1.2rem",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                color: dark ? "#fbbf24" : "#64748b",
                boxShadow: "var(--shadow-sm)",
              }}
              className="hover:scale-110"
            >
              {dark ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <span style={{ position: "absolute", width: 22, height: 2, background: dark ? "#f1f5f9" : "var(--color-text)", borderRadius: 2, transition: "all 0.3s ease", transform: menuOpen ? "rotate(45deg)" : "translateY(-6px)" }} />
              <span style={{ position: "absolute", width: 22, height: 2, background: dark ? "#f1f5f9" : "var(--color-text)", borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: "all 0.2s ease" }} />
              <span style={{ position: "absolute", width: 22, height: 2, background: dark ? "#f1f5f9" : "var(--color-text)", borderRadius: 2, transition: "all 0.3s ease", transform: menuOpen ? "rotate(-45deg)" : "translateY(6px)" }} />
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

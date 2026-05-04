"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MOROCCAN_CITIES } from "@/app/lib/cities";
import { useLanguage } from "@/app/lib/LanguageContext";

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function AllCitiesPage() {
  const { t, locale } = useLanguage();
  const [query, setQuery] = useState("");

  const heading =
    locale === "ar"
      ? `الطقس في جميع مدن المغرب`
      : locale === "en"
      ? `Weather for All Cities in Morocco`
      : `Météo pour toutes les villes du Maroc`;

  const subheading =
    locale === "ar"
      ? `${MOROCCAN_CITIES.length} مدينة مغطاة — توقعات فورية`
      : locale === "en"
      ? `${MOROCCAN_CITIES.length} cities covered — real-time forecasts`
      : `${MOROCCAN_CITIES.length} villes couvertes — prévisions en temps réel`;

  const citiesLabel = (n: number) =>
    locale === "ar"
      ? `${n} مدينة`
      : locale === "en"
      ? `${n} city${n > 1 ? "ies" : ""}`
      : `${n} ville${n > 1 ? "s" : ""}`;

  const filtered = useMemo(() => {
    if (!query.trim()) return MOROCCAN_CITIES;
    const q = normalize(query.trim());
    return MOROCCAN_CITIES.filter(
      (c) =>
        normalize(c.name).includes(q) ||
        (c.nameAr && normalize(c.nameAr).includes(q)) ||
        normalize(c.region).includes(q)
    );
  }, [query]);

  // Group filtered cities by region
  const byRegion = useMemo(
    () =>
      filtered.reduce<Record<string, typeof MOROCCAN_CITIES>>((acc, city) => {
        if (!acc[city.region]) acc[city.region] = [];
        acc[city.region].push(city);
        return acc;
      }, {}),
    [filtered]
  );

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "60vh" }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)",
          padding: "3rem 0 3.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute", top: -60, right: -60, width: 240, height: 240,
            borderRadius: "50%", background: "rgba(255,255,255,0.05)",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: "0.75rem",
              letterSpacing: "-0.03em",
            }}
          >
            {heading}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.0625rem", maxWidth: 520, margin: "0 auto" }}>
            {subheading}
          </p>
        </div>
        <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, lineHeight: 0 }} aria-hidden>
          <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 40 }}>
            <path fill="var(--color-bg)" d="M0,24 C360,48 1080,0 1440,24 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)", padding: "0.75rem 0" }}>
        <div className="container">
          <nav style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
            <Link href="/" style={{ color: "var(--color-primary)" }}>{t("city.breadcrumb.home")}</Link>
            <span>›</span>
            <span style={{ color: "var(--color-text)", fontWeight: 600 }}>{t("nav.allCities")}</span>
          </nav>
        </div>
      </div>

      {/* Search filter */}
      <div className="container" style={{ paddingTop: "2rem" }}>
        <div
          style={{
            maxWidth: 480,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "var(--color-surface)",
            border: query ? "1.5px solid var(--color-primary)" : "1.5px solid var(--color-border)",
            borderRadius: "var(--radius-xl)",
            padding: "0.6rem 1rem",
            transition: "border-color 0.2s",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={query ? "var(--color-primary)" : "var(--color-text-muted)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: "stroke 0.2s" }}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("cities.searchPlaceholder")}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "0.9375rem",
              color: "var(--color-text)",
              fontFamily: "inherit",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", display: "flex", alignItems: "center", padding: 0 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          )}
        </div>
      </div>

      {/* City groups by region */}
      <div className="container" style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--color-text-muted)", padding: "3rem 0" }}>
            {t("cities.noResults")}
          </p>
        ) : Object.entries(byRegion).map(([region, cities]) => (
          <div key={region} style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "var(--color-text)",
                marginBottom: "1rem",
                paddingBottom: "0.5rem",
                borderBottom: "2px solid var(--color-primary-light)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 10, height: 10, borderRadius: "50%",
                  background: "var(--color-primary)", flexShrink: 0,
                }}
              />
              {region}
              <span style={{ marginLeft: "auto", fontSize: "0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>
                {citiesLabel(cities.length)}
              </span>
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  style={{ textDecoration: "none" }}
                  className="city-list-link"
                >
                  <div
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      padding: "0.875rem 1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      transition: "all 0.2s",
                    }}
                    className="city-list-card"
                  >
                    <span style={{ fontSize: "1.375rem", flexShrink: 0 }}>{city.emoji}</span>
                    <div style={{ minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          color: "var(--color-text)",
                          margin: 0,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {locale === "ar" && city.nameAr ? city.nameAr : city.name}
                      </p>
                      {city.nameAr && locale !== "ar" && (
                        <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", margin: 0 }}>
                          {city.nameAr}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .city-list-card:hover {
          border-color: var(--color-primary) !important;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .city-list-link:hover p:first-child { color: var(--color-primary) !important; }
      `}</style>
    </div>
  );
}

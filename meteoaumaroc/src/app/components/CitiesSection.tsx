"use client";

import React from "react";
import Link from "next/link";
import { MOROCCAN_CITIES } from "@/app/lib/cities";
import { useLanguage } from "@/app/lib/LanguageContext";
import AdUnit from "@/app/components/AdUnit";

// Show first 12 on homepage, sorted by importance (order in the array)
const FEATURED = MOROCCAN_CITIES.slice(0, 12);

const CitiesSection = () => {
  const { t, locale } = useLanguage();
  return (
    <section
      id="villes"
      style={{ padding: "5rem 0", background: "var(--color-bg)" }}
    >
      <div className="container">
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--color-primary-light)",
              borderRadius: "var(--radius-full)",
              padding: "0.35rem 1rem",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--color-primary)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {t("cities.badge", { count: MOROCCAN_CITIES.length })}
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              fontWeight: 800,
              color: "var(--color-text)",
              marginBottom: "0.75rem",
              letterSpacing: "-0.02em",
            }}
          >
            {t("cities.title")}
          </h2>
          <p
            style={{
              color: "var(--color-text-muted)",
              maxWidth: 520,
              margin: "0 auto",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            {t("cities.subtitle")}
          </p>
        </div>

        {/* Featured city grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
            gap: "1rem",
          }}
        >
          {FEATURED.map((city) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              style={{ textDecoration: "none" }}
              className="city-card-link"
            >
              <div
                className="card"
                style={{
                  padding: "1.375rem 1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  cursor: "pointer",
                  background: "var(--color-surface)",
                  height: "100%",
                }}
              >
                <span style={{ fontSize: "1.875rem", lineHeight: 1 }}>
                  {city.emoji}
                </span>
                <div>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--color-text)",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {locale === "ar" && city.nameAr ? city.nameAr : city.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-text-muted)",
                      margin: "0.2rem 0 0",
                    }}
                  >
                    {city.region}
                  </p>
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    color: "var(--color-primary)",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    flexDirection: locale === "ar" ? "row-reverse" : "row",
                  }}
                >
                  {t("cities.viewWeather")}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{ transform: locale === "ar" ? "scaleX(-1)" : "none" }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Ad — between city grid and "see all" CTA */}
        <AdUnit slot="5678901234" format="horizontal" style={{ margin: "2rem 0 0" }} />

        {/* See all cities */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link
            href="/cities"
            className="btn btn-outline"
            style={{ display: "inline-flex" }}
          >
            {t("cities.viewAll", { count: MOROCCAN_CITIES.length })}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        .city-card-link:hover .card {
          border-color: var(--color-primary-light);
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  );
};

export default CitiesSection;

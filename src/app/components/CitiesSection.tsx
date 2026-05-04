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
      style={{ padding: "6rem 0", background: "var(--color-surface)" }}
    >
      <div className="container">
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div
            className="glass"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(14, 165, 233, 0.1)",
              borderRadius: "var(--radius-full)",
              padding: "0.5rem 1.25rem",
              marginBottom: "1.25rem",
              border: "1px solid var(--color-primary-light)",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 800,
                color: "var(--color-primary)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {t("cities.badge", { count: MOROCCAN_CITIES.length })}
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 900,
              color: "var(--color-text)",
              marginBottom: "1rem",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            {t("cities.title")}
          </h2>
          <p
            style={{
              color: "var(--color-text-muted)",
              maxWidth: 560,
              margin: "0 auto",
              fontSize: "1.125rem",
              lineHeight: 1.6,
            }}
          >
            {t("cities.subtitle")}
          </p>
        </div>

        {/* Featured city grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {FEATURED.map((city) => (
            <Link
              key={city.slug}
              href={`/${locale}/cities/${city.slug}`}
              style={{ textDecoration: "none" }}
              className="city-card-link"
            >
              <div
                className="card"
                style={{
                  padding: "1.75rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  background: "var(--color-bg)",
                  height: "100%",
                }}
              >
                <div style={{ 
                  width: 56, height: 56, 
                  background: "var(--color-surface)", 
                  borderRadius: "var(--radius-md)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  fontSize: "2rem",
                  boxShadow: "var(--shadow-sm)",
                  marginBottom: "0.5rem"
                }}>
                  {city.emoji}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 800,
                      color: "var(--color-text)",
                      margin: 0,
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {locale === "ar" && city.nameAr ? city.nameAr : city.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--color-text-muted)",
                      margin: "0.35rem 0 0",
                      fontWeight: 500,
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
                    gap: "0.5rem",
                    color: "var(--color-primary)",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    flexDirection: locale === "ar" ? "row-reverse" : "row",
                    paddingTop: "0.75rem",
                  }}
                >
                  {t("cities.viewWeather")}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    style={{ transform: locale === "ar" ? "scaleX(-1)" : "none", transition: "transform 0.3s ease" }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Ad — between city grid and "see all" CTA */}
        <AdUnit slot="5678901234" format="horizontal" style={{ margin: "3rem 0" }} />

        {/* See all cities */}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link
            href={`/${locale}/cities`}
            className="btn btn-outline"
            style={{ 
              display: "inline-flex",
              padding: "1rem 2.5rem",
              fontSize: "1rem",
              boxShadow: "var(--shadow-md)"
            }}
          >
            {t("cities.viewAll", { count: MOROCCAN_CITIES.length })}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ marginLeft: "0.5rem" }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .city-card-link:hover svg {
          transform: translateX(4px) ${locale === "ar" ? "scaleX(-1)" : ""};
        }
      `}</style>
    </section>
  );
};

export default CitiesSection;

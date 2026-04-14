"use client";

import React from "react";
import Search from "./Search-irea";
import { useLanguage } from "@/app/lib/LanguageContext";

const Header: React.FC = () => {
  const { locale, t } = useLanguage();

  return (
    <>
      <div id="histats_counter" style={{ display: "none" }} />

      <section
        id="hero-area"
        style={{
          background:
            "linear-gradient(135deg, #0c4a6e 0%, #0369a1 45%, #0284c7 75%, #38bdf8 100%)",
          padding: "7rem 0 5rem",
          position: "relative",
          overflow: "hidden",
          direction: locale === "ar" ? "rtl" : "ltr",
        }}
      >
        {/* decorative blobs */}
        <div
          aria-hidden
          style={{
            position: "absolute", top: "-80px", right: "-80px",
            width: 320, height: 320,
            background: "rgba(255,255,255,0.06)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute", bottom: "-60px", left: "-60px",
            width: 240, height: 240,
            background: "rgba(255,255,255,0.04)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* badge */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "var(--radius-full)",
                padding: "0.35rem 1.1rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                backdropFilter: "blur(8px)",
                marginBottom: "1.5rem",
              }}
            >
              {t("hero.badge")}
            </span>

            <h1
              style={{
                fontSize: "clamp(2.25rem, 6vw, 3.5rem)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
                marginBottom: "1.5rem",
              }}
            >
              {t("hero.title1")}
              <br />
              <span style={{ color: "#7dd3fc" }}>{t("hero.title2")}</span>
            </h1>

            <p
              style={{
                fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
                color: "rgba(255,255,255,0.82)",
                maxWidth: 560,
                margin: "0 auto 2.5rem",
                lineHeight: 1.7,
              }}
            >
              {t("hero.subtitle")}
            </p>

            {/* Search */}
            <Search />
          </div>

          {/* stats row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1.5rem",
              marginTop: "2rem",
            }}
          >
            {([
              { icon: "🏙️", fr: "60+ villes couvertes",           ar: "+60 مدينة مغطاة",           en: "60+ cities covered"       },
              { icon: "⏱️", fr: "Mise à jour toutes les 10 min",  ar: "تحديث كل 10 دقائق",         en: "Updated every 10 min"     },
              { icon: "📅", fr: "Prévisions sur 14 jours",         ar: "توقعات 14 يوماً",            en: "14-day forecasts"         },
            ] as const).map((s) => ({
              icon: s.icon,
              label: s[locale as "fr" | "ar" | "en"] ?? s.fr,
            })).map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "var(--radius-full)",
                  padding: "0.4rem 1rem",
                  backdropFilter: "blur(6px)",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 600,
                }}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;

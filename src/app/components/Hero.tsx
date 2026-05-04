"use client";

import React from "react";
import Search from "./SearchArea";
import { useLanguage } from "@/app/lib/LanguageContext";

const Hero: React.FC = () => {
  const { locale, t } = useLanguage();

  return (
    <>
      <div id="histats_counter" style={{ display: "none" }} />

      <section
        id="hero-area"
        style={{
          background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 45%, #0ea5e9 100%)",
          padding: "8rem 0 6rem",
          position: "relative",
          overflow: "hidden",
          direction: locale === "ar" ? "rtl" : "ltr",
        }}
      >
        {/* Modern Mesh Gradient Overlay */}
        <div 
          aria-hidden
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.3) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        {/* Floating Glass Blobs */}
        <div
          className="floating-blob"
          aria-hidden
          style={{
            position: "absolute", top: "10%", right: "5%",
            width: 300, height: 300,
            background: "rgba(255, 255, 255, 0.08)",
            borderRadius: "50%",
            backdropFilter: "blur(40px)",
            pointerEvents: "none",
            animation: "float 15s infinite alternate ease-in-out",
          }}
        />
        <div
          className="floating-blob"
          aria-hidden
          style={{
            position: "absolute", bottom: "5%", left: "10%",
            width: 200, height: 200,
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "50%",
            backdropFilter: "blur(30px)",
            pointerEvents: "none",
            animation: "float 20s infinite alternate-reverse ease-in-out",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span
              className="glass"
              style={{
                display: "inline-block",
                padding: "0.5rem 1.25rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.75rem",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "2rem",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              {t("hero.badge")}
            </span>

            <h1
              style={{
                fontSize: "clamp(2.5rem, 8vw, 4.25rem)",
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1,
                letterSpacing: "-0.05em",
                marginBottom: "1.75rem",
                textShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              {t("hero.title1")}
              <br />
              <span style={{ 
                background: "linear-gradient(to right, #7dd3fc, #e0f2fe)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent",
                display: "inline-block"
              }}>
                {t("hero.title2")}
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                color: "rgba(255, 255, 255, 0.85)",
                maxWidth: 600,
                margin: "0 auto 3rem",
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              {t("hero.subtitle")}
            </p>

            <Search />
          </div>

          {/* Premium Stats Widgets */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "2.5rem",
            }}
          >
            {([
              { icon: "🏙️", fr: "60+ villes", ar: "+60 مدينة", en: "60+ cities" },
              { icon: "⏱️", fr: "Direct (10 min)", ar: "مباشر (10 د)", en: "Live (10 min)" },
              { icon: "📅", fr: "14 Jours", ar: "14 يوم", en: "14 Days" },
            ] as const).map((s) => ({
              icon: s.icon,
              label: s[locale as "fr" | "ar" | "en"] ?? s.fr,
            })).map((s) => (
              <div
                key={s.label}
                className="glass"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.875rem",
                  color: "#fff",
                  fontWeight: 800,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "default",
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>{s.icon}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CSS for Hero Animations */}
        <style jsx>{`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(-30px) rotate(10deg); }
          }
        `}</style>
      </section>
    </>
  );
};

export default Hero;

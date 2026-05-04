"use client";

import Link from "next/link";
import { useLanguage } from "@/app/lib/LanguageContext";

const POPULAR_CITIES = [
  { name: "Casablanca", slug: "casablanca", emoji: "🏙️" },
  { name: "Marrakech",  slug: "marrakech",  emoji: "🕌" },
  { name: "Rabat",      slug: "rabat",      emoji: "🏛️" },
  { name: "Agadir",     slug: "agadir",     emoji: "🌴" },
  { name: "Tanger",     slug: "tanger",     emoji: "⛵" },
  { name: "Fès",        slug: "fes",        emoji: "🏺" },
];

const COPY = {
  fr: {
    badge: "Erreur 404",
    title: "Page introuvable",
    desc: "Désolé, cette page n'existe pas ou a été déplacée. Consultez la météo de votre ville directement.",
    home: "Retour à l'accueil",
    cities: "Toutes les villes",
    popular: "Villes populaires",
  },
  ar: {
    badge: "خطأ 404",
    title: "الصفحة غير موجودة",
    desc: "عذراً، هذه الصفحة غير موجودة أو تم نقلها. ابحث عن طقس مدينتك مباشرةً.",
    home: "العودة للرئيسية",
    cities: "جميع المدن",
    popular: "مدن شهيرة",
  },
  en: {
    badge: "Error 404",
    title: "Page not found",
    desc: "Sorry, this page doesn't exist or has been moved. Check the weather for your city directly.",
    home: "Back to home",
    cities: "All cities",
    popular: "Popular cities",
  },
};

export default function NotFoundContent() {
  const { locale } = useLanguage();
  const copy = COPY[locale] ?? COPY.fr;

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        textAlign: "center",
        background: "var(--color-bg)",
      }}
    >
      <div
        style={{
          fontSize: "5rem",
          lineHeight: 1,
          marginBottom: "1.5rem",
          filter: "drop-shadow(0 8px 16px rgba(3,105,161,.2))",
          animation: "float 3s ease-in-out infinite",
        }}
      >
        🌫️
      </div>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "var(--color-primary-light)",
          borderRadius: "var(--radius-full)",
          padding: "0.3rem 1rem",
          marginBottom: "1.25rem",
        }}
      >
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {copy.badge}
        </span>
      </div>

      <h1
        style={{
          fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
          fontWeight: 800,
          color: "var(--color-text)",
          marginBottom: "0.875rem",
          letterSpacing: "-0.03em",
          maxWidth: 520,
        }}
      >
        {copy.title}
      </h1>

      <p style={{ color: "var(--color-text-muted)", fontSize: "1.0625rem", maxWidth: 440, lineHeight: 1.7, marginBottom: "2.5rem" }}>
        {copy.desc}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginBottom: "3rem" }}>
        <Link href="/" className="btn btn-primary" style={{ display: "inline-flex" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          {copy.home}
        </Link>
        <Link href="/cities" className="btn btn-outline" style={{ display: "inline-flex" }}>
          {copy.cities}
        </Link>
      </div>

      <div style={{ width: "100%", maxWidth: 560 }}>
        <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>
          {copy.popular}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", justifyContent: "center" }}>
          {POPULAR_CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.45rem 1rem",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-full)",
                fontSize: "0.875rem", fontWeight: 500,
                color: "var(--color-text)", textDecoration: "none",
                transition: "all 0.2s",
              }}
              className="city-pill"
            >
              {city.emoji} {city.name}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }
        .city-pill:hover {
          border-color: var(--color-primary) !important;
          color: var(--color-primary) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </div>
  );
}

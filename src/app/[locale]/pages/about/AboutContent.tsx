"use client";

import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";
import { useLanguage } from "@/app/lib/LanguageContext";

const stats = [
  { value: "60+", label: { fr: "Villes marocaines", ar: "مدينة مغربية", en: "Moroccan cities" } },
  { value: "14J", label: { fr: "Prévisions avancées", ar: "توقعات مستقبلية", en: "Forecast horizon" } },
  { value: "3",   label: { fr: "Langues disponibles", ar: "لغات متاحة", en: "Languages" } },
  { value: "24/7", label: { fr: "Disponibilité", ar: "التوفر", en: "Availability" } },
];

// SVG icons as components — renders perfectly on all OS/browsers
const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconMap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
    <line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconZap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const values = [
  {
    icon: <IconShield />,
    color: "#0369a1",
    bg: "#e0f2fe",
    title: { fr: "Données fiables", ar: "بيانات موثوقة", en: "Reliable data" },
    text: {
      fr: "Nos prévisions s'appuient sur OpenWeatherMap, l'une des sources météorologiques les plus reconnues au monde, avec des mises à jour toutes les 10 minutes.",
      ar: "تعتمد توقعاتنا على OpenWeatherMap، أحد أكثر مصادر الطقس موثوقية في العالم، مع تحديثات كل 10 دقائق.",
      en: "Our forecasts rely on OpenWeatherMap, one of the most trusted weather sources worldwide, with updates every 10 minutes.",
    },
  },
  {
    icon: <IconMap />,
    color: "#15803d",
    bg: "#dcfce7",
    title: { fr: "Conçu pour le Maroc", ar: "مصمم للمغرب", en: "Built for Morocco" },
    text: {
      fr: "De Tanger à Dakhla, en passant par Marrakech, Fès et le Sahara — MeteoAuMaroc couvre toutes les grandes villes et régions du Royaume avec des données localisées.",
      ar: "من طنجة إلى الداخلة، مروراً بمراكش وفاس والصحراء — يغطي MeteoAuMaroc جميع المدن الكبرى والمناطق بالمغرب ببيانات محلية.",
      en: "From Tangier to Dakhla, including Marrakech, Fès, and the Sahara — MeteoAuMaroc covers all major Moroccan cities and regions with localized data.",
    },
  },
  {
    icon: <IconGlobe />,
    color: "#7c3aed",
    bg: "#ede9fe",
    title: { fr: "Trilingue & inclusif", ar: "ثلاثي اللغات وشامل", en: "Trilingual & inclusive" },
    text: {
      fr: "Le site est entièrement disponible en français, arabe (avec RTL automatique) et anglais. Chaque visiteur navigue dans sa langue, quelle que soit son origine.",
      ar: "الموقع متاح بالكامل بالفرنسية والعربية (مع RTL تلقائي) والإنجليزية. كل زائر يتصفح بلغته مهما كان أصله.",
      en: "The site is fully available in French, Arabic (with automatic RTL) and English. Every visitor browses in their language, regardless of origin.",
    },
  },
  {
    icon: <IconZap />,
    color: "#b45309",
    bg: "#fef3c7",
    title: { fr: "Rapide & performant", ar: "سريع وفعال", en: "Fast & performant" },
    text: {
      fr: "Pages villes pré-générées (SSG), cache serveur, images Next.js optimisées. MeteoAuMaroc charge en moins de 2 secondes, même sur une connexion mobile.",
      ar: "صفحات المدن مُنشأة مسبقاً (SSG)، ذاكرة تخزين مؤقت للخادم، صور Next.js مُحسَّنة. يُحمَّل MeteoAuMaroc في أقل من ثانيتين حتى على الاتصال المحمول.",
      en: "Pre-generated city pages (SSG), server-side cache, optimised Next.js images. MeteoAuMaroc loads in under 2 seconds, even on mobile connections.",
    },
  },
];

const timeline = [
  {
    year: "2023",
    event: {
      fr: "Lancement de MeteoAuMaroc.com avec couverture des 10 principales villes marocaines.",
      ar: "إطلاق MeteoAuMaroc.com مع تغطية أكبر 10 مدن مغربية.",
      en: "MeteoAuMaroc.com launched with coverage of Morocco's 10 major cities.",
    },
  },
  {
    year: "2024",
    event: {
      fr: "Expansion à 60+ villes, ajout des horaires de prière, du mode sombre et du support arabe RTL.",
      ar: "التوسع إلى 60+ مدينة، وإضافة أوقات الصلاة والوضع الليلي ودعم العربية RTL.",
      en: "Expanded to 60+ cities, added prayer times, dark mode, and Arabic RTL support.",
    },
  },
  {
    year: "2025",
    event: {
      fr: "Prévisions 14 jours, qualité de l'air, alertes météo et guide climatique complet pour tout le Maroc.",
      ar: "توقعات 14 يوماً وجودة الهواء والتنبيهات الجوية ودليل مناخي شامل للمغرب.",
      en: "14-day forecasts, air quality, weather alerts, and complete climate guide for all of Morocco.",
    },
  },
];

export default function AboutContent() {
  const { locale, t } = useLanguage();
  const loc = locale as "fr" | "ar" | "en";

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "60vh" }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)",
          padding: "3.5rem 0 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div aria-hidden style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.03em" }}>
            {t("about.title")}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.82)", maxWidth: 600, margin: "0 auto", fontSize: "1.0625rem", lineHeight: 1.75 }}>
            {t("about.subtitle")}
          </p>
        </div>
        <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, lineHeight: 0 }} aria-hidden>
          <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 40 }}>
            <path fill="var(--color-bg)" d="M0,24 C360,48 1080,0 1440,24 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </div>

      <Breadcrumb current={t("about.title")} />

      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem", maxWidth: 900 }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", marginBottom: "3.5rem" }}>
          {stats.map((s) => (
            <div key={s.label.fr} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "1.5rem 1rem", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--color-primary)", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginTop: "0.4rem", fontWeight: 500 }}>{s.label[loc]}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "2rem 2.5rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-text)" }}>
            {t("about.missionTitle")}
          </h2>
          {loc === "ar" ? (
            <>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.85, fontSize: "0.9375rem", marginBottom: "1rem" }}>
                وُلد MeteoAuMaroc.com من ملاحظة بسيطة: يستحق المغاربة مصدراً مخصصاً للطقس يخدم أراضيهم، بلغتهم، ببيانات دقيقة وموثوقة. نجمع بين API OpenWeatherMap وبنية تقنية عالية الأداء وواجهة حديثة لتقديم أفضل تجربة طقس ممكنة.
              </p>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.85, fontSize: "0.9375rem", margin: 0 }}>
                تغطي منصتنا أكثر من 60 مدينة في المملكة، مع توقعات لـ 14 يوماً وأوقات الصلاة وبيانات فورية — كل ذلك متاح بالفرنسية والعربية والإنجليزية، مجاناً وبدون إعلانات مُقحَمة.
              </p>
            </>
          ) : loc === "en" ? (
            <>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.85, fontSize: "0.9375rem", marginBottom: "1rem" }}>
                MeteoAuMaroc.com was built from a simple observation: Moroccans deserve a dedicated weather source for their territory, in their language, with accurate and reliable data. We combine the OpenWeatherMap API, a high-performance technical architecture, and a modern interface to deliver the best possible weather experience.
              </p>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.85, fontSize: "0.9375rem", margin: 0 }}>
                Our platform covers 60+ cities across Morocco, with 14-day forecasts, prayer times, and real-time data — all available in French, Arabic, and English, free of charge, with a clean and utility-first experience.
              </p>
            </>
          ) : (
            <>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.85, fontSize: "0.9375rem", marginBottom: "1rem" }}>
                MeteoAuMaroc.com est né d&apos;un constat simple : les Marocains méritent une source météo dédiée à leur territoire, dans leur langue, avec des données précises et fiables. Nous combinons l&apos;API OpenWeatherMap, une architecture technique performante et une interface moderne pour offrir la meilleure expérience météo possible.
              </p>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.85, fontSize: "0.9375rem", margin: 0 }}>
                Notre plateforme couvre 60+ villes du Royaume, avec des prévisions 14 jours, les horaires de prière et des données en temps réel — le tout disponible en français, arabe et anglais, gratuitement, avec une expérience claire et centrée sur l’utilité.
              </p>
            </>
          )}
        </div>

        {/* Values */}
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--color-text)" }}>
          {t("about.valuesTitle")}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
          {values.map((v) => (
            <div key={v.title.fr} className="card" style={{ padding: "1.5rem" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: v.bg, color: v.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", flexShrink: 0 }}>
                {v.icon}
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--color-text)" }}>{v.title[loc]}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.75, margin: 0 }}>{v.text[loc]}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--color-text)" }}>
          {loc === "ar" ? "مسيرتنا" : loc === "en" ? "Our journey" : "Notre parcours"}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "3rem", borderLeft: `3px solid var(--color-primary-light)`, paddingLeft: "1.5rem", marginLeft: "0.5rem" }}>
          {timeline.map((item, i) => (
            <div key={item.year} style={{ position: "relative", paddingBottom: i < timeline.length - 1 ? "1.75rem" : 0 }}>
              {/* Dot */}
              <div style={{ position: "absolute", left: "-1.875rem", top: "0.25rem", width: 12, height: 12, borderRadius: "50%", background: "var(--color-primary)", border: "2px solid var(--color-bg)", boxSizing: "border-box" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.year}</span>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>{item.event[loc]}</p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div style={{ background: "linear-gradient(135deg, var(--color-primary), #0ea5e9)", borderRadius: "var(--radius-lg)", padding: "2.5rem", textAlign: "center", color: "#fff" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>💬</div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "#fff" }}>
            {t("about.contactTitle")}
          </h3>
          <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "1.5rem", lineHeight: 1.7 }}>
            {t("about.contactDesc")}
          </p>
          <Link href={`/${locale}/pages/contact`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#fff", color: "var(--color-primary)", padding: "0.75rem 2rem", borderRadius: "var(--radius-full)", fontWeight: 700, textDecoration: "none", fontSize: "0.9375rem" }}>
            {t("about.contactBtn")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}

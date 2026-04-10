"use client";

import Link from "next/link";
import { useLanguage } from "@/app/lib/LanguageContext";

const SEASON_DATA = {
  fr: {
    spring: { icon: "🌸", name: "Printemps", months: "Mar – Mai", tip: "Idéal pour visiter Marrakech et le Sahara. Températures douces, paysages fleuris.", cities: ["marrakech", "ouarzazate"] },
    summer: { icon: "☀️", name: "Été",       months: "Jun – Sep", tip: "Parfait pour les plages d'Agadir et la fraîcheur d'Ifrane. Évitez l'intérieur des terres.", cities: ["agadir", "ifrane"] },
    autumn: { icon: "🍂", name: "Automne",   months: "Oct – Nov", tip: "Excellent pour Fès et Chefchaouen. Lumière dorée et foules réduites.", cities: ["fes", "chefchaouen"] },
    winter: { icon: "❄️", name: "Hiver",     months: "Déc – Fév", tip: "Ski à Ifrane, douceur à Agadir. Les côtes restent agréables (18-20°C).", cities: ["ifrane", "agadir"] },
  },
  ar: {
    spring: { icon: "🌸", name: "الربيع", months: "مارس – مايو", tip: "مثالي لزيارة مراكش والصحراء. حرارة معتدلة ومناظر مزهرة.", cities: ["marrakech", "ouarzazate"] },
    summer: { icon: "☀️", name: "الصيف", months: "يونيو – شتنبر", tip: "رائع لشواطئ أكادير وبرودة إفران. تجنب المناطق الداخلية.", cities: ["agadir", "ifrane"] },
    autumn: { icon: "🍂", name: "الخريف", months: "أكتوبر – نونبر", tip: "ممتاز لفاس وشفشاون. ضوء ذهبي وحشود أقل.", cities: ["fes", "chefchaouen"] },
    winter: { icon: "❄️", name: "الشتاء", months: "دجنبر – فبراير", tip: "تزلج في إفران ودفء في أكادير. السواحل تبقى لطيفة (18-20°C).", cities: ["ifrane", "agadir"] },
  },
  en: {
    spring: { icon: "🌸", name: "Spring", months: "Mar – May", tip: "Ideal for Marrakech and the Sahara. Mild temps, blooming landscapes.", cities: ["marrakech", "ouarzazate"] },
    summer: { icon: "☀️", name: "Summer", months: "Jun – Sep", tip: "Perfect for Agadir beaches and Ifrane's mountain cool. Avoid inland cities.", cities: ["agadir", "ifrane"] },
    autumn: { icon: "🍂", name: "Autumn", months: "Oct – Nov", tip: "Excellent for Fès and Chefchaouen. Golden light and smaller crowds.", cities: ["fes", "chefchaouen"] },
    winter: { icon: "❄️", name: "Winter",  months: "Dec – Feb", tip: "Skiing in Ifrane, warmth in Agadir. The coasts stay pleasant (18-20°C).", cities: ["ifrane", "agadir"] },
  },
};

const CITY_NAMES: Record<string, string> = {
  marrakech: "Marrakech", ouarzazate: "Ouarzazate", agadir: "Agadir",
  ifrane: "Ifrane", fes: "Fès", chefchaouen: "Chefchaouen",
};

function getCurrentSeason(): "spring" | "summer" | "autumn" | "winter" {
  const m = new Date().getMonth(); // 0-indexed
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 8) return "summer";
  if (m >= 9 && m <= 10) return "autumn";
  return "winter";
}

export default function SeasonalTips() {
  const { locale } = useLanguage();
  const data = SEASON_DATA[locale as "fr" | "ar" | "en"] ?? SEASON_DATA.fr;
  const current = getCurrentSeason();
  const seasons = Object.entries(data) as [string, (typeof data)[keyof typeof data]][];

  const heading = {
    fr: "Météo au Maroc selon la Saison",
    ar: "طقس المغرب حسب الموسم",
    en: "Morocco Weather by Season",
  }[locale] ?? "Météo au Maroc selon la Saison";

  const sub = {
    fr: "Chaque saison offre une expérience unique. Découvrez les meilleures destinations selon la période.",
    ar: "كل موسم يمنحك تجربة فريدة. اكتشف أفضل الوجهات حسب الوقت.",
    en: "Each season offers a unique experience. Find the best destinations for your travel period.",
  }[locale] ?? "";

  return (
    <section style={{ background: "var(--color-bg)", padding: "4rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--color-primary-light)", border: "1px solid var(--color-primary)", borderRadius: "var(--radius-full)", padding: "0.3rem 1rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              🗓️ {locale === "ar" ? "دليل الفصول" : locale === "en" ? "Seasonal guide" : "Guide saisonnier"}
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "var(--color-text)", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>{heading}</h2>
          <p style={{ color: "var(--color-text-muted)", maxWidth: 520, margin: "0 auto", fontSize: "1rem", lineHeight: 1.7 }}>{sub}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
          {seasons.map(([key, s]) => {
            const isCurrentSeason = key === current;
            return (
              <div
                key={key}
                className="card"
                style={{
                  padding: "1.5rem",
                  border: isCurrentSeason ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {isCurrentSeason && (
                  <div style={{ position: "absolute", top: "0.75rem", right: locale === "ar" ? "auto" : "0.75rem", left: locale === "ar" ? "0.75rem" : "auto", background: "var(--color-primary)", color: "#fff", fontSize: "0.65rem", fontWeight: 700, borderRadius: "var(--radius-full)", padding: "0.2rem 0.625rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {locale === "ar" ? "الآن" : locale === "en" ? "Now" : "En ce moment"}
                  </div>
                )}
                <div style={{ fontSize: "2.25rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--color-text)", margin: "0 0 0.25rem" }}>{s.name}</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 600, margin: "0 0 0.75rem" }}>{s.months}</p>
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.65, margin: "0 0 1.25rem" }}>{s.tip}</p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {s.cities.map((slug) => (
                    <Link
                      key={slug}
                      href={`/cities/${slug}`}
                      style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-primary)", background: "var(--color-primary-light)", borderRadius: "var(--radius-full)", padding: "0.25rem 0.75rem", textDecoration: "none", border: "1px solid var(--color-primary)" }}
                    >
                      {CITY_NAMES[slug]}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

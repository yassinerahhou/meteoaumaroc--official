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
    fr: "Météo au Maroc par Saison",
    ar: "طقس المغرب حسب الموسم",
    en: "Morocco Weather by Season",
  }[locale] ?? "Météo au Maroc par Saison";

  const sub = {
    fr: "Chaque saison offre une expérience unique. Planifiez votre voyage avec nos conseils experts.",
    ar: "كل موسم يمنحك تجربة فريدة. خطط لرحلتك مع نصائح خبرائنا.",
    en: "Each season offers a unique experience. Plan your trip with our expert advice.",
  }[locale] ?? "";

  return (
    <section style={{ background: "var(--color-bg)", padding: "6rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
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
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              🗓️ {locale === "ar" ? "دليل الفصول" : locale === "en" ? "Seasonal guide" : "Guide saisonnier"}
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 900,
              color: "var(--color-text)",
              marginBottom: "0.75rem",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            {heading}
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
            {sub}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {seasons.map(([key, s]) => {
            const isCurrentSeason = key === current;
            return (
              <div
                key={key}
                className="card"
                style={{
                  padding: "2rem",
                  border: isCurrentSeason ? "2.5px solid var(--color-primary)" : "1px solid var(--color-border)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  background: isCurrentSeason ? "var(--color-surface)" : "var(--color-surface)",
                  boxShadow: isCurrentSeason ? "var(--shadow-xl)" : "var(--shadow-md)",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
              >
                {isCurrentSeason && (
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: locale === "ar" ? "auto" : "1rem",
                      left: locale === "ar" ? "1rem" : "auto",
                      background: "var(--color-primary)",
                      color: "#fff",
                      fontSize: "0.6875rem",
                      fontWeight: 800,
                      borderRadius: "var(--radius-full)",
                      padding: "0.25rem 0.875rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      boxShadow: "0 4px 12px rgba(14, 165, 233, 0.4)",
                    }}
                  >
                    {locale === "ar" ? "الآن" : locale === "en" ? "Now" : "En ce moment"}
                  </div>
                )}
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{s.icon}</div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "var(--color-text)",
                    margin: "0 0 0.35rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-primary)",
                    fontWeight: 700,
                    margin: "0 0 1rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  {s.months}
                </p>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                    margin: "0 0 1.75rem",
                    fontWeight: 500,
                  }}
                >
                  {s.tip}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "0.625rem",
                    flexWrap: "wrap",
                    marginTop: "auto",
                  }}
                >
                  {s.cities.map((slug) => (
                    <Link
                      key={slug}
                      href={`/${locale}/cities/${slug}`}
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        color: "var(--color-text)",
                        background: "rgba(0,0,0,0.03)",
                        borderRadius: "var(--radius-full)",
                        padding: "0.35rem 1rem",
                        textDecoration: "none",
                        border: "1px solid var(--color-border)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "var(--color-primary)";
                        (e.currentTarget as HTMLElement).style.color = "#fff";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.03)";
                        (e.currentTarget as HTMLElement).style.color = "var(--color-text)";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                      }}
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

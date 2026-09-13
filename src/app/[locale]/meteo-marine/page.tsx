import type { Metadata } from "next";
import Link from "next/link";
import { MOROCCAN_CITIES } from "@/app/lib/cities";
import { asLocale } from "@/app/lib/site";

const COASTAL_SLUGS = [
  "casablanca", "tanger", "agadir", "essaouira", "imsouane", 
  "dakhla", "mirleft", "rabat", "el-jadida", "safi", "nador", "al-hoceima"
];

interface Props {
  params: { locale: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const locale = asLocale(params.locale);
  const title = locale === "ar" ? "طقس البحر وركوب الأمواج في المغرب | MeteoAuMaroc" : locale === "en" ? "Morocco Surf & Marine Weather | MeteoAuMaroc" : "Météo Marine & Surf au Maroc | MeteoAuMaroc";
  const description = locale === "ar" ? "توقعات الأمواج والرياح وحالة البحر للمدن الساحلية المغربية." : locale === "en" ? "Wave forecasts, wind, and sea conditions for Moroccan coastal cities." : "Prévisions des vagues, vent et état de la mer pour les villes côtières marocaines.";
  
  return { title, description };
}

export default function MarineHubPage({ params }: Props) {
  const locale = asLocale(params.locale);
  const coastalCities = MOROCCAN_CITIES.filter(c => COASTAL_SLUGS.includes(c.slug));

  return (
    <div className="container" style={{ maxWidth: 900, padding: "4rem 1rem", minHeight: "70vh" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem" }}>
          {locale === "ar" ? "طقس البحر وركوب الأمواج" : locale === "en" ? "Surf & Marine Weather" : "Météo Marine & Surf"}
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", maxWidth: 600, margin: "0 auto" }}>
          {locale === "ar" 
            ? "توقعات تفصيلية للأمواج والرياح وحالة البحر للمدن الساحلية وأماكن ركوب الأمواج في المغرب." 
            : locale === "en" 
            ? "Detailed wave, wind, and sea condition forecasts for coastal cities and surf spots in Morocco." 
            : "Prévisions détaillées des vagues, du vent et de l'état de la mer pour les villes côtières et spots de surf au Maroc."}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
        {coastalCities.map(city => (
          <Link 
            href={`/${locale}/meteo-marine/${city.slug}`} 
            key={city.slug}
            style={{ 
              display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem", 
              background: "var(--color-surface)", border: "1px solid var(--color-border)", 
              borderRadius: "var(--radius-lg)", textDecoration: "none", color: "var(--color-text)",
              transition: "transform 0.2s, borderColor 0.2s"
            }}
          >
            <div style={{ fontSize: "2rem" }}>{city.emoji}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                {locale === "ar" ? city.nameAr || city.name : city.name}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                {locale === "ar" ? "توقعات الأمواج" : locale === "en" ? "Wave Forecast" : "Prévisions vagues"} →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

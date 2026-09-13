import type { Metadata } from "next";
import Link from "next/link";
import { MOROCCAN_CITIES } from "@/app/lib/cities";
import { asLocale } from "@/app/lib/site";

// We select a few major industrial/urban hubs for the main list
const AQI_CITIES = [
  "casablanca", "rabat", "tanger", "marrakech", "fes", 
  "meknes", "agadir", "oujda", "kenitra", "safi"
];

interface Props {
  params: { locale: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const locale = asLocale(params.locale);
  const title = locale === "ar" ? "جودة الهواء والتلوث في المغرب | MeteoAuMaroc" : locale === "en" ? "Air Quality & Pollution in Morocco | MeteoAuMaroc" : "Qualité de l'Air & Pollution au Maroc | MeteoAuMaroc";
  const description = locale === "ar" ? "مؤشر جودة الهواء (AQI) ومستويات التلوث في المدن الكبرى المغربية في الوقت الفعلي." : locale === "en" ? "Real-time Air Quality Index (AQI) and pollution levels for major Moroccan cities." : "Indice de qualité de l'air (AQI) et niveaux de pollution en temps réel pour les grandes villes marocaines.";
  
  return { title, description };
}

export default function AirQualityHubPage({ params }: Props) {
  const locale = asLocale(params.locale);
  const aqiCities = MOROCCAN_CITIES.filter(c => AQI_CITIES.includes(c.slug));

  return (
    <div className="container" style={{ maxWidth: 900, padding: "4rem 1rem", minHeight: "70vh" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem" }}>
          {locale === "ar" ? "جودة الهواء (AQI)" : locale === "en" ? "Air Quality Index (AQI)" : "Qualité de l'Air (AQI)"}
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", maxWidth: 600, margin: "0 auto" }}>
          {locale === "ar" 
            ? "تحقق من مستويات التلوث وجودة الهواء في المدن المغربية الكبرى وتوصيات الصحة اليومية." 
            : locale === "en" 
            ? "Check pollution levels, air quality in major Moroccan cities, and daily health recommendations." 
            : "Vérifiez les niveaux de pollution, la qualité de l'air dans les grandes villes marocaines et nos recommandations santé."}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
        {aqiCities.map(city => (
          <Link 
            href={`/${locale}/qualite-air/${city.slug}`} 
            key={city.slug}
            style={{ 
              display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem", 
              background: "var(--color-surface)", border: "1px solid var(--color-border)", 
              borderRadius: "var(--radius-lg)", textDecoration: "none", color: "var(--color-text)",
              transition: "transform 0.2s, borderColor 0.2s"
            }}
          >
            <div style={{ fontSize: "2rem" }}>🏭</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                {locale === "ar" ? city.nameAr || city.name : city.name}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                {locale === "ar" ? "مؤشر التلوث" : locale === "en" ? "Pollution Index" : "Indice de pollution"} →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

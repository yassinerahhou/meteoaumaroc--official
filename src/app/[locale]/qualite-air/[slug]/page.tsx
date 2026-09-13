import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MOROCCAN_CITIES } from "@/app/lib/cities";
import { asLocale } from "@/app/lib/site";
import { getAirQualityData } from "@/app/lib/openWeather";
import Link from "next/link";

interface Props {
  params: { slug: string; locale: string };
}

const AQI_CITIES = [
  "casablanca", "rabat", "tanger", "marrakech", "fes", 
  "meknes", "agadir", "oujda", "kenitra", "safi"
];

export function generateStaticParams() {
  const locales = ["fr", "ar", "en"];
  const params: { slug: string; locale: string }[] = [];
  locales.forEach((locale) => {
    AQI_CITIES.forEach((slug) => {
      params.push({ slug, locale });
    });
  });
  return params;
}

export function generateMetadata({ params }: Props): Metadata {
  const city = MOROCCAN_CITIES.find(c => c.slug === params.slug);
  const locale = asLocale(params.locale);
  if (!city) return { title: "Introuvable" };

  const title = locale === "ar" 
    ? `جودة الهواء ومستوى التلوث في ${city.nameAr || city.name} | MeteoAuMaroc`
    : locale === "en"
    ? `${city.name} Air Quality Index (AQI) & Pollution | MeteoAuMaroc`
    : `Qualité de l'air (AQI) et pollution à ${city.name} | MeteoAuMaroc`;

  return { title };
}

export default async function AQICityPage({ params }: Props) {
  const city = MOROCCAN_CITIES.find(c => c.slug === params.slug);
  if (!city) notFound();

  const locale = asLocale(params.locale);
  const aqiData = await getAirQualityData(String(city.lat), String(city.lon));

  if (!aqiData || !aqiData.list.length) {
    return <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>Données indisponibles.</div>;
  }

  const aqi = aqiData.list[0].main.aqi;
  const components = aqiData.list[0].components;

  const aqiInfo = {
    1: { labelFr: "Bonne", labelEn: "Good", labelAr: "جيدة", color: "#4ade80", descFr: "La qualité de l'air est jugée satisfaisante, et la pollution de l'air pose peu ou pas de risque." },
    2: { labelFr: "Moyenne", labelEn: "Fair", labelAr: "متوسطة", color: "#facc15", descFr: "La qualité de l'air est acceptable ; cependant, il peut y avoir un problème de santé modéré pour un très petit nombre de personnes." },
    3: { labelFr: "Modérée", labelEn: "Moderate", labelAr: "معتدلة", color: "#fb923c", descFr: "Les personnes sensibles peuvent ressentir des effets sur la santé. Le grand public n'est pas susceptible d'être affecté." },
    4: { labelFr: "Mauvaise", labelEn: "Poor", labelAr: "سيئة", color: "#f87171", descFr: "Tout le monde peut commencer à ressentir des effets sur la santé ; les personnes sensibles peuvent ressentir des effets plus graves." },
    5: { labelFr: "Très mauvaise", labelEn: "Very Poor", labelAr: "سيئة جداً", color: "#991b1b", descFr: "Avertissements de santé indiquant des conditions d'urgence. Toute la population est susceptible d'être affectée." }
  }[aqi as 1|2|3|4|5] || { labelFr: "Inconnue", labelEn: "Unknown", labelAr: "غير معروف", color: "#94a3b8", descFr: "" };

  return (
    <div className="container" style={{ maxWidth: 900, padding: "3rem 1rem", minHeight: "70vh" }}>
      
      <div style={{ marginBottom: "2rem" }}>
        <Link href={`/${locale}/qualite-air`} style={{ color: "var(--color-primary)", textDecoration: "none", fontWeight: 600 }}>
          ← {locale === "ar" ? "رجوع إلى جودة الهواء" : locale === "en" ? "Back to Air Quality" : "Retour à la Qualité de l'Air"}
        </Link>
      </div>

      <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "2.5rem", borderRadius: "var(--radius-xl)", marginBottom: "2rem", boxShadow: "var(--shadow-xl)" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 0.5rem" }}>
          {locale === "ar" ? `جودة الهواء في ${city.nameAr || city.name}` : locale === "en" ? `${city.name} Air Quality` : `Qualité de l'air à ${city.name}`}
        </h1>
        
        <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "160px", height: "160px", borderRadius: "50%", background: "var(--color-bg)", border: `8px solid ${aqiInfo.color}` }}>
            <span style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 1 }}>{aqi}</span>
            <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-text-muted)" }}>AQI</span>
          </div>
          <div style={{ flex: "1 1 300px" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: aqiInfo.color, margin: "0 0 0.5rem" }}>
              {locale === "ar" ? aqiInfo.labelAr : locale === "en" ? aqiInfo.labelEn : aqiInfo.labelFr}
            </h2>
            <p style={{ fontSize: "1.05rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
              {aqiInfo.descFr}
            </p>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
        {locale === "ar" ? "تفاصيل الملوثات" : locale === "en" ? "Pollutant Details" : "Détails des polluants"} (μg/m3)
      </h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
        {[
          { key: "pm2_5", label: "PM2.5", val: components.pm2_5 },
          { key: "pm10", label: "PM10", val: components.pm10 },
          { key: "o3", label: "Ozone (O3)", val: components.o3 },
          { key: "no2", label: "NO2", val: components.no2 },
          { key: "so2", label: "SO2", val: components.so2 },
          { key: "co", label: "CO", val: components.co }
        ].map(p => (
          <div key={p.key} style={{ background: "var(--color-surface)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
            <div style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", fontWeight: 600, marginBottom: "0.5rem" }}>{p.label}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>{p.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

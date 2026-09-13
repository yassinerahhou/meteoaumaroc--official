import type { Metadata } from "next";
import { asLocale } from "@/app/lib/site";

interface Props {
  params: { locale: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const locale = asLocale(params.locale);
  const title = locale === "ar" ? "رادار الطقس التفاعلي للمغرب | MeteoAuMaroc" : locale === "en" ? "Interactive Morocco Weather Radar Map | MeteoAuMaroc" : "Radar Météo Interactif du Maroc | MeteoAuMaroc";
  const description = locale === "ar" ? "شاهد خريطة رادار الطقس التفاعلية للمغرب. تتبع السحب والأمطار والعواصف في الوقت الفعلي." : locale === "en" ? "Watch the interactive weather radar map for Morocco. Track clouds, rain, and storms in real-time." : "Regardez la carte radar météo interactive du Maroc. Suivez les nuages, la pluie et les tempêtes en temps réel.";
  
  return { title, description };
}

export default function RadarPage({ params }: Props) {
  const locale = asLocale(params.locale);

  return (
    <div className="container" style={{ maxWidth: 1200, padding: "2rem 1rem", minHeight: "80vh", display: "flex", flexDirection: "column" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem" }}>
          {locale === "ar" ? "رادار الطقس التفاعلي" : locale === "en" ? "Interactive Weather Radar" : "Radar Météo Interactif"}
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", maxWidth: 700, margin: "0 auto" }}>
          {locale === "ar" 
            ? "تتبع حركة السحب والأمطار والرياح فوق المغرب في الوقت الفعلي باستخدام خريطة الرادار التفاعلية." 
            : locale === "en" 
            ? "Track the movement of clouds, rain, and wind over Morocco in real-time using our interactive radar map." 
            : "Suivez le mouvement des nuages, de la pluie et du vent sur le Maroc en temps réel grâce à notre carte radar interactive."}
        </p>
      </div>

      <div style={{ flex: 1, borderRadius: "var(--radius-xl)", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-xl)", minHeight: "500px", position: "relative" }}>
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=5&overlay=rain&product=ecmwf&level=surface&lat=31.7917&lon=-7.0926&lang=${locale}`}
          frameBorder="0"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        ></iframe>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MOROCCAN_CITIES } from "@/app/lib/cities";
import { asLocale } from "@/app/lib/site";
import { getMarineData } from "@/app/lib/openMeteo";
import Link from "next/link";

interface Props {
  params: { slug: string; locale: string };
}

const COASTAL_SLUGS = [
  "casablanca", "tanger", "agadir", "essaouira", "imsouane", 
  "dakhla", "mirleft", "rabat", "el-jadida", "safi", "nador", "al-hoceima"
];

export function generateStaticParams() {
  const locales = ["fr", "ar", "en"];
  const params: { slug: string; locale: string }[] = [];
  locales.forEach((locale) => {
    COASTAL_SLUGS.forEach((slug) => {
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
    ? `طقس البحر وركوب الأمواج في ${city.nameAr || city.name} | MeteoAuMaroc`
    : locale === "en"
    ? `${city.name} Surf & Marine Weather Forecast | MeteoAuMaroc`
    : `Météo Marine & Surf à ${city.name} | MeteoAuMaroc`;

  return { title };
}

export default async function MarineCityPage({ params }: Props) {
  const city = MOROCCAN_CITIES.find(c => c.slug === params.slug);
  if (!city) notFound();

  const locale = asLocale(params.locale);
  const marine = await getMarineData(String(city.lat), String(city.lon));

  if (!marine || !marine.hourly.time.length) {
    return <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>Données marines indisponibles pour le moment.</div>;
  }

  // Get current hour index
  const now = new Date();
  const currentHour = now.toISOString().slice(0, 13) + ":00";
  let currentIndex = marine.hourly.time.findIndex(t => t.startsWith(currentHour));
  if (currentIndex === -1) currentIndex = 0;

  const currentWaveHeight = marine.hourly.wave_height[currentIndex];
  const currentWavePeriod = marine.hourly.wave_period[currentIndex];
  const currentWaveDir = marine.hourly.wave_direction[currentIndex];

  const getDirString = (deg: number) => {
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return dirs[Math.round(deg / 45) % 8];
  };

  return (
    <div className="container" style={{ maxWidth: 900, padding: "3rem 1rem", minHeight: "70vh" }}>
      
      <div style={{ marginBottom: "2rem" }}>
        <Link href={`/${locale}/meteo-marine`} style={{ color: "var(--color-primary)", textDecoration: "none", fontWeight: 600 }}>
          ← {locale === "ar" ? "رجوع إلى طقس البحر" : locale === "en" ? "Back to Marine Weather" : "Retour à la météo marine"}
        </Link>
      </div>

      <div style={{ background: "linear-gradient(135deg, #0f172a, #1e3a8a)", color: "#fff", padding: "2.5rem", borderRadius: "var(--radius-xl)", marginBottom: "2rem", boxShadow: "var(--shadow-xl)" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 0.5rem" }}>
          {locale === "ar" ? `طقس البحر في ${city.nameAr || city.name}` : locale === "en" ? `${city.name} Surf Forecast` : `Météo Surf & Marine à ${city.name}`}
        </h1>
        <p style={{ opacity: 0.8, fontSize: "1rem", margin: 0 }}>
          {locale === "ar" ? "توقعات الأمواج الحالية" : locale === "en" ? "Current wave conditions" : "Conditions de vagues actuelles"}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
          <div style={{ background: "rgba(255,255,255,0.1)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.2)", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem" }}>🌊</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.5rem" }}>{currentWaveHeight} <span style={{ fontSize: "1rem" }}>m</span></div>
            <div style={{ fontSize: "0.85rem", opacity: 0.7, textTransform: "uppercase", letterSpacing: "1px", marginTop: "0.25rem" }}>Houle (Swell)</div>
          </div>
          
          <div style={{ background: "rgba(255,255,255,0.1)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.2)", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem" }}>⏱️</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.5rem" }}>{currentWavePeriod} <span style={{ fontSize: "1rem" }}>s</span></div>
            <div style={{ fontSize: "0.85rem", opacity: 0.7, textTransform: "uppercase", letterSpacing: "1px", marginTop: "0.25rem" }}>Période (Period)</div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.1)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.2)", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem" }}>🧭</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.5rem" }}>{getDirString(currentWaveDir)}</div>
            <div style={{ fontSize: "0.85rem", opacity: 0.7, textTransform: "uppercase", letterSpacing: "1px", marginTop: "0.25rem" }}>Direction</div>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
        {locale === "ar" ? "توقعات الأمواج القادمة" : locale === "en" ? "Upcoming Wave Forecast" : "Prévisions des vagues à venir"}
      </h2>
      
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "600px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--color-border)", color: "var(--color-text-muted)" }}>
              <th style={{ padding: "1rem" }}>Heure</th>
              <th style={{ padding: "1rem" }}>Hauteur</th>
              <th style={{ padding: "1rem" }}>Période</th>
              <th style={{ padding: "1rem" }}>Direction</th>
            </tr>
          </thead>
          <tbody>
            {marine.hourly.time.slice(currentIndex, currentIndex + 24).map((timeStr, i) => (
              <tr key={timeStr} style={{ borderBottom: "1px solid var(--color-border)", background: i % 2 === 0 ? "var(--color-surface)" : "var(--color-bg)" }}>
                <td style={{ padding: "1rem", fontWeight: 600 }}>{new Date(timeStr).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}</td>
                <td style={{ padding: "1rem", fontWeight: 700, color: "var(--color-primary)" }}>{marine.hourly.wave_height[currentIndex + i]} m</td>
                <td style={{ padding: "1rem" }}>{marine.hourly.wave_period[currentIndex + i]} s</td>
                <td style={{ padding: "1rem" }}>{getDirString(marine.hourly.wave_direction[currentIndex + i])} ({marine.hourly.wave_direction[currentIndex + i]}°)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

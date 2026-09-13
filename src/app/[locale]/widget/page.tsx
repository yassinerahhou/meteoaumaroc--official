import { MOROCCAN_CITIES } from "@/app/lib/cities";
import { getWeatherData } from "@/app/lib/openWeather";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: { locale: string };
  searchParams: { city?: string; theme?: string };
}

export const metadata: Metadata = {
  robots: { index: false, follow: true }, // We don't want the raw widget indexed, but we want bots to follow the link!
};

export default async function WidgetPage({ params, searchParams }: Props) {
  const { locale } = params;
  const slug = searchParams.city || "casablanca";
  const theme = searchParams.theme === "dark" ? "dark" : "light";
  
  const city = MOROCCAN_CITIES.find(c => c.slug === slug) || MOROCCAN_CITIES[0];
  const weather = await getWeatherData(String(city.lat), String(city.lon), locale);

  if (!weather) return <div>Données indisponibles</div>;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  const desc = weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1);
  const temp = Math.round(weather.main.temp);

  const bg = theme === "dark" ? "#1e293b" : "#ffffff";
  const text = theme === "dark" ? "#f8fafc" : "#0f172a";
  const border = theme === "dark" ? "#334155" : "#e2e8f0";

  return (
    <div style={{ background: bg, color: text, fontFamily: "sans-serif", borderRadius: "12px", border: `1px solid ${border}`, padding: "16px", maxWidth: "300px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
      <style>{`
        header, nav, footer, .cookie-consent { display: none !important; }
        body { background: transparent !important; margin: 0; padding: 0; }
        main { padding: 0 !important; }
      `}</style>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: "bold", fontSize: "16px", color: text }}>{locale === "ar" ? city.nameAr || city.name : city.name}</div>
        <div style={{ fontSize: "12px", opacity: 0.7, color: text }}>{locale === "ar" ? "الآن" : locale === "en" ? "Now" : "En ce moment"}</div>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Image src={iconUrl} alt={desc} width={64} height={64} style={{ margin: "-10px 0" }} />
        <div>
          <div style={{ fontSize: "36px", fontWeight: "900", lineHeight: "1", color: text }}>{temp}°</div>
          <div style={{ fontSize: "13px", opacity: 0.8, marginTop: "4px", color: text }}>{desc}</div>
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "12px", opacity: 0.7, marginTop: "4px", color: text }}>
        <div>💧 {weather.main.humidity}%</div>
        <div>💨 {weather.wind.speed} m/s</div>
      </div>

      <div style={{ borderTop: `1px solid ${border}`, paddingTop: "8px", marginTop: "4px", textAlign: "center" }}>
        <Link href={`/${locale}/cities/${city.slug}`} target="_blank" style={{ color: text, textDecoration: "none", fontSize: "11px", opacity: 0.6, fontWeight: 500 }}>
          {locale === "ar" ? "مزيد من التفاصيل بواسطة MeteoAuMaroc" : locale === "en" ? "Weather by MeteoAuMaroc" : "Météo par MeteoAuMaroc"}
        </Link>
      </div>
    </div>
  );
}

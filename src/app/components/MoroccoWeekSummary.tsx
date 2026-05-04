"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/lib/LanguageContext";

interface CitySnap {
  name: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  lat: number;
  lon: number;
  region: string;
}

interface WeatherSnap {
  city: CitySnap;
  temp: number;
  feels_like: number;
  icon: string;
  description: string;
  humidity: number;
  wind: number;
  weatherMain: string;
}

const CITIES: CitySnap[] = [
  { name: "Casablanca",  nameAr: "الدار البيضاء", nameEn: "Casablanca",  slug: "casablanca",  lat: 33.5883, lon: -7.6114,  region: "Grand Casablanca" },
  { name: "Rabat",       nameAr: "الرباط",         nameEn: "Rabat",       slug: "rabat",       lat: 33.9985, lon: -6.8544,  region: "Rabat-Salé" },
  { name: "Marrakech",   nameAr: "مراكش",           nameEn: "Marrakech",   slug: "marrakech",   lat: 31.6295, lon: -7.9811,  region: "Marrakech-Safi" },
  { name: "Agadir",      nameAr: "أكادير",          nameEn: "Agadir",      slug: "agadir",      lat: 30.4278, lon: -9.5981,  region: "Souss-Massa" },
  { name: "Tanger",      nameAr: "طنجة",            nameEn: "Tangier",     slug: "tanger",      lat: 35.7595, lon: -5.8340,  region: "Tanger-Tétouan" },
  { name: "Fès",         nameAr: "فاس",             nameEn: "Fes",         slug: "fes",         lat: 34.0340, lon: -5.0003,  region: "Fès-Meknès" },
  { name: "Oujda",       nameAr: "وجدة",            nameEn: "Oujda",       slug: "oujda",       lat: 34.6814, lon: -1.9086,  region: "Oriental" },
  { name: "Dakhla",      nameAr: "الداخلة",         nameEn: "Dakhla",      slug: "dakhla",      lat: 23.6848, lon: -15.9580, region: "Dakhla-Oued Ed-Dahab" },
];

const COPY = {
  fr: {
    badge: "Météo en Direct",
    title: "Météo au Maroc Aujourd'hui",
    subtitle: "Conditions actuelles dans les principales villes du pays",
    feelsLike: "Ressenti",
    humidity: "Humidité",
    wind: "Vent",
    viewCity: "Voir la météo",
    loading: "Chargement…",
    windUnit: "m/s",
  },
  ar: {
    badge: "الطقس المباشر",
    title: "طقس المغرب اليوم",
    subtitle: "الأحوال الجوية الراهنة في أبرز مدن المملكة",
    feelsLike: "الإحساس الحراري",
    humidity: "الرطوبة",
    wind: "الرياح",
    viewCity: "عرض الطقس",
    loading: "جارٍ التحميل…",
    windUnit: "م/ث",
  },
  en: {
    badge: "Live Weather",
    title: "Morocco Weather Today",
    subtitle: "Current conditions across Morocco's major cities",
    feelsLike: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    viewCity: "View weather",
    loading: "Loading…",
    windUnit: "m/s",
  },
};

function weatherGradient(main: string): string {
  switch (main) {
    case "Clear":       return "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)";
    case "Clouds":      return "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)";
    case "Rain":
    case "Drizzle":     return "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)";
    case "Thunderstorm":return "linear-gradient(135deg, #6d28d9 0%, #1e1b4b 100%)";
    case "Snow":        return "linear-gradient(135deg, #bae6fd 0%, #7dd3fc 100%)";
    case "Mist":
    case "Haze":
    case "Fog":         return "linear-gradient(135deg, #a1a1aa 0%, #71717a 100%)";
    case "Dust":
    case "Sand":        return "linear-gradient(135deg, #d97706 0%, #92400e 100%)";
    default:            return "linear-gradient(135deg, var(--color-primary) 0%, #1d4ed8 100%)";
  }
}

function Skeleton() {
  return (
    <div
      style={{
        minWidth: 200,
        height: 220,
        borderRadius: "var(--radius-lg)",
        background: "var(--color-surface)",
        animation: "pulse 1.5s ease-in-out infinite",
        flexShrink: 0,
      }}
    />
  );
}

export default function MoroccoWeekSummary() {
  const { locale } = useLanguage();
  const copy = COPY[locale] ?? COPY.fr;
  const [snaps, setSnaps] = useState<WeatherSnap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      setLoading(true);
      const results = await Promise.allSettled(
        CITIES.map(async (city) => {
          const res = await fetch(`/api/weather?lat=${city.lat}&lon=${city.lon}&lang=${locale}`);
          if (!res.ok) throw new Error("fetch failed");
          const data = await res.json();
          return {
            city,
            temp: Math.round(data.main?.temp ?? 0),
            feels_like: Math.round(data.main?.feels_like ?? 0),
            icon: data.weather?.[0]?.icon ?? "01d",
            description: data.weather?.[0]?.description ?? "",
            humidity: data.main?.humidity ?? 0,
            wind: Math.round(data.wind?.speed ?? 0),
            weatherMain: data.weather?.[0]?.main ?? "Clear",
          } as WeatherSnap;
        })
      );

      if (cancelled) return;

      const ok = results
        .filter((r): r is PromiseFulfilledResult<WeatherSnap> => r.status === "fulfilled")
        .map((r) => r.value);
      setSnaps(ok);
      setLoading(false);
    }

    fetchAll();
    return () => { cancelled = true; };
  // Re-fetch when locale changes so descriptions come in the right language
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const displayName = (snap: WeatherSnap) =>
    locale === "ar" ? snap.city.nameAr : locale === "en" ? snap.city.nameEn : snap.city.name;

  return (
    <section
      style={{
        padding: "5rem 0",
        background: "linear-gradient(180deg, var(--color-surface) 0%, var(--color-bg) 100%)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .city-weather-card {
          min-width: 210px;
          flex: 0 0 210px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
        .city-weather-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        }
        .weather-scroll {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: var(--color-border) transparent;
        }
        .weather-scroll::-webkit-scrollbar { height: 4px; }
        .weather-scroll::-webkit-scrollbar-track { background: transparent; }
        .weather-scroll::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 2px; }
        .city-weather-card { scroll-snap-align: start; }
      `}</style>

      <div className="container">
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--color-primary-light)",
              borderRadius: "var(--radius-full)",
              padding: "0.35rem 1rem",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--color-primary)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {copy.badge}
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              fontWeight: 800,
              marginBottom: "0.5rem",
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
            }}
          >
            {copy.title}
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "1rem" }}>
            {copy.subtitle}
          </p>
        </div>

        {/* Scrollable city cards */}
        <div className="weather-scroll">
          {loading
            ? CITIES.map((c) => <Skeleton key={c.slug} />)
            : snaps.map((snap) => (
                <a
                  key={snap.city.slug}
                  href={`/cities/${snap.city.slug}`}
                  className="city-weather-card"
                  aria-label={`${copy.viewCity} ${displayName(snap)}`}
                >
                  {/* Top gradient band */}
                  <div
                    style={{
                      background: weatherGradient(snap.weatherMain),
                      padding: "1.25rem 1.25rem 1rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.25rem",
                      minHeight: 130,
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={`https://openweathermap.org/img/wn/${snap.icon}@2x.png`}
                      alt={snap.description}
                      width={64}
                      height={64}
                      style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))", margin: "-8px 0" }}
                    />
                    <div
                      style={{
                        fontSize: "2.25rem",
                        fontWeight: 800,
                        color: "#fff",
                        lineHeight: 1,
                        textShadow: "0 1px 4px rgba(0,0,0,0.25)",
                      }}
                    >
                      {snap.temp}°
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.85)",
                        textTransform: "capitalize",
                        textAlign: "center",
                      }}
                    >
                      {snap.description}
                    </div>
                  </div>

                  {/* Bottom info band */}
                  <div
                    style={{
                      background: "var(--color-surface)",
                      padding: "0.875rem 1.1rem",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--color-text)",
                      }}
                    >
                      {displayName(snap)}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted)",
                        display: "flex",
                        gap: "0.75rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span>💧 {snap.humidity}%</span>
                      <span>💨 {snap.wind} {copy.windUnit}</span>
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--color-text-muted)",
                        marginTop: "auto",
                      }}
                    >
                      {copy.feelsLike}: {snap.feels_like}°
                    </div>
                  </div>
                </a>
              ))}
        </div>
      </div>
    </section>
  );
}

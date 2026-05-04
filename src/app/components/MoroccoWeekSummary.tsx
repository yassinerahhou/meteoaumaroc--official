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
    case "Clear":       return "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)";
    case "Clouds":      return "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)";
    case "Rain":
    case "Drizzle":     return "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)";
    case "Thunderstorm":return "linear-gradient(135deg, #8b5cf6 0%, #4c1d95 100%)";
    case "Snow":        return "linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 100%)";
    case "Mist":
    case "Haze":
    case "Fog":         return "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)";
    case "Dust":
    case "Sand":        return "linear-gradient(135deg, #fb923c 0%, #d97706 100%)";
    default:            return "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)";
  }
}

function Skeleton() {
  return (
    <div
      className="skeleton"
      style={{
        minWidth: 220,
        height: 240,
        borderRadius: "var(--radius-lg)",
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
  }, [locale]);

  const displayName = (snap: WeatherSnap) =>
    locale === "ar" ? snap.city.nameAr : locale === "en" ? snap.city.nameEn : snap.city.name;

  return (
    <section
      style={{
        padding: "6rem 0",
        background: "var(--color-bg)",
        position: "relative",
      }}
    >
      <style>{`
        .city-weather-card {
          min-width: 230px;
          flex: 0 0 230px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-md);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-decoration: none;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          scroll-snap-align: start;
        }
        .city-weather-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: var(--shadow-xl);
          border-color: var(--color-primary);
        }
        .weather-scroll {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          padding: 1rem 0.5rem 2rem;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .weather-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="container">
        {/* Section header */}
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
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {copy.badge}
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 900,
              marginBottom: "0.75rem",
              letterSpacing: "-0.04em",
              color: "var(--color-text)",
              lineHeight: 1.1,
            }}
          >
            {copy.title}
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "1.125rem", maxWidth: 600, margin: "0 auto" }}>
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
                  href={`/${locale}/cities/${snap.city.slug}`}
                  className="city-weather-card"
                  aria-label={`${copy.viewCity} ${displayName(snap)}`}
                >
                  {/* Top gradient band */}
                  <div
                    style={{
                      background: weatherGradient(snap.weatherMain),
                      padding: "1.75rem 1.25rem 1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.25rem",
                      minHeight: 150,
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={`https://openweathermap.org/img/wn/${snap.icon}@2x.png`}
                      alt={snap.description}
                      width={80}
                      height={80}
                      style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))", margin: "-12px 0" }}
                    />
                    <div
                      style={{
                        fontSize: "2.75rem",
                        fontWeight: 900,
                        color: "#fff",
                        lineHeight: 1,
                        textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                      }}
                    >
                      {snap.temp}°
                    </div>
                  </div>

                  {/* Bottom info band */}
                  <div
                    style={{
                      background: "var(--color-surface)",
                      padding: "1.25rem 1.5rem",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 800,
                        color: "var(--color-text)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {displayName(snap)}
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--color-text-muted)",
                        textTransform: "capitalize",
                        marginBottom: "0.25rem",
                        fontWeight: 500,
                      }}
                    >
                      {snap.description}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--color-text-muted)",
                        display: "flex",
                        gap: "1rem",
                        fontWeight: 600,
                        paddingTop: "0.5rem",
                        borderTop: "1px solid var(--color-border)",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <span style={{ color: "var(--color-primary)" }}>💧</span> {snap.humidity}%
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <span style={{ color: "var(--color-primary)" }}>💨</span> {snap.wind} {copy.windUnit}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
        </div>
      </div>
    </section>
  );
}

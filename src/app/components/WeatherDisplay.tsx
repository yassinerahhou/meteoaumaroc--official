"use client";

import React from "react";
import Image from "next/image";
import { weatherDataType } from "@/app/types";
import { useLanguage } from "@/app/lib/LanguageContext";

interface WeatherDisplayProps {
  weatherData: weatherDataType | null;
}

const LOCALE_MAP: Record<string, string> = { fr: "fr-FR", ar: "ar-MA", en: "en-GB" };

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  const { t, locale, formatTemp } = useLanguage();
  if (!weatherData) return null;

  const dateLocale = LOCALE_MAP[locale] ?? "fr-FR";
  const now = new Date();
  const timeStr = now.toLocaleTimeString(dateLocale, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateStr = now.toLocaleDateString(dateLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const statItems = [
    { icon: "🌡️", label: t("weather.feelsLike"),  value: formatTemp(Number(weatherData.main.feels_like)) },
    { icon: "💧", label: t("weather.humidity"),    value: `${weatherData.main.humidity}%` },
    { icon: "💨", label: t("weather.wind"),        value: `${weatherData.wind.speed} m/s` },
    { icon: "👁️", label: t("weather.visibility"), value: `${(weatherData.visibility / 1000).toFixed(1)} km` },
    { icon: "⬆️", label: t("city.maxToday"),       value: weatherData.main.temp_max != null ? formatTemp(weatherData.main.temp_max) : "—" },
    { icon: "⬇️", label: t("city.minToday"),       value: weatherData.main.temp_min != null ? formatTemp(weatherData.main.temp_min) : "—" },
  ];

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
  const description =
    weatherData.weather[0].description.charAt(0).toUpperCase() +
    weatherData.weather[0].description.slice(1);

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        background: "linear-gradient(135deg, #0369a1 0%, #0284c7 60%, #0ea5e9 100%)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        boxShadow: "var(--shadow-xl)",
        color: "#fff",
      }}
      className="animate-fade-up"
    >
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          background: "rgba(0,0,0,0.15)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
            {weatherData.name}
          </span>
        </div>
        <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }}>
          {dateStr} — {timeStr}
        </span>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "1.5rem 2rem",
          gap: "1rem",
          flexWrap: "wrap",
          flexDirection: locale === "ar" ? "row-reverse" : "row",
        }}
      >
        {/* Icon + Temp */}
        <div style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 200 }}>
          <Image
            src={iconUrl}
            alt={description}
            width={100}
            height={100}
            style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}
          />
          <div>
            <div
              style={{
                fontSize: "clamp(3rem, 8vw, 4.5rem)",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              {formatTemp(weatherData.main.temp)}
            </div>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", margin: "0.25rem 0 0", fontWeight: 500 }}>
              {description}
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div
          className="weather-stats-grid"
          style={{
            flex: 1,
            minWidth: 220,
          }}
        >
          {statItems.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(255,255,255,0.12)",
                borderRadius: "var(--radius-md)",
                padding: "0.75rem",
                textAlign: "center",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div style={{ fontSize: "1.25rem", marginBottom: "0.2rem" }}>{stat.icon}</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.65)", marginTop: "0.2rem" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div
        style={{
          padding: "0.75rem 1.5rem",
          background: "rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.6)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
        {t("weather.source")}
      </div>
    </div>
  );
};

export default WeatherDisplay;

"use client";

import { useEffect, useState } from "react";

// 3 major Moroccan cities to monitor for extreme weather
const WATCH_CITIES = [
  { name: "Casablanca", nameAr: "الدار البيضاء", lat: 33.5731, lon: -7.5898 },
  { name: "Marrakech",  nameAr: "مراكش",          lat: 31.6295, lon: -7.9811 },
  { name: "Agadir",     nameAr: "أكادير",          lat: 30.4278, lon: -9.5981 },
];

type AlertType = "heat" | "cold" | "wind" | "storm" | "sand";

interface WeatherAlert {
  type: AlertType;
  city: string;
  cityAr: string;
  value?: number; // temp °C or wind m/s
}

function detectAlert(data: Record<string, unknown>, city: (typeof WATCH_CITIES)[0]): WeatherAlert | null {
  const main = data.main as { temp?: number } | undefined;
  const wind = data.wind as { speed?: number } | undefined;
  const weatherArr = data.weather as { id?: number; main?: string }[] | undefined;
  const weatherId   = weatherArr?.[0]?.id;
  const weatherMain = weatherArr?.[0]?.main;
  const temp = main?.temp;
  const windSpeed = wind?.speed;

  if (weatherMain === "Thunderstorm")
    return { type: "storm", city: city.name, cityAr: city.nameAr };
  if (weatherId !== undefined && weatherId >= 751 && weatherId <= 761)
    return { type: "sand", city: city.name, cityAr: city.nameAr };
  if (temp !== undefined && temp >= 40)
    return { type: "heat", city: city.name, cityAr: city.nameAr, value: temp };
  if (temp !== undefined && temp <= 2)
    return { type: "cold", city: city.name, cityAr: city.nameAr, value: temp };
  if (windSpeed !== undefined && windSpeed >= 15)
    return { type: "wind", city: city.name, cityAr: city.nameAr, value: windSpeed };
  return null;
}

const DISMISS_KEY = "meteo_alert_dismissed";
const DISMISS_TTL = 4 * 60 * 60 * 1000; // 4 h

type Locale = "fr" | "ar" | "en";

function alertMessage(a: WeatherAlert, locale: Locale): string {
  const tempStr = a.value !== undefined ? `${a.value.toFixed(0)}°C` : "";
  const windStr = a.value !== undefined ? `${(a.value * 3.6).toFixed(0)} km/h` : "";
  const cityStr = locale === "ar" ? a.cityAr : a.city;

  const msgs: Record<AlertType, Record<Locale, string>> = {
    heat:  { fr: `⚠️ Alerte chaleur à ${cityStr} : ${tempStr} — Restez hydraté, évitez le soleil aux heures chaudes.`, ar: `⚠️ تحذير حرارة في ${cityStr}: ${tempStr} — ابقَ رطباً وتجنب الشمس في أوقات الذروة.`, en: `⚠️ Heat alert in ${cityStr}: ${tempStr} — Stay hydrated, avoid sun exposure during peak hours.` },
    cold:  { fr: `❄️ Alerte froid à ${cityStr} : ${tempStr} — Couvrez-vous et limitez les sorties.`,                 ar: `❄️ تحذير برد في ${cityStr}: ${tempStr} — ارتدِ ملابس دافئة وتجنب الخروج لفترات طويلة.`,      en: `❄️ Cold alert in ${cityStr}: ${tempStr} — Dress warmly and limit outdoor exposure.` },
    wind:  { fr: `💨 Vents forts à ${cityStr} : ${windStr} — Prudence sur les routes et en extérieur.`,              ar: `💨 رياح قوية في ${cityStr}: ${windStr} — توخَّ الحذر على الطرق وفي الأماكن المكشوفة.`,         en: `💨 Strong winds in ${cityStr}: ${windStr} — Exercise caution on roads and outdoors.` },
    storm: { fr: `⛈️ Orage signalé à ${cityStr} — Évitez les espaces ouverts, restez à l'abri.`,                    ar: `⛈️ عاصفة رعدية في ${cityStr} — تجنب الأماكن المكشوفة وابقَ في مأمن.`,                           en: `⛈️ Thunderstorm near ${cityStr} — Avoid open spaces and stay sheltered.` },
    sand:  { fr: `🌫️ Tempête de sable à ${cityStr} — Protégez-vous et limitez vos déplacements.`,                  ar: `🌫️ عاصفة رملية في ${cityStr} — احمِ نفسك وقلل من التنقل.`,                                     en: `🌫️ Sandstorm near ${cityStr} — Protect yourself and limit travel.` },
  };
  return msgs[a.type][locale];
}

const BG: Record<AlertType, string> = {
  heat:  "#b45309", // amber-700
  cold:  "#1d4ed8", // blue-700
  wind:  "#0369a1", // sky-700
  storm: "#7c3aed", // violet-700
  sand:  "#92400e", // amber-800
};

export default function AlertBanner() {
  const [alert, setAlert]       = useState<WeatherAlert | null>(null);
  const [visible, setVisible]   = useState(false);
  const [locale, setLocale]     = useState<Locale>("fr");

  useEffect(() => {
    // Read locale from html[lang]
    const lang = document.documentElement.lang;
    if (lang === "ar" || lang === "en") setLocale(lang);

    // Honour dismiss TTL
    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      if (raw) {
        const { ts } = JSON.parse(raw) as { ts: number };
        if (Date.now() - ts < DISMISS_TTL) return;
      }
    } catch {}

    // Fetch weather for monitored cities — stop at first alert
    (async () => {
      for (const city of WATCH_CITIES) {
        try {
          const res = await fetch(`/api/weather?lat=${city.lat}&lon=${city.lon}&lang=fr`);
          if (!res.ok) continue;
          const data: Record<string, unknown> = await res.json();
          const found = detectAlert(data, city);
          if (found) { setAlert(found); setVisible(true); break; }
        } catch {
          // network failure — skip
        }
      }
    })();
  }, []);

  function dismiss() {
    try { localStorage.setItem(DISMISS_KEY, JSON.stringify({ ts: Date.now() })); } catch {}
    setVisible(false);
  }

  if (!visible || !alert) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        background: BG[alert.type],
        color: "#fff",
        padding: "0.55rem 1rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.75rem",
        zIndex: 998,
      }}
    >
      <span>{alertMessage(alert, locale)}</span>
      <button
        onClick={dismiss}
        aria-label={locale === "ar" ? "إغلاق التنبيه" : locale === "en" ? "Dismiss alert" : "Fermer l'alerte"}
        style={{
          background: "rgba(255,255,255,0.2)",
          border: "none",
          borderRadius: "50%",
          width: 26,
          height: 26,
          cursor: "pointer",
          color: "#fff",
          fontSize: "1.1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontFamily: "inherit",
          lineHeight: 1,
          transition: "background 0.2s",
        }}
      >
        ×
      </button>
    </div>
  );
}

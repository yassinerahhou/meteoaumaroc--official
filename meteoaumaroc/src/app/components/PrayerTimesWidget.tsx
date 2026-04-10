"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/lib/LanguageContext";

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface AladhanResponse {
  data: {
    timings: PrayerTimes & Record<string, string>;
    date: {
      readable: string;
      hijri: { date: string; month: { ar: string }; year: string };
    };
    meta: { timezone: string };
  };
}

const PRAYERS = [
  { key: "Fajr",    label: "Fajr",    labelAr: "الفجر",   icon: "🌙" },
  { key: "Dhuhr",   label: "Dhuhr",   labelAr: "الظهر",   icon: "☀️" },
  { key: "Asr",     label: "Asr",     labelAr: "العصر",   icon: "🌤️" },
  { key: "Maghrib", label: "Maghrib", labelAr: "المغرب",  icon: "🌅" },
  { key: "Isha",    label: "Isha",    labelAr: "العشاء",  icon: "🌃" },
];

const MOROCCAN_CITIES_PRAYER = [
  { name: "Casablanca", city: "Casablanca" },
  { name: "Rabat",      city: "Rabat" },
  { name: "Marrakech",  city: "Marrakech" },
  { name: "Agadir",     city: "Agadir" },
  { name: "Fès",        city: "Fes" },
  { name: "Tanger",     city: "Tanger" },
];

function getNextPrayer(timings: PrayerTimes): string {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  for (const prayer of PRAYERS) {
    const [h, m] = timings[prayer.key as keyof PrayerTimes].split(":").map(Number);
    if (h * 60 + m > nowMinutes) return prayer.key;
  }
  return "Fajr";
}

export default function PrayerTimesWidget() {
  const { t } = useLanguage();
  const [city, setCity] = useState("Casablanca");
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [hijriDate, setHijriDate] = useState("");
  const [gregorianDate, setGregorianDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [nextPrayer, setNextPrayer] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=Morocco&method=12`
    )
      .then((r) => r.json())
      .then((data: AladhanResponse) => {
        const timings = data.data.timings;
        const pt: PrayerTimes = {
          Fajr: timings.Fajr,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Maghrib: timings.Maghrib,
          Isha: timings.Isha,
        };
        setTimes(pt);
        setNextPrayer(getNextPrayer(pt));
        setGregorianDate(data.data.date.readable);
        const h = data.data.date.hijri;
        setHijriDate(`${h.date} ${h.month.ar} ${h.year}`);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [city]);

  return (
    <section
      style={{
        padding: "5rem 0",
        background: "linear-gradient(180deg, var(--color-surface) 0%, var(--color-primary-light) 100%)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="container">
        {/* Header */}
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
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {t("prayer.badge")}
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3.5vw, 2.1rem)",
              fontWeight: 800,
              color: "var(--color-text)",
              marginBottom: "0.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            {t("prayer.title")}
          </h2>
          <p style={{ color: "var(--color-text-muted)", maxWidth: 440, margin: "0 auto", lineHeight: 1.7, fontSize: "0.9375rem" }}>
            {t("prayer.subtitle")}
          </p>
        </div>

        {/* City selector */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {MOROCCAN_CITIES_PRAYER.map((c) => (
            <button
              key={c.city}
              onClick={() => setCity(c.city)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: "var(--radius-full)",
                border: city === c.city ? "2px solid var(--color-primary)" : "2px solid var(--color-border)",
                background: city === c.city ? "var(--color-primary)" : "var(--color-surface)",
                color: city === c.city ? "#fff" : "var(--color-text-muted)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Main card */}
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            background: "var(--color-surface)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-lg)",
            border: "1px solid var(--color-border)",
            overflow: "hidden",
          }}
        >
          {/* Top bar with dates */}
          <div
            style={{
              background: "linear-gradient(135deg, #0c4a6e, #0369a1)",
              padding: "1.25rem 1.75rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <div>
              <p style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#fff", margin: 0 }}>
                {city} — {t("prayer.today")}
              </p>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,.65)", margin: "0.2rem 0 0" }}>
                {gregorianDate}
              </p>
            </div>
            {hijriDate && (
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,.85)",
                  fontWeight: 500,
                  margin: 0,
                  direction: "rtl",
                  fontFamily: "inherit",
                }}
              >
                {hijriDate}
              </p>
            )}
          </div>

          {/* Prayer times grid */}
          {loading ? (
            <div style={{ padding: "2rem", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.75rem" }}>
              {PRAYERS.map((p) => (
                <div key={p.key} className="skeleton" style={{ height: 90, borderRadius: "var(--radius-md)" }} />
              ))}
            </div>
          ) : times ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "0" }}>
              {PRAYERS.map((prayer, i) => {
                const isNext = nextPrayer === prayer.key;
                return (
                  <div
                    key={prayer.key}
                    style={{
                      padding: "1.5rem 1rem",
                      textAlign: "center",
                      borderRight: i < PRAYERS.length - 1 ? "1px solid var(--color-border)" : "none",
                      background: isNext ? "var(--color-primary-light)" : "var(--color-surface)",
                      position: "relative",
                      transition: "background 0.3s",
                    }}
                  >
                    {isNext && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "var(--color-primary)",
                          color: "#fff",
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          padding: "0.15rem 0.5rem",
                          borderRadius: "0 0 6px 6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t("prayer.next")}
                      </div>
                    )}
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.375rem", marginTop: isNext ? "0.75rem" : 0 }}>
                      {prayer.icon}
                    </div>
                    <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: isNext ? "var(--color-primary)" : "var(--color-text)", margin: "0 0 0.25rem" }}>
                      {prayer.label}
                    </p>
                    <p style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", margin: "0 0 0.5rem", direction: "rtl" }}>
                      {prayer.labelAr}
                    </p>
                    <p style={{ fontSize: "1.125rem", fontWeight: 800, color: isNext ? "var(--color-primary-dark)" : "var(--color-text)", margin: 0, letterSpacing: "-0.02em" }}>
                      {times[prayer.key as keyof PrayerTimes]}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-muted)" }}>
              {t("prayer.error")}
            </div>
          )}

          {/* Footer note */}
          <div
            style={{
              padding: "0.875rem 1.5rem",
              background: "var(--color-bg)",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontSize: "0.78rem",
              color: "var(--color-text-muted)",
            }}
          >
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
            Ministère des Habous et des Affaires Islamiques · Source: Aladhan
          </div>
        </div>
      </div>
    </section>
  );
}

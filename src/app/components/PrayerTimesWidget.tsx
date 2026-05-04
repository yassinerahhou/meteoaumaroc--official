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
  const { t, locale } = useLanguage();
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
        padding: "6rem 0",
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="container">
        {/* Header */}
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
            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--color-primary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {t("prayer.badge")}
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 900,
              color: "var(--color-text)",
              marginBottom: "1rem",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            {t("prayer.title")}
          </h2>
          <p style={{ color: "var(--color-text-muted)", maxWidth: 560, margin: "0 auto", lineHeight: 1.6, fontSize: "1.125rem" }}>
            {t("prayer.subtitle")}
          </p>
        </div>

        {/* City selector */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          {MOROCCAN_CITIES_PRAYER.map((c) => (
            <button
              key={c.city}
              onClick={() => setCity(c.city)}
              style={{
                padding: "0.625rem 1.5rem",
                borderRadius: "var(--radius-full)",
                border: "2px solid",
                borderColor: city === c.city ? "var(--color-primary)" : "var(--color-border)",
                background: city === c.city ? "var(--color-primary)" : "var(--color-surface)",
                color: city === c.city ? "#fff" : "var(--color-text-muted)",
                fontSize: "0.875rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                fontFamily: "inherit",
                boxShadow: city === c.city ? "0 4px 12px rgba(14, 165, 233, 0.25)" : "none",
              }}
              onMouseEnter={(e) => {
                if (city !== c.city) {
                  e.currentTarget.style.borderColor = "var(--color-primary-light)";
                  e.currentTarget.style.color = "var(--color-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (city !== c.city) {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.color = "var(--color-text-muted)";
                }
              }}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Main card */}
        <div
          className="card"
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: 0,
            overflow: "hidden",
            background: "var(--color-bg)",
          }}
        >
          {/* Top bar with dates */}
          <div
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              padding: "1.75rem 2.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div>
              <p style={{ fontSize: "1.25rem", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                {city} — {t("prayer.today")}
              </p>
              <p style={{ fontSize: "0.875rem", color: "#94a3b8", margin: "0.25rem 0 0", fontWeight: 500 }}>
                {gregorianDate}
              </p>
            </div>
            {hijriDate && (
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#f8fafc",
                    fontWeight: 700,
                    margin: 0,
                    direction: "rtl",
                  }}
                >
                  {hijriDate}
                </p>
              </div>
            )}
          </div>

          {/* Prayer times grid */}
          {loading ? (
            <div style={{ padding: "2.5rem", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
              {PRAYERS.map((p) => (
                <div key={p.key} className="skeleton" style={{ height: 110, borderRadius: "var(--radius-lg)" }} />
              ))}
            </div>
          ) : times ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "0" }}>
              {PRAYERS.map((prayer, i) => {
                const isNext = nextPrayer === prayer.key;
                return (
                  <div
                    key={prayer.key}
                    style={{
                      padding: "2rem 1rem",
                      textAlign: "center",
                      borderRight: i < PRAYERS.length - 1 ? "1px solid var(--color-border)" : "none",
                      background: isNext ? "rgba(14, 165, 233, 0.03)" : "var(--color-surface)",
                      position: "relative",
                      transition: "all 0.3s ease",
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
                          fontSize: "0.6875rem",
                          fontWeight: 800,
                          padding: "0.25rem 0.75rem",
                          borderRadius: "0 0 8px 8px",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          whiteSpace: "nowrap",
                          boxShadow: "0 2px 8px rgba(14, 165, 233, 0.3)",
                        }}
                      >
                        {t("prayer.next")}
                      </div>
                    )}
                    <div style={{ fontSize: "2rem", marginBottom: "0.75rem", marginTop: isNext ? "0.75rem" : 0 }}>
                      {prayer.icon}
                    </div>
                    <p style={{ fontSize: "1rem", fontWeight: 800, color: isNext ? "var(--color-primary)" : "var(--color-text)", margin: "0 0 0.15rem", letterSpacing: "-0.01em" }}>
                      {locale === "ar" ? prayer.labelAr : prayer.label}
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", margin: "0 0 1rem", fontWeight: 600 }}>
                      {locale === "ar" ? prayer.label : prayer.labelAr}
                    </p>
                    <p style={{ fontSize: "1.5rem", fontWeight: 900, color: isNext ? "var(--color-primary)" : "var(--color-text)", margin: 0, letterSpacing: "-0.04em" }}>
                      {times[prayer.key as keyof PrayerTimes]}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ padding: "3rem", textAlign: "center", color: "var(--color-text-muted)", fontSize: "1.125rem", fontWeight: 500 }}>
              {t("prayer.error")}
            </div>
          )}

          {/* Footer note */}
          <div
            style={{
              padding: "1.25rem 2rem",
              background: "rgba(0,0,0,0.02)",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              fontSize: "0.875rem",
              color: "var(--color-text-muted)",
              fontWeight: 500,
            }}
          >
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#10b981", flexShrink: 0, boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.1)" }} />
            {locale === "ar" ? "وزارة الأوقاف والشؤون الإسلامية · المصدر: الأذان" : "Ministère des Habous et des Affaires Islamiques · Source: Aladhan"}
          </div>
        </div>
      </div>
    </section>
  );
}

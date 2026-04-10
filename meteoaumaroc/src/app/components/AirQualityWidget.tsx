"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/lib/LanguageContext";

interface AQIData {
  list: [{
    main: { aqi: number }; // 1–5
    components: {
      co: number; no2: number; o3: number; pm2_5: number; pm10: number;
    };
  }];
}

const AQI_LABELS: Record<string, Record<number, { label: string; color: string; bg: string }>> = {
  fr: {
    1: { label: "Excellent",   color: "#22c55e", bg: "#dcfce7" },
    2: { label: "Bon",         color: "#84cc16", bg: "#ecfccb" },
    3: { label: "Modéré",      color: "#f59e0b", bg: "#fef9c3" },
    4: { label: "Mauvais",     color: "#f97316", bg: "#ffedd5" },
    5: { label: "Très mauvais",color: "#ef4444", bg: "#fee2e2" },
  },
  ar: {
    1: { label: "ممتاز",      color: "#22c55e", bg: "#dcfce7" },
    2: { label: "جيد",        color: "#84cc16", bg: "#ecfccb" },
    3: { label: "متوسط",      color: "#f59e0b", bg: "#fef9c3" },
    4: { label: "سيء",        color: "#f97316", bg: "#ffedd5" },
    5: { label: "سيء جداً",   color: "#ef4444", bg: "#fee2e2" },
  },
  en: {
    1: { label: "Excellent",   color: "#22c55e", bg: "#dcfce7" },
    2: { label: "Good",        color: "#84cc16", bg: "#ecfccb" },
    3: { label: "Moderate",    color: "#f59e0b", bg: "#fef9c3" },
    4: { label: "Poor",        color: "#f97316", bg: "#ffedd5" },
    5: { label: "Very Poor",   color: "#ef4444", bg: "#fee2e2" },
  },
};

// Estimate UV index from latitude, month, and hour (rough model)
function estimateUV(lat: number): { index: number; label: string; color: string } {
  const month = new Date().getMonth(); // 0-indexed
  const hour  = new Date().getHours();

  // Peak UV factor by season at Morocco latitude (~30-36°N)
  const seasonFactor = [3,4,5,6,7,8,8,8,7,6,4,3][month]; // Jan-Dec
  // Time-of-day factor (peak at noon)
  const timeFactor = hour < 7 || hour > 19 ? 0 :
    hour < 10 || hour > 16 ? 0.4 :
    hour < 12 || hour > 14 ? 0.7 : 1.0;
  // Latitude adjustment (Morocco ≈ 30-35°N → moderate boost)
  const latFactor = Math.max(0.6, 1 - (Math.abs(lat) - 20) / 60);

  const uv = Math.round(seasonFactor * timeFactor * latFactor);

  if (uv <= 2)  return { index: uv, label: "Faible",     color: "#22c55e" };
  if (uv <= 5)  return { index: uv, label: "Modéré",     color: "#f59e0b" };
  if (uv <= 7)  return { index: uv, label: "Élevé",      color: "#f97316" };
  if (uv <= 10) return { index: uv, label: "Très élevé", color: "#ef4444" };
  return              { index: uv, label: "Extrême",     color: "#8b5cf6" };
}

interface Props { lat: number; lon: number; }

export default function AirQualityWidget({ lat, lon }: Props) {
  const { locale } = useLanguage();
  const [aqi, setAqi] = useState<AQIData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/airquality?lat=${lat}&lon=${lon}`)
      .then(r => r.json())
      .then(d => { setAqi(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [lat, lon]);

  const uv = estimateUV(lat);

  const labels = AQI_LABELS[locale] ?? AQI_LABELS.fr;
  const aqiVal = aqi?.list?.[0]?.main?.aqi ?? 0;
  const aqiInfo = labels[aqiVal];
  const comps = aqi?.list?.[0]?.components;

  const heading = { fr: "Qualité de l'air & UV", ar: "جودة الهواء والأشعة فوق البنفسجية", en: "Air Quality & UV Index" }[locale] ?? "Qualité de l'air & UV";
  const uvLabel = { fr: "Indice UV", ar: "مؤشر UV", en: "UV Index" }[locale] ?? "Indice UV";
  const aqiLabel = { fr: "Qualité de l'air", ar: "جودة الهواء", en: "Air Quality" }[locale] ?? "Qualité de l'air";
  const pm25Label = { fr: "PM2.5", ar: "جزيئات PM2.5", en: "PM2.5" }[locale] ?? "PM2.5";
  const no2Label = { fr: "NO₂", ar: "ثاني أكسيد النيتروجين", en: "NO₂" }[locale] ?? "NO₂";
  const o3Label  = { fr: "Ozone O₃", ar: "الأوزون O₃", en: "Ozone O₃" }[locale] ?? "Ozone O₃";

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: "1.5rem", boxShadow: "var(--shadow-sm)" }}>
      {/* Header */}
      <div style={{ padding: "1.125rem 1.5rem", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1rem" }}>🌬️</span>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, margin: 0 }}>{heading}</h2>
      </div>

      <div style={{ padding: "1.25rem 1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>

        {/* UV Index card */}
        <div style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "1.25rem", textAlign: "center" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>{uvLabel}</div>
          <div style={{ fontSize: "3rem", fontWeight: 900, color: uv.color, lineHeight: 1 }}>{uv.index}</div>
          <div style={{ marginTop: "0.5rem", display: "inline-block", background: uv.color + "20", border: `1px solid ${uv.color}`, borderRadius: "var(--radius-full)", padding: "0.2rem 0.875rem", fontSize: "0.8rem", fontWeight: 700, color: uv.color }}>
            {uv.label}
          </div>
          {/* UV scale bar */}
          <div style={{ marginTop: "0.875rem", height: 6, borderRadius: 999, background: "linear-gradient(90deg, #22c55e, #f59e0b, #f97316, #ef4444, #8b5cf6)", position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: `${Math.min((uv.index / 12) * 100, 100)}%`, transform: "translate(-50%, -50%)", width: 12, height: 12, borderRadius: "50%", background: "#fff", border: `2px solid ${uv.color}`, boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
            <span>0</span><span>6</span><span>12+</span>
          </div>
        </div>

        {/* AQI card */}
        <div style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "1.25rem", textAlign: "center" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>{aqiLabel}</div>
          {loading ? (
            <div className="skeleton" style={{ height: 60, borderRadius: 8 }} />
          ) : aqiInfo ? (
            <>
              <div style={{ fontSize: "3rem", fontWeight: 900, color: aqiInfo.color, lineHeight: 1 }}>{aqiVal}</div>
              <div style={{ marginTop: "0.5rem", display: "inline-block", background: aqiInfo.bg, border: `1px solid ${aqiInfo.color}`, borderRadius: "var(--radius-full)", padding: "0.2rem 0.875rem", fontSize: "0.8rem", fontWeight: 700, color: aqiInfo.color }}>
                {aqiInfo.label}
              </div>
              {comps && (
                <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.4rem", textAlign: "center" }}>
                  {[
                    { label: pm25Label, val: comps.pm2_5.toFixed(1) },
                    { label: no2Label,  val: comps.no2.toFixed(1) },
                    { label: o3Label,   val: comps.o3.toFixed(1) },
                  ].map(c => (
                    <div key={c.label} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", padding: "0.4rem 0.25rem" }}>
                      <div style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", marginBottom: "0.15rem" }}>{c.label}</div>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-text)" }}>{c.val}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>—</div>
          )}
        </div>
      </div>
    </div>
  );
}

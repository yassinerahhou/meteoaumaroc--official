"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/lib/LanguageContext";
import AdUnit from "@/app/components/AdUnit";
import { getCityClimate, MONTH_NAMES_FR, MONTH_NAMES_AR, MONTH_NAMES_EN } from "@/app/lib/monthlyClimate";

interface WeatherData {
  main: { temp: number; feels_like: number; humidity: number; temp_min: number; temp_max: number; pressure: number };
  weather: { description: string; icon: string; main: string }[];
  wind: { speed: number; deg: number };
  visibility: number;
  name: string;
  sys: { sunrise: number; sunset: number; country: string };
}

interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; humidity: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
  pop?: number; // probability of precipitation 0–1
}

interface ForecastData { list: ForecastItem[] }

interface Props {
  cityName: string;
  slug: string;
  lat: number;
  lon: number;
  region: string;
  description: string;
  descriptionAr?: string;
  descriptionEn?: string;
}

const LOCALE_MAP: Record<string, string> = { fr: "fr-FR", ar: "ar-MA", en: "en-GB" };

const windDir = (deg: number) => {
  const dirs = ["N","NE","E","SE","S","SO","O","NO"];
  return dirs[Math.round(deg / 45) % 8];
};

const secToHM = (sec: number, locale: string): string =>
  new Date(sec * 1000).toLocaleTimeString(LOCALE_MAP[locale] ?? "fr-FR", { hour: "2-digit", minute: "2-digit" });

const dayLengthStr = (sunrise: number, sunset: number): string => {
  const secs = sunset - sunrise;
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  return `${h}h ${m}m`;
};

const comfortLabel = (temp: number, humidity: number, locale: string): { label: string; color: string } => {
  const score = temp - (humidity - 40) * 0.15;
  const fr = score < 10 ? ["Froid", "#60a5fa"] : score < 20 ? ["Agréable", "#4ade80"] : score < 30 ? ["Chaud", "#facc15"] : ["Très chaud", "#f87171"];
  const ar = score < 10 ? ["بارد", "#60a5fa"] : score < 20 ? ["مريح", "#4ade80"] : score < 30 ? ["دافئ", "#facc15"] : ["حار جداً", "#f87171"];
  const en = score < 10 ? ["Cold", "#60a5fa"] : score < 20 ? ["Comfortable", "#4ade80"] : score < 30 ? ["Warm", "#facc15"] : ["Very hot", "#f87171"];
  const map: Record<string, string[]> = { fr, ar, en };
  const [label, color] = map[locale] ?? fr;
  return { label, color };
};

export default function CityWeatherPage({ cityName, slug, lat, lon, region, description, descriptionAr, descriptionEn }: Props) {
  const { t, locale, formatTemp } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true); setError(false);
    try {
      const [wRes, fRes] = await Promise.all([
        fetch(`/api/weather?lat=${lat}&lon=${lon}&lang=${locale}`),
        fetch(`/api/forecast?lat=${lat}&lon=${lon}&lang=${locale}`),
      ]);
      if (!wRes.ok || !fRes.ok) { setError(true); return; }
      const [wData, fData] = await Promise.all([wRes.json(), fRes.json()]);
      if (!wData?.weather || !fData?.list) { setError(true); return; }
      setWeather(wData);
      setForecast(fData);
    } catch { setError(true); } finally { setLoading(false); }
  }, [lat, lon, locale]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const dateLocale = LOCALE_MAP[locale] ?? "fr-FR";

  // Build daily summary: one card per day with min/max/dominant icon
  const dailySummary = useMemo(() => {
    if (!forecast) return [];
    const byDay: Record<string, ForecastItem[]> = {};
    forecast.list.forEach((f) => {
      const day = f.dt_txt.split(" ")[0];
      if (!byDay[day]) byDay[day] = [];
      byDay[day].push(f);
    });
    return Object.entries(byDay).map(([date, items]) => {
      const high = Math.max(...items.map((i) => i.main.temp_max ?? i.main.temp));
      const low  = Math.min(...items.map((i) => i.main.temp_min ?? i.main.temp));
      const noon = items.find((i) => i.dt_txt.includes("12:00")) ?? items[Math.floor(items.length / 2)];
      const maxPop = Math.max(...items.map((i) => i.pop ?? 0));
      return { date, high, low, icon: noon.weather[0].icon, desc: noon.weather[0].description, pop: maxPop };
    });
  }, [forecast]);

  const climate = useMemo(() => getCityClimate(slug), [slug]);
  const monthNames = locale === "ar" ? MONTH_NAMES_AR : locale === "en" ? MONTH_NAMES_EN : MONTH_NAMES_FR;

  // FAQs — city-specific, in 3 languages
  const faqs = useMemo(() => {
    const map = {
      fr: [
        { q: `Quelle est la météo actuelle à ${cityName} ?`, a: `Consultez la carte météo en temps réel en haut de cette page. Les données sont actualisées toutes les 10 minutes via OpenWeatherMap.` },
        { q: `Quelle est la meilleure période pour visiter ${cityName} ?`, a: `La meilleure période correspond aux mois ${climate.bestMonths.map(i => monthNames[i]).join(", ")} selon les données climatiques historiques : températures douces, peu de pluie et beaucoup de soleil.` },
        { q: `Quelle est la température moyenne à ${cityName} en été ?`, a: `En été (juin–août), les températures à ${cityName} atteignent ${climate.months[6].high}°C en moyenne. Les nuits restent autour de ${climate.months[6].low}°C.` },
        { q: `Pleut-il beaucoup à ${cityName} ?`, a: `${cityName} reçoit en moyenne ${climate.months[0].rain} mm de pluie en janvier et seulement ${climate.months[6].rain} mm en juillet. La saison des pluies s'étend d'octobre à avril.` },
        { q: `Comment est le vent à ${cityName} ?`, a: `Le vent varie selon les saisons. En général, ${cityName} bénéficie de vents modérés, plus fréquents en été. Consultez les données en temps réel ci-dessus pour les conditions actuelles.` },
      ],
      ar: [
        { q: `ما هو الطقس الحالي في ${cityName}؟`, a: `راجع خريطة الطقس الفورية أعلى هذه الصفحة. يتم تحديث البيانات كل 10 دقائق عبر OpenWeatherMap.` },
        { q: `ما هو أفضل وقت لزيارة ${cityName}؟`, a: `أفضل فترة هي أشهر ${climate.bestMonths.map(i => monthNames[i]).join("، ")} وفقاً للبيانات المناخية التاريخية: حرارة معتدلة، قليل من الأمطار وكثير من الشمس.` },
        { q: `ما هي درجة الحرارة المتوسطة في ${cityName} صيفاً؟`, a: `في فصل الصيف (يونيو-أغسطس)، تصل درجات الحرارة في ${cityName} إلى ${climate.months[6].high}°م في المتوسط. تبقى الليالي حول ${climate.months[6].low}°م.` },
        { q: `هل تكثر الأمطار في ${cityName}؟`, a: `تستقبل ${cityName} في المتوسط ${climate.months[0].rain} مم من الأمطار في يناير، و${climate.months[6].rain} مم فقط في يوليوز. موسم الأمطار يمتد من أكتوبر إلى أبريل.` },
        { q: `كيف تكون الرياح في ${cityName}؟`, a: `تتفاوت الرياح حسب الفصول. بشكل عام تتمتع ${cityName} برياح معتدلة، أكثر تكراراً في الصيف. راجع البيانات الفورية أعلاه للأحوال الراهنة.` },
      ],
      en: [
        { q: `What is the current weather in ${cityName}?`, a: `Check the real-time weather widget at the top of this page. Data is updated every 10 minutes via OpenWeatherMap.` },
        { q: `What is the best time to visit ${cityName}?`, a: `The best period is ${climate.bestMonths.map(i => monthNames[i]).join(", ")} based on historical climate data: mild temperatures, little rain, and plenty of sunshine.` },
        { q: `What is the average summer temperature in ${cityName}?`, a: `In summer (June–August), temperatures in ${cityName} average ${climate.months[6].high}°C. Nights stay around ${climate.months[6].low}°C.` },
        { q: `Does it rain a lot in ${cityName}?`, a: `${cityName} receives an average of ${climate.months[0].rain} mm of rain in January and only ${climate.months[6].rain} mm in July. The rainy season runs from October to April.` },
        { q: `How is the wind in ${cityName}?`, a: `Winds vary with the seasons. Generally, ${cityName} has moderate winds, more frequent in summer. Check the real-time data above for current conditions.` },
      ],
    };
    return map[locale as "fr" | "ar" | "en"] ?? map.fr;
  }, [cityName, climate, locale, monthNames]);

  if (loading) {
    return (
      <div style={{ padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="skeleton" style={{ height: 40, width: "55%", marginBottom: "1rem", borderRadius: 8 }} />
          <div className="skeleton" style={{ height: 240, marginBottom: "1rem", borderRadius: 16 }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "0.75rem" }}>
            {[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 110, borderRadius: 12 }} />)}
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div style={{ padding: "5rem 1rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
        <h2 style={{ marginBottom: "0.5rem" }}>Données indisponibles</h2>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
          Impossible de charger la météo pour {cityName}.
        </p>
        <button onClick={fetchData} className="btn btn-primary" style={{ display: "inline-flex" }}>
          {locale === "ar" ? "إعادة المحاولة" : locale === "en" ? "Retry" : "Réessayer"}
        </button>
      </div>
    );
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
  const desc = weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1);
  const comfort = comfortLabel(weather.main.temp, weather.main.humidity, locale);

  // Sunrise/sunset arc calculation
  const now = Date.now() / 1000;
  const totalDay = weather.sys.sunset - weather.sys.sunrise;
  const elapsed  = Math.min(Math.max(now - weather.sys.sunrise, 0), totalDay);
  const sunPct   = totalDay > 0 ? (elapsed / totalDay) * 100 : 0;

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "60vh" }}>

      {/* Breadcrumb */}
      <div style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)", padding: "0.75rem 0" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <nav aria-label="Fil d'Ariane" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--color-text-muted)", flexDirection: locale === "ar" ? "row-reverse" : "row" }}>
            <Link href="/" style={{ color: "var(--color-primary)" }}>{t("city.breadcrumb.home")}</Link>
            <span aria-hidden>{locale === "ar" ? "‹" : "›"}</span>
            <Link href="/cities" style={{ color: "var(--color-primary)" }}>{t("city.breadcrumb.weather")}</Link>
            <span aria-hidden>{locale === "ar" ? "‹" : "›"}</span>
            <span style={{ color: "var(--color-text)", fontWeight: 600 }}>{cityName}</span>
          </nav>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 900, paddingTop: "2rem", paddingBottom: "4rem" }}>

        {/* ── Hero weather card ─────────────────────────────── */}
        <div style={{
          background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0ea5e9 100%)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          marginBottom: "1.5rem",
          boxShadow: "var(--shadow-xl)",
          color: "#fff",
        }}>
          {/* Top bar */}
          <div style={{ padding: "1rem 1.75rem", background: "rgba(0,0,0,0.18)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <div>
              <h1 style={{ fontSize: "1.375rem", fontWeight: 800, margin: 0, color: "#fff" }}>
                {locale === "ar" ? `طقس ${cityName}` : locale === "en" ? `Weather in ${cityName}` : `Météo à ${cityName}`}
              </h1>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)", margin: "0.15rem 0 0" }}>
                {region} · {new Date().toLocaleDateString(dateLocale, { weekday: "long", day: "numeric", month: "long" })}
              </p>
            </div>
            <span style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "var(--radius-full)", padding: "0.3rem 0.75rem", fontSize: "0.75rem", fontWeight: 600 }}>
              🟢 {t("city.live")}
            </span>
          </div>

          {/* Main block */}
          <div style={{ padding: "2rem 1.75rem", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "1.5rem", flexDirection: locale === "ar" ? "row-reverse" : "row" }}>
            <div style={{ display: "flex", alignItems: "center", flex: "1 1 200px" }}>
              <Image src={iconUrl} alt={desc} width={110} height={110} />
              <div>
                <div style={{ fontSize: "clamp(3.5rem, 10vw, 5rem)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em" }}>
                  {formatTemp(weather.main.temp)}
                </div>
                <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", margin: "0.25rem 0 0", fontWeight: 500 }}>{desc}</p>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", margin: "0.2rem 0 0" }}>
                  {t("weather.feelsLike")} {formatTemp(weather.main.feels_like)}
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="city-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.625rem", flex: "1 1 260px" }}>
              {[
                { icon: "💧", label: t("weather.humidity"),    val: `${weather.main.humidity}%` },
                { icon: "💨", label: t("weather.wind"),        val: `${weather.wind.speed} m/s ${windDir(weather.wind.deg)}` },
                { icon: "👁️", label: t("weather.visibility"), val: `${(weather.visibility / 1000).toFixed(0)} km` },
                { icon: "🌡️", label: t("weather.pressure"),   val: `${weather.main.pressure} hPa` },
                { icon: "🌅", label: t("weather.sunrise"),     val: secToHM(weather.sys.sunrise, locale) },
                { icon: "🌇", label: t("weather.sunset"),      val: secToHM(weather.sys.sunset, locale) },
              ].map((s) => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: "var(--radius-sm)", padding: "0.625rem 0.5rem", textAlign: "center", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <div style={{ fontSize: "1.1rem" }}>{s.icon}</div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, marginTop: "0.15rem" }}>{s.val}</div>
                  <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.55)", marginTop: "0.1rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Min/Max + comfort bar */}
          <div style={{ padding: "0.75rem 1.75rem", background: "rgba(0,0,0,0.12)", display: "flex", flexWrap: "wrap", gap: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", alignItems: "center" }}>
            <span>⬆️ {t("city.maxToday")}: <strong style={{ color: "#fff" }}>{formatTemp(weather.main.temp_max)}</strong></span>
            <span>⬇️ {t("city.minToday")}: <strong style={{ color: "#fff" }}>{formatTemp(weather.main.temp_min)}</strong></span>
            <span style={{ marginLeft: "auto", background: "rgba(255,255,255,0.12)", borderRadius: "var(--radius-full)", padding: "0.2rem 0.75rem", fontWeight: 700, color: comfort.color, border: `1px solid ${comfort.color}40` }}>
              {t("city.tips.comfort")}: {comfort.label}
            </span>
          </div>
        </div>

        {/* ── Sunrise / Sunset visual ───────────────────────── */}
        <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.5rem 1.75rem", marginBottom: "1.5rem", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "1.1rem" }}>🌞</span>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, margin: 0 }}>{t("city.sun.title")}</h2>
          </div>
          {/* Arc progress bar */}
          <div style={{ position: "relative", marginBottom: "1.25rem" }}>
            <div style={{ height: 8, borderRadius: 999, background: "var(--color-border)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${sunPct}%`, background: "linear-gradient(90deg, #f59e0b, #fbbf24)", borderRadius: 999, transition: "width 1s ease" }} />
            </div>
            {/* Sun dot */}
            <div style={{ position: "absolute", top: "50%", left: `${sunPct}%`, transform: "translate(-50%, -50%)", width: 18, height: 18, borderRadius: "50%", background: "#fbbf24", boxShadow: "0 0 0 3px rgba(251,191,36,0.3)", border: "2px solid #fff" }} />
          </div>
          <div className="sun-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", textAlign: "center", gap: "1rem" }}>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>{t("weather.sunrise")}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f59e0b" }}>{secToHM(weather.sys.sunrise, locale)}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>{t("city.sun.dayLength")}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-text)" }}>{dayLengthStr(weather.sys.sunrise, weather.sys.sunset)}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>{t("weather.sunset")}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f97316" }}>{secToHM(weather.sys.sunset, locale)}</div>
            </div>
          </div>
        </div>

        {/* ── Daily forecast summary (5-day cards) ─────────── */}
        {dailySummary.length > 0 && (
          <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: "1.5rem", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ padding: "1.125rem 1.5rem", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, margin: 0 }}>{t("city.dailyForecast")} — {cityName}</h2>
            </div>
            <div className="daily-forecast-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${dailySummary.length}, 1fr)`, borderBottom: "1px solid var(--color-border)", overflowX: "auto" }}>
              {dailySummary.map((day, i) => {
                const d = new Date(day.date + "T12:00:00");
                const dayLabel = d.toLocaleDateString(dateLocale, { weekday: "short" });
                const dateLabel = d.toLocaleDateString(dateLocale, { day: "numeric", month: "short" });
                const isActive = selectedDate === day.date;
                return (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDate(isActive ? "" : day.date)}
                    style={{
                      background: isActive ? "var(--color-primary)" : i % 2 === 0 ? "var(--color-surface)" : "var(--color-bg)",
                      border: "none",
                      borderRight: i < dailySummary.length - 1 ? "1px solid var(--color-border)" : "none",
                      padding: "1rem 0.5rem",
                      cursor: "pointer",
                      textAlign: "center",
                      fontFamily: "inherit",
                      transition: "background 0.2s",
                      color: isActive ? "#fff" : "var(--color-text)",
                    }}
                    className="day-card-btn"
                  >
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.7, marginBottom: "0.25rem" }}>{dayLabel}</div>
                    <div style={{ fontSize: "0.7rem", opacity: 0.6, marginBottom: "0.4rem" }}>{dateLabel}</div>
                    <Image src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt={day.desc} width={48} height={48} style={{ margin: "0 auto" }} />
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, marginTop: "0.25rem" }}>{formatTemp(day.high)}</div>
                    <div style={{ fontSize: "0.8rem", opacity: 0.65, marginTop: "0.1rem" }}>{formatTemp(day.low)}</div>
                    {day.pop > 0.1 && (
                      <div style={{ fontSize: "0.7rem", color: isActive ? "rgba(255,255,255,0.85)" : "#60a5fa", fontWeight: 700, marginTop: "0.2rem" }}>
                        💧 {Math.round(day.pop * 100)}%
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hourly detail for selected day */}
            {selectedDate ? (
              <div>
                <div style={{ padding: "0.875rem 1.5rem", borderBottom: "1px solid var(--color-border)", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-muted)" }}>
                  {t("city.hourlyDetail")} · {new Date(selectedDate + "T12:00:00").toLocaleDateString(dateLocale, { weekday: "long", day: "numeric", month: "long" })}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "0.75rem", padding: "1rem 1.5rem 1.5rem" }}>
                  {forecast!.list.filter((f) => f.dt_txt.split(" ")[0] === selectedDate).map((f, i) => (
                    <div key={i} className="card" style={{ padding: "0.875rem", textAlign: "center", background: "var(--color-bg)" }}>
                      <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-primary)", margin: "0 0 0.4rem" }}>{f.dt_txt.split(" ")[1].slice(0, 5)}</p>
                      <Image src={`https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`} alt={f.weather[0].description} width={44} height={44} style={{ margin: "0 auto" }} />
                      <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-text)", margin: "0.2rem 0 0" }}>{formatTemp(f.main.temp)}</p>
                      <p style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", margin: "0.1rem 0 0" }}>💨 {f.wind.speed} m/s</p>
                      {(f.pop ?? 0) > 0.05 && (
                        <p style={{ fontSize: "0.7rem", color: "#60a5fa", margin: "0.1rem 0 0", fontWeight: 700 }}>💧 {Math.round((f.pop ?? 0) * 100)}%</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ padding: "1.25rem 1.5rem" }}>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", textAlign: "center", margin: 0 }}>
                  {locale === "ar" ? "انقر على يوم لعرض التفاصيل الساعية" : locale === "en" ? "Click a day for hourly details" : "Cliquez sur un jour pour le détail horaire"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Ad */}
        <AdUnit slot="3456789012" format="horizontal" style={{ margin: "0 0 1.5rem" }} />

        {/* ── Monthly climate table ─────────────────────────── */}
        <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: "1.5rem", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ padding: "1.125rem 1.5rem", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1rem" }}>📊</span>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, margin: 0 }}>{t("city.climate")} — {cityName}</h2>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", background: "var(--color-bg)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-full)", padding: "0.25rem 0.75rem", fontWeight: 600 }}>
                {t("city.climate.type")}: {locale === "ar" ? climate.labelAr : locale === "en" ? climate.labelEn : climate.label}
              </span>
              <span style={{ fontSize: "0.78rem", color: "var(--color-primary)", background: "var(--color-primary-light)", border: "1px solid var(--color-primary)", borderRadius: "var(--radius-full)", padding: "0.25rem 0.75rem", fontWeight: 600 }}>
                ⭐ {t("city.climate.bestTime")}: {climate.bestMonths.map(i => monthNames[i]).join(", ")}
              </span>
            </div>
          </div>

          {/* Visual bar chart + table */}
          <div className="climate-table-wrap" style={{ overflowX: "auto" }}>
            {/* Bar chart */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 2, padding: "1.5rem 1.5rem 0.5rem", minWidth: 640, height: 100 }}>
              {climate.months.map((m, i) => {
                const maxHigh = Math.max(...climate.months.map(x => x.high));
                const barH = Math.max(6, (m.high / maxHigh) * 80);
                const isBest = climate.bestMonths.includes(i);
                return (
                  <div key={i} title={`${monthNames[i]}: ${m.high}°C / ${m.low}°C`} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <div style={{ fontSize: "0.6rem", fontWeight: 700, color: isBest ? "var(--color-primary)" : "var(--color-text-muted)" }}>{m.high}°</div>
                    <div style={{ width: "100%", height: barH, borderRadius: "4px 4px 0 0", background: isBest ? "var(--color-primary)" : "var(--color-border)", transition: "background 0.2s" }} />
                  </div>
                );
              })}
            </div>

            {/* Data table */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem", minWidth: 640 }}>
              <thead>
                <tr style={{ background: "var(--color-bg)" }}>
                  <th style={{ padding: "0.6rem 0.75rem", textAlign: locale === "ar" ? "right" : "left", fontWeight: 700, color: "var(--color-text-muted)", borderBottom: "1px solid var(--color-border)", borderTop: "1px solid var(--color-border)" }}>
                    {locale === "ar" ? "الشهر" : locale === "en" ? "Month" : "Mois"}
                  </th>
                  {[t("city.climate.high"), t("city.climate.low"), t("city.climate.rain"), t("city.climate.sun")].map((h) => (
                    <th key={h} style={{ padding: "0.6rem 0.5rem", textAlign: "center", fontWeight: 700, color: "var(--color-text-muted)", borderBottom: "1px solid var(--color-border)", borderTop: "1px solid var(--color-border)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {climate.months.map((m, i) => {
                  const isBest = climate.bestMonths.includes(i);
                  return (
                    <tr key={i} style={{ background: isBest ? "var(--color-primary-light)" : i % 2 === 0 ? "var(--color-surface)" : "var(--color-bg)", borderBottom: "1px solid var(--color-border)" }}>
                      <td style={{ padding: "0.6rem 0.75rem", fontWeight: isBest ? 700 : 500, color: isBest ? "var(--color-primary)" : "var(--color-text)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        {isBest && <span style={{ fontSize: "0.6rem" }}>⭐</span>}
                        {monthNames[i]}
                      </td>
                      <td style={{ padding: "0.6rem 0.5rem", textAlign: "center", fontWeight: 700, color: "#f87171" }}>{m.high}°</td>
                      <td style={{ padding: "0.6rem 0.5rem", textAlign: "center", fontWeight: 700, color: "#60a5fa" }}>{m.low}°</td>
                      <td style={{ padding: "0.6rem 0.5rem", textAlign: "center", color: "var(--color-text-muted)" }}>{m.rain}</td>
                      <td style={{ padding: "0.6rem 0.5rem", textAlign: "center", color: "#fbbf24", fontWeight: 600 }}>{m.sun}☀️</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── City description (SEO) ────────────────────────── */}
        <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.5rem 1.75rem", marginBottom: "1.5rem", boxShadow: "var(--shadow-sm)" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text)" }}>
            {t("city.about", { city: cityName })}
          </h2>
          <p style={{ color: "var(--color-text-muted)", lineHeight: 1.85, fontSize: "0.9375rem", margin: 0 }}>
            {locale === "ar" && descriptionAr ? descriptionAr : locale === "en" && descriptionEn ? descriptionEn : description}
          </p>
        </div>

        {/* Ad */}
        <AdUnit slot="4567890123" format="rectangle" style={{ margin: "0 0 1.5rem" }} />

        {/* ── City FAQ ─────────────────────────────────────── */}
        <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: "1.5rem", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ padding: "1.125rem 1.5rem", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1rem" }}>❓</span>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, margin: 0 }}>{t("city.faq.title")} — {cityName}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ borderBottom: i < faqs.length - 1 ? "1px solid var(--color-border)" : "none" }} className="city-faq-item">
                <summary style={{ padding: "1rem 1.5rem", cursor: "pointer", fontWeight: 600, fontSize: "0.9375rem", color: "var(--color-text)", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }} className="city-faq-summary">
                  <span>{faq.q}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" className="faq-chev" style={{ flexShrink: 0, transition: "transform 0.25s" }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div style={{ padding: "0 1.5rem 1rem 1.5rem", color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.75 }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* ── Related cities ────────────────────────────────── */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-text)" }}>
            {locale === "ar" ? "مدن أخرى" : locale === "en" ? "Other cities" : "Autres villes"}
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {[
              { name: "Casablanca", slug: "casablanca" },
              { name: "Marrakech",  slug: "marrakech" },
              { name: "Rabat",      slug: "rabat" },
              { name: "Agadir",     slug: "agadir" },
              { name: "Fès",        slug: "fes" },
              { name: "Tanger",     slug: "tanger" },
            ].filter(c => c.slug !== slug).map((c) => (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}`}
                style={{ padding: "0.4rem 1rem", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-full)", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-primary)", textDecoration: "none", transition: "all 0.2s" }}
                className="related-city-link"
              >
                Météo {c.name}
              </Link>
            ))}
            <Link href="/cities" style={{ padding: "0.4rem 1rem", background: "var(--color-primary)", border: "1px solid var(--color-primary)", borderRadius: "var(--radius-full)", fontSize: "0.875rem", fontWeight: 600, color: "#fff", textDecoration: "none" }}>
              {locale === "ar" ? "جميع المدن →" : locale === "en" ? "All cities →" : "Toutes les villes →"}
            </Link>
          </div>
        </div>

        {/* Back link */}
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-primary)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          {t("city.back")}
        </Link>
      </div>

      <style>{`
        .day-card-btn:hover { background: var(--color-primary-light) !important; }
        .city-faq-item[open] .faq-chev { transform: rotate(180deg); }
        .city-faq-summary::-webkit-details-marker { display: none; }
        .related-city-link:hover { background: var(--color-primary) !important; color: #fff !important; }
      `}</style>
    </div>
  );
}

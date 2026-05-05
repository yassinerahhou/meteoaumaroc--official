"use client";

import { ChangeEvent, useEffect, useState, useRef, useCallback } from "react";
import { optionType, weatherDataType, ForecastData } from "@/app/types";
import WeatherDisplay from "./WeatherDisplay";
import Image from "next/image";
import { useLanguage } from "@/app/lib/LanguageContext";
import { MOROCCAN_CITIES } from "@/app/lib/cities";

interface RecentCityItem {
  city: optionType;
  weather: weatherDataType;
}

const LOCALE_MAP: Record<string, string> = { fr: "fr-FR", ar: "ar-MA", en: "en-GB" };

// Normalize string: lowercase + remove accents for accent-insensitive matching
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Build local optionType objects from our cities data
const LOCAL_OPTIONS: (optionType & { region: string; nameAr?: string })[] =
  MOROCCAN_CITIES.map((c) => ({
    name: c.name,
    lat: c.lat,
    lon: c.lon,
    country: "MA",
    state: c.region,
    region: c.region,
    nameAr: c.nameAr,
  }));

function searchLocal(query: string): optionType[] {
  if (!query || query.trim().length === 0) return [];
  const q = normalize(query.trim());

  const startsWith: optionType[] = [];
  const contains: optionType[] = [];

  for (const city of LOCAL_OPTIONS) {
    const nameNorm = normalize(city.name);
    const arNorm = city.nameAr ? normalize(city.nameAr) : "";
    const regionNorm = normalize(city.region);

    if (nameNorm.startsWith(q) || arNorm.startsWith(q)) {
      startsWith.push(city);
    } else if (
      nameNorm.includes(q) ||
      arNorm.includes(q) ||
      regionNorm.includes(q)
    ) {
      contains.push(city);
    }
  }

  // startsWith results first, then contains, max 6 total
  return [...startsWith, ...contains].slice(0, 6);
}

export default function Search(): JSX.Element {
  const { t, locale, formatTemp } = useLanguage();
  const dateLocale = LOCALE_MAP[locale] ?? "fr-FR";

  const [term, setTerm] = useState<string>("");
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<optionType[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [weatherData, setWeatherData] = useState<weatherDataType | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [recentCities, setRecentCities] = useState<RecentCityItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingOptions, setIsFetchingOptions] = useState(false);
  const [isGeoLocating, setIsGeoLocating] = useState(false);

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch API suggestions (non-Moroccan cities / fallback)
  const fetchApiOptions = useCallback(async (value: string) => {
    if (value.trim().length < 2) return;
    setIsFetchingOptions(true);
    try {
      const res = await fetch(`/api/geo?q=${encodeURIComponent(value)}`);
      if (!res.ok) return;
      const apiData: optionType[] = await res.json();

      setOptions((prev) => {
        // Merge: keep local results, append API results not already shown
        const localNames = new Set(prev.map((o) => normalize(o.name)));
        const newOnes = apiData.filter(
          (o) => !localNames.has(normalize(o.name))
        );
        return [...prev, ...newOnes].slice(0, 8);
      });
    } catch {
      // API failed — local results are still shown
    } finally {
      setIsFetchingOptions(false);
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setTerm(value);
    setActiveIndex(-1);

    // Instant local results — no delay
    const local = searchLocal(value);
    setOptions(local);

    // Debounced API call to enrich with non-Moroccan cities
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (value.trim().length >= 2) {
      debounceTimerRef.current = setTimeout(() => fetchApiOptions(value.trim()), 350);
    }
  };

  const handleOptionSelect = (option: optionType): void => {
    setCity(option);
    setTerm(option.name);
    setOptions([]);
    setActiveIndex(-1);
    getForecast(option);
  };

  const handleSubmit = (): void => {
    if (activeIndex >= 0 && options[activeIndex]) {
      handleOptionSelect(options[activeIndex]);
      return;
    }
    if (city) {
      getForecast(city);
      return;
    }
    // If no city selected yet but there are options, pick first
    if (options.length > 0) {
      handleOptionSelect(options[0]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!options.length) {
      if (e.key === "Enter") handleSubmit();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      setOptions([]);
      setActiveIndex(-1);
    }
  };

  const getForecast = async (selectedCity: optionType): Promise<void> => {
    setIsLoading(true);
    setOptions([]);
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`/api/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&lang=${locale}`),
        fetch(`/api/forecast?lat=${selectedCity.lat}&lon=${selectedCity.lon}&lang=${locale}`),
      ]);

      if (!weatherRes.ok || !forecastRes.ok) {
        console.error("Weather API error:", weatherRes.status, forecastRes.status);
        return;
      }

      const wd: weatherDataType = await weatherRes.json();
      const fd: ForecastData = await forecastRes.json();

      // Validate that we got real weather data (not an error object)
      if (!wd.weather || !Array.isArray(wd.weather) || !wd.main) {
        console.error("Invalid weather data received:", wd);
        return;
      }

      const updated = [
        ...recentCities.filter((r) => r.city.name !== selectedCity.name),
        { city: selectedCity, weather: wd },
      ].slice(-3);
      setRecentCities(updated);
      localStorage.setItem("recentCities", JSON.stringify(updated));
      setWeatherData(wd);
      setForecastData(fd);
      setSelectedDate("");
    } catch (err) {
      console.error("Failed to fetch forecast:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) return;
    setIsGeoLocating(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(`/api/weather?lat=${coords.latitude}&lon=${coords.longitude}`);
          if (!res.ok) {
            console.error("Geolocation weather API error:", res.status);
            return;
          }
          const wd: weatherDataType = await res.json();
          if (!wd.name || !wd.weather) {
            console.error("Invalid geolocation weather data:", wd);
            return;
          }
          const geoCity: optionType = { name: wd.name, lat: coords.latitude, lon: coords.longitude, country: wd.sys?.country ?? "MA" };
          setTerm(wd.name);
          setCity(geoCity);
          getForecast(geoCity);
        } catch {
          // silent fail
        } finally {
          setIsGeoLocating(false);
        }
      },
      () => setIsGeoLocating(false),
      { timeout: 8000 }
    );
  };

  // Load recent cities from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("recentCities");
      if (stored) setRecentCities(JSON.parse(stored));
    } catch {/* ignore */}
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!options.length) return;
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOptions([]);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [options.length]);

  const uniqueDates = Array.from(
    new Set(forecastData?.list.map((f) => f.dt_txt.split(" ")[0]))
  );

  return (
    <>
      {/* ── Search Bar ───────────────────────────────────────── */}
      <div
        ref={wrapperRef}
        style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}
      >
        <div
          className="glass"
          style={{
            display: "flex",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "var(--radius-xl)",
            boxShadow: options.length > 0 ? "var(--shadow-xl)" : "var(--shadow-lg)",
            border: options.length > 0
              ? "2.5px solid var(--color-primary)"
              : "1px solid rgba(255, 255, 255, 0.3)",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            padding: "4px",
          }}
        >
          {/* Search icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "1.25rem",
              color: options.length > 0 ? "var(--color-primary)" : "var(--color-text-muted)",
              flexShrink: 0,
              transition: "color 0.3s",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={term}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={t("search.placeholder")}
            aria-label={t("search.placeholder")}
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-expanded={options.length > 0}
            aria-controls="search-listbox"
            autoComplete="off"
            style={{
              flex: 1,
              padding: "0.875rem 1rem",
              fontSize: "1.0625rem",
              border: "none",
              outline: "none",
              background: "transparent",
              color: "var(--color-text)",
              fontFamily: "inherit",
              fontWeight: 500,
            }}
          />

          {/* Controls Group */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", paddingRight: "0.5rem" }}>
            {/* Clear button */}
            {term && (
              <button
                onClick={() => {
                  setTerm("");
                  setOptions([]);
                  setCity(null);
                  setActiveIndex(-1);
                  inputRef.current?.focus();
                }}
                style={{
                  background: "rgba(0,0,0,0.05)",
                  border: "none",
                  cursor: "pointer",
                  width: 32, height: 32,
                  borderRadius: "50%",
                  color: "var(--color-text-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
                className="hover:bg-red-50 hover:text-red-500"
                aria-label="Effacer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}

            {/* Geolocation button */}
            <button
              onClick={handleGeolocate}
              disabled={isGeoLocating || isLoading}
              title={t("search.geolocate")}
              aria-label={t("search.geolocate")}
              style={{
                background: "rgba(14, 165, 233, 0.05)",
                border: "none",
                cursor: isGeoLocating ? "not-allowed" : "pointer",
                width: 38, height: 38,
                borderRadius: "50%",
                color: isGeoLocating ? "var(--color-primary)" : "var(--color-text-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
              }}
              className="hover:bg-primary-light hover:text-primary"
            >
              {isGeoLocating ? (
                <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid var(--color-border)", borderTopColor: "var(--color-primary)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              )}
            </button>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn btn-primary"
              style={{
                padding: "0.75rem 1.75rem",
                borderRadius: "var(--radius-lg)",
                fontSize: "0.9375rem",
                boxShadow: "var(--shadow-md)",
              }}
            >
              {isLoading ? (
                <span style={{ display: "inline-block", width: 18, height: 18, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
              ) : (
                <>
                  <svg className="search-btn-icon-mobile" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <span className="search-btn-text">{t("search.button")}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Autocomplete dropdown */}
        {options.length > 0 && (
          <ul
            id="search-listbox"
            role="listbox"
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              right: 0,
              background: "var(--color-surface)",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-lg)",
              border: "1.5px solid var(--color-primary)",
              listStyle: "none",
              zIndex: 200,
              overflow: "hidden",
              animation: "dropdownIn 0.15s ease",
            }}
          >
            {options.map((option, i) => {
              const isMoroccan = option.country === "MA";
              const isActive = i === activeIndex;
              return (
                <li key={`${option.name}-${i}`} role="option" aria-selected={isActive}>
                  <button
                    onMouseDown={(e) => {
                      e.preventDefault(); // prevent blur before click
                      handleOptionSelect(option);
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                    style={{
                      width: "100%",
                      padding: "0.7rem 1.1rem",
                      textAlign: "left",
                      background: isActive ? "var(--color-primary-light)" : "transparent",
                      border: "none",
                      borderBottom: i < options.length - 1 ? "1px solid var(--color-border)" : "none",
                      cursor: "pointer",
                      fontSize: "0.9375rem",
                      color: isActive ? "var(--color-primary)" : "var(--color-text)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      transition: "background 0.1s",
                      fontFamily: "inherit",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, color: isActive ? "var(--color-primary)" : "var(--color-text-muted)" }}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>

                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontWeight: 600 }}>{option.name}</span>
                      {option.state && (
                        <span style={{ color: "var(--color-text-muted)", fontSize: "0.8rem", marginLeft: "0.4rem" }}>
                          {option.state}
                        </span>
                      )}
                    </span>

                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "0.15rem 0.5rem",
                        borderRadius: "var(--radius-full)",
                        background: isMoroccan ? "var(--color-primary-light)" : "var(--color-bg)",
                        color: isMoroccan ? "var(--color-primary)" : "var(--color-text-muted)",
                        border: "1px solid var(--color-border)",
                        flexShrink: 0,
                      }}
                    >
                      {isMoroccan ? "🇲🇦 MA" : option.country}
                    </span>
                  </button>
                </li>
              );
            })}

            {isFetchingOptions && (
              <li style={{ padding: "0.5rem 1.1rem", fontSize: "0.8rem", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ display: "inline-block", width: 10, height: 10, border: "1.5px solid var(--color-border)", borderTopColor: "var(--color-primary)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                {t("search.loading")}…
              </li>
            )}
          </ul>
        )}
      </div>

      {/* ── Recent Cities ─────────────────────────────────────── */}
      {recentCities.length > 0 && !weatherData && (
        <section style={{ padding: "2.5rem 0 0" }} aria-label={t("search.recent")}>
          <div className="container">
            <h2
              style={{
                fontSize: "0.8125rem",
                fontWeight: 800,
                color: "rgba(255,255,255,0.9)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "1rem",
                textAlign: "center",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {t("search.recent")}
            </h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
              {recentCities.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setTerm(item.city.name);
                    setCity(item.city);
                    getForecast(item.city);
                  }}
                  aria-label={`${t("search.recent")}: ${item.city.name}`}
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "var(--radius-full)",
                    padding: "0.5rem 1.25rem 0.5rem 0.6rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    backdropFilter: "blur(12px)",
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontFamily: "inherit",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                  className="recent-city-btn"
                >
                  <Image
                    src={`https://openweathermap.org/img/wn/${item.weather?.weather?.[0]?.icon ?? '01d'}@2x.png`}
                    alt={item.weather?.weather?.[0]?.description ?? ""}
                    width={32}
                    height={32}
                    style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1)) brightness(1.1)" }}
                  />
                  <span style={{ fontWeight: 700, color: "#fff", fontSize: "0.9375rem" }}>
                    {item.city.name}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.875rem", fontWeight: 600 }}>
                    {item.weather?.main?.temp != null ? formatTemp(item.weather.main.temp) : '--'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Weather Result ────────────────────────────────────── */}
      {(weatherData || isLoading) && (
        <section style={{ padding: "3rem 0" }}>
          <div className="container">
            {isLoading ? (
              <div style={{ maxWidth: 720, margin: "0 auto", background: "var(--color-surface)", borderRadius: "var(--radius-lg)", padding: "2rem", boxShadow: "var(--shadow-md)" }}>
                <div className="skeleton" style={{ height: 28, width: "50%", marginBottom: "1rem" }} />
                <div className="skeleton" style={{ height: 80, marginBottom: "1rem" }} />
                <div className="skeleton" style={{ height: 20, width: "70%", marginBottom: "0.5rem" }} />
                <div className="skeleton" style={{ height: 20, width: "60%" }} />
              </div>
            ) : (
              <WeatherDisplay weatherData={weatherData} />
            )}
          </div>
        </section>
      )}

      {/* ── 5-Day Forecast ────────────────────────────────────── */}
      {forecastData && !isLoading && (
        <section style={{ padding: "0 0 3rem" }}>
          <div className="container">
            <div style={{ maxWidth: 720, margin: "0 auto", background: "var(--color-surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
              <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0 }}>{t("forecast.title")}</h3>
              </div>

              <div className="forecast-scroll-container" style={{ padding: "1rem 1.5rem 0.5rem" }}>
                {uniqueDates.map((date) => {
                  const d = new Date(date + "T12:00:00");
                  const label = d.toLocaleDateString(dateLocale, { weekday: "short", day: "numeric", month: "short" });
                  const isSelected = selectedDate === date;
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(isSelected ? "" : date)}
                      style={{
                        padding: "0.45rem 1rem",
                        borderRadius: "var(--radius-full)",
                        border: isSelected ? "2px solid var(--color-primary)" : "2px solid var(--color-border)",
                        background: isSelected ? "var(--color-primary)" : "var(--color-surface)",
                        color: isSelected ? "#fff" : "var(--color-text-muted)",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 0.2s",
                        fontFamily: "inherit",
                        flexShrink: 0,
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {selectedDate ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "0.75rem", padding: "1rem 1.5rem 1.5rem" }}>
                  {forecastData.list
                    .filter((f) => f.dt_txt.split(" ")[0] === selectedDate)
                    .map((forecast, i) => (
                      <div
                        key={i}
                        style={{ background: "var(--color-bg)", borderRadius: "var(--radius-md)", padding: "0.875rem", textAlign: "center", border: "1px solid var(--color-border)", transition: "transform 0.2s, box-shadow 0.2s" }}
                        className="forecast-card-item"
                      >
                        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-primary)", marginBottom: "0.4rem" }}>
                          {forecast.dt_txt.split(" ")[1].slice(0, 5)}
                        </p>
                        <Image src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt={forecast.weather[0].description} width={48} height={48} style={{ margin: "0 auto" }} />
                        <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text)", margin: "0.25rem 0 0" }}>
                          {formatTemp(forecast.main.temp)}
                        </p>
                        <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", margin: 0 }}>
                          {t("weather.feelsLike")} {formatTemp(forecast.main.feels_like)}
                        </p>
                      </div>
                    ))}
                </div>
              ) : (
                <p style={{ padding: "1.25rem 1.5rem", color: "var(--color-text-muted)", fontSize: "0.875rem", textAlign: "center", margin: 0 }}>
                  {t("forecast.selectDay")}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .search-option-btn:hover { background: var(--color-primary-light) !important; }
        .forecast-card-item:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
        .recent-city-btn:hover { background: rgba(255,255,255,0.22) !important; }
      `}</style>
    </>
  );
}

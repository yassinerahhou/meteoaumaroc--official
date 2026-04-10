"use client";

import { ChangeEvent, useEffect, useState, useRef, useCallback } from "react";
import { optionType, weatherDataType, ForecastData } from "./types";
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
          style={{
            display: "flex",
            background: "color-mix(in srgb, var(--color-surface) 97%, transparent)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
            border: options.length > 0
              ? "1.5px solid var(--color-primary)"
              : "1px solid var(--color-border)",
            transition: "border-color 0.2s",
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
              transition: "color 0.2s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            aria-controls="search-listbox"
            autoComplete="off"
            style={{
              flex: 1,
              padding: "1rem 0.75rem",
              fontSize: "1rem",
              border: "none",
              outline: "none",
              background: "transparent",
              color: "var(--color-text)",
              fontFamily: "inherit",
            }}
          />

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
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0 0.5rem",
                color: "var(--color-text-muted)",
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
              aria-label="Effacer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
              background: "none",
              border: "none",
              cursor: isGeoLocating ? "not-allowed" : "pointer",
              padding: "0 0.5rem",
              color: isGeoLocating ? "var(--color-primary)" : "var(--color-text-muted)",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
              transition: "color 0.2s",
            }}
          >
            {isGeoLocating ? (
              <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid var(--color-border)", borderTopColor: "var(--color-primary)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            )}
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="search-submit-btn"
            style={{
              margin: "6px",
              padding: "0.6rem 1.4rem",
              background: isLoading ? "#94a3b8" : "var(--color-primary)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--radius-lg)",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
              whiteSpace: "nowrap",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              flexShrink: 0,
            }}
          >
            {isLoading ? (
              <>
                <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                <span className="search-btn-text">{t("search.loading")}</span>
              </>
            ) : (
              <>
                <svg className="search-btn-icon-mobile" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <span className="search-btn-text">{t("search.button")}</span>
              </>
            )}
          </button>
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
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.6)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.875rem",
                textAlign: "center",
              }}
            >
              {t("search.recent")}
            </h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", justifyContent: "center" }}>
              {recentCities.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setTerm(item.city.name);
                    setCity(item.city);
                    getForecast(item.city);
                  }}
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "var(--radius-full)",
                    padding: "0.45rem 1rem 0.45rem 0.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backdropFilter: "blur(8px)",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    fontFamily: "inherit",
                  }}
                  className="recent-city-btn"
                >
                  <Image
                    src={`https://openweathermap.org/img/wn/${item.weather?.weather?.[0]?.icon ?? '01d'}@2x.png`}
                    alt=""
                    width={28}
                    height={28}
                    style={{ filter: "brightness(1.2)" }}
                  />
                  <span style={{ fontWeight: 600, color: "#fff", fontSize: "0.875rem" }}>
                    {item.city.name}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8125rem" }}>
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

              <div style={{ display: "flex", gap: "0.5rem", padding: "1rem 1.5rem 0.5rem", overflowX: "auto", scrollbarWidth: "none" }}>
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
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "0.75rem", padding: "1rem 1.5rem 1.5rem" }}>
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

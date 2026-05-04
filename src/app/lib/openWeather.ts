import { FORECAST_TTL, WEATHER_TTL, weatherCache } from "@/app/lib/cache";

const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
const SUPPORTED_LANGUAGES = new Set(["fr", "ar", "en"]);

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  weather: { description: string; icon: string; main: string }[];
  wind: { speed: number; deg: number };
  visibility: number;
  name: string;
  sys: { sunrise: number; sunset: number; country: string };
}

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
  pop?: number;
}

export interface ForecastData {
  list: ForecastItem[];
}

function getApiKey() {
  return process.env.OWM_API_KEY ?? process.env.NEXT_PUBLIC_API_KEY;
}

export function normalizeWeatherLanguage(lang?: string | null) {
  return SUPPORTED_LANGUAGES.has(lang ?? "") ? (lang as "fr" | "ar" | "en") : "fr";
}

async function fetchOpenWeatherJson<T>(
  cacheKey: string,
  ttlSeconds: number,
  baseUrl: string,
  lat: string,
  lon: string,
  lang: string
): Promise<T | null> {
  const cached = weatherCache.get<T>(cacheKey);
  if (cached) {
    return cached;
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    return null;
  }

  try {
    const url = `${baseUrl}?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${apiKey}`;
    const response = await fetch(url, { next: { revalidate: ttlSeconds } });
    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as T;
    weatherCache.set(cacheKey, data, ttlSeconds);
    return data;
  } catch {
    return null;
  }
}

export async function getWeatherData(lat: string, lon: string, lang?: string | null) {
  const normalizedLang = normalizeWeatherLanguage(lang);
  return fetchOpenWeatherJson<WeatherData>(
    `weather:${lat}:${lon}:${normalizedLang}`,
    WEATHER_TTL,
    WEATHER_BASE_URL,
    lat,
    lon,
    normalizedLang
  );
}

export async function getForecastData(lat: string, lon: string, lang?: string | null) {
  const normalizedLang = normalizeWeatherLanguage(lang);
  return fetchOpenWeatherJson<ForecastData>(
    `forecast:${lat}:${lon}:${normalizedLang}`,
    FORECAST_TTL,
    FORECAST_BASE_URL,
    lat,
    lon,
    normalizedLang
  );
}

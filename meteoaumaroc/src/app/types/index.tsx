// ── Search / Geocoding ───────────────────────────────────
export type optionType = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

// ── Current Weather (Search / WeatherDisplay) ────────────
export interface weatherDataType {
  visibility: number;
  name: string;
  main: {
    feels_like: number;
    temp: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
}

// ── City Pages WeatherData ───────────────────────────────
export interface WeatherData {
  weather: Array<{ description: string; icon: string; main: string }>;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  wind: { speed: number; deg: number };
  visibility: number;
  name: string;
  sys: { sunrise: number; sunset: number; country: string };
}

// ── Forecast ─────────────────────────────────────────────
export interface Forecast {
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    icon: string;
    description: string;
    main: string;
  }>;
  wind: { speed: number };
}

export interface ForecastData {
  list: Forecast[];
}

// ── Monthly data (legacy, kept for compatibility) ────────
export interface MonthlyWeatherData {
  monthly: Array<{ name: string; avgTemp: number }>;
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
  }>;
}

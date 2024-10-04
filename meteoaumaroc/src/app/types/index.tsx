import { ReactNode } from "react";

// Type for location options, such as cities
export type optionType = {
  name: string;
  lat: number;
  lon: number;
  country: string;
};

// Weather data interface
export interface WeatherData {
  visibility: number;
  name: string;
  main: {
    feels_like: number | ReactNode; // can handle different ReactNode scenarios
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg?: number; // Optional property for wind direction
  };
  sys?: {
    sunrise?: number;
    sunset?: number;
  };
}

// Forecast data for a specific day or time
export interface Forecast {
  dt_txt: string; // Date text
  main: {
    temp: number;
    feels_like: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
}

// Forecast data response type (for multiple forecast entries)
export interface ForecastData {
  list: Forecast[]; // Array of forecast items
}

// Monthly weather data for charts or historical data
export interface MonthlyWeatherData {
  monthly: Array<{
    name: string; // City or month name
    avgTemp: number; // Average temperature
  }>;
  labels: string[]; // Labels for chart or display
  datasets: Array<{
    label: string; // Label for the dataset (e.g., "Average Temperature")
    data: number[]; // Array of temperature data points
    fill: boolean; // Whether to fill the area under the line in a chart
    backgroundColor: string; // Background color for the chart
    borderColor: string; // Border color for the chart
  }>;
}

import { ReactNode } from "react";

export type optionType = {
  name: string;
  lat: number;
  lon: number;
  country: string;
};

export interface weatherDataType {
  visibility: number;
  name: string;
  main: {
    feels_like: ReactNode;
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

interface Weather {
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
}

interface Forecast {
  dt_txt: string;
  main: Main;
  weather: Weather[];
}

export interface ForecastData {
  list: Forecast[];
}

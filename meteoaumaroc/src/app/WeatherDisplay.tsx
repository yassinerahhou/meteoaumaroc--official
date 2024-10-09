import React from "react";
import Image from "next/image";
import { weatherDataType } from "./types";
import "./WeatherDisplay.css";

interface WeatherDisplayProps {
  weatherData: weatherDataType | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (!weatherData) {
    return <div className="weather-display loading"></div>;
  }

  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

  return (
    <>
      <div className="weather-display">
        <br />

        <h2>temps à {weatherData.name}</h2>
        <div className="current-weather">
          <div className="data-info">
            <span className="current-weather-text">MÉTÉO ACTUELLE </span>
            <span className="current-time">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
          <div className="api-data">
            <div className="current-data-left">
              <Image
                src={weatherIconUrl}
                alt="Weather Icon"
                width={150}
                height={150}
                className="weather-icon"
              />
              <span className="temperature">{weatherData.main.temp}°C</span>
            </div>
            <div className="current-data-right">
              <p>
                RealFeel Shade™ <span>{weatherData.main.feels_like}°C</span>
              </p>
              <hr />
              <p>
                Wind <span>{weatherData.wind.speed} m/s</span>
              </p>
              <hr />
              <p>
                Wind Gusts <span>{weatherData.visibility / 1000} km/h</span>
              </p>
              <hr />
              <p>
                Air Quality <span>{weatherData.weather[0].description}</span>
              </p>
              <hr />
              <p>
                Humidity <span>{weatherData.main.humidity}%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherDisplay;

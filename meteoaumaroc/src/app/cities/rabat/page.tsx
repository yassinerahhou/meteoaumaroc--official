"use client";
import React, { useEffect, useState, useCallback } from "react";
import { WeatherData, MonthlyWeatherData } from "./../../types"; // Adjust path if needed
import styles from "./style.module.css";
import Header_1 from "@/app/components/Header-1";

const RabatPage: React.FC = () => {
  const cityName = "Rabat";
  const lat = 34.0209; // Latitude for Rabat
  const lon = -6.8416; // Longitude for Rabat

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyWeatherData | null>(
    null
  );

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`
      );
      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchMonthlyWeatherData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`
      );
      const data = await response.json();

      const labels = data.daily.map((day: { dt: number }) => {
        const date = new Date(day.dt * 1000);
        return date.toLocaleString("default", {
          month: "long",
          day: "numeric",
        });
      });

      const temperatures = data.daily.map(
        (day: { temp: { day: number } }) => day.temp.day
      );

      const monthlyWeatherData: MonthlyWeatherData = {
        monthly: [],
        labels,
        datasets: [
          {
            label: "Température Moyenne (°C)",
            data: temperatures,
            fill: false,
            backgroundColor: "#007bff",
            borderColor: "#007bff",
          },
        ],
      };

      setMonthlyData(monthlyWeatherData);
    } catch (error) {
      console.error("Error fetching monthly weather data:", error);
    }
  }, [lat, lon]);

  useEffect(() => {
    fetchWeatherData();
    fetchMonthlyWeatherData();
  }, [fetchMonthlyWeatherData]);

  return (
    <>
      <Header_1 />
      <br />
      <br />
      <br />
      <br />

      <center>
        {" "}
        <div className={styles.container}>
          <h1>Météo à {cityName}</h1>
          {weatherData && (
            <div className={styles.weatherInfo}>
              <h2>Conditions Actuelles</h2>
              <p>Température: {weatherData.main.temp}°C</p>
              <p>Humidité: {weatherData.main.humidity}%</p>
              <p>Vent: {weatherData.wind.speed} m/s</p>
              <p>Conditions: {weatherData.weather[0].description}</p>
            </div>
          )}
          <h2>Prévisions des 14 jours</h2>
          <ul>
            {monthlyData && monthlyData.labels.length > 0 ? (
              monthlyData.labels.map((label, index) => (
                <li key={label} className={styles.forecastItem}>
                  <strong>{label}</strong>:{" "}
                  {monthlyData.datasets[0].data[index]}
                  °C
                </li>
              ))
            ) : (
              <li>Aucune prévision disponible.</li>
            )}
          </ul>
        </div>
      </center>
    </>
  );
};

export default RabatPage;

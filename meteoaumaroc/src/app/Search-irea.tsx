"use client";

import { ChangeEvent, useEffect, useState, useRef } from "react";
import { optionType, weatherDataType, ForecastData } from "./types";
import "./style.css";
import WeatherDisplay from "./WeatherDisplay";
import Image from "next/image";

interface RecentCityItem {
  city: optionType;
  weather: weatherDataType;
}

export default function Search(): JSX.Element {
  const [term, setTerm] = useState<string>("");
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<optionType[]>([]);
  const [weatherData, setWeatherData] = useState<weatherDataType | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [recentCities, setRecentCities] = useState<RecentCityItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getSearchOptions = async (value: string): Promise<void> => {
    if (!value) return; // Do not fetch if the input is empty

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(
          `API request failed with status code ${response.status}`
        );
      }

      const data: optionType[] = await response.json();
      setOptions(data);
    } catch (error) {
      console.error("Error fetching search options:", error);
      setOptions([]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.trim();
    setTerm(value);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      getSearchOptions(value);
    }, 500);
  };

  const handleSubmit = (): void => {
    if (!city) return;
    getForecast(city);
  };

  const handleOptionSelect = (option: optionType): void => {
    setCity(option);
    setTerm(`${option.name}, ${option.country}`); // Display selected option in the input
    setOptions([]); // Clear suggestions after selection
  };

  const getForecast = async (city: optionType): Promise<void> => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const weatherData: weatherDataType = await weatherResponse.json();

      const updatedRecentCities = [
        ...recentCities,
        { city, weather: weatherData },
      ];
      setRecentCities(updatedRecentCities);
      localStorage.setItem("recentCities", JSON.stringify(updatedRecentCities));

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const forecastData: ForecastData = await forecastResponse.json();

      setWeatherData(weatherData);
      setForecastData(forecastData);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  useEffect(() => {
    const storedRecentCities = localStorage.getItem("recentCities");
    if (storedRecentCities) {
      setRecentCities(JSON.parse(storedRecentCities));
    }
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleDateSelect = (date: string): void => {
    setSelectedDate(date);
  };

  return (
    <>
      <section className="search_1">
        <div>
          <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
            Enter below a place you want to know the weather of and select an
            option from the dropdown
          </p>

          <div
            id="Forecast"
            style={{
              position: "relative",
              display: "flex",
              marginTop: "2.5rem",
              padding: "20px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              value={term}
              className="myInput"
              onChange={handleInputChange}
              placeholder=" Please enter your city name"
              style={{ width: "600px", height: "45px" }}
            />
            <ul className="list-map-sugg-1">
              {options.map((option, index) => (
                <li key={option.name + "-" + index}>
                  <button
                    className="custom-button"
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option.name}, {option.country}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </div>
        <br />
        <h1 className="text-1xl font-bold leading-snug text-black-700 mb-10 wow fadeInUp">
          RECENT LOCATIONS
        </h1>
        <div className="last_locations">
          {recentCities.slice(-3).map((recentCity, index) => (
            <div key={index} className="city_cube">
              <h3 className="city-name" id="recentcity-name">
                {recentCity.city.name}
              </h3>
              <div className="weather-info">
                <div className="weather-icon">
                  <Image
                    src={`https://openweathermap.org/img/wn/${recentCity.weather.weather[0].icon}.png`}
                    alt={`${recentCity.weather.weather[0].description} icon`}
                    width={50}
                    height={50}
                  />
                </div>
                <div className="temperature-info">
                  <h1 className="temperature">
                    {recentCity.weather.main.temp}°C
                  </h1>
                  <small>
                    Feels like {recentCity.weather.main.feels_like}°C
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
      </section>
      <div>
        <br />
        <br />
        <br />
        <WeatherDisplay weatherData={weatherData} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        {forecastData && (
          <div className="forecast-section">
            <h2 className="text-4l font-bold leading-snug text-gray-700 mb-10 wow fadeInUp">
              Forecast for the Next 5 Days
            </h2>

            {/* Display available dates */}
            <div className="forecast-dates">
              {Array.from(
                new Set(
                  forecastData.list.map(
                    (forecast) => forecast.dt_txt.split(" ")[0]
                  )
                )
              )
                .filter(
                  (date) => date !== new Date().toISOString().split("T")[0]
                ) // Avoid showing today’s date
                .map((date, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(date)} // Correctly select date
                    className={selectedDate === date ? "selected" : ""} // Visually highlight the selected date
                    style={{
                      backgroundColor:
                        selectedDate === date ? "#2196F3" : "#f0f0f0", // Highlight selected date
                      color: selectedDate === date ? "#fff" : "#000",
                    }}
                  >
                    {date}
                  </button>
                ))}
            </div>

            {/* Display weather for the selected date */}
            <div className="forecast-scroll-container">
              {forecastData.list
                .filter(
                  (forecast) => forecast.dt_txt.split(" ")[0] === selectedDate
                ) // Only show forecasts for the selected date
                .map((forecast, index) => (
                  <div key={index} className="forecast-card">
                    <div className="weather-icon">
                      <Image
                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                        alt="weather-icon"
                        width={50}
                        height={50}
                      />
                    </div>
                    <span>
                      {forecast.dt_txt.split(" ")[1]}: {forecast.main.temp}°C
                    </span>
                    <span className="feels-like">
                      Feels like {forecast.main.feels_like}°C
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

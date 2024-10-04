"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Définir l'icône du marqueur
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Liste des villes avec latitudes et longitudes
const villes = [
  { name: "Casablanca", lat: 33.5731, lon: -7.5898 },
  { name: "Rabat", lat: 34.0209, lon: -6.8417 },
  { name: "Marrakech", lat: 31.6295, lon: -7.9811 },
  { name: "Agadir", lat: 30.4278, lon: -9.5981 },
  { name: "Dakhla", lat: 23.6847, lon: -15.957 },
  { name: "Sefrou", lat: 33.8314, lon: -4.8289 },
  { name: "Oujda", lat: 34.6814, lon: -1.9076 },
  { name: "Le Caire", lat: 30.033333, lon: 31.233334 },
  { name: "Lagos", lat: 6.524379, lon: 3.379206 },
  { name: "Nairobi", lat: -1.286389, lon: 36.817223 },
  { name: "Pretoria", lat: -25.747868, lon: 28.229271 },
  { name: "Dakar", lat: 14.692778, lon: -17.446667 },
  { name: "Accra", lat: 5.603717, lon: -0.186964 },
  { name: "Addis Abeba", lat: 9.145, lon: 40.489673 },
];

// Définir la structure des données météorologiques
interface WeatherData {
  name: string;
  lat: number;
  lon: number;
  temp: number;
  condition: string;
}

export default function AfricaWeatherMap() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Clé API depuis l'environnement
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Récupérer les données météorologiques pour chaque ville
  useEffect(() => {
    const fetchWeatherData = async () => {
      const fetchedData = await Promise.all(
        villes.map(async (ville) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${ville.lat}&lon=${ville.lon}&units=metric&appid=${apiKey}`
          );
          const data = await response.json();
          return {
            name: ville.name,
            lat: ville.lat,
            lon: ville.lon,
            temp: data.main.temp,
            condition: data.weather[0].description,
          };
        })
      );
      setWeatherData(fetchedData);
    };

    if (apiKey) {
      fetchWeatherData();
    }

    setIsMounted(true);
  }, [apiKey]);

  if (!isMounted) {
    return null; // Rien à afficher tant que le composant n'est pas monté
  }

  return (
    <div
      className="h-[calc(100vh-8rem)] w-3/4 border-2 border-red-500 mx-auto"
      style={{ height: "100%", width: "75%" }}
    >
      {/* Section des prévisions avec labels en français */}
      <div className="text-center my-4">
        <button className="px-4 py-2 bg-blue-500 text-black rounded-md mx-2">
          Aujourd'hui
        </button>
        <button className="px-4 py-2 bg-blue-500 text-black rounded-md mx-2">
          Demain
        </button>
        <button className="px-4 py-2 bg-blue-500 text-black rounded-md mx-2">
          Après-demain
        </button>
        <button className="px-4 py-2 bg-blue-500 text-black rounded-md mx-2">
          Prévisions 15 jours
        </button>
      </div>

      <MapContainer
        center={[14.6928, -17.446667]} // Centré sur Dakar (ou ajuster pour une autre ville)
        zoom={3}
        style={{ height: "700px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {weatherData.map((ville) => (
          <Marker
            key={ville.name}
            position={[ville.lat, ville.lon]}
            icon={icon}
          >
            <Popup>
              <div className="text-center">
                <h2 className="text-lg font-semibold">{ville.name}</h2>
                <p className="text-3xl font-bold">{ville.temp}°C</p>
                <p>{ville.condition}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

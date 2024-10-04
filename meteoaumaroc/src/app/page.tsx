// import Image from "next/image";

import "./globals.css";

import Header from "./Header";
// import AfricaWeatherMap from "./map";
import CitiesPage from "./pages/Citiespage/page";
// import Footer from "./FOOTER";

export default function Home() {
  return (
    <>
      <Header />
      {/* <AfricaWeatherMap /> */}

      <CitiesPage />
    </>
  );
}

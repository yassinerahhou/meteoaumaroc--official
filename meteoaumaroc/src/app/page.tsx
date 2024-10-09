// import Image from "next/image";

import HOME_DESCREPTION from "./components/HOMEPAGE_DES";
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
      <HOME_DESCREPTION />
    </>
  );
}

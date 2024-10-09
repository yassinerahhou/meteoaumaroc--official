"use client"; // Ensure this component is treated as a client component in Next.js
import React from "react";
import Search from "./Search-irea"; // Import the search component
import "../assets/styles/tailwind.css"; // Import Tailwind CSS styles
import "./globals.css"; // Import global styles
// import Image from "next/image"; // Import Image component from Next.js

const Header: React.FC = () => {
  return (
    <>
      {/* <header id="header-wrap" className="relative"> */}
      {/* Navbar Start */}
      {/* <div className="navigation fixed top-0 left-0 w-full z-30 duration-300"> */}
      {/* <div className="container"> */}
      {/* <nav className="navbar py-2 navbar-expand-lg flex justify-between items-center relative duration-300"> */}
      {/* <a className="navbar-brand" href="./"> */}
      {/* Logo Section */}
      {/* <div> */}
      {/* <Image */}
      {/* src="/assets/img/logo-01.png" // Path to your logo image inside the public folder */}
      {/* alt="Meteo au maroc Logo" */}
      {/* width={300} */}
      {/* height={300} */}
      {/* priority // Optional: Loads the image as a priority */}
      {/* /> */}
      {/* </div> */}
      {/* </a> */}
      {/* Hamburger Menu Button */}
      {/* <button */}
      {/* className="navbar-toggler focus:outline-none block lg:hidden" */}
      {/* type="button" */}
      {/* data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation" */}
      {/* >
                <span className="toggler-icon"></span>
                <span className="toggler-icon"></span>
                <span className="toggler-icon"></span>
              </button> */}

      {/* Navbar Links */}

      {/* <div
                className="collapse navbar-collapse hidden lg:block duration-300 shadow absolute top-100 left-0 mt-full bg-white z-20 px-5 py-3 w-full lg:static lg:bg-transparent lg:shadow-none"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto justify-center items-center lg:flex">
                  <li className="nav-item">
                    <a className="page-scroll active" href="#hero-area">
                      Accueil
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="page-scroll" href="#Forecast">
                      Prévisions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="page-scroll" href="MAP">
                      Carte
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="page-scroll" href="#ARTICLES">
                      ARTICLES
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="page-scroll" href="/pages/contact">
                      Contact
                    </a>
                  </li>
                </ul>
              </div> */}

      {/* Header Button */}
      {/* <div className="header-btn hidden sm:block sm:absolute sm:right-0 sm:mr-16 lg:static lg:mr-0">
                <a
                  className="text-blue-600 border border-blue-600 px-10 py-3 rounded-full duration-300 hover:bg-blue-600 hover:text-white"
                  href="/pages/Faq"
                >
                  FAQ
                </a>
              </div>
            </nav>
          </div>
        </div> */}

      {/* Navbar End */}

      {/* Hero Section */}

      <section
        id="hero-area"
        className="bg-blue-100 pt-48 pb-10"
        style={{
          margin: "-10% 0 0px 0",

          // Keeps the wave under the header
        }}
      >
        <div className="container">
          <div className="flex justify-between">
            <div className="w-full text-center">
              <h2
                className="text-4xl font-bold leading-snug text-gray-700 mb-10 wow fadeInUp"
                data-wow-delay="1s"
              >
                Mises à jour météo fiables
                <br className="hidden lg:block" /> Partout, à tout moment
              </h2>

              {/* Search Component */}
              <div
                className="text-center mb-10 wow fadeInUp"
                data-wow-delay="1.2s"
              >
                <Search />
              </div>

              {/* Optional Hero Image Section */}
              {/* Uncomment if you want to include a hero image */}
              {/* <div className="text-center wow fadeInUp" data-wow-delay="1.6s">
                  <Image
                    className="img-fluid mx-auto"
                    src="/assets/img/hero.svg" // Ensure the path is correct
                    alt="Weather Hero Image"
                    width={500} // Specify appropriate width
                    height={300} // Specify appropriate height
                  />
                </div> */}
            </div>
          </div>
        </div>
        {/* Uncomment if you have a MoroccoWeatherMap component */}
        {/* <MoroccoWeatherMap /> */}
      </section>
      {/* </header> */}
    </>
  );
};

export default Header;

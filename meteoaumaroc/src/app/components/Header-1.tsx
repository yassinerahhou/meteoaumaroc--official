"use client"; // Make sure to keep this at the top for client components

import React from "react";
import Image from "next/image";
import "../globals.css";
import "../../assets/styles/tailwind.css";

export default function Header_1() {
  return (
    <>
      <header id="header-wrap" className="relative bg-blue-100 overflow-hidden">
        {/* Navbar Start */}
        <div className="navigation fixed top-0 left-0 w-full z-30 duration-300">
          <div className="container">
            <nav className="navbar py-2 navbar-expand-lg flex justify-between items-center relative duration-300">
              <a className="navbar-brand" href="/">
                <div>
                  <Image
                    src="/assets/img/logo-01.png"
                    alt="Meteo au maroc Logo"
                    width={300}
                    height={300}
                    priority
                  />
                </div>
              </a>
              <button
                className="navbar-toggler focus:outline-none block lg:hidden"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="toggler-icon"></span>
                <span className="toggler-icon"></span>
                <span className="toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse hidden lg:block duration-300 shadow bg-white z-20 px-5 py-3 w-full lg:static lg:bg-transparent lg:shadow-none"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto justify-center items-center lg:flex">
                  <li className="nav-item">
                    <a className="page-scroll active" href="/">
                      Accueil
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="page-scroll" href="/Forecast">
                      Prévisions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="page-scroll" href="/MAP">
                      Carte
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="page-scroll" href="/articles">
                      ARTICLES
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="page-scroll" href="/contact">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div className="header-btn hidden sm:block sm:absolute sm:right-0 sm:mr-16 lg:static lg:mr-0">
                <a
                  className="text-blue-600 border border-blue-600 px-10 py-3 rounded-full duration-300 hover:bg-blue-600 hover:text-white"
                  href="/faq"
                >
                  FAQ
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>
      {/* Wave effect */}
      <div
        className="wave-container relative h-24 overflow-hidden"
        style={{
          margin: "0% 0 20px 0",
          position: "fixed",
          width: "100%",
        }}
      >
        <svg
          className="bottom-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ebf8ff" // Updated wave color
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

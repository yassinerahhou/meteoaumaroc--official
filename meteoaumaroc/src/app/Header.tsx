"use client";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
// import "./../../assets/css/tailwind.css";
// import "./../../assets/css/LineIcons.2.0.css";
// import "./../../assets/css/animate.css";
// import "../assets/css/tiny-slider.css";
// import "./../../assets/css/animate.css";
// import "./../../assets/css/main.css";
import Logo from "../assets/img/logo.png";
import Search from "./Search-irea";

const Header: React.FC = () => {
  return (
    <>
      <header id="header-wrap" className="relative">
        {/* <!-- Navbar Start --> */}
        <div
          className="navigation fixed top-0 left-0 w-full z-30 duration-300"
          style={{ position: "absolute" }}
        >
          <div className="container">
            <nav className="navbar py-2 navbar-expand-lg flex justify-between items-center relative duration-300">
              <a className="navbar-brand" href="index.html">
                {/* <img src={Logo} alt="Logo" style={{ height: "50px" }} /> */}
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
                className="collapse navbar-collapse hidden lg:block duration-300 shadow absolute top-100 left-0 mt-full bg-white z-20 px-5 py-3 w-full lg:static lg:bg-transparent lg:shadow-none"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto justify-center items-center lg:flex">
                  <li className="nav-item">
                    <a className="page-scroll active" href="#hero-area">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="page-scroll" href="#Forecast">
                      Forecast
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="page-scroll" href="MAP">
                      Map
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a className="page-scroll" href="#team">
                      Team
                    </a>
                  </li> */}
                  <li className="nav-item">
                    <a className="page-scroll" href="#ARTICLES">
                      ARTICLES
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a className="page-scroll" href="#pricing">
                      Pricing
                    </a>
                  </li> */}
                  <li className="nav-item">
                    <a className="page-scroll" href="#contact">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div className="header-btn hidden sm:block sm:absolute sm:right-0 sm:mr-16 lg:static lg:mr-0">
                <a
                  className="text-blue-600 border border-blue-600 px-10 py-3 rounded-full duration-300 hover:bg-blue-600 hover:text-white"
                  href="#feature"
                >
                  FAQ
                </a>
              </div>
            </nav>
          </div>
        </div>
        {/* <!-- Navbar End --> */}
      </header>
      <section id="hero-area" className="bg-blue-100 pt-48 pb-10">
        <div className="container">
          <div className="flex justify-between">
            <div className="w-full text-center">
              {/* <h2
                className="text-4xl font-bold leading-snug text-gray-700 mb-10 wow fadeInUp"
                data-wow-delay="1s"
              >
                Startup and SaaS Landing Page
                <br className="hidden lg:block" /> Built with TailwindCSS
              </h2> */}
              <h2
                className="text-4xl font-bold leading-snug text-gray-700 mb-10 wow fadeInUp"
                data-wow-delay="1s"
              >
                Weather Updates You Can Trust
                <br className="hidden lg:block" /> Anytime, Anywhere
              </h2>
              <div
                className="text-center mb-10 wow fadeInUp"
                data-wow-delay="1.2s"
              >
                <Search />
              </div>
              <div className="text-center wow fadeInUp" data-wow-delay="1.6s">
                <img
                  className="img-fluid mx-auto"
                  src="../assets/img/hero.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;

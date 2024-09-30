import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer id="footer" className="bg-gray-900 py-16 text-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-3">
            {/* Logo and Description */}
            <div
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-3 mb-8 wow fadeInUp flex flex-col relative ml-4"
              data-wow-delay="0.2s"
              style={{ top: "-20px", padding: "0 5% 0 0" }} // Adjust 'top' value to move it higher
            >
              <div className="mb-8 text-left">
                {" "}
                {/* Changed from 'text-center' to 'text-left' */}
                <Link href="/" className="inline-block">
                  <Image
                    src="/assets/img/footer-logo.png"
                    alt="Meteo au maroc Logo"
                    width={220}
                    height={120}
                    priority
                    className="transition-transform duration-300 hover:scale-105"
                    style={{ marginBottom: "10px" }}
                  />
                </Link>
                <p className="mt-4 text-sm leading-relaxed text-gray-400">
                  Votre source fiable pour des prévisions météo et des mises à
                  jour en temps réel, partout et à tout moment au Maroc
                </p>
              </div>
            </div>

            {/* Most Viewed Cities */}
            <div
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-3 mb-8 wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <div className="mb-1 roboto-font">
                <h4 className="font-bold text-l text-black mb-5 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-0.5 after:bg-blue-300">
                  VILLES LES PLUS CONSULTÉES
                </h4>
                <ul className="space-y-2 text-black">
                  {["AGADIR", "CASABLANCA", "RABAT", "TANGER"].map((city) => (
                    <li key={city}>
                      <Link
                        href={`/cities/${city.toLowerCase()}`} // Link to dynamic city page
                        className="transition-colors duration-200 hover:underline"
                      >
                        {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Legal Pages */}
            <div
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-3 mb-8 wow fadeInUp"
              data-wow-delay="0.6s"
            >
              <div className="mb-8 roboto-font">
                <h4 className="font-bold text-l text-black mb-5 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-0.5 after:bg-blue-500">
                  Pages légales
                </h4>
                <ul className="space-y-2 text-black">
                  <li>
                    <Link
                      href="/pages/about"
                      className="transition-colors duration-200 hover:underline"
                    >
                      ABOUT US
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pages/privacy"
                      className="transition-colors duration-200 hover:underline"
                    >
                      PRIVACY POLICY
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pages/contact"
                      className="transition-colors duration-200 hover:underline"
                    >
                      CONTACT US
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pages/terms"
                      className="transition-colors duration-200 hover:underline"
                    >
                      TERMS & CONDITIONS
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Media Icons */}
            <div
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-3 mb-8 wow fadeInUp"
              data-wow-delay="0.8s"
            >
              <div className="mb-8 roboto-font">
                <h4 className="font-bold text-l text-black mb-5 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-0.5 after:bg-blue-500">
                  Trouvez-nous
                </h4>
                <ul className="flex space-x-4">
                  {[
                    {
                      name: "Facebook",
                      icon: "fab fa-facebook-f",
                      hoverColor: "hover:bg-blue-600",
                    },
                    {
                      name: "Twitter",
                      icon: "fab fa-twitter",
                      hoverColor: "hover:bg-blue-400",
                    },
                    {
                      name: "Instagram",
                      icon: "fab fa-instagram",
                      hoverColor: "hover:bg-pink-600",
                    },
                    {
                      name: "LinkedIn",
                      icon: "fab fa-linkedin-in",
                      hoverColor: "hover:bg-blue-700",
                    },
                  ].map((social) => (
                    <li key={social.name}>
                      <a
                        href="#"
                        className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white ${social.hoverColor} transition-colors duration-200 hover:-translate-y-1`}
                        aria-label={social.name}
                      >
                        <i className={social.icon} aria-hidden="true"></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <section className="bg-black-950 py-6 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full text-center roboto-font">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} WEATHERINMOROCCO. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;

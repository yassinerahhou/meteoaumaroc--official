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
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-3 mb-8 wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="mb-8">
                <Link href="/" className="inline-block">
                  <Image
                    src="/assets/img/footer-logo.png"
                    alt="Meteo au maroc Logo"
                    width={220}
                    height={120}
                    priority
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </Link>
                <p className="mt-4 text-sm leading-relaxed text-gray-400">
                  Your trusted source for real-time weather forecasts and
                  updates, anytime, anywhere in Morocco.
                </p>
              </div>
            </div>

            {/* Most Viewed Cities */}
            <div
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-3 mb-8 wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <div className="mb-1 roboto-font">
                <h4 className="font-bold text-xl text-black mb-5 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-0.5 after:bg-blue-500">
                  MOST VIEWED CITIES
                </h4>
                <ul className="space-y-2">
                  {["AGADIR", "CASABLANCA", "RABAT", "TANGER"].map((city) => (
                    <li key={city}>
                      <Link
                        // href={`/city/${city.toLowerCase()}`}
                        href="/broken-link"
                        className="text-gray-400 hover:text-white transition-colors duration-200"
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
                <h3 className="font-bold text-xl text-black mb-5 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-0.5 after:bg-blue-500">
                  LEGAL PAGES
                </h3>
                <ul className="space-y-2">
                  {[
                    "ABOUT US",
                    "PRIVACY POLICY",
                    "CONTACT US",
                    "TERMS & CONDITIONS",
                  ].map((page) => (
                    <li key={page}>
                      <Link
                        // href={`/${page.toLowerCase().replace(/\s+/g, "-")}`}
                        href="/broken-link"
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {page}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social Media Icons */}
            <div
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-3 mb-8 wow fadeInUp"
              data-wow-delay="0.8s"
            >
              <div className="mb-8 roboto-font">
                <h3 className="font-bold text-xl text-black mb-5 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-0.5 after:bg-blue-500">
                  Find us on
                </h3>
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

      <section className="bg-gray-950 py-6 border-t border-gray-800">
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

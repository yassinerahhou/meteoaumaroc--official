// import LOGO from "../assets/img/logo.svg";
export default function Footer() {
  return (
    <>
      {/* <!-- Footer Section Start --> */}
      <footer id="footer" className="bg-gray-800 py-16">
        <div className="container">
          <div className="flex flex-wrap">
            <div
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="mx-3 mb-8">
                {/* tatzid logo hna  */}
                {/* <div className="footer-logo mb-3">
                  <img src={LOGO} alt="" />
                </div> */}
                <p className="text-gray-300">
                  Your trusted source for real-time weather forecasts and
                  updates, anytime, anywhere.
                </p>
              </div>
            </div>
            <div
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <div className="mx-3 mb-8">
                <h3 className="font-bold text-xl text-white mb-5">
                  MOST VIEWD CITY
                </h3>
                <ul>
                  <li>
                    <a href="#" className="footer-links">
                      AGADIR
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-links">
                      CASABLANCA
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-links">
                      RABAT
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-links">
                      TANGER
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 wow fadeInUp"
              data-wow-delay="0.6s"
            >
              <div className="mx-3 mb-8">
                <h3 className="font-bold text-xl text-white mb-5">
                  LEGAL PAGES
                </h3>
                <ul>
                  <li>
                    <a href="#" className="footer-links">
                      ABOUT US
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-links">
                      PRIVACY POLICY
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-links">
                      CONTACT US
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-links">
                      TERMS & CONDITION
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 wow fadeInUp"
              data-wow-delay="0.8s"
            >
              <div className="mx-3 mb-8">
                <h3 className="font-bold text-xl text-white mb-5">
                  Find us on
                </h3>
                <ul className="social-icons flex justify-start">
                  <li className="mx-2">
                    <a href="#" className="footer-icon hover:bg-indigo-500">
                      <i
                        className="lni lni-facebook-original"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                  <li className="mx-2">
                    <a href="#" className="footer-icon hover:bg-blue-400">
                      <i
                        className="lni lni-twitter-original"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                  <li className="mx-2">
                    <a href="#" className="footer-icon hover:bg-red-500">
                      <i
                        className="lni lni-instagram-original"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                  <li className="mx-2">
                    <a href="#" className="footer-icon hover:bg-indigo-600">
                      <i
                        className="lni lni-linkedin-original"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- Footer Section End --> */}

      <section className="bg-gray-800 py-6 border-t-2 border-gray-700 border-dotted">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full text-center">
              <p className="text-white">
                &copy; {new Date().getFullYear()} WEATHERINMOROCCO. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

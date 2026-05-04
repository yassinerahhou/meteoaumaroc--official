import dynamic from "next/dynamic";
import Header from "./Header";
import AlertBanner from "./components/AlertBanner";
import CitiesSection from "./components/CitiesSection";

// Lazy-load heavy widgets — improves initial page load (Step 6 performance)
const MoroccoWeekSummary = dynamic(() => import("./components/MoroccoWeekSummary"), { ssr: false });
const AirQualityWidget   = dynamic(() => import("./components/AirQualityWidget"),   { ssr: false });
const PrayerTimesWidget  = dynamic(() => import("./components/PrayerTimesWidget"),  { ssr: false });
const SeasonalTips       = dynamic(() => import("./components/SeasonalTips"),       { ssr: false });
const HOME_DESCREPTION   = dynamic(() => import("./components/HOMEPAGE_DES"),       { ssr: false });

export default function Home() {
  return (
    <>
      {/* Extreme-weather alert ribbon — shown only when triggered */}
      <AlertBanner />

      {/* Hero + search */}
      <Header />

      {/* Morocco-wide week summary */}
      <section style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}>
        <MoroccoWeekSummary />
      </section>

      {/* City grid */}
      <section style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}>
        <CitiesSection />
      </section>

      {/* Air quality — default to Casablanca; widget uses geolocation on client */}
      <section style={{ contentVisibility: "auto", containIntrinsicSize: "700px" }}>
        <AirQualityWidget lat={33.5731} lon={-7.5898} />
      </section>

      {/* Prayer / Athan times */}
      <section style={{ contentVisibility: "auto", containIntrinsicSize: "700px" }}>
        <PrayerTimesWidget />
      </section>

      {/* Seasonal travel tips */}
      <section style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}>
        <SeasonalTips />
      </section>

      {/* SEO description + articles */}
      <section style={{ contentVisibility: "auto", containIntrinsicSize: "1200px" }}>
        <HOME_DESCREPTION />
      </section>
    </>
  );
}

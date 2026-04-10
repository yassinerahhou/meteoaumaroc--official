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
      <MoroccoWeekSummary />

      {/* City grid */}
      <CitiesSection />

      {/* Air quality — default to Casablanca; widget uses geolocation on client */}
      <AirQualityWidget lat={33.5731} lon={-7.5898} />

      {/* Prayer / Athan times */}
      <PrayerTimesWidget />

      {/* Seasonal travel tips */}
      <SeasonalTips />

      {/* SEO description + articles */}
      <HOME_DESCREPTION />
    </>
  );
}

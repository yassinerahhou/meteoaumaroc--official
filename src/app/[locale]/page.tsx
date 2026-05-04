import dynamic from "next/dynamic";
import Hero from "@/app/components/Hero";
import AlertBanner from "@/app/components/AlertBanner";
import CitiesSection from "@/app/components/CitiesSection";

// Lazy-load heavy widgets — improves initial page load (Step 6 performance)
const MoroccoWeekSummary = dynamic(() => import("@/app/components/MoroccoWeekSummary"), { ssr: false });
const AirQualityWidget   = dynamic(() => import("@/app/components/AirQualityWidget"),   { ssr: false });
const PrayerTimesWidget  = dynamic(() => import("@/app/components/PrayerTimesWidget"),  { ssr: false });
const SeasonalTips       = dynamic(() => import("@/app/components/SeasonalTips"),       { ssr: false });
const HomepageDescription = dynamic(() => import("@/app/components/HomepageDescription"), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Extreme-weather alert ribbon — shown only when triggered */}
      <AlertBanner />

      {/* Hero + search */}
      <Hero />

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
        <HomepageDescription />
      </section>
    </>
  );
}

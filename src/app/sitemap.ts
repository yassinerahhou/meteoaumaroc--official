import type { MetadataRoute } from "next";
import { MOROCCAN_CITIES } from "@/app/lib/cities";

const BASE_URL = "https://www.meteoaumaroc.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["fr", "ar", "en"];
  const CONTENT_UPDATED = new Date("2026-09-07T00:00:00.000Z");

  // Root redirect/landing
  const root: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "hourly",
      priority: 1.0,
    },
  ];

  const localizedPages: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    const isPrimary = locale === "fr";
    const basePriority = isPrimary ? 1.0 : 0.9;

    // Static pages & editorial guides per locale
    const staticPaths: { 
      path: string; 
      priority: number; 
      freq: "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "always" | "never" 
    }[] = [
      { path: "", priority: basePriority, freq: "hourly" },
      { path: "/cities", priority: 0.9, freq: "weekly" },
      { path: "/weather-morocco", priority: 0.85, freq: "monthly" },
      { path: "/morocco-climate-guide", priority: 0.85, freq: "monthly" },
      { path: "/best-time-to-visit-morocco", priority: 0.85, freq: "monthly" },
      { path: "/pages/about", priority: 0.5, freq: "monthly" },
      { path: "/pages/contact", priority: 0.5, freq: "monthly" },
      { path: "/pages/faq", priority: 0.5, freq: "monthly" },
      { path: "/pages/editorial-policy", priority: 0.5, freq: "monthly" },
      { path: "/pages/privacy", priority: 0.2, freq: "yearly" },
      { path: "/pages/terms", priority: 0.2, freq: "yearly" },
      { path: "/pages/disclaimer", priority: 0.2, freq: "yearly" },
      { path: "/pages/cookies", priority: 0.2, freq: "yearly" },
    ];

    staticPaths.forEach((s) => {
      localizedPages.push({
        url: `${BASE_URL}/${locale}${s.path}`,
        lastModified: CONTENT_UPDATED,
        changeFrequency: s.freq,
        priority: s.priority,
      });
    });

    // Dynamic city pages per locale
    MOROCCAN_CITIES.forEach((city) => {
      localizedPages.push({
        url: `${BASE_URL}/${locale}/cities/${city.slug}`,
        lastModified: CONTENT_UPDATED,
        changeFrequency: "hourly",
        priority: 0.85,
      });
    });
  });

  return [...root, ...localizedPages];
}

import type { MetadataRoute } from "next";
import { MOROCCAN_CITIES } from "@/app/lib/cities";
import { ARTICLES } from "@/app/lib/articles";

const BASE_URL = "https://www.meteoaumaroc.com";

const COASTAL_SLUGS = [
  "casablanca", "tanger", "agadir", "essaouira", "imsouane", 
  "dakhla", "mirleft", "rabat", "el-jadida", "safi", "nador", "al-hoceima"
];

const AQI_CITIES = [
  "casablanca", "rabat", "tanger", "marrakech", "fes", 
  "meknes", "agadir", "oujda", "kenitra", "safi"
];

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
      { path: "/widget-builder", priority: 0.7, freq: "monthly" },
      { path: "/radar", priority: 0.8, freq: "hourly" },
      { path: "/meteo-marine", priority: 0.85, freq: "daily" },
      { path: "/qualite-air", priority: 0.85, freq: "hourly" },
      { path: "/actualites", priority: 0.9, freq: "daily" },
    ];

    staticPaths.forEach((s) => {
      localizedPages.push({
        url: `${BASE_URL}/${locale}${s.path}`,
        lastModified: CONTENT_UPDATED,
        changeFrequency: s.freq,
        priority: s.priority,
      });
    });

    // Dynamic city pages per locale (including programmatic SEO routes)
    MOROCCAN_CITIES.forEach((city) => {
      const cityRoutes = [
        "",
        "/15-jours",
        "/heure-par-heure",
        "/week-end"
      ];
      cityRoutes.forEach((route) => {
        localizedPages.push({
          url: `${BASE_URL}/${locale}/cities/${city.slug}${route}`,
          lastModified: CONTENT_UPDATED,
          changeFrequency: "hourly",
          priority: route === "" ? 0.85 : 0.80,
        });
      });
    });

    // Marine cities
    COASTAL_SLUGS.forEach((slug) => {
      localizedPages.push({
        url: `${BASE_URL}/${locale}/meteo-marine/${slug}`,
        lastModified: CONTENT_UPDATED,
        changeFrequency: "hourly",
        priority: 0.80,
      });
    });

    // AQI cities
    AQI_CITIES.forEach((slug) => {
      localizedPages.push({
        url: `${BASE_URL}/${locale}/qualite-air/${slug}`,
        lastModified: CONTENT_UPDATED,
        changeFrequency: "hourly",
        priority: 0.80,
      });
    });

    // Articles
    ARTICLES.forEach((article) => {
      localizedPages.push({
        url: `${BASE_URL}/${locale}/actualites/${article.slug}`,
        lastModified: article.date,
        changeFrequency: "monthly",
        priority: 0.75,
      });
    });
  });

  return [...root, ...localizedPages];
}

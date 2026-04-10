import type { MetadataRoute } from "next";
import { MOROCCAN_CITIES } from "@/app/lib/cities";

const BASE_URL = "https://www.meteoaumaroc.com";
const NOW = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: NOW,
      changeFrequency: "hourly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/cities`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pages/about`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/pages/contact`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/pages/privacy`,
      lastModified: NOW,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/pages/terms`,
      lastModified: NOW,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/pages/faq`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/pages/disclaimer`,
      lastModified: NOW,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/pages/cookies`,
      lastModified: NOW,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    // Long-tail SEO pages
    {
      url: `${BASE_URL}/weather-morocco`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/morocco-climate-guide`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/best-time-to-visit-morocco`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic city pages — all 60+ cities
  const cityPages: MetadataRoute.Sitemap = MOROCCAN_CITIES.map((city) => ({
    url: `${BASE_URL}/cities/${city.slug}`,
    lastModified: NOW,
    changeFrequency: "hourly" as const,
    priority: 0.85,
  }));

  return [...staticPages, ...cityPages];
}

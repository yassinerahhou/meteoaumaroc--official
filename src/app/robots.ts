import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = "https://www.meteoaumaroc.com";
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

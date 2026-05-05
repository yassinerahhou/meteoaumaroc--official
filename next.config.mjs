/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
        pathname: "/img/wn/**",
      },
      {
        protocol: "http",
        hostname: "openweathermap.org",
        pathname: "/img/wn/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/w20/**",
      },
    ],
  },

  // Ensure root files are served correctly before middleware runs
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/ads.txt",        destination: "/ads-verification" },
        { source: "/fr/ads.txt",     destination: "/ads-verification" },
        { source: "/ar/ads.txt",     destination: "/ads-verification" },
        { source: "/en/ads.txt",     destination: "/ads-verification" },
        { source: "/robots.txt",     destination: "/robots.txt" },
        { source: "/sitemap.xml",    destination: "/sitemap.xml" },
      ],
    };
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/ads.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=0, must-revalidate" },
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",          value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options",   value: "nosniff" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=(self)" },
        ],
      },
    ];
  },
};

export default nextConfig;

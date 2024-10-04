/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["openweathermap.org"], // Add your allowed domains here
  },

  // Other Next.js configurations can go here
};

export default nextConfig; // Use export default instead of module.exports

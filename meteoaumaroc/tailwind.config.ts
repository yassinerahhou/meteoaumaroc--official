import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#0369a1",
          dark: "#075985",
          light: "#e0f2fe",
        },
        accent: "#f59e0b",
        surface: "#ffffff",
        dark: {
          DEFAULT: "#0f172a",
          surface: "#1e293b",
        },
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04)",
        "card-hover": "0 10px 30px rgba(0,0,0,.10), 0 4px 8px rgba(0,0,0,.04)",
        nav: "0 1px 20px rgba(0,0,0,.08)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "fade-up": "fadeInUp 0.5s ease both",
        "fade-in": "fadeIn 0.4s ease both",
      },
    },
  },
  plugins: [],
};

export default config;

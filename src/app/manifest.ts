import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MeteoAuMaroc – Météo Maroc en temps réel",
    short_name: "MeteoAuMaroc",
    description: "Prévisions météo précises pour toutes les villes du Maroc en français, arabe et anglais.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c4a6e",
    theme_color: "#0369a1",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
    lang: "fr",
    dir: "ltr",
    categories: ["weather", "news"],
  };
}

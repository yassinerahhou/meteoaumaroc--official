import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "À propos de MeteoAuMaroc – Météo fiable pour le Maroc",
  description:
    "Découvrez MeteoAuMaroc.com : notre mission, notre technologie et notre équipe dédiée à fournir des prévisions météo précises pour toutes les villes du Maroc.",
  alternates: { canonical: "https://www.meteoaumaroc.com/pages/about" },
  openGraph: {
    title: "À propos de MeteoAuMaroc",
    description: "Notre mission : des prévisions météo précises pour tout le Maroc.",
    url: "https://www.meteoaumaroc.com/pages/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

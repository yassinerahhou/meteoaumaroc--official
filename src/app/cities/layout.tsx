import type { Metadata } from "next";
import { MOROCCAN_CITIES } from "@/app/lib/cities";

export const metadata: Metadata = {
  title: "Météo toutes les villes du Maroc – Liste complète",
  description: `Prévisions météo pour ${MOROCCAN_CITIES.length} villes du Maroc. Trouvez la météo actuelle de votre ville : Casablanca, Rabat, Marrakech, Agadir, Tanger, Fès et bien plus.`,
  alternates: {
    canonical: "https://www.meteoaumaroc.com/cities",
  },
  openGraph: {
    title: "Météo toutes les villes du Maroc",
    description: `Prévisions météo pour ${MOROCCAN_CITIES.length} villes marocaines en temps réel.`,
    url: "https://www.meteoaumaroc.com/cities",
  },
};

export default function CitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

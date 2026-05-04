import type { Metadata } from "next";
import NotFoundContent from "./not-found-content";

export const metadata: Metadata = {
  title: "Page introuvable – MeteoAuMaroc",
  description: "Cette page n'existe pas. Revenez à l'accueil pour consulter la météo au Maroc.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundContent />;
}

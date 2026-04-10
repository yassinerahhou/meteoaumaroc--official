import type { Metadata } from "next";
import FaqContent from "@/app/pages/faq/FaqContent";

export const metadata: Metadata = {
  title: "FAQ – Questions Fréquentes sur MeteoAuMaroc",
  description:
    "Réponses aux questions les plus fréquentes sur MeteoAuMaroc.com : précision des prévisions, sources de données, horaires de prières, couverture des villes marocaines et plus.",
  alternates: { canonical: "https://www.meteoaumaroc.com/pages/faq" },
  openGraph: {
    title: "FAQ – MeteoAuMaroc",
    description: "Toutes vos questions sur la météo au Maroc, répondues.",
    url: "https://www.meteoaumaroc.com/pages/faq",
  },
};

const faqs = [
  {
    q: "Quelle est la source des données météo ?",
    a: "Nous utilisons l'API OpenWeatherMap, l'une des sources météorologiques les plus fiables au monde. Les données sont mises en cache côté serveur toutes les 10 minutes pour garantir des réponses rapides.",
  },
  {
    q: "À quelle fréquence les prévisions sont-elles mises à jour ?",
    a: "Les données météo actuelles sont actualisées toutes les 10 minutes. Les prévisions 5 jours sont rafraîchies toutes les 30 minutes. La géolocalisation des villes est mise en cache 24 heures.",
  },
  {
    q: "Combien de villes marocaines sont couvertes ?",
    a: "MeteoAuMaroc couvre plus de 60 villes et régions du Maroc, des grandes métropoles comme Casablanca et Marrakech aux villes du Sahara comme Dakhla et Laayoune, en passant par les stations de montagne comme Ifrane.",
  },
  {
    q: "Comment fonctionne la recherche de ville ?",
    a: "La barre de recherche utilise l'API de géocodage d'OpenWeatherMap. Tapez le nom d'une ville au Maroc (ou dans le monde), sélectionnez dans la liste déroulante, et obtenez instantanément la météo actuelle et les prévisions 5 jours.",
  },
  {
    q: "D'où proviennent les horaires de prières ?",
    a: "Les horaires de prière sont fournis par l'API Aladhan, calculés selon la méthode de la Ligue mondiale du monde islamique (méthode 12), reconnue au Maroc. Ils sont mis à jour quotidiennement et adaptés à chaque ville.",
  },
  {
    q: "Le site est-il disponible en arabe ?",
    a: "Oui, MeteoAuMaroc est entièrement disponible en français, arabe et anglais. Utilisez le sélecteur de langue dans la barre de navigation (drapeau). Le site passe automatiquement en mode RTL pour l'arabe.",
  },
  {
    q: "Puis-je consulter la météo sur mobile ?",
    a: "Absolument. MeteoAuMaroc est entièrement responsive et optimisé pour tous les appareils : smartphones, tablettes et ordinateurs. Le menu hamburger s'active automatiquement sur petits écrans.",
  },
  {
    q: "Comment fonctionne le mode sombre ?",
    a: "Cliquez sur l'icône 🌙/☀️ dans la barre de navigation. Votre préférence est sauvegardée en localStorage. Le site détecte aussi automatiquement la préférence système (prefers-color-scheme) au premier chargement.",
  },
  {
    q: "Mes données personnelles sont-elles collectées ?",
    a: "MeteoAuMaroc utilise Google Analytics pour les statistiques de visite anonymes et Google AdSense pour la publicité. Nous ne collectons aucune donnée personnelle via les formulaires sans votre consentement. Consultez notre politique de confidentialité pour les détails.",
  },
  {
    q: "Comment nous contacter ?",
    a: "Via le formulaire de notre page Contact. Nous répondons généralement sous 24 à 48 heures. Vous pouvez aussi nous trouver sur Facebook et Instagram (liens en bas de page).",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqContent />
    </>
  );
}

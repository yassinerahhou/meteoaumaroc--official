import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Conditions d'Utilisation – MeteoAuMaroc",
  description:
    "Conditions d'utilisation de MeteoAuMaroc.com : règles d'usage, droits de propriété intellectuelle, limitations de responsabilité.",
  alternates: { canonical: "https://www.meteoaumaroc.com/pages/terms" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "1. Acceptation des conditions",
    content:
      "En accédant à MeteoAuMaroc.com, vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.",
  },
  {
    title: "2. Utilisation du site",
    content:
      "MeteoAuMaroc.com est destiné à un usage personnel et non commercial. Vous vous engagez à ne pas utiliser notre site à des fins illégales, à ne pas tenter de perturber son fonctionnement, et à ne pas copier nos contenus sans autorisation.",
  },
  {
    title: "3. Exactitude des informations météo",
    content:
      "Les données météorologiques sont fournies à titre indicatif uniquement. Bien que nous nous efforcions d'afficher des informations précises et à jour, MeteoAuMaroc.com ne peut garantir l'exactitude absolue des prévisions. Ne prenez pas de décisions critiques basées uniquement sur nos données.",
  },
  {
    title: "4. Propriété intellectuelle",
    content:
      "Le contenu de MeteoAuMaroc.com (textes, design, logo, code) est la propriété de MeteoAuMaroc sauf mention contraire. Toute reproduction, distribution ou utilisation commerciale sans autorisation préalable écrite est interdite.",
  },
  {
    title: "5. Liens tiers",
    content:
      "Notre site peut contenir des liens vers des sites tiers. Ces liens sont fournis pour votre commodité uniquement. MeteoAuMaroc n'est pas responsable du contenu ou des pratiques de confidentialité de ces sites.",
  },
  {
    title: "6. Limitation de responsabilité",
    content:
      "Dans toute la mesure permise par la loi applicable, MeteoAuMaroc.com ne sera pas responsable des dommages directs, indirects, accessoires ou consécutifs résultant de l'utilisation de notre site ou de l'impossibilité de l'utiliser.",
  },
  {
    title: "7. Publicité",
    content:
      "MeteoAuMaroc.com utilise Google AdSense pour afficher des publicités. Google peut utiliser des cookies pour personnaliser les annonces. Vous pouvez gérer vos préférences publicitaires via les paramètres Google.",
  },
  {
    title: "8. Modifications des conditions",
    content:
      "Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prennent effet immédiatement à leur publication sur cette page. Votre utilisation continue du site après modification constitue votre acceptation des nouvelles conditions.",
  },
  {
    title: "9. Droit applicable",
    content:
      "Les présentes conditions sont régies par le droit marocain. Tout litige sera soumis à la compétence exclusive des tribunaux compétents du Royaume du Maroc.",
  },
];

export default function TermsPage() {
  return (
    <div style={{ background: "var(--color-bg)", minHeight: "60vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)", padding: "2.5rem 0 3rem", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 800, color: "#fff", marginBottom: "0.5rem", letterSpacing: "-0.03em" }}>
            {"Conditions d'Utilisation"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9375rem" }}>
            Dernière mise à jour : avril 2026
          </p>
        </div>
        <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, lineHeight: 0 }} aria-hidden>
          <svg viewBox="0 0 1440 30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 30 }}>
            <path fill="var(--color-bg)" d="M0,18 C360,36 1080,0 1440,18 L1440,30 L0,30 Z" />
          </svg>
        </div>
      </div>

      <Breadcrumb current="Conditions" />

      <div className="container" style={{ maxWidth: 760, paddingTop: "3rem", paddingBottom: "5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {sections.map((s) => (
            <div
              key={s.title}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "1.5rem",
              }}
            >
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem" }}>
                {s.title}
              </h2>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8, fontSize: "0.9375rem", margin: 0 }}>
                {s.content}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/pages/contact" className="btn btn-outline" style={{ display: "inline-flex" }}>
            {"Questions sur nos conditions ?"}
          </Link>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Avertissement – MeteoAuMaroc",
  description:
    "Avertissement légal de MeteoAuMaroc.com : limitations de responsabilité, exactitude des données météo et usage prévu du site.",
  alternates: { canonical: "https://www.meteoaumaroc.com/pages/disclaimer" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "1. Nature des informations",
    content:
      "Les informations météorologiques fournies sur MeteoAuMaroc.com sont destinées à un usage informatif et personnel uniquement. Elles ne constituent pas des conseils professionnels et ne doivent pas être utilisées comme base pour des décisions critiques liées à la sécurité, la navigation, l'agriculture ou tout autre domaine à risque.",
  },
  {
    title: "2. Exactitude des données",
    content:
      "Bien que nous nous efforcions de fournir des prévisions météo aussi précises que possible, MeteoAuMaroc.com ne peut garantir l'exactitude, l'exhaustivité ou l'actualité des données affichées. Les prévisions météorologiques sont par nature incertaines et peuvent évoluer rapidement.",
  },
  {
    title: "3. Source des données",
    content:
      "Nos données météo proviennent de l'API OpenWeatherMap et d'autres fournisseurs tiers. MeteoAuMaroc.com n'est pas responsable des erreurs, omissions ou interruptions de service de ces fournisseurs externes.",
  },
  {
    title: "4. Limitation de responsabilité",
    content:
      "En aucun cas MeteoAuMaroc.com, ses propriétaires, administrateurs ou contributeurs ne sauraient être tenus responsables de tout dommage direct, indirect, accessoire, spécial ou consécutif découlant de l'utilisation ou de l'impossibilité d'utiliser les informations fournies sur ce site.",
  },
  {
    title: "5. Usage à vos risques",
    content:
      "L'utilisation de MeteoAuMaroc.com se fait entièrement à vos propres risques. Vous reconnaissez et acceptez que les prévisions météo peuvent être inexactes et que vous ne devez pas vous fier exclusivement à nos données pour des décisions importantes.",
  },
  {
    title: "6. Publicité et liens tiers",
    content:
      "MeteoAuMaroc.com affiche des publicités via Google AdSense et peut contenir des liens vers des sites tiers. Nous ne sommes pas responsables du contenu, des politiques de confidentialité ou des pratiques de ces sites externes. La présence de publicités ne constitue pas une approbation des produits ou services annoncés.",
  },
  {
    title: "7. Horaires de prière",
    content:
      "Les horaires de prière affichés sur MeteoAuMaroc.com proviennent de l'API Aladhan et sont fournis à titre indicatif. Nous recommandons de vérifier les horaires auprès de votre mosquée locale pour une précision maximale.",
  },
  {
    title: "8. Modifications",
    content:
      "MeteoAuMaroc.com se réserve le droit de modifier cet avertissement à tout moment et sans préavis. En continuant à utiliser le site après toute modification, vous acceptez les termes révisés.",
  },
];

export default function DisclaimerPage() {
  return (
    <div style={{ background: "var(--color-bg)", minHeight: "60vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)", padding: "2.5rem 0 3rem", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 800, color: "#fff", marginBottom: "0.5rem", letterSpacing: "-0.03em" }}>
            Avertissement
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

      <Breadcrumb current="Avertissement" />

      <div className="container" style={{ maxWidth: 760, paddingTop: "3rem", paddingBottom: "5rem" }}>
        {/* Important notice */}
        <div style={{
          background: "#fef3c7",
          border: "1px solid #fbbf24",
          borderRadius: "var(--radius-md)",
          padding: "1.25rem 1.5rem",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
        }}>
          <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>⚠️</span>
          <p style={{ color: "#92400e", fontSize: "0.9375rem", lineHeight: 1.7, margin: 0 }}>
            <strong>Important :</strong> MeteoAuMaroc.com fournit des données météorologiques à titre informatif uniquement.
            Ne prenez jamais de décisions critiques basées uniquement sur nos prévisions. Pour les situations
            d&apos;urgence météorologique, consultez la Direction de la Météorologie Nationale du Maroc.
          </p>
        </div>

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
            Des questions ? Contactez-nous
          </Link>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Politique de Confidentialité – MeteoAuMaroc",
  description:
    "Politique de confidentialité de MeteoAuMaroc.com : comment nous collectons, utilisons et protégeons vos données personnelles.",
  alternates: { canonical: "https://www.meteoaumaroc.com/pages/privacy" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "1. Consentement",
    content:
      "En utilisant MeteoAuMaroc.com, vous acceptez la présente politique de confidentialité. Si vous n'êtes pas d'accord avec ses termes, veuillez cesser d'utiliser notre site.",
  },
  {
    title: "2. Informations collectées",
    content:
      "Nous collectons des informations que vous nous fournissez directement (via le formulaire de contact : nom, e-mail, message). Nous ne demandons jamais de données sensibles (mots de passe, données bancaires, etc.).",
  },
  {
    title: "3. Utilisation des informations",
    items: [
      "Répondre à vos messages et questions",
      "Améliorer l'expérience utilisateur",
      "Analyser le trafic de manière anonyme (Google Analytics)",
      "Afficher des publicités pertinentes (Google AdSense)",
    ],
  },
  {
    title: "4. Fichiers journaux",
    content:
      "Comme tout serveur web, le nôtre enregistre automatiquement les requêtes HTTP : adresse IP, navigateur, pages consultées, date et heure. Ces données sont anonymes et ne permettent pas de vous identifier personnellement.",
  },
  {
    title: "5. Cookies",
    content:
      "MeteoAuMaroc utilise des cookies pour mémoriser vos préférences (langue, thème clair/sombre). Google Analytics et Google AdSense utilisent leurs propres cookies conformément à leurs politiques respectives. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.",
  },
  {
    title: "6. Google AdSense",
    content:
      "Google est notre partenaire publicitaire. Il peut utiliser les cookies DART pour diffuser des annonces basées sur vos visites. Vous pouvez gérer ces préférences sur la page des paramètres de confidentialité Google.",
  },
  {
    title: "7. Vos droits (RGPD)",
    items: [
      "Droit d'accès à vos données personnelles",
      "Droit de rectification des données incorrectes",
      "Droit à l'effacement (droit à l'oubli)",
      "Droit à la portabilité des données",
      "Droit de limiter le traitement",
    ],
    suffix: "Pour exercer ces droits, contactez-nous via notre page Contact.",
  },
  {
    title: "8. Protection des mineurs",
    content:
      "Notre site n'est pas destiné aux enfants de moins de 13 ans. Nous ne collectons pas sciemment leurs données. Si vous pensez qu'un enfant nous a fourni des informations, contactez-nous immédiatement.",
  },
  {
    title: "9. Modifications",
    content:
      "Cette politique peut être mise à jour à tout moment. La date de dernière modification est indiquée en haut de cette page. Continuez à consulter cette page régulièrement.",
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ background: "var(--color-bg)", minHeight: "60vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)", padding: "2.5rem 0 3rem", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 800, color: "#fff", marginBottom: "0.5rem", letterSpacing: "-0.03em" }}>
            Politique de Confidentialité
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

      <Breadcrumb current="Confidentialité" />

      <div className="container" style={{ maxWidth: 760, paddingTop: "3rem", paddingBottom: "5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
              {s.content && (
                <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8, fontSize: "0.9375rem", margin: 0 }}>
                  {s.content}
                </p>
              )}
              {s.items && (
                <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "var(--color-text-muted)", lineHeight: 1.8, fontSize: "0.9375rem" }}>
                  {s.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {s.suffix && (
                <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8, fontSize: "0.9375rem", marginTop: "0.75rem", marginBottom: 0 }}>
                  {s.suffix}
                </p>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/pages/contact" className="btn btn-outline" style={{ display: "inline-flex" }}>
            Nous contacter pour vos données
          </Link>
        </div>
      </div>
    </div>
  );
}

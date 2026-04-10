import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Politique de Cookies – MeteoAuMaroc",
  description:
    "Politique de cookies de MeteoAuMaroc.com : types de cookies utilisés, leur finalité et comment les gérer.",
  alternates: { canonical: "https://www.meteoaumaroc.com/pages/cookies" },
  robots: { index: true, follow: true },
};

const cookieTypes = [
  {
    name: "Cookies essentiels",
    iconColor: "#15803d",
    iconBg: "#dcfce7",
    iconPath: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    description: "Nécessaires au fonctionnement du site. Ils permettent de mémoriser vos préférences (langue, thème clair/sombre, unité de température °C/°F).",
    examples: ["theme", "locale", "tempUnit"],
    canDisable: false,
  },
  {
    name: "Cookies analytiques (Google Analytics)",
    iconColor: "#0369a1",
    iconBg: "#e0f2fe",
    iconPath: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
    description: "Utilisés pour comprendre comment les visiteurs utilisent le site. Ces données sont anonymes et nous aident à améliorer l'expérience utilisateur.",
    examples: ["_ga", "_ga_*", "_gid"],
    canDisable: true,
  },
  {
    name: "Cookies publicitaires (Google AdSense)",
    iconColor: "#b45309",
    iconBg: "#fef3c7",
    iconPath: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    description: "Utilisés par Google pour afficher des publicités pertinentes. Ils peuvent utiliser des informations sur vos visites sur ce site et d'autres sites pour vous proposer des annonces personnalisées.",
    examples: ["__gads", "__gpi", "DSID", "IDE"],
    canDisable: true,
  },
];

const sections = [
  {
    title: "Qu'est-ce qu'un cookie ?",
    content:
      "Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web. Les cookies aident le site à mémoriser vos préférences et à améliorer votre expérience de navigation.",
  },
  {
    title: "Comment gérer les cookies ?",
    content:
      "Vous pouvez contrôler et/ou supprimer les cookies via les paramètres de votre navigateur. Notez que la désactivation de certains cookies peut affecter le fonctionnement du site.",
  },
  {
    title: "Préférences publicitaires Google",
    content:
      "Vous pouvez personnaliser vos préférences publicitaires Google en visitant les Paramètres des annonces Google (adssettings.google.com). Vous pouvez également désactiver les cookies tiers dans les paramètres de votre navigateur.",
  },
  {
    title: "Durée de conservation",
    content:
      "Les cookies essentiels sont conservés jusqu'à ce que vous les supprimiez. Les cookies analytiques (Google Analytics) expirent après 2 ans. Les cookies publicitaires (Google AdSense) ont des durées variables définies par Google.",
  },
];

export default function CookiePolicyPage() {
  return (
    <div style={{ background: "var(--color-bg)", minHeight: "60vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)", padding: "2.5rem 0 3rem", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 800, color: "#fff", marginBottom: "0.5rem", letterSpacing: "-0.03em" }}>
            Politique de Cookies
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

      <Breadcrumb current="Cookies" />

      <div className="container" style={{ maxWidth: 760, paddingTop: "3rem", paddingBottom: "5rem" }}>

        {/* Cookie types */}
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--color-text)" }}>
          Types de cookies utilisés
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
          {cookieTypes.map((cookie) => (
            <div
              key={cookie.name}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "1.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "0.875rem" }}>
                {/* SVG icon box */}
                <div style={{
                  width: 42, height: 42, borderRadius: 10,
                  background: cookie.iconBg,
                  color: cookie.iconColor,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {cookie.iconPath}
                </div>
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-text)", margin: 0, flex: 1 }}>
                  {cookie.name}
                </h3>
                <span style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  padding: "0.25rem 0.7rem",
                  borderRadius: "var(--radius-full)",
                  background: cookie.canDisable ? "#fef3c7" : "#dcfce7",
                  color: cookie.canDisable ? "#92400e" : "#15803d",
                  border: `1px solid ${cookie.canDisable ? "#fbbf24" : "#86efac"}`,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}>
                  {cookie.canDisable ? "Facultatif" : "Obligatoire"}
                </span>
              </div>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.75, fontSize: "0.9rem", margin: "0 0 0.875rem" }}>
                {cookie.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {cookie.examples.map((ex) => (
                  <code key={ex} style={{
                    fontSize: "0.72rem",
                    padding: "0.2rem 0.6rem",
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--color-text-muted)",
                    fontFamily: "monospace",
                    letterSpacing: "0.02em",
                  }}>
                    {ex}
                  </code>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional sections */}
        <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-text)" }}>
          Informations complémentaires
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
          {sections.map((s) => (
            <div
              key={s.title}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem 1.5rem",
              }}
            >
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.5rem" }}>
                {s.title}
              </h3>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8, fontSize: "0.9rem", margin: 0 }}>
                {s.content}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
          <Link href="/pages/privacy" className="btn btn-outline">
            Politique de confidentialité
          </Link>
          <Link href="/pages/contact" className="btn btn-primary">
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}

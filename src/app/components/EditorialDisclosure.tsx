import Link from "next/link";
import { asLocale } from "@/app/lib/site";

const COPY = {
  fr: {
    label: "Publié et vérifié par l'équipe éditoriale MeteoAuMaroc",
    updated: "Mis à jour le 7 septembre 2026",
    link: "Méthode, sources et corrections",
  },
  ar: {
    label: "نشر ومراجعة فريق تحرير MeteoAuMaroc",
    updated: "آخر تحديث: 7 سبتمبر 2026",
    link: "المنهجية والمصادر والتصحيحات",
  },
  en: {
    label: "Published and reviewed by the MeteoAuMaroc editorial team",
    updated: "Updated September 7, 2026",
    link: "Methodology, sources, and corrections",
  },
};

export default function EditorialDisclosure({ locale }: { locale: string }) {
  const safeLocale = asLocale(locale);
  const copy = COPY[safeLocale];

  return (
    <aside
      aria-label={copy.label}
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.75rem",
        padding: "1rem 1.25rem",
        marginBottom: "2rem",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        background: "var(--color-surface)",
        color: "var(--color-text-muted)",
        fontSize: "0.84rem",
        lineHeight: 1.6,
      }}
    >
      <div>
        <strong style={{ color: "var(--color-text)", display: "block" }}>{copy.label}</strong>
        <span>{copy.updated}</span>
      </div>
      <Link href={`/${safeLocale}/pages/editorial-policy`} style={{ color: "var(--color-primary)", fontWeight: 700 }}>
        {copy.link}
      </Link>
    </aside>
  );
}

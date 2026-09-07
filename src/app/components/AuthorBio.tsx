import Link from "next/link";
import { asLocale } from "@/app/lib/site";

interface AuthorBioProps {
  locale: string;
}

const COPY = {
  fr: {
    authorTitle: "Rédacteur & Analyste Météo",
    authorName: "Yassine Rahhou & Équipe Éditioriale MeteoAuMaroc",
    bio: "Spécialisé dans l'analyse météorologique et le climat marocain. Nos contenus s'appuient sur les modèles numériques d'OpenWeatherMap, recoupés avec les observations régionales du Royaume.",
    editorialBadge: "Vérification Éditioriale E-E-A-T",
    linkText: "En savoir plus sur notre charte éditoriale →",
  },
  ar: {
    authorTitle: "محرر ومحلل الأرصاد الجوية",
    authorName: "ياسين رحو وفريق تحرير MeteoAuMaroc",
    bio: "متخصص في تحليل الأرصاد الجوية والمناخ المغربي. تعتمد محتوياتنا على النماذج الرقمية لـ OpenWeatherMap ومقارنتها بالملاحظات الإقليمية بالمملكة.",
    editorialBadge: "مراجعة تحريرية ومعايير الجودة E-E-A-T",
    linkText: "اقرأ المزيد عن سياستنا التحريرية ←",
  },
  en: {
    authorTitle: "Weather Analyst & Lead Editor",
    authorName: "Yassine Rahhou & MeteoAuMaroc Editorial Team",
    bio: "Specialised in Moroccan climate analysis and meteorological reporting. Our articles combine numerical model data from OpenWeatherMap with regional weather observations.",
    editorialBadge: "E-E-A-T Editorial Review",
    linkText: "Read our full editorial policy →",
  },
};

export default function AuthorBio({ locale }: AuthorBioProps) {
  const safeLocale = asLocale(locale);
  const copy = COPY[safeLocale];
  const isRtl = safeLocale === "ar";

  return (
    <section
      style={{
        marginTop: "3rem",
        marginBottom: "3rem",
        padding: "1.75rem",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
        direction: isRtl ? "rtl" : "ltr",
      }}
    >
      <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Avatar */}
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--color-primary), #0ea5e9)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          YR
        </div>

        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.35rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--color-text)" }}>
              {copy.authorName}
            </h3>
            <span
              style={{
                fontSize: "0.725rem",
                fontWeight: 700,
                color: "var(--color-primary)",
                background: "var(--color-primary-light)",
                padding: "0.25rem 0.65rem",
                borderRadius: "var(--radius-full)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {copy.editorialBadge}
            </span>
          </div>

          <div style={{ fontSize: "0.85rem", color: "var(--color-primary)", fontWeight: 700, marginBottom: "0.6rem" }}>
            {copy.authorTitle}
          </div>

          <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.7, margin: "0 0 0.875rem" }}>
            {copy.bio}
          </p>

          <Link
            href={`/${safeLocale}/pages/editorial-policy`}
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--color-primary)",
              textDecoration: "none",
            }}
          >
            {copy.linkText}
          </Link>
        </div>
      </div>
    </section>
  );
}

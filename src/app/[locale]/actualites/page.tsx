import type { Metadata } from "next";
import Link from "next/link";
import { asLocale } from "@/app/lib/site";
import { ARTICLES } from "@/app/lib/articles";

interface Props {
  params: { locale: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const locale = asLocale(params.locale);
  const title = locale === "ar" ? "أخبار الطقس والمقالات | MeteoAuMaroc" : locale === "en" ? "Weather News & Articles | MeteoAuMaroc" : "Actualités Météo & Articles | MeteoAuMaroc";
  const description = locale === "ar" ? "أحدث أخبار الطقس والمناخ والسياحة في المغرب." : locale === "en" ? "Latest weather news, climate updates, and tourism guides for Morocco." : "Dernières actualités météo, mises à jour sur le climat et guides touristiques pour le Maroc.";
  
  return { title, description };
}

export default function BlogHubPage({ params }: Props) {
  const locale = asLocale(params.locale);

  return (
    <div className="container" style={{ maxWidth: 900, padding: "4rem 1rem", minHeight: "70vh" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem" }}>
          {locale === "ar" ? "الأخبار والمقالات" : locale === "en" ? "News & Articles" : "Actualités & Articles"}
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", maxWidth: 600, margin: "0 auto" }}>
          {locale === "ar" 
            ? "ابق على اطلاع دائم بأحدث تنبيهات الطقس والتغيرات المناخية في المغرب." 
            : locale === "en" 
            ? "Stay up to date with the latest weather alerts and climate changes in Morocco." 
            : "Restez informé des dernières alertes météo et des changements climatiques au Maroc."}
        </p>
      </div>

      <div style={{ display: "grid", gap: "2rem" }}>
        {ARTICLES.map(article => (
          <Link 
            href={`/${locale}/actualites/${article.slug}`} 
            key={article.slug}
            style={{ 
              display: "flex", flexWrap: "wrap", gap: "2rem", padding: "1.5rem", 
              background: "var(--color-surface)", border: "1px solid var(--color-border)", 
              borderRadius: "var(--radius-xl)", textDecoration: "none", color: "var(--color-text)",
              transition: "transform 0.2s, boxShadow 0.2s"
            }}
          >
            <div style={{ flex: "1 1 250px", height: "200px", background: "var(--color-bg)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed var(--color-border)" }}>
              <span style={{ fontSize: "3rem" }}>📰</span>
            </div>
            <div style={{ flex: "2 1 300px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                {new Date(article.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>
                {article.title[locale]}
              </h2>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                {article.excerpt[locale]}
              </p>
              <div style={{ marginTop: "1.5rem", fontWeight: 700, color: "var(--color-primary)" }}>
                {locale === "ar" ? "اقرأ المزيد" : locale === "en" ? "Read More" : "Lire la suite"} →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

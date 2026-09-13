import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asLocale } from "@/app/lib/site";
import { ARTICLES } from "@/app/lib/articles";
import Link from "next/link";
import AuthorBio from "@/app/components/AuthorBio";

interface Props {
  params: { slug: string; locale: string };
}

export function generateStaticParams() {
  const locales = ["fr", "ar", "en"];
  const params: { slug: string; locale: string }[] = [];
  locales.forEach((locale) => {
    ARTICLES.forEach((article) => {
      params.push({ slug: article.slug, locale });
    });
  });
  return params;
}

export function generateMetadata({ params }: Props): Metadata {
  const article = ARTICLES.find(a => a.slug === params.slug);
  const locale = asLocale(params.locale);
  if (!article) return { title: "Introuvable" };

  return {
    title: `${article.title[locale]} | MeteoAuMaroc`,
    description: article.excerpt[locale],
    openGraph: {
      type: "article",
      publishedTime: article.date,
    }
  };
}

export default function ArticlePage({ params }: Props) {
  const article = ARTICLES.find(a => a.slug === params.slug);
  if (!article) notFound();

  const locale = asLocale(params.locale);

  // Schema for Google News / Articles
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title[locale],
    image: [`https://www.meteoaumaroc.com${article.image}`],
    datePublished: article.date,
    dateModified: article.date,
    author: [{
      "@type": "Person",
      name: "Yassine Rahhou",
      url: "https://www.meteoaumaroc.com"
    }]
  };

  return (
    <article className="container" style={{ maxWidth: 800, padding: "3rem 1rem", minHeight: "70vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <div style={{ marginBottom: "2rem" }}>
        <Link href={`/${locale}/actualites`} style={{ color: "var(--color-primary)", textDecoration: "none", fontWeight: 600 }}>
          ← {locale === "ar" ? "العودة إلى الأخبار" : locale === "en" ? "Back to News" : "Retour aux actualités"}
        </Link>
      </div>

      <header style={{ marginBottom: "3rem" }}>
        <div style={{ color: "var(--color-primary)", fontWeight: 600, marginBottom: "1rem" }}>
          {new Date(article.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 900, lineHeight: 1.2, marginBottom: "1.5rem" }}>
          {article.title[locale]}
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-muted)", lineHeight: 1.6, fontWeight: 500 }}>
          {article.excerpt[locale]}
        </p>
      </header>

      <div style={{ width: "100%", height: "400px", background: "var(--color-surface)", borderRadius: "var(--radius-xl)", marginBottom: "3rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed var(--color-border)" }}>
        <span style={{ fontSize: "4rem" }}>📸</span>
      </div>

      <div style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--color-text)", marginBottom: "4rem" }} className="prose">
        {article.content[locale]}
      </div>

      <hr style={{ borderTop: "1px solid var(--color-border)", marginBottom: "3rem" }} />
      <AuthorBio locale={locale} />
    </article>
  );
}

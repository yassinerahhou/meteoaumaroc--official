import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AdUnit from "@/app/components/AdUnit";
import EditorialDisclosure from "@/app/components/EditorialDisclosure";
import AuthorBio from "@/app/components/AuthorBio";
import { asLocale, localizedAlternates, localizedUrl } from "@/app/lib/site";

interface Props {
  params: { locale: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const locale = asLocale(params.locale);
  const copy = {
    fr: {
      title: "Météo au Maroc – Guide Complet du Climat Marocain | MeteoAuMaroc",
      description: "Tout sur la météo au Maroc : zones climatiques, prévisions régionales, tendances saisonnières et conditions en temps réel pour 60+ villes du Royaume.",
    },
    ar: {
      title: "الطقس في المغرب – دليل كامل للمناخ المغربي | MeteoAuMaroc",
      description: "كل ما يتعلق بالطقس في المغرب: المناطق المناخية، التوقعات الإقليمية، التوجهات الموسمية والحالة الجوية الفورية لـ 60+ مدينة مغربية.",
    },
    en: {
      title: "Weather in Morocco – Complete Guide to Moroccan Climate | MeteoAuMaroc",
      description: "Everything about weather in Morocco: climate zones, regional forecasts, seasonal patterns, and real-time conditions for 60+ Moroccan cities.",
    },
  }[locale];

  return {
    ...copy,
    keywords: [
      "weather morocco", "météo maroc", "الطقس في المغرب",
      "climat maroc", "moroccan climate", "météo des régions maroc",
      "morocco weather map", "weather inland morocco",
    ],
    alternates: localizedAlternates(locale, "/weather-morocco"),
    openGraph: {
      ...copy,
      url: localizedUrl(locale, "/weather-morocco"),
      type: "article",
    },
  };
}

const REGIONS = [
  {
    name: { fr: "Côte Atlantique Nord", ar: "الساحل الأطلسي الشمالي", en: "North Atlantic Coast" },
    cities: ["casablanca","rabat","tanger","sale","kenitra"],
    temp: "16–28°C",
    rain: { fr: "Moyenne", ar: "متوسطة", en: "Medium" },
    desc: {
      fr: "Climat méditerranéen-atlantique doux avec des étés agréables et des hivers pluvieux.",
      ar: "مناخ متوسطي أطلسي معتدل مع صيف لطيف وشتاء ماطر.",
      en: "Mild Mediterranean-Atlantic climate with warm summers and rainy winters.",
    },
  },
  {
    name: { fr: "Côte Atlantique Sud", ar: "الساحل الأطلسي الجنوبي", en: "South Atlantic Coast" },
    cities: ["agadir","essaouira","safi","tiznit"],
    temp: "17–30°C",
    rain: { fr: "Faible", ar: "منخفضة", en: "Low" },
    desc: {
      fr: "Climat côtier semi-aride — doux toute l'année avec des alizés atlantiques constants.",
      ar: "مناخ ساحلي شبه جاف — معتدل طوال العام مع رياح أطلسية منتظمة.",
      en: "Semi-arid coastal climate — warm year-round with strong Atlantic breezes.",
    },
  },
  {
    name: { fr: "Plaines Intérieures", ar: "السهول الداخلية", en: "Interior Plains" },
    cities: ["marrakech","fes","meknes","beni-mellal"],
    temp: "10–42°C",
    rain: { fr: "Faible", ar: "منخفضة", en: "Low" },
    desc: {
      fr: "Climat continental semi-aride : étés chauds et secs, hivers frais. Forte amplitude thermiques.",
      ar: "مناخ قاري شبه جاف: صيف حار وجاف وشتاء بارد مع تفاوت حراري واسع.",
      en: "Continental semi-arid: hot dry summers, cool winters. Wide daily range.",
    },
  },
  {
    name: { fr: "Haut Atlas & Montagnes", ar: "جبال الأطلس الكبير", en: "High Atlas & Mountains" },
    cities: ["ifrane","azrou","midelt"],
    temp: "−5–30°C",
    rain: { fr: "Élevée", ar: "مرتفعة", en: "High" },
    desc: {
      fr: "Climat alpin avec neige en hiver. La région la plus froide du Maroc.",
      ar: "مناخ جبلي مع ثلوج شتاءً. أبرد منطقة بالمملكة.",
      en: "Alpine climate with snow in winter. Morocco's most extreme cold region.",
    },
  },
  {
    name: { fr: "Nord Méditerranéen", ar: "الشمال المتوسطي", en: "Mediterranean North" },
    cities: ["tetouan","al-hoceima","nador"],
    temp: "12–34°C",
    rain: { fr: "Moyenne", ar: "متوسطة", en: "Medium" },
    desc: {
      fr: "Climat méditerranéen classique avec des étés chauds et secs et des hivers humides.",
      ar: "مناخ متوسطي كلاسيكي مع صيف حار وجاف وشتاء رطب.",
      en: "Classic Mediterranean climate with hot dry summers and mild wet winters.",
    },
  },
  {
    name: { fr: "Sud Saharien", ar: "الجنوب الصحراوي", en: "Saharan South" },
    cities: ["ouarzazate","zagora","errachidia","laayoune"],
    temp: "12–48°C",
    rain: { fr: "Quasi nulle", ar: "شحيحة جداً", en: "Minimal" },
    desc: {
      fr: "Climat saharien désertique — étés torrides, hivers doux le jour et nuits fraîches.",
      ar: "مناخ صحراوي — صيف شديد الحرارة وشتاء معتدل نهاراً مع ليالٍ باردة.",
      en: "Desert Saharan climate — extremely hot summers, mild winters, near-zero rain.",
    },
  },
];

export default function WeatherMoroccoPage({ params }: Props) {
  const locale = asLocale(params.locale);
  const isRtl = locale === "ar";

  const labels = {
    fr: {
      home: "Accueil",
      title: "Météo au Maroc",
      subtitle: "Guide Régional & Saisonnié",
      intro: "Le climat du Maroc s'étend des côtes atlantiques aux dunes du Sahara et aux sommets de l'Atlas. Explorez la météo en temps réel et les tendances régionales.",
      overviewTitle: "Aperçu Climatique par Région",
      rainLabel: "Pluie",
      seasonsTitle: "La Météo au Maroc par Saison",
      allCitiesBtn: "Explorer les 60+ Villes →",
    },
    ar: {
      home: "الرئيسية",
      title: "الطقس في المغرب",
      subtitle: "دليل إقليمي وموسمي",
      intro: "يمتد مناخ المغرب من السواحل الأطلسية إلى كثبان الصحراء وقمم الأطلس. اكتشف حالة الطقس والتوقعات لجميع المناطق.",
      overviewTitle: "نظرة عامة على المناخ حسب المناطق",
      rainLabel: "الأمطار",
      seasonsTitle: "الطقس في المغرب حسب الفصول",
      allCitiesBtn: "استكشف 60+ مدينة ←",
    },
    en: {
      home: "Home",
      title: "Weather in Morocco",
      subtitle: "Regional & Seasonal Guide",
      intro: "Morocco's climate spans Atlantic coasts, Saharan deserts, and Alpine mountains. Explore real-time weather and forecasts for every region.",
      overviewTitle: "Morocco Climate Overview by Region",
      rainLabel: "Rain",
      seasonsTitle: "Morocco Weather by Season",
      allCitiesBtn: "Browse All Cities →",
    },
  }[locale];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: labels.home, item: localizedUrl(locale) },
      { "@type": "ListItem", position: 2, name: labels.title, item: localizedUrl(locale, "/weather-morocco") },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: labels.title,
    description: labels.intro,
    url: localizedUrl(locale, "/weather-morocco"),
    author: { "@type": "Person", name: "Yassine Rahhou", jobTitle: "Weather Analyst", worksFor: { "@type": "Organization", name: "MeteoAuMaroc" } },
    publisher: { "@type": "Organization", name: "MeteoAuMaroc", url: "https://www.meteoaumaroc.com" },
    dateModified: "2026-09-07",
    inLanguage: locale,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div style={{ background: "var(--color-bg)", minHeight: "100vh", direction: isRtl ? "rtl" : "ltr" }}>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, #0c4a6e, #0369a1, #0284c7)", padding: "4rem 0 3rem", color: "#fff" }}>
          <div className="container">
            <nav style={{ fontSize: "0.85rem", opacity: 0.85, marginBottom: "1rem" }}>
              <Link href={`/${locale}`} style={{ color: "#7dd3fc", textDecoration: "none" }}>{labels.home}</Link>
              <span style={{ margin: "0 0.4rem" }}>›</span>
              <span>{labels.title}</span>
            </nav>
            <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.2 }}>
              {labels.title}<br />
              <span style={{ color: "#7dd3fc" }}>{labels.subtitle}</span>
            </h1>
            <p style={{ fontSize: "1.1rem", opacity: 0.9, maxWidth: 640, lineHeight: 1.75 }}>
              {labels.intro}
            </p>
          </div>
        </section>

        <div className="container" style={{ maxWidth: 960, padding: "3rem 1rem" }}>
          <EditorialDisclosure locale={locale} />
          
          {/* Featured Image */}
          <div style={{ position: "relative", width: "100%", height: 360, borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: "3rem", boxShadow: "var(--shadow-lg)" }}>
            <Image 
              src="/assets/img/Agadir.jpg" 
              alt="Météo au Maroc" 
              fill 
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <AdUnit slot="7890123456" format="horizontal" style={{ marginBottom: "3rem" }} />

          {/* Regional Cards */}
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--color-text)" }}>
              {labels.overviewTitle}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
              {REGIONS.map((r) => (
                <div key={r.name.en} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--color-text)" }}>
                    {r.name[locale]}
                  </h3>
                  <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", padding: "0.2rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700 }}>
                      🌡️ {r.temp}
                    </span>
                    <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", padding: "0.2rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700 }}>
                      🌧️ {labels.rainLabel}: {r.rain[locale]}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.65, margin: "0 0 1rem" }}>
                    {r.desc[locale]}
                  </p>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {r.cities.map((slug) => (
                      <Link key={slug} href={`/${locale}/cities/${slug}`} style={{ fontSize: "0.78rem", color: "var(--color-primary)", background: "var(--color-primary-light)", padding: "0.2rem 0.6rem", borderRadius: "var(--radius-full)", textDecoration: "none", fontWeight: 600 }}>
                        {slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ")}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <AuthorBio locale={locale} />

          {/* CTA */}
          <section style={{ background: "linear-gradient(135deg, #0c4a6e, #0369a1)", borderRadius: "var(--radius-lg)", padding: "2rem", textAlign: "center", color: "#fff" }}>
            <h2 style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: "0.75rem" }}>
              {labels.allCitiesBtn}
            </h2>
            <p style={{ opacity: 0.9, marginBottom: "1.5rem", fontSize: "0.95rem" }}>
              60+ villes couvertes avec prévisions heure par heure, humidité, vent et horaires de prière.
            </p>
            <Link href={`/${locale}/cities`} style={{ display: "inline-block", background: "#fff", color: "var(--color-primary)", padding: "0.65rem 2rem", borderRadius: "var(--radius-full)", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>
              {labels.allCitiesBtn}
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

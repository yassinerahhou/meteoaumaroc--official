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
      title: "Guide Climatique du Maroc – Régions, Zones & Météo Saisonnière | MeteoAuMaroc",
      description: "Guide complet du climat au Maroc : 6 zones climatiques (Méditerranéen, Atlantique, Continental, Alpin, Saharien) expliquées avec températures moyennes et conseils de voyage.",
    },
    ar: {
      title: "دليل المناخ في المغرب – المناطق والأنطاق والطقس الموسمي | MeteoAuMaroc",
      description: "دليل شامل لمناخ المغرب: 6 مناطق مناخية (المتوسطي، الأطلسي، القاري، الجبلي، الصحراوي) مع درجات الحرارة الشهرية ونصائح السفر.",
    },
    en: {
      title: "Morocco Climate Guide – Regions, Zones & Seasonal Weather | MeteoAuMaroc",
      description: "In-depth Morocco climate guide: Mediterranean, Atlantic, Continental, Alpine, and Saharan zones explained with monthly averages and regional advice.",
    },
  }[locale];

  return {
    ...copy,
    keywords: [
      "morocco climate guide", "climat maroc", "مناخ المغرب",
      "guide climatique maroc", "climat zones maroc", "دليل مناخ المغرب",
      "météo régions maroc", "weather morocco climate",
    ],
    alternates: localizedAlternates(locale, "/morocco-climate-guide"),
    openGraph: {
      ...copy,
      url: localizedUrl(locale, "/morocco-climate-guide"),
      type: "article",
    },
  };
}

const CLIMATE_ZONES = [
  {
    id: "atlantic",
    emoji: "🌊",
    name: {
      fr: "Atlantique Méditerranéen",
      ar: "المناخ الأطلسي المتوسطي",
      en: "Atlantic Mediterranean",
    },
    cities: ["Casablanca", "Rabat", "Kénitra", "Mohammedia"],
    avgSummer: "22–28°C",
    avgWinter: "10–18°C",
    annualRain: "400–650 mm",
    description: {
      fr: "Le climat dominant de la côte atlantique nord du Maroc. Les étés sont chauds et secs (juin-septembre), les hivers doux et pluvieux (octobre-avril). L'océan Atlantique régule les températures, évitant les chaleurs extrêmes et le gel.",
      ar: "المناخ السائد على الساحل الأطلسي الشمالي للمغرب. الصيف دافئ وجاف (يونيو-سبتمبر)، والشتاء معتدل وماطر (أكتوبر-أبريل). يعمل المحيط الأطلسي كمنظم حراري ينعش الصيف ويحمي من الصقيع.",
      en: "The dominant climate of Morocco's northern Atlantic coast. Summers are warm and dry (June–September), winters mild and rainy (October–April). The Atlantic Ocean acts as a natural thermostat.",
    },
    bestFor: {
      fr: "Visites toute l'année, séjours balnéaires, tourisme urbain",
      ar: "الزيارة طوال العام، العطلات الساحلية، والسياحة الحضرية",
      en: "Year-round visits, beach holidays, city breaks",
    },
  },
  {
    id: "semiarid-coastal",
    emoji: "🏖️",
    name: {
      fr: "Côtier Semi-Aride",
      ar: "الساحلي شبه الجاف",
      en: "Coastal Semi-Arid",
    },
    cities: ["Agadir", "Essaouira", "Safi", "Tiznit"],
    avgSummer: "24–30°C",
    avgWinter: "14–22°C",
    annualRain: "200–350 mm",
    description: {
      fr: "Au sud d'Agadir, le climat devient plus sec tout en restant très doux grâce aux courants atlantiques frais. Essaouira est réputée pour ses alizés constants (paradis du kitesurf). Ensoleillement quasi permanent.",
      ar: "جنوب أكادير، يصبح المناخ أكثر جفافاً مع البقاء معتدلاً بفضل التيار الأطلسي البارد. تشتهر الصويرة برياحها المنتظمة (جنة ركوب الأمواج). إشراق شمسي شبه دائم.",
      en: "South of Agadir, the climate becomes drier while remaining mild due to cold Atlantic currents. Essaouira is famously windy and ideal for kitesurfing.",
    },
    bestFor: {
      fr: "Sports nautiques, évasion hivernale, surf",
      ar: "الرياضات المائية، الهروب من برد الشتاء، وركوب الأمواج",
      en: "Water sports, winter escapes, surf trips",
    },
  },
  {
    id: "continental",
    emoji: "🌡️",
    name: {
      fr: "Continental Semi-Aride",
      ar: "القاري شبه الجاف",
      en: "Continental Semi-Arid",
    },
    cities: ["Marrakech", "Fès", "Meknès", "Béni Mellal"],
    avgSummer: "30–45°C",
    avgWinter: "6–18°C",
    annualRain: "150–300 mm",
    description: {
      fr: "Le climat classique des plaine intérieures du Maroc. Les étés sont très chauds — Marrakech et Fès dépassent régulièrement 40°C en juillet et août. Les hivers sont frais avec des nuits froides. Le printemps et l'automne sont idéaux.",
      ar: "المناخ القلاسيكي للمناطق الداخلية. الصيف حار جداً — تسجل مراكش وفاس أكثر من 40 درجة في يوليوز وغشت. الشتاء بارد ليلاً. الربيع والخريف هما الفصلان المثاليان.",
      en: "The classic interior climate of Morocco. Summers are hot — Marrakech regularly records 40°C+ in July and August. Winters are cool with chilly nights.",
    },
    bestFor: {
      fr: "Séjours culturels au printemps/automne, soleil en hiver",
      ar: "الرحلات الثقافية في الربيع والخريف، وشمس الشتاء",
      en: "Spring/autumn culture trips, winter sun breaks",
    },
  },
  {
    id: "alpine",
    emoji: "⛰️",
    name: {
      fr: "Montagnard Alpin",
      ar: "الجبلي الألبي",
      en: "Alpine Mountain",
    },
    cities: ["Ifrane", "Azrou", "Midelt", "Oukaimeden"],
    avgSummer: "15–25°C",
    avgWinter: "−10–8°C",
    annualRain: "800–1200 mm",
    description: {
      fr: "Les massifs de l'Atlas et du Rif possèdent un véritable climat alpin. Ifrane (« la Suisse du Maroc ») enregistre des températures en dessous de zéro en hiver avec de fortes chutes de neige.",
      ar: "تتمتع جبال الأطلس والريف بمناخ جبلي حقيقي. تسجل إفران («سويسرا المغرب») درجات حرارة تحت الصفر شتاءً مع تساقطات ثلجية كثيفة.",
      en: "The Atlas and Rif Mountains have a true alpine climate. Ifrane regularly drops below zero in winter with heavy snowfall.",
    },
    bestFor: {
      fr: "Ski (décembre-février), randonnée estivale, fraîcheur",
      ar: "التزلج (ديسمبر-فبراير)، التنزة الصيفي، والهروب من الحرارة",
      en: "Skiing (Dec–Feb), summer trekking, cool escapes",
    },
  },
  {
    id: "mediterranean-north",
    emoji: "🍊",
    name: {
      fr: "Méditerranéen Septentrional",
      ar: "المتوسطي الشمالي",
      en: "Mediterranean North",
    },
    cities: ["Tanger", "Tétouan", "Al Hoceima", "Nador"],
    avgSummer: "25–35°C",
    avgWinter: "8–16°C",
    annualRain: "500–900 mm",
    description: {
      fr: "La côte méditerranéenne offre des étés chauds et secs et des hivers doux et pluvieux. Les montagnes du Rif retiennent l'humidité, faisant du nord la région la plus arrosée du pays.",
      ar: "يتميز الساحل المتوسطي بصيف حار وجاف وشتاء معتدل وماطر. تحبس جبال الريف الرطوبة، مما يجعل الشمال أكثر مناطق المغرب هطلاً للأمطار.",
      en: "The northern tip of Morocco bordering Europe has a classic Mediterranean climate — hot dry summers and mild wet winters.",
    },
    bestFor: {
      fr: "Plages estivales, découvertes du Rif, nature",
      ar: "الشواطئ الصيفية، استكشاف جبال الريف، والطبيعة",
      en: "Spring wildflowers, summer beaches, cultural heritage",
    },
  },
  {
    id: "saharan",
    emoji: "🏜️",
    name: {
      fr: "Saharien Désertique",
      ar: "الصحراوي",
      en: "Saharan Desert",
    },
    cities: ["Ouarzazate", "Zagora", "Errachidia", "Laâyoune"],
    avgSummer: "35–48°C",
    avgWinter: "10–22°C",
    annualRain: "30–100 mm",
    description: {
      fr: "Au sud de l'Anti-Atlas, le désert du Sahara impose un climat extrême : étés brûlants, hivers agréables le jour mais très frais la nuit. Précipitations quasi nulles et ciel étoilé exceptionnel.",
      ar: "جنوب الأطلس الصغير، تفرض الصحراء مناخاً قاصياً: صيف شديد الحرارة، وشتاء دافئ نهاراً وبارد ليلاً. أمطار شحيحة وسماء صافية ملائ للمليارات من النجوم.",
      en: "South of the Anti-Atlas, Morocco transitions into the Sahara. Temperatures exceed 45°C in summer with mild days and cold nights in winter.",
    },
    bestFor: {
      fr: "Aventures dans le désert (octobre-mars), observation des étoiles",
      ar: "رحلات الصحراء (أكتوبر-مارس)، ومراقبة النجوم",
      en: "Desert adventures (Oct–Mar), stargazing, Sahara tours",
    },
  },
];

export default function MoroccoClimateGuidePage({ params }: Props) {
  const locale = asLocale(params.locale);
  const isRtl = locale === "ar";

  const labels = {
    fr: {
      home: "Accueil",
      title: "Guide Climatique du Maroc",
      subtitle: "6 Zones Climatiques, Un Seul Pays",
      intro: "De la neige de l'Atlas aux dunes du Sahara, découvrez l'extrême diversité du climat marocain avec nos données mensuelles et nos conseils par région.",
      tableTitle: "Aperçu des températures mensuelles par ville",
      cityCol: "Ville",
      summer: "☀️ Été",
      winter: "❄️ Hiver",
      rain: "🌧️ Pluie",
      bestForLabel: "Idéal pour :",
      allForecasts: "Prévisions par ville →",
      bestTime: "Meilleure période pour visiter →",
    },
    ar: {
      home: "الرئيسية",
      title: "دليل المناخ في المغرب",
      subtitle: "6 مناطق مناخية في بلد واحد",
      intro: "من ثلوج الأطلس إلى كثبان الصحراء، اكتشف التنوع المناخي الفريب للمغرب مع المعدلات الشهرية ونصائح السفر حسب المناطق.",
      tableTitle: "نظرة عامة على درجات الحرارة الشهرية حسب المدن",
      cityCol: "المدينة",
      summer: "☀️ الصيف",
      winter: "❄️ الشتاء",
      rain: "🌧️ الأمطار",
      bestForLabel: "أفضل لـ:",
      allForecasts: "توقعات جميع المدن ←",
      bestTime: "أفضل وقت للزيارة ←",
    },
    en: {
      home: "Home",
      title: "Morocco Climate Guide",
      subtitle: "6 Climate Zones, One Country",
      intro: "From Alpine snow to Saharan dunes, Morocco spans climates that cover diverse geography. Explore every climate zone with monthly data and regional advice.",
      tableTitle: "Morocco Monthly Temperature Overview",
      cityCol: "City",
      summer: "☀️ Summer",
      winter: "❄️ Winter",
      rain: "🌧️ Rain",
      bestForLabel: "Best for:",
      allForecasts: "All City Forecasts →",
      bestTime: "Best Time to Visit →",
    },
  }[locale];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: labels.home, item: localizedUrl(locale) },
      { "@type": "ListItem", position: 2, name: labels.title, item: localizedUrl(locale, "/morocco-climate-guide") },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: labels.title,
    description: labels.intro,
    url: localizedUrl(locale, "/morocco-climate-guide"),
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
        <section style={{ background: "linear-gradient(135deg, #064e3b, #065f46, #047857)", padding: "4rem 0 3rem", color: "#fff" }}>
          <div className="container">
            <nav style={{ fontSize: "0.85rem", opacity: 0.85, marginBottom: "1rem" }}>
              <Link href={`/${locale}`} style={{ color: "#6ee7b7", textDecoration: "none" }}>{labels.home}</Link>
              <span style={{ margin: "0 0.4rem" }}>›</span>
              <span>{labels.title}</span>
            </nav>
            <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.2 }}>
              {labels.title}
              <br />
              <span style={{ color: "#6ee7b7" }}>{labels.subtitle}</span>
            </h1>
            <p style={{ fontSize: "1.05rem", opacity: 0.9, maxWidth: 640, lineHeight: 1.8 }}>
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
              alt="Climat et météo au Maroc" 
              fill 
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <AdUnit slot="1234567890" format="horizontal" style={{ marginBottom: "3rem" }} />

          {/* Monthly Temperature Overview */}
          <section style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.75rem", marginBottom: "3rem", overflowX: "auto" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-text)" }}>
              {labels.tableTitle}
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", minWidth: 540 }}>
              <thead>
                <tr style={{ background: "var(--color-primary)", color: "#fff" }}>
                  <th style={{ padding: "0.6rem 0.75rem", textAlign: isRtl ? "right" : "left" }}>{labels.cityCol}</th>
                  {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
                    <th key={m} style={{ padding: "0.6rem 0.4rem", textAlign: "center" }}>{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { city: "Casablanca", temps: [17,18,20,22,24,27,28,29,27,23,20,17] },
                  { city: "Marrakech",  temps: [18,20,24,27,32,37,40,40,35,28,22,18] },
                  { city: "Agadir",     temps: [20,22,24,25,27,28,29,30,29,27,24,21] },
                  { city: "Fès",        temps: [14,16,19,22,27,33,37,37,32,25,19,14] },
                  { city: "Ifrane",     temps: [5, 7, 10,14,18,23,27,28,22,15,9, 5 ] },
                  { city: "Ouarzazate", temps: [18,21,25,29,34,39,42,42,37,30,23,18] },
                ].map((row, i) => (
                  <tr key={row.city} style={{ background: i % 2 === 0 ? "var(--color-surface)" : "var(--color-bg)", borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "0.55rem 0.75rem", fontWeight: 700, color: "var(--color-text)", whiteSpace: "nowrap" }}>{row.city}</td>
                    {row.temps.map((t, j) => (
                      <td key={j} style={{ padding: "0.55rem 0.4rem", textAlign: "center", fontWeight: 600,
                        color: t >= 38 ? "#ef4444" : t >= 30 ? "#f97316" : t >= 22 ? "#f59e0b" : t >= 15 ? "#22c55e" : "#60a5fa" }}>
                        {t}°
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Climate Zones */}
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--color-text)" }}>
            {labels.title}
          </h2>
          <div style={{ display: "grid", gap: "1.5rem", marginBottom: "3rem" }}>
            {CLIMATE_ZONES.map((z) => (
              <div key={z.id} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "2rem", flexShrink: 0 }}>{z.emoji}</span>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.4rem" }}>
                      {z.name[locale]}
                    </h3>
                    <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                      <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", padding: "0.2rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700 }}>
                        {labels.summer}: {z.avgSummer}
                      </span>
                      <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", padding: "0.2rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700 }}>
                        {labels.winter}: {z.avgWinter}
                      </span>
                      <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", padding: "0.2rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700 }}>
                        {labels.rain}: {z.annualRain}
                      </span>
                    </div>
                    <p style={{ color: "var(--color-text-muted)", lineHeight: 1.75, fontSize: "0.9rem", marginBottom: "0.75rem" }}>
                      {z.description[locale]}
                    </p>
                    <div style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>
                      <strong style={{ color: "var(--color-primary)" }}>{labels.bestForLabel}</strong> {z.bestFor[locale]}
                    </div>
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      {z.cities.map((c) => {
                        const slug = c.toLowerCase().replace(/\s+/g, "-");
                        return (
                          <Link key={c} href={`/${locale}/cities/${slug}`} style={{ fontSize: "0.78rem", color: "var(--color-primary)", background: "var(--color-bg)", border: "1px solid var(--color-border)", padding: "0.2rem 0.65rem", borderRadius: "var(--radius-full)", textDecoration: "none", fontWeight: 600 }}>
                            📍 {c}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <AuthorBio locale={locale} />

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href={`/${locale}/cities`} style={{ background: "var(--color-primary)", color: "#fff", padding: "0.75rem 2rem", borderRadius: "var(--radius-full)", fontWeight: 700, textDecoration: "none" }}>
              {labels.allForecasts}
            </Link>
            <Link href={`/${locale}/best-time-to-visit-morocco`} style={{ background: "var(--color-surface)", color: "var(--color-primary)", padding: "0.75rem 2rem", borderRadius: "var(--radius-full)", fontWeight: 700, textDecoration: "none", border: "1px solid var(--color-border)" }}>
              {labels.bestTime}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

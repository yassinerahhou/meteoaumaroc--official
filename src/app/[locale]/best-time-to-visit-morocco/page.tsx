import type { Metadata } from "next";
import Link from "next/link";
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
      title: "Meilleure Période pour Visiter le Maroc – Guide Mois par Mois | MeteoAuMaroc",
      description: "Quand partir au Maroc ? Guide complet mois par mois : températures, affluence, événements et conseils par région (Marrakech, Fès, Agadir, Sahara).",
    },
    ar: {
      title: "أفضل وقت لزيارة المغرب – دليل رحلات شهر بشهر | MeteoAuMaroc",
      description: "متى تزور المغرب؟ دليل شامل شهري يغطي درجات الحرارة والازدحام والمهرجانات والنصائح حسب المناطق (مراكش، فاس، أكادير، الصحراء).",
    },
    en: {
      title: "Best Time to Visit Morocco – Month by Month Travel Guide | MeteoAuMaroc",
      description: "When is the best time to visit Morocco? Month-by-month guide covering temperatures, crowds, festivals, and region-specific travel advice.",
    },
  }[locale];

  return {
    ...copy,
    keywords: [
      "best time to visit morocco", "meilleur moment pour visiter le maroc", "أفضل وقت لزيارة المغرب",
      "quand partir au maroc", "متى تسافر للمغرب", "morocco weather travel",
      "marrakech best time", "sahara best month to visit",
    ],
    alternates: localizedAlternates(locale, "/best-time-to-visit-morocco"),
    openGraph: {
      ...copy,
      url: localizedUrl(locale, "/best-time-to-visit-morocco"),
      type: "article",
    },
  };
}

const MONTHS = [
  {
    month: { fr: "Janvier", ar: "يناير", en: "January" },
    rating: 3,
    coast: "17–19°C", inland: "10–15°C", mountains: "−5–5°C", sahara: "20–22°C",
    crowds: { fr: "Faible", ar: "منخفض", en: "Low" },
    rain: { fr: "Élevée (côte)", ar: "مرتفعة (الساحل)", en: "High (coast)" },
    verdict: {
      fr: "Idéal pour : Marrakech, tourisme à budget réduit, circuits Sahara. Plages atlantiques trop fraîches.",
      ar: "مثالي لـ: مراكش، الرحلات الاقتصادية، ورحلات الصحراء. الشواطئ الساحلية باردة نسبياً.",
      en: "Best for: Marrakech city breaks, budget travelers, Sahara tours. Coastal beaches are cool.",
    },
  },
  {
    month: { fr: "Février", ar: "فبراير", en: "February" },
    rating: 3,
    coast: "18–20°C", inland: "12–17°C", mountains: "−3–7°C", sahara: "22–25°C",
    crowds: { fr: "Faible à Moyen", ar: "منخفض إلى متوسط", en: "Low–Medium" },
    rain: { fr: "Modérée", ar: "معتدلة", en: "Medium" },
    verdict: {
      fr: "Idéal pour : Amandiers en fleurs à Tafraout, combo Marrakech + Sahara, tarifs avantageux.",
      ar: "مثالي لـ: أزهار اللوز في تفراوت، رحلات مراكش والصحراء، وأسعار جيدة.",
      en: "Best for: Sahara + Marrakech combo tours, almond blossoms in Tafraout, budget trips.",
    },
  },
  {
    month: { fr: "Mars", ar: "مارس", en: "March" },
    rating: 5,
    coast: "20–22°C", inland: "17–24°C", mountains: "5–15°C", sahara: "26–30°C",
    crowds: { fr: "Moyen", ar: "متوسط", en: "Medium" },
    rain: { fr: "Faible", ar: "خفيفة", en: "Light" },
    verdict: {
      fr: "L'un des meilleurs mois ! Équilibre parfait entre températures agréables, paysages verdoyants et affluence raisonnable.",
      ar: "من أفضل أشهر السنة! توازن مثالي بين درجات الحرارة المعتدلة، الطبيعة الخضراء، والازدحام المعتدل.",
      en: "One of the best months. Perfect balance of warm temperatures, low crowds, and green landscapes.",
    },
  },
  {
    month: { fr: "Avril", ar: "أبريل", en: "April" },
    rating: 5,
    coast: "22–24°C", inland: "20–28°C", mountains: "10–18°C", sahara: "30–35°C",
    crowds: { fr: "Moyen à Élevé", ar: "متوسط إلى مرتفع", en: "Medium–High" },
    rain: { fr: "Faible", ar: "خفيفة", en: "Light" },
    verdict: {
      fr: "Sommet du printemps. Climat idéal sur Marrakech, Fès et la côte. Pensez à réserver à l'avance.",
      ar: "ذروة الربيع. طقس مثالي في مراكش وفاس والساحل الأطلسي. يُنصح بالتحجيز المبكر.",
      en: "Peak spring. Marrakech, Fès, and the Atlantic coast are all ideal.",
    },
  },
  {
    month: { fr: "Mai", ar: "ماي", en: "May" },
    rating: 5,
    coast: "22–26°C", inland: "24–32°C", mountains: "15–22°C", sahara: "33–38°C",
    crowds: { fr: "Moyen", ar: "متوسط", en: "Medium" },
    rain: { fr: "Très faible", ar: "خفيفة جداً", en: "Very light" },
    verdict: {
      fr: "Dernier mois agréable pour les villes intérieures avant les fortes chaleurs. Côte et Atlas parfaits.",
      ar: "آخر فرصة للمدن الداخلية قبل حرارة الصيف. مناطق الساحل والجبال ممتعة للغاية.",
      en: "Last comfortable month for inland cities before summer heat. Coastal and mountain regions perfect.",
    },
  },
  {
    month: { fr: "Juin", ar: "يونيو", en: "June" },
    rating: 3,
    coast: "24–28°C", inland: "28–38°C", mountains: "20–28°C", sahara: "38–44°C",
    crowds: { fr: "Élevé", ar: "مرتفع", en: "High" },
    rain: { fr: "Minime", ar: "أدنى حد", en: "Minimal" },
    verdict: {
      fr: "Excellente période pour Agadir et Essaouira. Évitez les visites en milieu de journée à Marrakech et Fès.",
      ar: "ممتاز لأكادير والصويرة والساحل. تجنب التواجد في الشارع في منتصف النهار في مراكش وفاس.",
      en: "Good for coast and mountains. Avoid inland cities between 11am–4pm.",
    },
  },
  {
    month: { fr: "Juillet", ar: "يوليوز", en: "July" },
    rating: 2,
    coast: "25–30°C", inland: "35–44°C", mountains: "22–30°C", sahara: "42–48°C",
    crowds: { fr: "Pic estival", ar: "ذروة الصيف", en: "Peak" },
    rain: { fr: "Aucune", ar: "بدون أمطار", en: "None" },
    verdict: {
      fr: "Recommandé uniquement pour les plages de l'Atlantique et la Méditerranée. Chaleur caniculaire à l'intérieur.",
      ar: "موصى به فقط لشواطئ الأطلسي والمتوسط. حرارة مفرطة في المدن الداخلية والصحراء.",
      en: "Only recommended for Atlantic beaches. Marrakech and Fès are punishing (40°C+).",
    },
  },
  {
    month: { fr: "Août", ar: "غشت", en: "August" },
    rating: 2,
    coast: "26–30°C", inland: "36–45°C", mountains: "22–30°C", sahara: "42–48°C",
    crowds: { fr: "Pic estival", ar: "ذروة الصيف", en: "Peak" },
    rain: { fr: "Aucune", ar: "بدون أمطار", en: "None" },
    verdict: {
      fr: "Idem que juillet : privilégiez Agadir, Essaouira, Asilah et Taghazout. Intérieur très chaud.",
      ar: "نفس يوليو: ركز على الشواطئ مثل أكادير والصويرة وأصيلة وتغازوت.",
      en: "Same as July. Stick to the coast: Agadir, Essaouira, Asilah, Dakhla.",
    },
  },
  {
    month: { fr: "Septembre", ar: "شتنبر", en: "September" },
    rating: 4,
    coast: "24–28°C", inland: "28–36°C", mountains: "18–26°C", sahara: "36–42°C",
    crowds: { fr: "Moyen", ar: "متوسط", en: "Medium" },
    rain: { fr: "Rare", ar: "نادرة", en: "Rare" },
    verdict: {
      fr: "Mois de transition agréable. Les villes intérieures redeviennent praticables et les prix baissent.",
      ar: "شهر انتقالي لطيف. تعود المدن الداخلية للاعتدال وتبدأ الأسعار بالانخفاض.",
      en: "Transition month. Better than summer, prices begin to drop.",
    },
  },
  {
    month: { fr: "Octobre", ar: "أكتوبر", en: "October" },
    rating: 5,
    coast: "22–26°C", inland: "22–30°C", mountains: "12–20°C", sahara: "28–35°C",
    crowds: { fr: "Moyen", ar: "متوسط", en: "Medium" },
    rain: { fr: "Modérée au nord", ar: "معتدلة شمالاً", en: "Light–Medium" },
    verdict: {
      fr: "À égalité avec avril pour le titre du meilleur mois ! Températures idéales dans le Sahara et tout le Maroc.",
      ar: "منافس قوي لشهر أبريل كأفضل وقت للزيارة! درجات حرارة رائعة في الصحراء وجميع المناطق.",
      en: "Tied with April for best month. Sahara is perfect (cool nights, warm days).",
    },
  },
  {
    month: { fr: "Novembre", ar: "نونبر", en: "November" },
    rating: 4,
    coast: "20–23°C", inland: "16–24°C", mountains: "6–14°C", sahara: "22–28°C",
    crowds: { fr: "Faible", ar: "منخفض", en: "Low" },
    rain: { fr: "Modérée", ar: "معتدلة", en: "Medium" },
    verdict: {
      fr: "Très bon mois pour les circuits culturels et le Sahara. Tarifs avantageux et faible affluence.",
      ar: "شهر ممتاز للرحلات الثقافية والصحراء. أسعار منخفضة وقلة السياح.",
      en: "Great for budget travelers and Sahara enthusiasts.",
    },
  },
  {
    month: { fr: "Décembre", ar: "دجنبر", en: "December" },
    rating: 3,
    coast: "17–20°C", inland: "10–17°C", mountains: "−5–5°C", sahara: "18–23°C",
    crowds: { fr: "Faible (hors fêtes)", ar: "منخفض (باستثناء الأعياد)", en: "Low (High NYE)" },
    rain: { fr: "Élevée", ar: "مرتفعة", en: "High" },
    verdict: {
      fr: "Agréable pour le soleil d'hiver à Marrakech, Agadir et le Sahara. Début de la saison de ski à Oukaïmeden.",
      ar: "ممتع لشمس الشتاء في مراكش وأكادير والصحراء. بداية موسم التزلج في أوكايمدن.",
      en: "Good for Marrakech city breaks and Sahara tours. Skiing season opens.",
    },
  },
];

const STAR_COLORS: Record<number, string> = { 5: "#22c55e", 4: "#84cc16", 3: "#f59e0b", 2: "#ef4444" };

export default function BestTimeToVisitMoroccoPage({ params }: Props) {
  const locale = asLocale(params.locale);
  const isRtl = locale === "ar";

  const labels = {
    fr: {
      home: "Accueil",
      title: "Meilleure Période pour Visiter le Maroc",
      subtitle: "Guide de Voyage Mois par Mois",
      intro: "Des fleurs du printemps aux nuits fraîches du Sahara en hiver — trouvez le mois parfait pour votre voyage au Maroc selon votre destination.",
      quickTitle: "En Résumé",
      bestOverall: "Meilleure période globale",
      bestBeaches: "Meilleure saison plages",
      bestSahara: "Meilleure période Sahara",
      cheapest: "Mois les moins chers",
      monthsTitle: "Guide Mois par Mois du Climat Marocain",
      coast: "🌊 Côte",
      inland: "🏙️ Intérieur",
      mountains: "⛰️ Montagnes",
      sahara: "🏜️ Sahara",
      crowds: "👥 Affluence",
      rain: "🌧️ Pluie",
      allCities: "Voir les prévisions des villes →",
      climateGuide: "Guide des 6 zones climatiques →",
    },
    ar: {
      home: "الرئيسية",
      title: "أفضل وقت لزيارة المغرب",
      subtitle: "دليل السفر شهر بشهر",
      intro: "من أزهار الربيع إلى ليالي الصحراء المعتدلة شتاءً — اختر الشهر المثالي لرحلتك إلى المغرب حسب الوجهة ونوع النشاط.",
      quickTitle: "ملخص سريع",
      bestOverall: "أفضل فترة عامة",
      bestBeaches: "أفضل فترة للشواطئ",
      bestSahara: "أفضل فترة للصحراء",
      cheapest: "الأشهر الأكثر اقتصادية",
      monthsTitle: "دليل المناخ في المغرب شهر بشهر",
      coast: "🌊 الساحل",
      inland: "🏙️ الداخل",
      mountains: "⛰️ الجبال",
      sahara: "🏜️ الصحراء",
      crowds: "👥 الازدحام",
      rain: "🌧️ الأمطار",
      allCities: "توقعات المدن ←",
      climateGuide: "دليل المناطق المناخية ←",
    },
    en: {
      home: "Home",
      title: "Best Time to Visit Morocco",
      subtitle: "Month-by-Month Travel Guide",
      intro: "From spring wildflowers to winter desert nights — find the perfect month for your Morocco trip based on your destination and style.",
      quickTitle: "Quick Summary",
      bestOverall: "Best overall period",
      bestBeaches: "Best beach season",
      bestSahara: "Best Sahara period",
      cheapest: "Cheapest months",
      monthsTitle: "Morocco Month-by-Month Climate Guide",
      coast: "🌊 Coast",
      inland: "🏙️ Inland",
      mountains: "⛰️ Mountains",
      sahara: "🏜️ Sahara",
      crowds: "👥 Crowds",
      rain: "🌧️ Rain",
      allCities: "All City Forecasts →",
      climateGuide: "Climate Zone Guide →",
    },
  }[locale];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: labels.home, item: localizedUrl(locale) },
      { "@type": "ListItem", position: 2, name: labels.title, item: localizedUrl(locale, "/best-time-to-visit-morocco") },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: labels.title,
    description: labels.intro,
    url: localizedUrl(locale, "/best-time-to-visit-morocco"),
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
        <section style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9, #5b21b6)", padding: "4rem 0 3rem", color: "#fff" }}>
          <div className="container">
            <nav style={{ fontSize: "0.85rem", opacity: 0.85, marginBottom: "1rem" }}>
              <Link href={`/${locale}`} style={{ color: "#c4b5fd", textDecoration: "none" }}>{labels.home}</Link>
              <span style={{ margin: "0 0.4rem" }}>›</span>
              <span>{labels.title}</span>
            </nav>
            <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.2 }}>
              {labels.title}
              <br />
              <span style={{ color: "#c4b5fd" }}>{labels.subtitle}</span>
            </h1>
            <p style={{ fontSize: "1.05rem", opacity: 0.9, maxWidth: 640, lineHeight: 1.8 }}>
              {labels.intro}
            </p>
          </div>
        </section>

        <div className="container" style={{ maxWidth: 960, padding: "3rem 1rem" }}>
          <EditorialDisclosure locale={locale} />

          {/* Quick Summary Banner */}
          <section style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)", border: "1px solid #86efac", borderRadius: "var(--radius-lg)", padding: "1.5rem 2rem", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#166534", marginBottom: "0.75rem" }}>
              {labels.quickTitle}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              {[
                { label: labels.bestOverall, value: "Mars–Mai & Octobre", icon: "🏆" },
                { label: labels.bestBeaches, value: "Juin–Septembre", icon: "🏖️" },
                { label: labels.bestSahara, value: "Octobre–Avril", icon: "🏜️" },
                { label: labels.cheapest, value: "Janvier & Novembre", icon: "💰" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#166534", fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: "0.9rem", color: "#15803d", fontWeight: 700 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Month by Month */}
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--color-text)" }}>
              {labels.monthsTitle}
            </h2>
            <div style={{ display: "grid", gap: "1rem" }}>
              {MONTHS.map((m) => (
                <div key={m.month.en} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.5rem", borderLeft: `4px solid ${STAR_COLORS[m.rating] || "#0369a1"}` }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                    <div style={{ minWidth: 120 }}>
                      <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--color-text)" }}>
                        {m.month[locale]}
                      </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.4rem 1rem", marginBottom: "0.75rem", fontSize: "0.8rem" }}>
                        <div>{labels.coast}: <strong>{m.coast}</strong></div>
                        <div>{labels.inland}: <strong>{m.inland}</strong></div>
                        <div>{labels.mountains}: <strong>{m.mountains}</strong></div>
                        <div>{labels.sahara}: <strong>{m.sahara}</strong></div>
                      </div>
                      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                        <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", padding: "0.15rem 0.6rem", borderRadius: "var(--radius-full)", fontSize: "0.75rem" }}>
                          {labels.crowds}: {m.crowds[locale]}
                        </span>
                        <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", padding: "0.15rem 0.6rem", borderRadius: "var(--radius-full)", fontSize: "0.75rem" }}>
                          {labels.rain}: {m.rain[locale]}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.65 }}>
                        {m.verdict[locale]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <AuthorBio locale={locale} />

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href={`/${locale}/cities`} style={{ background: "var(--color-primary)", color: "#fff", padding: "0.75rem 2rem", borderRadius: "var(--radius-full)", fontWeight: 700, textDecoration: "none" }}>
              {labels.allCities}
            </Link>
            <Link href={`/${locale}/morocco-climate-guide`} style={{ background: "var(--color-surface)", color: "var(--color-primary)", padding: "0.75rem 2rem", borderRadius: "var(--radius-full)", fontWeight: 700, textDecoration: "none", border: "1px solid var(--color-border)" }}>
              {labels.climateGuide}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

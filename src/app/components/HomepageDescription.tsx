"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/app/lib/LanguageContext";
import image1 from "../../assets/img/Agadir.jpg";
import image2 from "../../assets/img/Rabat.jpg";
import image3 from "../../assets/img/Casablanca.jpg";

const FEATURES_COPY = {
  fr: [
    { icon: "🕐", title: "Temps Réel",       description: "Données météo mises à jour toutes les 10 minutes pour une précision maximale." },
    { icon: "📅", title: "Prévisions 14 Jours", description: "Planifiez à l'avance avec des prévisions détaillées sur deux semaines." },
    { icon: "🗺️", title: "75+ Villes",       description: "Couverture complète du Maroc, des grandes villes aux zones rurales." },
    { icon: "📱", title: "Adapté Mobile",    description: "Consultez la météo n'importe où, depuis n'importe quel appareil." },
  ],
  ar: [
    { icon: "🕐", title: "الوقت الفعلي",       description: "تحديثات الطقس كل 10 دقائق لأقصى دقة ممكنة." },
    { icon: "📅", title: "توقعات 14 يوماً",   description: "خطط مسبقاً مع توقعات تفصيلية تمتد لأسبوعين كاملين." },
    { icon: "🗺️", title: "+75 مدينة",         description: "تغطية شاملة للمغرب من كبرى المدن إلى المناطق الريفية." },
    { icon: "📱", title: "متوافق مع الهاتف", description: "اطّلع على حالة الطقس في أي وقت ومن أي جهاز." },
  ],
  en: [
    { icon: "🕐", title: "Real-Time Data",    description: "Weather data updated every 10 minutes for maximum accuracy." },
    { icon: "📅", title: "14-Day Forecasts",  description: "Plan ahead with detailed two-week weather forecasts." },
    { icon: "🗺️", title: "75+ Cities",        description: "Complete Morocco coverage, from major cities to rural areas." },
    { icon: "📱", title: "Mobile-Ready",      description: "Check the weather anywhere, from any device." },
  ],
};

const articles = [
  {
    image: image1,
    alt: "Météo à Agadir, Maroc",
    city: "Agadir",
    title: "Météo et Tourisme à Agadir",
    excerpt:
      "Agadir jouit d'un microclimat exceptionnel avec plus de 300 jours de soleil par an. Idéal pour les amoureux de la plage.",
  },
  {
    image: image2,
    alt: "Météo à Rabat, Maroc",
    city: "Rabat",
    title: "Prévisions pour la Capitale",
    excerpt:
      "Rabat bénéficie d'un climat méditerranéen tempéré, avec des étés chauds et des hivers doux sur la côte atlantique.",
  },
  {
    image: image3,
    alt: "Météo à Casablanca, Maroc",
    city: "Casablanca",
    title: "Casablanca : Météo Urbaine",
    excerpt:
      "Casablanca, moteur économique du Maroc, présente un climat typiquement atlantique avec des températures agréables toute l'année.",
  },
];

const SECTION_COPY = {
  fr: {
    whyBadge: "Pourquoi nous choisir",
    whyTitle: "La Météo du Maroc, Simplement",
    whyDesc: "MeteoAuMaroc vous offre une expérience météo précise, rapide et accessible pour toutes les villes du Maroc.",
    destBadge: "Météo & Destinations",
    destTitle: "Découvrez la Météo de vos Destinations",
    seoBadge: "MeteoAuMaroc.com",
    seoTitle: "MeteoAuMaroc.com – Votre Source pour des Prévisions Météo Précises au Maroc",
    seoBlocks: [
      {
        title: "Prévisions en Temps Réel",
        text: "Sur MeteoAuMaroc.com, nous vous offrons des mises à jour météo en temps réel pour toutes les villes du Maroc. Que vous vérifiez la météo du jour ou que vous planifiiez les prochains jours, nos données précises vous permettent de rester informé.",
      },
      {
        title: "Planifiez vos Voyages",
        text: "Si vous envisagez de voyager au Maroc, MeteoAuMaroc.com vous fournit toutes les informations météorologiques nécessaires. Des rapports détaillés pour les destinations touristiques incluant les villes côtières comme Agadir et les montagnes de l'Atlas.",
      },
      {
        title: "Restez Informé sur le Climat",
        text: "MeteoAuMaroc.com offre aussi des informations sur les températures moyennes mois par mois. Découvrez les meilleures périodes de l'année pour visiter les différentes régions du Maroc, que vous cherchiez du soleil ou de la fraîcheur.",
      },
    ],
  },
  ar: {
    whyBadge: "لماذا تختارنا",
    whyTitle: "طقس المغرب ببساطة",
    whyDesc: "MeteoAuMaroc يقدم لك تجربة طقس دقيقة وسريعة لجميع مدن المغرب.",
    destBadge: "الطقس والوجهات",
    destTitle: "اكتشف طقس وجهاتك",
    seoBadge: "MeteoAuMaroc.com",
    seoTitle: "MeteoAuMaroc.com – مصدرك الموثوق لتوقعات الطقس في المغرب",
    seoBlocks: [
      {
        title: "توقعات فورية",
        text: "يقدم MeteoAuMaroc.com تحديثات طقس فورية لجميع مدن المغرب. سواء كنت تتحقق من طقس اليوم أو تخطط للأيام القادمة، بياناتنا الدقيقة تجعلك دائماً على اطلاع.",
      },
      {
        title: "خطط لرحلاتك",
        text: "إذا كنت تفكر في السفر إلى المغرب، يوفر لك MeteoAuMaroc.com جميع المعلومات الجوية اللازمة. تقارير تفصيلية للوجهات السياحية من المدن الساحلية كأكادير إلى جبال الأطلس.",
      },
      {
        title: "ابق على اطلاع بالمناخ",
        text: "يوفر MeteoAuMaroc.com أيضاً معلومات عن متوسط درجات الحرارة شهراً بشهر. اكتشف أفضل أوقات السنة لزيارة مختلف مناطق المغرب.",
      },
    ],
  },
  en: {
    whyBadge: "Why choose us",
    whyTitle: "Morocco's Weather, Made Simple",
    whyDesc: "MeteoAuMaroc gives you accurate, fast and accessible weather for every city in Morocco.",
    destBadge: "Weather & Destinations",
    destTitle: "Discover the Weather at Your Destinations",
    seoBadge: "MeteoAuMaroc.com",
    seoTitle: "MeteoAuMaroc.com – Your Source for Accurate Weather Forecasts in Morocco",
    seoBlocks: [
      {
        title: "Real-Time Forecasts",
        text: "MeteoAuMaroc.com provides real-time weather updates for all cities in Morocco. Whether you're checking today's weather or planning the next few days, our accurate data keeps you informed.",
      },
      {
        title: "Plan Your Trips",
        text: "Planning a trip to Morocco? MeteoAuMaroc.com gives you all the weather information you need — from coastal cities like Agadir to the Atlas Mountains and the Sahara Desert.",
      },
      {
        title: "Stay Informed About the Climate",
        text: "MeteoAuMaroc.com also offers monthly average temperature data. Discover the best times of year to visit different regions of Morocco, whether you're seeking sun or cooler weather.",
      },
    ],
  },
};

export default function HomepageDescription() {
  const { t, locale } = useLanguage();
  const copy = SECTION_COPY[locale] ?? SECTION_COPY.fr;
  const features = FEATURES_COPY[locale] ?? FEATURES_COPY.fr;
  return (
    <>
      {/* ── Feature Highlights ──────────────────────────────── */}
      <section
        style={{
          padding: "5rem 0",
          background: "linear-gradient(180deg, var(--color-bg) 0%, var(--color-surface) 100%)",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--color-primary-light)",
                borderRadius: "var(--radius-full)",
                padding: "0.35rem 1rem",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {copy.whyBadge}
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                fontWeight: 800,
                marginBottom: "0.75rem",
                letterSpacing: "-0.02em",
              }}
            >
              {copy.whyTitle}
            </h2>
            <p
              style={{
                color: "var(--color-text-muted)",
                maxWidth: 500,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              {copy.whyDesc}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                className="card"
                style={{ padding: "1.75rem 1.5rem" }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    marginBottom: "0.875rem",
                    lineHeight: 1,
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.0625rem",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                    color: "var(--color-text)",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO Content + City Articles ─────────────────────── */}
      <section
        id="ARTICLES"
        style={{
          padding: "5rem 0",
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--color-primary-light)",
                borderRadius: "var(--radius-full)",
                padding: "0.35rem 1rem",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {copy.destBadge}
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                fontWeight: 800,
                marginBottom: "0.75rem",
                letterSpacing: "-0.02em",
              }}
            >
              {copy.destTitle}
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {articles.map((article) => (
              <article
                key={article.city}
                className="card"
                style={{ overflow: "hidden", padding: 0 }}
              >
                {/* Image */}
                <div
                  style={{
                    position: "relative",
                    height: 200,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={article.image}
                    alt={article.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                    className="article-img"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      bottom: "0.75rem",
                      insetInlineStart: "1rem",
                      background: "var(--color-primary)",
                      color: "#fff",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "0.2rem 0.65rem",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    {article.city}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: "1.25rem 1.5rem" }}>
                  <h3
                    style={{
                      fontSize: "1.0625rem",
                      fontWeight: 700,
                      color: "var(--color-text)",
                      marginBottom: "0.5rem",
                      lineHeight: 1.35,
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-text-muted)",
                      lineHeight: 1.7,
                      margin: "0 0 1rem",
                    }}
                  >
                    {article.excerpt}
                  </p>
                  <a
                    href={`/cities/${article.city.toLowerCase()}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--color-primary)",
                      flexDirection: locale === "ar" ? "row-reverse" : "row",
                    }}
                  >
                    {t("cities.viewWeather")}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ transform: locale === "ar" ? "scaleX(-1)" : "none" }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Main SEO paragraph */}
          <div
            style={{
              marginTop: "4rem",
              padding: "2.5rem",
              background: "var(--color-bg)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h2
              style={{
                fontSize: "1.375rem",
                fontWeight: 700,
                marginBottom: "1rem",
                color: "var(--color-text)",
              }}
            >
              {copy.seoTitle}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {copy.seoBlocks.map((item) => (
                <div key={item.title}>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--color-text)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--color-text-muted)",
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .article-img { transition: transform 0.4s ease !important; }
        .card:hover .article-img { transform: scale(1.05); }
      `}</style>
    </>
  );
}

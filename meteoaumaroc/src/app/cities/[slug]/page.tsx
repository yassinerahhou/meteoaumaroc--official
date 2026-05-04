import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES_BY_SLUG, ALL_CITY_SLUGS } from "@/app/lib/cities";
import { getCityClimate, MONTH_NAMES_FR } from "@/app/lib/monthlyClimate";
import CityWeatherPage from "../CityWeatherPage";

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return ALL_CITY_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const city = CITIES_BY_SLUG[params.slug];
  if (!city) return { title: "Ville introuvable" };

  const BASE = "https://www.meteoaumaroc.com";
  const title       = `Météo ${city.name} aujourd'hui – Prévisions 14 jours | MeteoAuMaroc`;
  const description = `✅ Météo ${city.name} en temps réel : température actuelle, prévisions 14 jours, humidité, vent, lever du soleil et qualité de l'air. Données OpenWeatherMap pour ${city.name}, Maroc.`;
  const url         = `${BASE}/cities/${city.slug}`;

  return {
    title,
    description,
    keywords: [
      `météo ${city.name.toLowerCase()}`,
      `meteo ${city.name.toLowerCase()}`,
      `weather ${city.name.toLowerCase()}`,
      `prévisions ${city.name.toLowerCase()}`,
      `طقس ${city.nameAr ?? city.name}`,
      `الطقس في ${city.nameAr ?? city.name}`,
      `météo ${city.region.toLowerCase()}`,
      "météo maroc",
      "weather morocco",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "MeteoAuMaroc",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const BASE = "https://www.meteoaumaroc.com";

function buildSchemas(city: NonNullable<(typeof CITIES_BY_SLUG)[string]>) {
  const climate = getCityClimate(city.slug);
  const url     = `${BASE}/cities/${city.slug}`;

  // ── BreadcrumbList ──────────────────────────────────────────────
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil",            item: BASE },
      { "@type": "ListItem", position: 2, name: "Météo villes Maroc", item: `${BASE}/cities` },
      { "@type": "ListItem", position: 3, name: `Météo ${city.name}`, item: url },
    ],
  };

  // ── City + WebPage ──────────────────────────────────────────────
  const citySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Météo ${city.name}`,
    url,
    description: city.description,
    breadcrumb: { "@type": "BreadcrumbList", itemListElement: breadcrumb.itemListElement },
    inLanguage: ["fr", "ar", "en"],
    about: {
      "@type": "City",
      name: city.name,
      alternateName: city.nameAr,
      containedInPlace: { "@type": "Country", name: "Maroc", alternateName: "المغرب" },
    },
  };

  // ── FAQPage ─────────────────────────────────────────────────────
  const bestStr = climate.bestMonths.map((i) => MONTH_NAMES_FR[i]).join(", ");
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle est la météo actuelle à ${city.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Consultez le widget météo en temps réel en haut de cette page. Les données pour ${city.name} sont actualisées toutes les 10 minutes via OpenWeatherMap.`,
        },
      },
      {
        "@type": "Question",
        name: `Quelle est la meilleure période pour visiter ${city.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `La meilleure période pour visiter ${city.name} est ${bestStr}. Ces mois offrent des températures agréables (${climate.months[climate.bestMonths[0]].high}°C en moyenne), peu de précipitations et un ensoleillement optimal.`,
        },
      },
      {
        "@type": "Question",
        name: `Quelle est la température moyenne en été à ${city.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `En été (juin–août), les températures à ${city.name} atteignent ${climate.months[6].high}°C le jour et descendent à ${climate.months[6].low}°C la nuit. Le mois le plus chaud est généralement août avec ${climate.months[7].high}°C.`,
        },
      },
      {
        "@type": "Question",
        name: `Pleut-il souvent à ${city.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${city.name} reçoit environ ${climate.months[0].rain} mm de pluie en janvier, contre seulement ${climate.months[6].rain} mm en juillet. La saison des pluies s'étend d'octobre à mars. Le total annuel varie de 200 à 400 mm selon le climat de la région.`,
        },
      },
      {
        "@type": "Question",
        name: `Quel est le mois le plus chaud à ${city.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le mois le plus chaud à ${city.name} est août avec une température maximale de ${climate.months[7].high}°C. Juillet arrive en deuxième position avec ${climate.months[6].high}°C. Ces mois sont aussi les plus secs de l'année.`,
        },
      },
      {
        "@type": "Question",
        name: `Quel est le mois le plus froid à ${city.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Janvier est le mois le plus froid à ${city.name}, avec des températures minimales d'environ ${climate.months[0].low}°C la nuit et ${climate.months[0].high}°C le jour. Les gelées sont rares sur la côte atlantique.`,
        },
      },
    ],
  };

  return [breadcrumb, citySchema, faqPage];
}

export default function CityPage({ params }: Props) {
  const city = CITIES_BY_SLUG[params.slug];
  if (!city) notFound();

  const schemas = buildSchemas(city);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CityWeatherPage
        key={city.slug}
        cityName={city.name}
        slug={city.slug}
        lat={city.lat}
        lon={city.lon}
        region={city.region}
        description={city.description}
        descriptionAr={city.descriptionAr}
        descriptionEn={city.descriptionEn}
      />
    </>
  );
}

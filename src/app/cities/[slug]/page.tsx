import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityWeatherPage from "../CityWeatherPage";
import { MOROCCAN_CITIES } from "@/app/lib/cities";
import { getCityClimate, MONTH_NAMES_FR } from "@/app/lib/monthlyClimate";
import { getForecastData, getWeatherData } from "@/app/lib/openWeather";

interface Props {
  params: { slug: string };
}

const BASE_URL = "https://www.meteoaumaroc.com";
const CITIES_BY_SLUG = Object.fromEntries(MOROCCAN_CITIES.map((city) => [city.slug, city]));

export const dynamicParams = false;

export function generateStaticParams() {
  return MOROCCAN_CITIES.map((city) => ({ slug: city.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const city = CITIES_BY_SLUG[params.slug];
  if (!city) {
    return { title: "Ville introuvable | MeteoAuMaroc" };
  }

  const title = `Météo ${city.name} aujourd'hui – Prévisions 14 jours | MeteoAuMaroc`;
  const description = `Météo ${city.name} en temps réel : température actuelle, prévisions 14 jours, humidité, vent, lever du soleil et qualité de l'air.`;
  const url = `${BASE_URL}/cities/${city.slug}`;

  return {
    title,
    description,
    keywords: [
      `météo ${city.name.toLowerCase()}`,
      `meteo ${city.name.toLowerCase()}`,
      `weather ${city.name.toLowerCase()}`,
      `prévisions ${city.name.toLowerCase()}`,
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
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `Météo ${city.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image"],
    },
  };
}

function buildSchemas(city: (typeof MOROCCAN_CITIES)[number]) {
  const climate = getCityClimate(city.slug);
  const url = `${BASE_URL}/cities/${city.slug}`;
  const bestMonths = climate.bestMonths.map((index) => MONTH_NAMES_FR[index]).join(", ");

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Météo villes Maroc", item: `${BASE_URL}/cities` },
        { "@type": "ListItem", position: 3, name: `Météo ${city.name}`, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Météo ${city.name}`,
      url,
      description: city.description,
      inLanguage: ["fr", "ar", "en"],
      about: {
        "@type": "City",
        name: city.name,
        alternateName: city.nameAr,
        containedInPlace: { "@type": "Country", name: "Maroc" },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `Quelle est la météo actuelle à ${city.name} ?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Consultez le widget météo en temps réel en haut de cette page. Les données pour ${city.name} sont actualisées toutes les 10 minutes.`,
          },
        },
        {
          "@type": "Question",
          name: `Quelle est la meilleure période pour visiter ${city.name} ?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `La meilleure période pour visiter ${city.name} est ${bestMonths}. Ces mois offrent en général des températures plus agréables et moins de pluie.`,
          },
        },
      ],
    },
  ];
}

export default async function CityPage({ params }: Props) {
  const city = CITIES_BY_SLUG[params.slug];
  if (!city) {
    notFound();
  }

  const [initialWeather, initialForecast] = await Promise.all([
    getWeatherData(String(city.lat), String(city.lon), "fr"),
    getForecastData(String(city.lat), String(city.lon), "fr"),
  ]);

  const schemas = buildSchemas(city);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CityWeatherPage
        cityName={city.name}
        slug={city.slug}
        lat={city.lat}
        lon={city.lon}
        region={city.region}
        description={city.description}
        descriptionAr={city.descriptionAr}
        descriptionEn={city.descriptionEn}
        initialWeather={initialWeather}
        initialForecast={initialForecast}
        initialLocale="fr"
      />
    </>
  );
}

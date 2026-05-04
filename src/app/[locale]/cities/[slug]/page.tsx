import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityWeatherPage from "@/app/[locale]/cities/CityWeatherPage";
import { MOROCCAN_CITIES } from "@/app/lib/cities";
import { getCityClimate, MONTH_NAMES_FR } from "@/app/lib/monthlyClimate";
import { getForecastData, getWeatherData } from "@/app/lib/openWeather";

interface Props {
  params: { slug: string; locale: string };
}

const BASE_URL = "https://www.meteoaumaroc.com";
const CITIES_BY_SLUG = Object.fromEntries(MOROCCAN_CITIES.map((city) => [city.slug, city]));

export const dynamicParams = false;

export function generateStaticParams() {
  const locales = ["fr", "ar", "en"];
  const params: { slug: string; locale: string }[] = [];
  
  locales.forEach((locale) => {
    MOROCCAN_CITIES.forEach((city) => {
      params.push({ slug: city.slug, locale });
    });
  });
  
  return params;
}

export function generateMetadata({ params }: Props): Metadata {
  const city = CITIES_BY_SLUG[params.slug];
  const locale = params.locale as "fr" | "ar" | "en";
  if (!city) {
    return { title: "Ville introuvable | MeteoAuMaroc" };
  }

  // Basic localized titles/descriptions (can be improved with i18n keys)
  const title = locale === "ar" 
    ? `حالة الطقس في ${city.nameAr || city.name} اليوم – توقعات 14 يوماً | MeteoAuMaroc`
    : `Météo ${city.name} aujourd'hui – Prévisions 14 jours | MeteoAuMaroc`;
    
  const description = locale === "ar"
    ? `طقس ${city.nameAr || city.name} في الوقت الفعلي: درجة الحرارة الحالية، توقعات 14 يوماً، الرطوبة، الرياح، شروق الشمس وجودة الهواء.`
    : `Météo ${city.name} en temps réel : température actuelle, prévisions 14 jours, humidité, vent, lever du soleil et qualité de l'air.`;
    
  const url = `${BASE_URL}/${locale}/cities/${city.slug}`;

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

function buildSchemas(city: (typeof MOROCCAN_CITIES)[number], locale: string) {
  const url = `${BASE_URL}/${locale}/cities/${city.slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/${locale}` },
        { "@type": "ListItem", position: 2, name: "Météo villes Maroc", item: `${BASE_URL}/${locale}/cities` },
        { "@type": "ListItem", position: 3, name: `Météo ${city.name}`, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Météo ${city.name}`,
      url,
      description: city.description,
      inLanguage: [locale],
      about: {
        "@type": "City",
        name: city.name,
        alternateName: city.nameAr,
        containedInPlace: { "@type": "Country", name: "Maroc" },
      },
    },
  ];
}

export default async function CityPage({ params }: Props) {
  const { slug, locale } = params;
  const city = CITIES_BY_SLUG[slug];
  if (!city) {
    notFound();
  }

  const [initialWeather, initialForecast] = await Promise.all([
    getWeatherData(String(city.lat), String(city.lon), locale),
    getForecastData(String(city.lat), String(city.lon), locale),
  ]);

  const schemas = buildSchemas(city, locale);

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
        initialLocale={locale as "fr" | "ar" | "en"}
      />
    </>
  );
}

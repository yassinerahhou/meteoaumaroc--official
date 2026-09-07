import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityWeatherPage from "@/app/[locale]/cities/CityWeatherPage";
import { MOROCCAN_CITIES } from "@/app/lib/cities";
import { asLocale, localizedAlternates, localizedUrl } from "@/app/lib/site";

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
  const locale = asLocale(params.locale);
  if (!city) {
    return { title: "Ville introuvable | MeteoAuMaroc" };
  }

  // Basic localized titles/descriptions (can be improved with i18n keys)
  const title = locale === "ar" 
    ? `حالة الطقس في ${city.nameAr || city.name} اليوم – توقعات 5 أيام | MeteoAuMaroc`
    : locale === "en"
    ? `${city.name} Weather Today – 5-Day Forecast | MeteoAuMaroc`
    : `Météo ${city.name} aujourd'hui – Prévisions 5 jours | MeteoAuMaroc`;
    
  const description = locale === "ar"
    ? `طقس ${city.nameAr || city.name} في الوقت الفعلي: درجة الحرارة الحالية، توقعات 5 أيام، الرطوبة، الرياح، شروق الشمس وجودة الهواء.`
    : locale === "en"
    ? `Live ${city.name} weather: current temperature, 5-day forecast, rain, humidity, wind, sunrise, and air-quality information.`
    : `Météo ${city.name} en temps réel : température actuelle, prévisions 5 jours, humidité, vent, lever du soleil et qualité de l'air.`;
    
  const url = localizedUrl(locale, `/cities/${city.slug}`);

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
    alternates: localizedAlternates(locale, `/cities/${city.slug}`),
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

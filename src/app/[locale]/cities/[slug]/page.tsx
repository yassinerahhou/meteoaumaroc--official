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

  // Dynamic Date formatting
  const now = new Date();
  const dateStrFr = new Intl.DateTimeFormat('fr', { day: 'numeric', month: 'long' }).format(now);
  const dateStrEn = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric' }).format(now);
  const dateStrAr = new Intl.DateTimeFormat('ar-MA', { day: 'numeric', month: 'long' }).format(now);

  const title = locale === "ar" 
    ? `الطقس في ${city.nameAr || city.name} (${dateStrAr}) ☀️ توقعات 15 يوم | MeteoAuMaroc`
    : locale === "en"
    ? `${city.name} Weather (${dateStrEn}) ☀️ 15-Day Forecast & Hourly | MeteoAuMaroc`
    : `Météo ${city.name} (${dateStrFr}) ☀️ Prévisions 15 jours & Heure par heure`;
    
  const description = locale === "ar"
    ? `طقس ${city.nameAr || city.name} في الوقت الفعلي: درجة الحرارة الحالية، توقعات 15 أيام، الرطوبة، الرياح، شروق الشمس وجودة الهواء.`
    : locale === "en"
    ? `Live ${city.name} weather: current temperature, 15-day forecast, rain, humidity, wind, sunrise, and air-quality information.`
    : `Météo ${city.name} en temps réel : température actuelle, prévisions 15 jours, humidité, vent, lever du soleil et qualité de l'air.`;
    
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": locale === 'fr' ? `Quel temps fait-il à ${city.name} aujourd'hui ?` : locale === 'en' ? `What is the weather like in ${city.name} today?` : `ما هي حالة الطقس في ${city.nameAr || city.name} اليوم؟`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'fr' ? `Consultez les conditions météorologiques actuelles pour ${city.name}, y compris la température, l'humidité et le vent sur notre page.` : locale === 'en' ? `Check the current weather conditions for ${city.name}, including temperature, humidity, and wind on our page.` : `تحقق من حالة الطقس الحالية في ${city.nameAr || city.name}، بما في ذلك درجة الحرارة والرطوبة والرياح على صفحتنا.`
        }
      },
      {
        "@type": "Question",
        "name": locale === 'fr' ? `Quelles sont les prévisions météo à 15 jours pour ${city.name} ?` : locale === 'en' ? `What is the 15-day weather forecast for ${city.name}?` : `ما هي توقعات الطقس لمدة 15 يومًا في ${city.nameAr || city.name}؟`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'fr' ? `Nous proposons des prévisions détaillées sur 15 jours pour ${city.name} afin de vous aider à planifier vos activités.` : locale === 'en' ? `We provide detailed 15-day forecasts for ${city.name} to help you plan your activities.` : `نقدم توقعات مفصلة لمدة 15 يومًا في ${city.nameAr || city.name} لمساعدتك في التخطيط لأنشطتك.`
        }
      }
    ]
  };

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
    faqSchema
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
        description={city.description || ""}
        descriptionAr={city.descriptionAr}
        descriptionEn={city.descriptionEn}
        initialWeather={initialWeather}
        initialForecast={initialForecast}
        initialLocale={locale as "fr" | "ar" | "en"}
      />
    </>
  );
}

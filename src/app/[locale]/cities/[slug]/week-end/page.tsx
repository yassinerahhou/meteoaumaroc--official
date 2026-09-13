import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityWeatherPage from "@/app/[locale]/cities/CityWeatherPage";
import { MOROCCAN_CITIES } from "@/app/lib/cities";
import { asLocale, localizedAlternates, localizedUrl } from "@/app/lib/site";
import { getForecastData, getWeatherData } from "@/app/lib/openWeather";

interface Props {
  params: { slug: string; locale: string };
}

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
  if (!city) return { title: "Ville introuvable | MeteoAuMaroc" };

  const now = new Date();
  const dateStrFr = new Intl.DateTimeFormat('fr', { month: 'long', year: 'numeric' }).format(now);
  const dateStrEn = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(now);
  const dateStrAr = new Intl.DateTimeFormat('ar-MA', { month: 'long', year: 'numeric' }).format(now);

  const title = locale === "ar" 
    ? `طقس عطلة نهاية الأسبوع في ${city.nameAr || city.name} (${dateStrAr}) | MeteoAuMaroc`
    : locale === "en"
    ? `${city.name} Weekend Weather Forecast (${dateStrEn}) | MeteoAuMaroc`
    : `Météo ce Week-end à ${city.name} (${dateStrFr}) ☀️ Prévisions`;
    
  const description = locale === "ar"
    ? `اكتشف حالة الطقس المتوقعة لعطلة نهاية الأسبوع في ${city.nameAr || city.name}. استعد لأنشطتك مع توقعات دقيقة للحرارة والأمطار.`
    : locale === "en"
    ? `Check the weekend weather forecast for ${city.name}. Plan your weekend activities with accurate temperature and rain predictions.`
    : `Découvrez les prévisions météo pour ce week-end à ${city.name}. Planifiez vos sorties avec nos prévisions de pluie, vent et température.`;
    
  const url = localizedUrl(locale, `/cities/${city.slug}/week-end`);

  return {
    title, description,
    alternates: localizedAlternates(locale, `/cities/${city.slug}/week-end`),
    openGraph: { title, description, url, type: "website", siteName: "MeteoAuMaroc" },
  };
}

export default async function WeekendPage({ params }: Props) {
  const { slug, locale } = params;
  const city = CITIES_BY_SLUG[slug];
  if (!city) notFound();

  const [initialWeather, initialForecast] = await Promise.all([
    getWeatherData(String(city.lat), String(city.lon), locale),
    getForecastData(String(city.lat), String(city.lon), locale),
  ]);

  return (
    <>
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

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
  const dateStrFr = new Intl.DateTimeFormat('fr', { day: 'numeric', month: 'long' }).format(now);
  const dateStrEn = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric' }).format(now);
  const dateStrAr = new Intl.DateTimeFormat('ar-MA', { day: 'numeric', month: 'long' }).format(now);

  const title = locale === "ar" 
    ? `توقعات الطقس لمدة 15 يوماً في ${city.nameAr || city.name} (${dateStrAr}) | MeteoAuMaroc`
    : locale === "en"
    ? `${city.name} 15-Day Weather Forecast (${dateStrEn}) | MeteoAuMaroc`
    : `Météo 15 jours à ${city.name} (${dateStrFr}) ☀️ Prévisions détaillées`;
    
  const description = locale === "ar"
    ? `توقعات الطقس المفصلة لمدة 15 يوماً في ${city.nameAr || city.name}. تعرف على درجات الحرارة والأمطار والرياح للأيام القادمة.`
    : locale === "en"
    ? `Detailed 15-day weather forecast for ${city.name}. Find out temperature, rain, and wind for the upcoming days.`
    : `Prévisions météo détaillées à 15 jours pour ${city.name}. Découvrez les températures, la pluie et le vent pour les prochains jours.`;
    
  const url = localizedUrl(locale, `/cities/${city.slug}/15-jours`);

  return {
    title, description,
    alternates: localizedAlternates(locale, `/cities/${city.slug}/15-jours`),
    openGraph: { title, description, url, type: "website", siteName: "MeteoAuMaroc" },
  };
}

export default async function FifteenDaysPage({ params }: Props) {
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

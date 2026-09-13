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
    ? `الطقس في ${city.nameAr || city.name} ساعة بساعة (${dateStrAr}) | MeteoAuMaroc`
    : locale === "en"
    ? `${city.name} Hourly Weather Forecast (${dateStrEn}) | MeteoAuMaroc`
    : `Météo heure par heure à ${city.name} (${dateStrFr}) ☀️ Prévisions précises`;
    
  const description = locale === "ar"
    ? `توقعات الطقس ساعة بساعة في ${city.nameAr || city.name}. تابع درجات الحرارة والأمطار وسرعة الرياح بالتفصيل لكل ساعة من اليوم.`
    : locale === "en"
    ? `Detailed hourly weather forecast for ${city.name}. Track temperature, rain, and wind speed hour by hour for today and tomorrow.`
    : `Prévisions météo heure par heure à ${city.name}. Suivez avec précision les températures, la pluie et le vent pour chaque heure de la journée.`;
    
  const url = localizedUrl(locale, `/cities/${city.slug}/heure-par-heure`);

  return {
    title, description,
    alternates: localizedAlternates(locale, `/cities/${city.slug}/heure-par-heure`),
    openGraph: { title, description, url, type: "website", siteName: "MeteoAuMaroc" },
  };
}

export default async function HourlyPage({ params }: Props) {
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

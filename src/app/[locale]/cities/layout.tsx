import type { Metadata } from "next";
import { MOROCCAN_CITIES } from "@/app/lib/cities";
import { asLocale, localizedAlternates, localizedUrl } from "@/app/lib/site";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = asLocale(params.locale);
  const copy = {
    fr: {
      title: "Météo de toutes les villes du Maroc",
      description: `Consultez la météo actuelle et les prévisions de ${MOROCCAN_CITIES.length} villes du Maroc, classées par région.`,
    },
    ar: {
      title: "الطقس في جميع مدن المغرب",
      description: `اطلع على حالة الطقس والتوقعات في ${MOROCCAN_CITIES.length} مدينة مغربية مرتبة حسب المنطقة.`,
    },
    en: {
      title: "Weather for Cities Across Morocco",
      description: `Browse current weather and forecasts for ${MOROCCAN_CITIES.length} Moroccan cities, organized by region.`,
    },
  }[locale];
  const url = localizedUrl(locale, "/cities");

  return {
    title: copy.title,
    description: copy.description,
    alternates: localizedAlternates(locale, "/cities"),
    openGraph: { title: copy.title, description: copy.description, url },
  };
}

export default function CitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

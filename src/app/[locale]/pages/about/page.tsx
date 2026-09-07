import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import { asLocale, localizedAlternates, localizedUrl } from "@/app/lib/site";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = asLocale(params.locale);
  const copy = {
    fr: { title: "À propos de MeteoAuMaroc", description: "Découvrez qui publie MeteoAuMaroc, comment nos données météo sont traitées et comment nous corrigeons nos contenus." },
    ar: { title: "حول MeteoAuMaroc", description: "تعرف على الجهة الناشرة لموقع MeteoAuMaroc وكيفية معالجة بيانات الطقس وتصحيح المحتوى." },
    en: { title: "About MeteoAuMaroc", description: "Learn who publishes MeteoAuMaroc, how weather data is processed, and how we correct our content." },
  }[locale];
  return {
    ...copy,
    alternates: localizedAlternates(locale, "/pages/about"),
    openGraph: { ...copy, url: localizedUrl(locale, "/pages/about") },
  };
}

export default function AboutPage() {
  return <AboutContent />;
}

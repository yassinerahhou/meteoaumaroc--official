import type { Metadata } from "next";
import { asLocale, localizedAlternates, localizedUrl } from "@/app/lib/site";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = asLocale(params.locale);
  const copy = {
    fr: { title: "Contacter MeteoAuMaroc", description: "Contactez l'équipe MeteoAuMaroc pour signaler une erreur, poser une question ou proposer une amélioration." },
    ar: { title: "اتصل بفريق MeteoAuMaroc", description: "تواصل مع فريق MeteoAuMaroc للإبلاغ عن خطأ أو طرح سؤال أو اقتراح تحسين." },
    en: { title: "Contact MeteoAuMaroc", description: "Contact the MeteoAuMaroc team to report an error, ask a question, or suggest an improvement." },
  }[locale];
  return {
    ...copy,
    alternates: localizedAlternates(locale, "/pages/contact"),
    openGraph: { ...copy, url: localizedUrl(locale, "/pages/contact") },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

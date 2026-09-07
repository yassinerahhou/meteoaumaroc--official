import type { Metadata } from "next";
import Link from "next/link";
import {
  asLocale,
  localizedAlternates,
  localizedUrl,
  PUBLISHER_SCHEMA,
} from "@/app/lib/site";

type Section = { title: string; paragraphs: string[] };

const CONTENT: Record<"fr" | "ar" | "en", { title: string; intro: string; sections: Section[] }> = {
  fr: {
    title: "Politique éditoriale et méthodologie",
    intro: "Cette page explique qui publie MeteoAuMaroc, d'où viennent les données, comment nos pages sont préparées et comment demander une correction.",
    sections: [
      { title: "Qui publie ce site ?", paragraphs: ["MeteoAuMaroc est un service météorologique numérique indépendant consacré aux villes et régions du Maroc. Le site est maintenu par l'équipe MeteoAuMaroc depuis Casablanca. Notre objectif est de rendre des données techniques faciles à comprendre en français, arabe et anglais.", "Les contenus éditoriaux sont publiés sous la responsabilité de l'équipe MeteoAuMaroc. Nous n'affirmons aucune affiliation avec la Direction générale de la météorologie marocaine."] },
      { title: "Sources des données", paragraphs: ["Les observations actuelles, prévisions et données de qualité de l'air proviennent de l'API OpenWeather. Les horaires de prière proviennent de l'API Aladhan. Les tableaux climatiques mensuels sont des repères historiques généraux : ils ne remplacent pas une prévision datée.", "Nous identifions la source près des modules concernés. Les données de tiers peuvent être retardées, révisées ou temporairement indisponibles."] },
      { title: "Comment les pages sont préparées", paragraphs: ["Nos pages combinent les réponses des fournisseurs avec une présentation, des comparaisons saisonnières et des explications rédigées pour le contexte marocain. Les valeurs en temps réel sont mises en cache afin de limiter les appels inutiles, puis rafraîchies selon le type de donnée.", "Avant publication, nous vérifions la cohérence des unités, des noms de villes, des liens, de la période de prévision et des avertissements de sécurité. Nous indiquons une date de mise à jour lorsque le contenu éditorial change réellement."] },
      { title: "Limites et sécurité", paragraphs: ["Une prévision reste probabiliste et peut changer rapidement, surtout en montagne, sur le littoral et lors d'épisodes extrêmes. MeteoAuMaroc ne doit pas être la seule source utilisée pour une décision de sécurité, maritime, aérienne, agricole ou professionnelle.", "Pour les alertes officielles et les consignes d'urgence, consultez Maroc Météo et les autorités locales. En cas de danger immédiat, suivez les instructions des services publics."] },
      { title: "Corrections", paragraphs: ["Si vous repérez une erreur factuelle, une ville mal localisée, une traduction incorrecte ou un lien cassé, envoyez l'URL et une description précise via notre page Contact. Nous vérifions les signalements et corrigeons les erreurs confirmées dès que possible."] },
      { title: "Publicité et indépendance", paragraphs: ["La publicité aide à financer l'hébergement et la maintenance. Elle ne détermine pas nos descriptions météo ni nos conseils. Les annonces, lorsqu'elles sont activées, sont séparées du contenu et ne sont jamais présentées comme des boutons de navigation ou des alertes."] },
    ],
  },
  ar: {
    title: "السياسة التحريرية والمنهجية",
    intro: "توضح هذه الصفحة الجهة التي تنشر MeteoAuMaroc ومصادر البيانات وطريقة إعداد الصفحات وكيفية طلب تصحيح.",
    sections: [
      { title: "من ينشر هذا الموقع؟", paragraphs: ["MeteoAuMaroc خدمة طقس رقمية مستقلة مخصصة لمدن ومناطق المغرب، ويديرها فريق MeteoAuMaroc من الدار البيضاء. هدفنا تبسيط البيانات التقنية بالفرنسية والعربية والإنجليزية.", "ينشر المحتوى تحت مسؤولية فريق MeteoAuMaroc، ولا ندعي أي ارتباط رسمي بالمديرية العامة للأرصاد الجوية المغربية."] },
      { title: "مصادر البيانات", paragraphs: ["تأتي حالة الطقس والتوقعات وجودة الهواء من واجهة OpenWeather، بينما تأتي أوقات الصلاة من واجهة Aladhan. الجداول المناخية الشهرية مؤشرات تاريخية عامة وليست توقعات ليوم محدد.", "نذكر المصدر بجوار الوحدات المعنية. قد تتأخر بيانات الجهات الخارجية أو تتغير أو تتوقف مؤقتاً."] },
      { title: "كيفية إعداد الصفحات", paragraphs: ["نجمع بيانات المزودين مع عرض مبسط ومقارنات موسمية وشروحات مرتبطة بالسياق المغربي. تُخزن القيم مؤقتاً لتقليل الطلبات غير الضرورية ثم تُحدّث حسب نوع البيانات.", "قبل النشر نراجع الوحدات وأسماء المدن والروابط وفترة التوقع وتحذيرات السلامة. لا نغيّر تاريخ التحديث إلا عند تعديل المحتوى فعلياً."] },
      { title: "الحدود والسلامة", paragraphs: ["التوقعات احتمالية وقد تتغير بسرعة، خاصة في الجبال والسواحل وخلال الظواهر القوية. لا ينبغي الاعتماد على MeteoAuMaroc وحده في قرارات السلامة أو الملاحة أو الزراعة أو العمل.", "للنشرات الرسمية وتعليمات الطوارئ، راجع الأرصاد الجوية المغربية والسلطات المحلية واتبع تعليمات الجهات العمومية."] },
      { title: "التصحيحات", paragraphs: ["إذا وجدت خطأً أو ترجمة غير دقيقة أو رابطاً معطلاً، أرسل رابط الصفحة ووصفاً واضحاً عبر صفحة الاتصال. نراجع البلاغات ونصحح الأخطاء المؤكدة في أقرب وقت ممكن."] },
      { title: "الإعلانات والاستقلالية", paragraphs: ["تساعد الإعلانات في تمويل الاستضافة والصيانة، لكنها لا تؤثر في وصف الطقس أو النصائح. وعند تفعيلها تبقى منفصلة بوضوح عن المحتوى ولا تظهر كأزرار تنقل أو تنبيهات."] },
    ],
  },
  en: {
    title: "Editorial policy and methodology",
    intro: "This page explains who publishes MeteoAuMaroc, where the data comes from, how pages are prepared, and how to request a correction.",
    sections: [
      { title: "Who publishes this site?", paragraphs: ["MeteoAuMaroc is an independent digital weather service focused on Morocco's cities and regions. It is maintained by the MeteoAuMaroc team in Casablanca. Our aim is to make technical data understandable in French, Arabic, and English.", "Editorial material is published under the responsibility of the MeteoAuMaroc team. We do not claim affiliation with Morocco's national meteorological authority."] },
      { title: "Data sources", paragraphs: ["Current observations, forecasts, and air-quality data come from the OpenWeather API. Prayer times come from the Aladhan API. Monthly climate tables are general historical references and are not a forecast for a specific date.", "We identify sources near the relevant modules. Third-party data may be delayed, revised, or temporarily unavailable."] },
      { title: "How pages are prepared", paragraphs: ["Pages combine provider responses with presentation, seasonal comparisons, and explanations written for the Moroccan context. Live values are cached to reduce unnecessary requests and refreshed according to data type.", "Before publication, we check units, city names, links, forecast periods, and safety wording. An update date changes only when the editorial content is materially revised."] },
      { title: "Limits and safety", paragraphs: ["Forecasts are probabilistic and can change quickly, especially in mountains, coastal areas, and severe weather. MeteoAuMaroc should not be the sole source for safety-critical, marine, aviation, agricultural, or professional decisions.", "For official warnings and emergency advice, consult Morocco's national meteorological service and local authorities. Follow public-service instructions when immediate danger exists."] },
      { title: "Corrections", paragraphs: ["If you find a factual error, misplaced city, mistranslation, or broken link, send the page URL and a precise description through our Contact page. We investigate reports and correct confirmed errors as soon as practical."] },
      { title: "Advertising and independence", paragraphs: ["Advertising helps fund hosting and maintenance. It does not determine our weather descriptions or advice. When enabled, advertisements are visually separated from publisher content and are never presented as navigation buttons or alerts."] },
    ],
  },
};

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = asLocale(params.locale);
  const content = CONTENT[locale];
  return {
    title: content.title,
    description: content.intro,
    alternates: localizedAlternates(locale, "/pages/editorial-policy"),
    openGraph: {
      title: content.title,
      description: content.intro,
      url: localizedUrl(locale, "/pages/editorial-policy"),
      type: "article",
    },
  };
}

export default function EditorialPolicyPage({ params }: { params: { locale: string } }) {
  const locale = asLocale(params.locale);
  const content = CONTENT[locale];
  const isRTL = locale === "ar";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.title,
    url: localizedUrl(locale, "/pages/editorial-policy"),
    dateModified: "2026-09-07",
    inLanguage: locale,
    publisher: PUBLISHER_SCHEMA,
  };

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "70vh", direction: isRTL ? "rtl" : "ltr" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header style={{ background: "linear-gradient(135deg,#0c4a6e,#0369a1,#0ea5e9)", color: "white", padding: "4rem 1rem 3rem" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <p style={{ opacity: 0.8, marginBottom: "0.75rem", fontWeight: 700 }}>MeteoAuMaroc</p>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", lineHeight: 1.15, marginBottom: "1rem" }}>{content.title}</h1>
          <p style={{ maxWidth: 700, lineHeight: 1.8, opacity: 0.9 }}>{content.intro}</p>
          <p style={{ marginTop: "1rem", fontSize: "0.85rem", opacity: 0.75 }}>7 September 2026</p>
        </div>
      </header>
      <div className="container" style={{ maxWidth: 820, paddingTop: "3rem", paddingBottom: "5rem" }}>
        {content.sections.map((section) => (
          <section key={section.title} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.35rem", marginBottom: "0.8rem", color: "var(--color-text)" }}>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} style={{ color: "var(--color-text-muted)", lineHeight: 1.9, marginBottom: "0.9rem" }}>{paragraph}</p>
            ))}
          </section>
        ))}
        <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem" }}>
          <Link href={`/${locale}/pages/contact`} className="btn btn-primary">
            {locale === "ar" ? "إرسال تصحيح" : locale === "en" ? "Submit a correction" : "Signaler une correction"}
          </Link>
        </div>
      </div>
    </div>
  );
}

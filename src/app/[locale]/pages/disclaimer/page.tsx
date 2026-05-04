import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";

interface Props {
  params: { locale: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const isAr = params.locale === "ar";
  const isEn = params.locale === "en";
  
  return {
    title: isAr ? "إخلاء المسؤولية – MeteoAuMaroc" : isEn ? "Disclaimer – MeteoAuMaroc" : "Avertissement – MeteoAuMaroc",
    description: isAr 
      ? "إخلاء المسؤولية القانونية لـ MeteoAuMaroc.com: حدود المسؤولية، دقة بيانات الطقس والاستخدام المقصود للموقع." 
      : isEn ? "Legal disclaimer of MeteoAuMaroc.com: limitations of liability, accuracy of weather data and intended use of the site." : "Avertissement légal de MeteoAuMaroc.com : limitations de responsabilité, exactitude des données météo et usage prévu du site.",
    alternates: { canonical: `https://www.meteoaumaroc.com/${params.locale}/pages/disclaimer` },
    robots: { index: true, follow: true },
  };
}

const SECTIONS_CONTENT: Record<string, LegalSection[]> = {
  fr: [
    { title: "1. Nature des informations", content: "Les informations météorologiques fournies sur MeteoAuMaroc.com sont destinées à un usage informatif et personnel uniquement. Elles ne constituent pas des conseils professionnels et ne doivent pas être utilisées comme base pour des décisions critiques liées à la sécurité, la navigation, l'agriculture ou tout autre domaine à risque." },
    { title: "2. Exactitude des données", content: "Bien que nous nous efforcions de fournir des prévisions météo aussi précises que possible, MeteoAuMaroc.com ne peut garantir l'exactitude, l'exhaustivité ou l'actualité des données affichées. Les prévisions météorologiques sont par nature incertaines et peuvent évoluer rapidement." },
    { title: "3. Source des données", content: "Nos données météo proviennent de l'API OpenWeatherMap et d'autres fournisseurs tiers. MeteoAuMaroc.com n'est pas responsable des erreurs, omissions ou interruptions de service de ces fournisseurs externes." },
    { title: "4. Limitation de responsabilité", content: "En aucun cas MeteoAuMaroc.com, ses propriétaires, administrateurs ou contributeurs ne sauraient être tenus responsables de tout dommage direct, indirect, accessoire, spécial ou consécutif découlant de l'utilisation ou de l'impossibilité d'utiliser les informations fournies sur ce site." },
  ],
  ar: [
    { title: "1. طبيعة المعلومات", content: "المعلومات الجوية المقدمة على MeteoAuMaroc.com مخصصة للاستخدام المعلوماتي والشخصي فقط. ولا تشكل نصيحة مهنية ويجب عدم استخدامها كأساس للقرارات الحاسمة." },
    { title: "2. دقة البيانات", content: "بينما نسعى جاهدين لتوفير توقعات جوية دقيقة قدر الإمكان، لا يمكن لـ MeteoAuMaroc.com ضمان دقة أو اكتمال البيانات المعروضة." },
    { title: "3. مصدر البيانات", content: "تأتي بيانات الطقس لدينا من OpenWeatherMap ومزودي خدمات آخرين. MeteoAuMaroc.com ليس مسؤولاً عن أي أخطاء أو انقطاع في الخدمة من هؤلاء المزودين." },
    { title: "4. حدود المسؤولية", content: "لا يتحمل MeteoAuMaroc.com أو أصحابه المسؤولية عن أي ضرر ناتج عن استخدام أو عدم القدرة على استخدام المعلومات المقدمة في هذا الموقع." },
  ],
  en: [
    { title: "1. Nature of Information", content: "The weather information provided on MeteoAuMaroc.com is intended for informational and personal use only. It does not constitute professional advice and should not be used as a basis for critical decisions." },
    { title: "2. Data Accuracy", content: "While we strive to provide weather forecasts as accurate as possible, MeteoAuMaroc.com cannot guarantee the accuracy, completeness or timeliness of the displayed data." },
    { title: "3. Data Source", content: "Our weather data comes from the OpenWeatherMap API and other third-party providers. MeteoAuMaroc.com is not responsible for errors, omissions or service interruptions from these providers." },
    { title: "4. Limitation of Liability", content: "In no event shall MeteoAuMaroc.com be liable for any damage resulting from the use or inability to use the information provided on this site." },
  ]
};

interface LegalSection {
  title: string;
  content?: string;
  items?: string[];
  suffix?: string;
}

export default function DisclaimerPage({ params }: Props) {
  const locale = params.locale as "fr" | "ar" | "en";
  const isAr = locale === "ar";
  const currentSections: LegalSection[] = SECTIONS_CONTENT[locale] || SECTIONS_CONTENT.fr;

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "60vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)", padding: "2.5rem 0 3rem", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 800, color: "#fff", marginBottom: "0.5rem", letterSpacing: "-0.03em" }}>
            {isAr ? "إخلاء المسؤولية" : locale === "en" ? "Disclaimer" : "Avertissement"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9375rem" }}>
            {isAr ? "آخر تحديث: أبريل 2026" : locale === "en" ? "Last updated: April 2026" : "Dernière mise à jour : avril 2026"}
          </p>
        </div>
        <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, lineHeight: 0 }} aria-hidden>
          <svg viewBox="0 0 1440 30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 30 }}>
            <path fill="var(--color-bg)" d="M0,18 C360,36 1080,0 1440,18 L1440,30 L0,30 Z" />
          </svg>
        </div>
      </div>

      <Breadcrumb current={isAr ? "تنبيه" : locale === "en" ? "Disclaimer" : "Avertissement"} />

      <div className="container" style={{ maxWidth: 760, paddingTop: "3rem", paddingBottom: "5rem" }}>
        {/* Important notice */}
        <div style={{
          background: "#fef3c7",
          border: "1px solid #fbbf24",
          borderRadius: "var(--radius-md)",
          padding: "1.25rem 1.5rem",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          direction: isAr ? "rtl" : "ltr"
        }}>
          <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>⚠️</span>
          <p style={{ color: "#92400e", fontSize: "0.9375rem", lineHeight: 1.7, margin: 0 }}>
            <strong>{isAr ? "هام :" : locale === "en" ? "Important:" : "Important :"}</strong> {isAr ? "يوفر MeteoAuMaroc.com بيانات الطقس لأغراض إعلامية فقط. لا تتخذ أبداً قرارات حاسمة بناءً على توقعاتنا فقط." : locale === "en" ? "MeteoAuMaroc.com provides weather data for informational purposes only. Never make critical decisions based solely on our forecasts." : "MeteoAuMaroc.com fournit des données météorologiques à titre informatif uniquement. Ne prenez jamais de décisions critiques basées uniquement sur nos prévisions."}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {currentSections.map((s) => (
            <div
              key={s.title}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "1.5rem",
              }}
            >
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem" }}>
                {s.title}
              </h2>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8, fontSize: "0.9375rem", margin: 0 }}>
                {s.content}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href={`/${locale}/pages/contact`} className="btn btn-outline" style={{ display: "inline-flex" }}>
            {isAr ? "لديك أسئلة؟ اتصل بنا" : locale === "en" ? "Have questions? Contact us" : "Des questions ? Contactez-nous"}
          </Link>
        </div>
      </div>
    </div>
  );
}

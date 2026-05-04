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
    title: isAr ? "شروط الاستخدام – MeteoAuMaroc" : isEn ? "Terms of Use – MeteoAuMaroc" : "Conditions d'Utilisation – MeteoAuMaroc",
    description: isAr 
      ? "شروط استخدام MeteoAuMaroc.com: قواعد الاستخدام، حقوق الملكية الفكرية، وحدود المسؤولية." 
      : isEn ? "Terms of use of MeteoAuMaroc.com: usage rules, intellectual property rights, limitations of liability." : "Conditions d'utilisation de MeteoAuMaroc.com : règles d'usage, droits de propriété intellectuelle, limitations de responsabilité.",
    alternates: { canonical: `https://www.meteoaumaroc.com/${params.locale}/pages/terms` },
    robots: { index: true, follow: true },
  };
}

const SECTIONS_CONTENT: any = {
  fr: [
    { title: "1. Acceptation des conditions", content: "En accédant à MeteoAuMaroc.com, vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site." },
    { title: "2. Utilisation du site", content: "MeteoAuMaroc.com est destiné à un usage personnel et non commercial. Vous vous engagez à ne pas utiliser notre site à des fins illégales, à ne pas tenter de perturber son fonctionnement, et à ne pas copier nos contenus sans autorisation." },
    { title: "3. Exactitude des informations météo", content: "Les données météorologiques sont fournies à titre indicatif uniquement. Bien que nous nous efforcions d'afficher des informations précises et à jour, MeteoAuMaroc.com ne peut garantir l'exactitude absolue des prévisions. Ne prenez pas de décisions critiques basées uniquement sur nos données." },
    { title: "4. Propriété intellectuelle", content: "Le contenu de MeteoAuMaroc.com (textes, design, logo, code) est la propriété de MeteoAuMaroc sauf mention contraire. Toute reproduction, distribution ou utilisation commerciale sans autorisation préalable écrite est interdite." },
    { title: "5. Limitation de responsabilité", content: "Dans toute la mesure permise par la loi applicable, MeteoAuMaroc.com ne sera pas responsable des dommages directs, indirects, accessoires ou consécutifs résultant de l'utilisation de notre site ou de l'impossibilité de l'utiliser." },
  ],
  ar: [
    { title: "1. قبول الشروط", content: "بالدخول إلى MeteoAuMaroc.com، فإنك توافق على الالتزام بشروط الاستخدام هذه. إذا كنت لا تقبل هذه الشروط، يرجى عدم استخدام موقعنا." },
    { title: "2. استخدام الموقع", content: "MeteoAuMaroc.com مخصص للاستخدام الشخصي وغير التجاري. أنت تتعهد بعدم استخدام موقعنا لأغراض غير قانونية، وعدم محاولة تعطيل تشغيله، وعدم نسخ محتوياتنا دون إذن." },
    { title: "3. دقة معلومات الطقس", content: "يتم تقديم بيانات الطقس كمعلومات إرشادية فقط. بينما نسعى جاهدين لعرض معلومات دقيقة ومحدثة، لا يمكن لـ MeteoAuMaroc.com ضمان الدقة المطلقة للتوقعات. لا تتخذ قرارات حاسمة بناءً على بياناتنا فقط." },
    { title: "4. الملكية الفكرية", content: "محتوى MeteoAuMaroc.com (النصوص، التصميم، الشعار، الكود) هو ملك لـ MeteoAuMaroc ما لم يذكر خلاف ذلك. يمنع أي إعادة إنتاج أو توزيع أو استخدام تجاري دون إذن كتابي مسبق." },
    { title: "5. حدود المسؤولية", content: "إلى أقصى حد يسمح به القانون المعمول به، لن يكون MeteoAuMaroc.com مسؤولاً عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية ناتجة عن استخدام موقعنا أو عدم القدرة على استخدامه." },
  ],
  en: [
    { title: "1. Acceptance of Terms", content: "By accessing MeteoAuMaroc.com, you agree to be bound by these terms of use. If you do not accept these terms, please do not use our site." },
    { title: "2. Use of the Site", content: "MeteoAuMaroc.com is intended for personal and non-commercial use. You agree not to use our site for illegal purposes, not to attempt to disrupt its operation, and not to copy our content without authorization." },
    { title: "3. Accuracy of Weather Information", content: "Weather data is provided for informational purposes only. While we strive to display accurate and up-to-date information, MeteoAuMaroc.com cannot guarantee the absolute accuracy of forecasts. Do not make critical decisions based solely on our data." },
    { title: "4. Intellectual Property", content: "The content of MeteoAuMaroc.com (text, design, logo, code) is the property of MeteoAuMaroc unless otherwise stated. Any reproduction, distribution or commercial use without prior written authorization is prohibited." },
    { title: "5. Limitation of Liability", content: "To the maximum extent permitted by applicable law, MeteoAuMaroc.com will not be liable for any direct, indirect, incidental or consequential damages resulting from the use or inability to use our site." },
  ]
};

export default function TermsPage({ params }: Props) {
  const locale = params.locale as "fr" | "ar" | "en";
  const isAr = locale === "ar";
  const currentSections = SECTIONS_CONTENT[locale] || SECTIONS_CONTENT.fr;

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "60vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)", padding: "2.5rem 0 3rem", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 800, color: "#fff", marginBottom: "0.5rem", letterSpacing: "-0.03em" }}>
            {isAr ? "شروط الاستخدام" : locale === "en" ? "Terms of Use" : "Conditions d'Utilisation"}
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

      <Breadcrumb current={isAr ? "الشروط" : locale === "en" ? "Terms" : "Conditions"} />

      <div className="container" style={{ maxWidth: 760, paddingTop: "3rem", paddingBottom: "5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {currentSections.map((s: any) => (
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
            {isAr ? "لديك أسئلة؟ اتصل بنا" : locale === "en" ? "Questions? Contact us" : "Questions sur nos conditions ?"}
          </Link>
        </div>
      </div>
    </div>
  );
}

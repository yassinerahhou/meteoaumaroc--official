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
    title: isAr ? "سياسة الخصوصية – MeteoAuMaroc" : isEn ? "Privacy Policy – MeteoAuMaroc" : "Politique de Confidentialité – MeteoAuMaroc",
    description: isAr 
      ? "سياسة الخصوصية لـ MeteoAuMaroc.com: كيف نجمع ونستخدم ونحمي بياناتك الشخصية." 
      : isEn ? "Privacy policy of MeteoAuMaroc.com: how we collect, use and protect your personal data." : "Politique de confidentialité de MeteoAuMaroc.com : comment nous collectons, utilisons et protégeons vos données personnelles.",
    alternates: { canonical: `https://www.meteoaumaroc.com/${params.locale}/pages/privacy` },
    robots: { index: true, follow: true },
  };
}

const SECTIONS_CONTENT: any = {
  fr: [
    { title: "1. Consentement", content: "En utilisant MeteoAuMaroc.com, vous acceptez la présente politique de confidentialité. Si vous n'êtes pas d'accord avec ses termes, veuillez cesser d'utiliser notre site." },
    { title: "2. Informations collectées", content: "Nous collectons des informations que vous nous fournissez directement (via le formulaire de contact : nom, e-mail, message). Nous ne demandons jamais de données sensibles (mots de passe, données bancaires, etc.)." },
    { title: "3. Utilisation des informations", items: ["Répondre à vos messages et questions", "Améliorer l'expérience utilisateur", "Analyser le trafic de manière anonyme (Google Analytics)", "Afficher des publicités pertinentes (Google AdSense)"] },
    { title: "4. Fichiers journaux", content: "Comme tout serveur web, le nôtre enregistre automatiquement les requêtes HTTP : adresse IP, navigateur, pages consultées, date et heure. Ces données sont anonymes et ne permettent pas de vous identifier personnellement." },
    { title: "5. Cookies", content: "MeteoAuMaroc utilise des cookies pour mémoriser vos préférences (langue, thème clair/sombre). Google Analytics et Google AdSense utilisent leurs propres cookies conformément à leurs politiques respectives. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur." },
    { title: "6. Google AdSense", content: "Google est notre partenaire publicitaire. Il peut utiliser les cookies DART pour diffuser des annonces basées sur vos visites. Vous pouvez gérer ces préférences sur la page des paramètres de confidentialité Google." },
    { title: "7. Vos droits (RGPD)", items: ["Droit d'accès à vos données personnelles", "Droit de rectification des données incorrectes", "Droit à l'effacement (droit à l'oubli)", "Droit à la portabilité des données", "Droit de limiter le traitement"], suffix: "Pour exercer ces droits, contactez-nous via notre page Contact." },
  ],
  ar: [
    { title: "1. الموافقة", content: "باستخدامك لـ MeteoAuMaroc.com، فإنك توافق على سياسة الخصوصية هذه. إذا كنت لا توافق على شروطها، يرجى التوقف عن استخدام موقعنا." },
    { title: "2. المعلومات التي نجمعها", content: "نحن نجمع المعلومات التي تقدمها لنا مباشرة (عبر نموذج الاتصال: الاسم، البريد الإلكتروني، الرسالة). نحن لا نطلب أبداً بيانات حساسة (كلمات المرور، البيانات المصرفية، إلخ)." },
    { title: "3. استخدام المعلومات", items: ["الرد على رسائلك وأسئلتك", "تحسين تجربة المستخدم", "تحليل حركة المرور بشكل مجهول (Google Analytics)", "عرض إعلانات ذات صلة (Google AdSense)"] },
    { title: "4. ملفات السجل", content: "مثل أي خادم ويب، يقوم خادمنا تلقائياً بتسجيل طلبات HTTP: عنوان IP، المتصفح، الصفحات التي تمت زيارتها، التاريخ والوقت. هذه البيانات مجهولة ولا تسمح بتحديد هويتك الشخصية." },
    { title: "5. ملفات تعريف الارتباط (Cookies)", content: "يستخدم MeteoAuMaroc ملفات تعريف الارتباط لتذكر تفضيلاتك (اللغة، المظهر الفاتح/الداكن). تستخدم Google Analytics و Google AdSense ملفات تعريف الارتباط الخاصة بهما وفقاً لسياساتهما. يمكنك تعطيل ملفات تعريف الارتباط في إعدادات متصفحك." },
    { title: "6. Google AdSense", content: "جوجل هي شريكنا الإعلاني. قد تستخدم ملفات تعريف الارتباط DART لخدمة الإعلانات بناءً على زياراتك. يمكنك إدارة هذه التفضيلات في صفحة إعدادات خصوصية جوجل." },
    { title: "7. حقوقك", items: ["حق الوصول إلى بياناتك الشخصية", "حق تصحيح البيانات غير الصحيحة", "حق الحذف (الحق في النسيان)", "حق نقل البيانات", "حق تقييد المعالجة"], suffix: "لممارسة هذه الحقوق، اتصل بنا عبر صفحة اتصل بنا." },
  ],
  en: [
    { title: "1. Consent", content: "By using MeteoAuMaroc.com, you agree to this privacy policy. If you do not agree with its terms, please stop using our site." },
    { title: "2. Information Collected", content: "We collect information you provide directly to us (via the contact form: name, email, message). We never ask for sensitive data (passwords, bank details, etc.)." },
    { title: "3. Use of Information", items: ["Respond to your messages and questions", "Improve user experience", "Anonymously analyze traffic (Google Analytics)", "Display relevant ads (Google AdSense)"] },
    { title: "4. Log Files", content: "Like any web server, ours automatically records HTTP requests: IP address, browser, pages visited, date and time. This data is anonymous and does not personally identify you." },
    { title: "5. Cookies", content: "MeteoAuMaroc uses cookies to remember your preferences (language, light/dark theme). Google Analytics and Google AdSense use their own cookies. You can disable cookies in your browser settings." },
    { title: "6. Google AdSense", content: "Google is our advertising partner. It may use DART cookies to serve ads based on your visits. You can manage these preferences in Google's privacy settings." },
    { title: "7. Your Rights", items: ["Right of access to your personal data", "Right to rectify incorrect data", "Right to erasure (right to be forgotten)", "Right to data portability", "Right to limit processing"], suffix: "To exercise these rights, contact us via our Contact page." },
  ]
};

export default function PrivacyPage({ params }: Props) {
  const locale = params.locale as "fr" | "ar" | "en";
  const isAr = locale === "ar";
  const currentSections = SECTIONS_CONTENT[locale] || SECTIONS_CONTENT.fr;

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "60vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)", padding: "2.5rem 0 3rem", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 800, color: "#fff", marginBottom: "0.5rem", letterSpacing: "-0.03em" }}>
            {isAr ? "سياسة الخصوصية" : locale === "en" ? "Privacy Policy" : "Politique de Confidentialité"}
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

      <Breadcrumb current={isAr ? "الخصوصية" : locale === "en" ? "Privacy" : "Confidentialité"} />

      <div className="container" style={{ maxWidth: 760, paddingTop: "3rem", paddingBottom: "5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
              {s.content && (
                <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8, fontSize: "0.9375rem", margin: 0 }}>
                  {s.content}
                </p>
              )}
              {s.items && (
                <ul style={{ margin: 0, paddingLeft: isAr ? 0 : "1.25rem", paddingRight: isAr ? "1.25rem" : 0, color: "var(--color-text-muted)", lineHeight: 1.8, fontSize: "0.9375rem" }}>
                  {s.items.map((item: string) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {s.suffix && (
                <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8, fontSize: "0.9375rem", marginTop: "0.75rem", marginBottom: 0 }}>
                  {s.suffix}
                </p>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href={`/${locale}/pages/contact`} className="btn btn-outline" style={{ display: "inline-flex" }}>
            {isAr ? "اتصل بنا بخصوص بياناتك" : locale === "en" ? "Contact us regarding your data" : "Nous contacter pour vos données"}
          </Link>
        </div>
      </div>
    </div>
  );
}

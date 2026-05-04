import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";

interface Props {
  params: { locale: string };
}

const cookieTypes = [
  {
    name: "Essential Cookies",
    description: "Necessary for the site's operation. They allow remembering your preferences (language, theme, temperature unit).",
    canDisable: false,
    examples: ["theme", "locale", "tempUnit"],
    iconBg: "rgba(34, 197, 94, 0.1)",
    iconColor: "#16a34a",
    iconPath: "🛠️",
  },
  {
    name: "Analytical Cookies",
    description: "Used to understand how visitors use the site. This data is anonymous and helps us improve the user experience.",
    canDisable: true,
    examples: ["_ga", "_ga_*", "_gid"],
    iconBg: "rgba(59, 130, 246, 0.1)",
    iconColor: "#2563eb",
    iconPath: "📊",
  },
  {
    name: "Advertising Cookies",
    description: "Used by Google to display relevant ads based on your visits to this and other sites.",
    canDisable: true,
    examples: ["__gads", "__gpi", "DSID", "IDE"],
    iconBg: "rgba(245, 158, 11, 0.1)",
    iconColor: "#d97706",
    iconPath: "📢",
  },
];

export function generateMetadata({ params }: Props): Metadata {
  const isAr = params.locale === "ar";
  const isEn = params.locale === "en";
  
  return {
    title: isAr ? "سياسة ملفات تعريف الارتباط – MeteoAuMaroc" : isEn ? "Cookie Policy – MeteoAuMaroc" : "Politique de Cookies – MeteoAuMaroc",
    description: isAr 
      ? "سياسة ملفات تعريف الارتباط لـ MeteoAuMaroc.com: أنواع ملفات تعريف الارتباط المستخدمة والغرض منها وكيفية إدارتها." 
      : isEn ? "Cookie policy of MeteoAuMaroc.com: types of cookies used, their purpose and how to manage them." : "Politique de cookies de MeteoAuMaroc.com : types de cookies utilisés, leur finalité et comment les gérer.",
    alternates: { canonical: `https://www.meteoaumaroc.com/${params.locale}/pages/cookies` },
    robots: { index: true, follow: true },
  };
}

const COOKIE_TYPES_CONTENT = {
  fr: cookieTypes,
  ar: [
    { name: "ملفات تعريف الارتباط الأساسية", description: "ضرورية لتشغيل الموقع. تسمح بتذكر تفضيلاتك (اللغة، المظهر، وحدة الحرارة).", canDisable: false, examples: ["theme", "locale", "tempUnit"] },
    { name: "ملفات تعريف الارتباط التحليلية", description: "تستخدم لفهم كيفية استخدام الزوار للموقع. هذه البيانات مجهولة وتساعدنا في تحسين تجربة المستخدم.", canDisable: true, examples: ["_ga", "_ga_*", "_gid"] },
    { name: "ملفات تعريف الارتباط الإعلانية", description: "تستخدمها جوجل لعرض إعلانات ذات صلة بناءً على زياراتك لهذا الموقع والمواقع الأخرى.", canDisable: true, examples: ["__gads", "__gpi", "DSID", "IDE"] },
  ],
  en: [
    { name: "Essential Cookies", description: "Necessary for the site's operation. They allow remembering your preferences (language, theme, temperature unit).", canDisable: false, examples: ["theme", "locale", "tempUnit"] },
    { name: "Analytical Cookies", description: "Used to understand how visitors use the site. This data is anonymous and helps us improve the user experience.", canDisable: true, examples: ["_ga", "_ga_*", "_gid"] },
    { name: "Advertising Cookies", description: "Used by Google to display relevant ads based on your visits to this and other sites.", canDisable: true, examples: ["__gads", "__gpi", "DSID", "IDE"] },
  ]
};

export default function CookiePolicyPage({ params }: Props) {
  const locale = params.locale as "fr" | "ar" | "en";
  const isAr = locale === "ar";
  const isEn = locale === "en";
  const currentTypes = COOKIE_TYPES_CONTENT[locale] || COOKIE_TYPES_CONTENT.fr;

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "60vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)", padding: "2.5rem 0 3rem", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 800, color: "#fff", marginBottom: "0.5rem", letterSpacing: "-0.03em" }}>
            {isAr ? "سياسة ملفات تعريف الارتباط" : isEn ? "Cookie Policy" : "Politique de Cookies"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9375rem" }}>
            {isAr ? "آخر تحديث: أبريل 2026" : isEn ? "Last updated: April 2026" : "Dernière mise à jour : avril 2026"}
          </p>
        </div>
        <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, lineHeight: 0 }} aria-hidden>
          <svg viewBox="0 0 1440 30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 30 }}>
            <path fill="var(--color-bg)" d="M0,18 C360,36 1080,0 1440,18 L1440,30 L0,30 Z" />
          </svg>
        </div>
      </div>

      <Breadcrumb current={isAr ? "كوكيز" : isEn ? "Cookies" : "Cookies"} />

      <div className="container" style={{ maxWidth: 760, paddingTop: "3rem", paddingBottom: "5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--color-text)", textAlign: isAr ? "right" : "left" }}>
          {isAr ? "أنواع ملفات تعريف الارتباط المستخدمة" : isEn ? "Types of cookies used" : "Types de cookies utilisés"}
        </h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
          {currentTypes.map((cookie: any, idx: number) => (
            <div
              key={cookie.name}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "1.5rem",
                direction: isAr ? "rtl" : "ltr"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "0.875rem" }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10,
                  background: cookieTypes[idx].iconBg,
                  color: cookieTypes[idx].iconColor,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {cookieTypes[idx].iconPath}
                </div>
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-text)", margin: 0, flex: 1 }}>
                  {cookie.name}
                </h3>
                <span style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  padding: "0.25rem 0.7rem",
                  borderRadius: "var(--radius-full)",
                  background: cookie.canDisable ? "#fef3c7" : "#dcfce7",
                  color: cookie.canDisable ? "#92400e" : "#15803d",
                  border: `1px solid ${cookie.canDisable ? "#fbbf24" : "#86efac"}`,
                  whiteSpace: "nowrap",
                }}>
                  {cookie.canDisable ? (isAr ? "اختياري" : isEn ? "Optional" : "Facultatif") : (isAr ? "إلزامي" : isEn ? "Required" : "Obligatoire")}
                </span>
              </div>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.75, fontSize: "0.9rem", margin: "0 0 0.875rem" }}>
                {cookie.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {cookie.examples.map((ex: string) => (
                  <code key={ex} style={{ fontSize: "0.72rem", padding: "0.2rem 0.6rem", background: "var(--color-bg)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", color: "var(--color-text-muted)", fontFamily: "monospace" }}>
                    {ex}
                  </code>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
          <Link href={`/${locale}/pages/privacy`} className="btn btn-outline">
            {isAr ? "سياسة الخصوصية" : isEn ? "Privacy Policy" : "Politique de confidentialité"}
          </Link>
          <Link href={`/${locale}/pages/contact`} className="btn btn-primary">
            {isAr ? "اتصل بنا" : isEn ? "Contact us" : "Nous contacter"}
          </Link>
        </div>
      </div>
    </div>
  );
}

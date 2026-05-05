"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/lib/LanguageContext";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("cookie-consent")) {
        const id = setTimeout(() => setVisible(true), 2500);
        return () => clearTimeout(id);
      }
    } catch {
      // localStorage unavailable (e.g. privacy mode)
    }
  }, []);

  const respond = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem("cookie-consent", value);
      document.cookie = `cookie-consent=${value}; Max-Age=31536000; Path=/; SameSite=Lax`;
      window.dispatchEvent(new Event("consentchange"));
    } catch {}
    setVisible(false);
  };

  interface CookieConsentTranslations {
    title: string;
    desc: string;
    policy: string;
    accept: string;
    decline: string;
  }

  const TEXTS: Record<string, CookieConsentTranslations> = {
    fr: {
      title: "Confidentialité & Cookies",
      desc: "Nous utilisons des cookies pour personnaliser le contenu, les fonctionnalités des médias sociaux et pour analyser notre trafic. Nous partageons également des informations sur votre utilisation de notre site avec nos partenaires.",
      policy: "Politique de confidentialité",
      accept: "Tout accepter",
      decline: "Paramètres",
    },
    ar: {
      title: "الخصوصية وملفات تعريف الارتباط",
      desc: "نحن نستخدم ملفات تعريف الارتباط لتخصيص المحتوى وميزات الوسائط الاجتماعية ولتحليل حركة المرور لدينا. كما نشارك معلومات حول استخدامك لموقعنا مع شركائنا.",
      policy: "سياسة الخصوصية",
      accept: "قبول الكل",
      decline: "الإعدادات",
    },
    en: {
      title: "Privacy & Cookies",
      desc: "We use cookies to personalize content, social media features and to analyze our traffic. We also share information about your use of our site with our partners.",
      policy: "Privacy Policy",
      accept: "Accept All",
      decline: "Settings",
    }
  };

  const { locale } = useLanguage();
  const t_local = TEXTS[locale] || TEXTS.fr;
  const isRTL = locale === "ar";

  if (!visible) return null;

  return (
    <>
      <div
        role="dialog"
        aria-label={t_local.title}
        aria-live="polite"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          [isRTL ? "right" : "left"]: "1.5rem",
          maxWidth: "420px",
          width: "calc(100% - 3rem)",
          zIndex: 9999,
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          padding: "1.5rem",
          animation: "cookiePopupSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ background: "var(--color-primary-light)", width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem" }}>
              🍪
            </div>
            <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--color-text)" }}>
              {t_local.title}
            </h3>
          </div>

          <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>
            {t_local.desc}{" "}
            <Link
              href={`/${locale}/pages/privacy`}
              style={{ color: "var(--color-primary)", fontWeight: 600, textDecoration: "underline" }}
            >
              {t_local.policy}
            </Link>
          </p>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
            <button
              onClick={() => respond("accepted")}
              className="btn btn-primary"
              style={{ flex: 1, padding: "0.6rem 1rem", fontSize: "0.85rem" }}
            >
              {t_local.accept}
            </button>
            <button
              onClick={() => respond("declined")}
              className="btn btn-outline"
              style={{ flex: 1, padding: "0.6rem 1rem", fontSize: "0.85rem", border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-primary)";
                e.currentTarget.style.color = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.color = "var(--color-text-muted)";
              }}
            >
              {t_local.decline}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cookiePopupSlide {
          from { transform: translateX(-40px) translateY(20px); opacity: 0; }
          to   { transform: translateX(0) translateY(0);    opacity: 1; }
        }
        @media (max-width: 480px) {
          [role="dialog"] {
            bottom: 0 !important;
            left: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 20px 20px 0 0 !important;
          }
        }
      `}</style>
    </>
  );
}

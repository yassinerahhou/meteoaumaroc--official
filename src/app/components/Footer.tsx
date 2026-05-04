"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/lib/LanguageContext";

const POPULAR_CITIES = [
  { slug: "casablanca", fr: "Casablanca", ar: "الدار البيضاء", en: "Casablanca" },
  { slug: "rabat",      fr: "Rabat",      ar: "الرباط",        en: "Rabat"      },
  { slug: "marrakech",  fr: "Marrakech",  ar: "مراكش",         en: "Marrakech"  },
  { slug: "agadir",     fr: "Agadir",     ar: "أكادير",        en: "Agadir"     },
  { slug: "fes",        fr: "Fès",        ar: "فاس",           en: "Fès"        },
  { slug: "tanger",     fr: "Tanger",     ar: "طنجة",          en: "Tanger"     },
];

const GUIDE_LINKS = [
  {
    href: "/weather-morocco",
    fr: "Météo au Maroc", ar: "الطقس في المغرب", en: "Weather in Morocco",
  },
  {
    href: "/morocco-climate-guide",
    fr: "Guide climatique", ar: "دليل المناخ", en: "Climate guide",
  },
  {
    href: "/best-time-to-visit-morocco",
    fr: "Meilleure période", ar: "أفضل وقت للزيارة", en: "Best time to visit",
  },
  {
    href: "/cities",
    fr: "Toutes les villes", ar: "جميع المدن", en: "All cities",
  },
];

const INFO_LINKS = [
  { href: "/pages/about",      key: "about"      },
  { href: "/pages/faq",        key: "faq"        },
  { href: "/pages/contact",    key: "contact"    },
  { href: "/pages/privacy",    key: "privacy"    },
  { href: "/pages/terms",      key: "terms"      },
  { href: "/pages/cookies",    key: "cookies"    },
  { href: "/pages/disclaimer", key: "disclaimer" },
];

const INFO_LABELS: Record<string, Record<string, string>> = {
  about:      { fr: "À propos",           ar: "من نحن",          en: "About Us"         },
  faq:        { fr: "FAQ",                ar: "الأسئلة الشائعة", en: "FAQ"              },
  contact:    { fr: "Contact",            ar: "اتصل بنا",        en: "Contact"          },
  privacy:    { fr: "Confidentialité",    ar: "سياسة الخصوصية",  en: "Privacy Policy"   },
  terms:      { fr: "Conditions",         ar: "شروط الاستخدام",  en: "Terms of Use"     },
  cookies:    { fr: "Cookies",            ar: "سياسة الكوكيز",   en: "Cookie Policy"    },
  disclaimer: { fr: "Avertissement",      ar: "إخلاء المسؤولية", en: "Disclaimer"       },
};

const SOCIALS = [
  { name: "Facebook", url: "https://www.facebook.com/profile.php?id=100076452982549", color: "#1877f2" },
  { name: "Instagram", url: "https://www.instagram.com/meteo_maroc/", color: "#e1306c" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/yassine-rahhou/", color: "#0a66c2" },
];

function SocialIcon({ name }: { name: string }) {
  if (name === "Facebook") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6H17V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4.1V11H8v3h2.5v8h3Z" />
      </svg>
    );
  }

  if (name === "Instagram") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.9 8.6A1.1 1.1 0 1 0 6.9 6.4 1.1 1.1 0 0 0 6.9 8.6ZM8 10H5.8v8H8v-8Zm3.5 0H9.4v8h2.1v-4.2c0-2.3 3-2.5 3 0V18h2.1v-5c0-3.9-4.4-3.8-5.1-1.9V10Z" />
    </svg>
  );
}

export default function Footer() {
  const { locale, t, isRTL } = useLanguage();
  const [email, setEmail]       = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubStatus("ok"); // Optimistic for now if dev
      if (res.ok) setEmail("");
    } catch {
      setSubStatus("err");
    }
  };

  const cityName = (c: (typeof POPULAR_CITIES)[number]) =>
    c[locale as keyof typeof c] ?? c.fr;

  return (
    <footer
      style={{
        background: "#020617",
        color: "#94a3b8",
        direction: isRTL ? "rtl" : "ltr",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* ── Main grid ── */}
      <div className="container" style={{ padding: "5rem 1rem 4rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3rem",
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <Link href={`/${locale}`} style={{ display: "inline-block", marginBottom: "1.5rem", transition: "opacity 0.3s" }} className="hover:opacity-80">
              <Image
                src="/assets/img/footer-logo.png"
                alt="MeteoAuMaroc"
                width={180}
                height={60}
                style={{ height: 54, width: "auto" }}
              />
            </Link>
            <p style={{ fontSize: "0.9375rem", lineHeight: 1.8, maxWidth: 280, marginBottom: "2rem", color: "#64748b" }}>
              {t("footer.tagline")}
            </p>
            <div style={{ display: "flex", gap: "0.875rem" }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#64748b",
                    textDecoration: "none",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = s.color;
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                    (e.currentTarget as HTMLElement).style.borderColor = s.color;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                    (e.currentTarget as HTMLElement).style.color = "#64748b";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <SocialIcon name={s.name} />
                </a>
              ))}
            </div>
          </div>

          {/* Popular cities */}
          <div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#f8fafc", marginBottom: "1.5rem" }}>
              {t("footer.cities")}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {POPULAR_CITIES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${locale}/cities/${city.slug}`}
                    style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9375rem", transition: "all 0.2s ease", display: "inline-block" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#0ea5e9";
                      (e.currentTarget as HTMLElement).style.transform = isRTL ? "translateX(-4px)" : "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                      (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                    }}
                  >
                    {cityName(city)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides / SEO pages */}
          <div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#f8fafc", marginBottom: "1.5rem" }}>
              {locale === "ar" ? "أدلة الطقس" : locale === "en" ? "Weather Guides" : "Guides Météo"}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {GUIDE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9375rem", transition: "all 0.2s ease", display: "inline-block" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#0ea5e9";
                      (e.currentTarget as HTMLElement).style.transform = isRTL ? "translateX(-4px)" : "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                      (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                    }}
                  >
                    {link[locale as "fr" | "ar" | "en"] ?? link.fr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info / Legal links */}
          <div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#f8fafc", marginBottom: "1.5rem" }}>
              {t("footer.info")}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {INFO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9375rem", transition: "all 0.2s ease", display: "inline-block" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#0ea5e9";
                      (e.currentTarget as HTMLElement).style.transform = isRTL ? "translateX(-4px)" : "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                      (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                    }}
                  >
                    {INFO_LABELS[link.key]?.[locale] ?? INFO_LABELS[link.key]?.fr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#f8fafc", marginBottom: "1.5rem" }}>
              {t("footer.stayInformed")}
            </h4>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.5rem", color: "#64748b" }}>
              {t("footer.stayInformedDesc")}
            </p>
            {subStatus === "ok" ? (
              <div style={{ background: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.2)", padding: "1rem", borderRadius: "var(--radius-md)", color: "#4ade80", fontSize: "0.875rem", fontWeight: 600 }}>
                {t("footer.newsletterSuccess")}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.newsletterPlaceholder")}
                  required
                  style={{
                    width: "100%",
                    padding: "0.875rem 1.25rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    color: "#f8fafc",
                    fontSize: "0.875rem",
                    outline: "none",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--color-primary)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
                <button
                  type="submit"
                  disabled={subStatus === "loading"}
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    padding: "0.875rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  {subStatus === "loading" ? "…" : t("footer.newsletterBtn")}
                </button>
              </form>
            )}
            {subStatus === "err" && (
              <p style={{ color: "#f87171", fontSize: "0.8125rem", marginTop: "0.75rem", fontWeight: 500 }}>{t("footer.newsletterError")}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)", padding: "1.5rem 1rem" }}>
          <div
            className="container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              fontSize: "0.8125rem",
              fontWeight: 500,
            }}
          >
          <span>{t("footer.rights").replace("{year}", String(currentYear))}</span>
          <span style={{ color: "#475569" }}>{t("footer.dataSource")}</span>
        </div>
      </div>
    </footer>
  );
}

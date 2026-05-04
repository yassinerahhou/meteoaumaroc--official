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
      setSubStatus(res.ok ? "ok" : "err");
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
        background: "var(--footer-bg, #0f172a)",
        color: "var(--footer-text, #94a3b8)",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      {/* ── Main grid ── */}
      <div className="container" style={{ padding: "4rem 1rem 3rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <Link href="/" style={{ display: "inline-block", marginBottom: "1rem" }}>
              <Image
                src="/assets/img/footer-logo.png"
                alt="MeteoAuMaroc"
                width={180}
                height={60}
                style={{ height: 50, width: "auto" }}
              />
            </Link>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.75, maxWidth: 260, marginBottom: "1.5rem" }}>
              {t("footer.tagline")}
            </p>
            <div style={{ display: "flex", gap: "0.6rem" }}>
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
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#94a3b8",
                    textDecoration: "none",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = s.color;
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                    (e.currentTarget as HTMLElement).style.borderColor = s.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                >
                  <SocialIcon name={s.name} />
                </a>
              ))}
            </div>
          </div>

          {/* Popular cities */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#f1f5f9", marginBottom: "1.2rem" }}>
              {t("footer.cities")}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {POPULAR_CITIES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/cities/${city.slug}`}
                    style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.15s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#38bdf8")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#94a3b8")}
                  >
                    {cityName(city)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides / SEO pages */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#f1f5f9", marginBottom: "1.2rem" }}>
              {locale === "ar" ? "أدلة الطقس" : locale === "en" ? "Weather Guides" : "Guides Météo"}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {GUIDE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.15s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#38bdf8")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#94a3b8")}
                  >
                    {link[locale as "fr" | "ar" | "en"] ?? link.fr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info / Legal links */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#f1f5f9", marginBottom: "1.2rem" }}>
              {t("footer.info")}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {INFO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.15s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#38bdf8")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#94a3b8")}
                  >
                    {INFO_LABELS[link.key]?.[locale] ?? INFO_LABELS[link.key]?.fr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#f1f5f9", marginBottom: "1.2rem" }}>
              {t("footer.stayInformed")}
            </h4>
            <p style={{ fontSize: "0.825rem", lineHeight: 1.65, marginBottom: "1rem" }}>
              {t("footer.stayInformedDesc")}
            </p>
            {subStatus === "ok" ? (
              <p style={{ color: "#4ade80", fontSize: "0.85rem", fontWeight: 600 }}>{t("footer.newsletterSuccess")}</p>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.newsletterPlaceholder")}
                  required
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: "0.5rem 0.85rem",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#f1f5f9",
                    fontSize: "0.82rem",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  disabled={subStatus === "loading"}
                  style={{
                    padding: "0.5rem 1.1rem",
                    borderRadius: "var(--radius-full)",
                    border: "none",
                    background: "var(--color-primary)",
                    color: "#fff",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    opacity: subStatus === "loading" ? 0.7 : 1,
                  }}
                >
                  {subStatus === "loading" ? "…" : t("footer.newsletterBtn")}
                </button>
              </form>
            )}
            {subStatus === "err" && (
              <p style={{ color: "#f87171", fontSize: "0.8rem", marginTop: "0.4rem" }}>{t("footer.newsletterError")}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "1.25rem 1rem" }}>
          <div
            className="container footer-bottom-flex"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8rem",
            }}
          >
          <span>{t("footer.rights").replace("{year}", String(currentYear))}</span>
          <span style={{ color: "#64748b" }}>{t("footer.dataSource")}</span>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Footer from "@/app/components/Footer";
import "../globals.css";
import Navbar from "@/app/components/Navbar";
import CookieConsent from "@/app/components/CookieConsent";
import { LanguageProvider } from "@/app/lib/LanguageContext";
import ConsentAwareScripts from "@/app/components/ConsentAwareScripts";
import { ADSENSE_CLIENT } from "@/app/lib/adsense";
import {
  asLocale,
  localizedAlternates,
  localizedUrl,
  SITE_URL,
} from "@/app/lib/site";

import { Locale } from "@/app/lib/i18n";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const BASE_URL = SITE_URL;

export async function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "ar" }, { locale: "en" }];
}

const HOME_COPY = {
  fr: {
    title: "Météo au Maroc — Prévisions en temps réel | MeteoAuMaroc",
    description:
      "Météo actuelle et prévisions 5 jours pour plus de 60 villes marocaines : température, pluie, vent, qualité de l'air et horaires de prière.",
    ogLocale: "fr_MA",
  },
  ar: {
    title: "الطقس في المغرب — توقعات مباشرة | MeteoAuMaroc",
    description:
      "حالة الطقس وتوقعات 5 أيام لأكثر من 60 مدينة مغربية: الحرارة والأمطار والرياح وجودة الهواء وأوقات الصلاة.",
    ogLocale: "ar_MA",
  },
  en: {
    title: "Morocco Weather — Live Conditions and 5-Day Forecasts | MeteoAuMaroc",
    description:
      "Current weather and 5-day forecasts for 60+ Moroccan cities, including temperature, rain, wind, air quality, and prayer times.",
    ogLocale: "en_GB",
  },
};

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = asLocale(params.locale);
  const copy = HOME_COPY[locale];
  const url = localizedUrl(locale);

  return {
    metadataBase: new URL(BASE_URL),
    title: { default: copy.title, template: "%s | MeteoAuMaroc" },
    description: copy.description,
    alternates: localizedAlternates(locale),
    openGraph: {
      siteName: "MeteoAuMaroc",
      locale: copy.ogLocale,
      type: "website",
      url,
      title: copy.title,
      description: copy.description,
      images: [
        { url: "/opengraph-image", width: 1200, height: 630, alt: "MeteoAuMaroc" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: ["/twitter-image"],
    },
    icons: { icon: "/icon.png", shortcut: "/icon.png", apple: "/icon.png" },
    robots: { index: true, follow: true },
  };
}

// ── Structured data ──────────────────────────────────────────────────────────
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MeteoAuMaroc",
  url: BASE_URL,
  logo: `${BASE_URL}/assets/img/logo-01.png`,
  sameAs: [
    "https://www.facebook.com/profile.php?id=100076452982549",
    "https://www.instagram.com/meteo_maroc/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${BASE_URL}/fr/pages/contact`,
    availableLanguage: ["French", "Arabic", "English"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MeteoAuMaroc",
  url: BASE_URL,
  inLanguage: ["fr", "ar", "en"],
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://flagcdn.com" />
        <link rel="icon" href="/icon.png" sizes="any" />
        {/* Keep one publisher identity in the source. The ad library itself waits for consent. */}
        <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased text-[var(--color-text)] bg-[var(--color-bg)]`}>
        <LanguageProvider initialLocale={locale as Locale}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
          <ConsentAwareScripts />
        </LanguageProvider>
      </body>
    </html>
  );
}

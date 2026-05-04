import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Footer from "@/app/components/Footer";
import "../globals.css";
import Navbar from "@/app/components/Navbar";
import CookieConsent from "@/app/components/CookieConsent";
import { LanguageProvider } from "@/app/lib/LanguageContext";
import ConsentAwareScripts from "@/app/components/ConsentAwareScripts";

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

const BASE_URL = "https://www.meteoaumaroc.com";

export async function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "ar" }, { locale: "en" }];
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Météo au Maroc — Prévisions en Temps Réel | MeteoAuMaroc",
    template: "%s | MeteoAuMaroc",
  },
  description:
    "Prévisions météo fiables pour plus de 60 villes marocaines. Météo actuelle, prévisions 14 jours, alertes météo et horaires de prière.",
  keywords: [
    "météo maroc", "meteo maroc", "weather morocco", "weather in morocco",
    "الطقس في المغرب", "طقس المغرب", "météo agadir", "météo casablanca",
    "météo rabat", "météo marrakech", "prévisions maroc",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    siteName: "MeteoAuMaroc",
    locale: "fr_MA",
    type: "website",
    url: BASE_URL,
    title: "Météo au Maroc — Prévisions en Temps Réel",
    description: "Météo actuelle, prévisions 14 jours et alertes pour plus de 60 villes marocaines.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "MeteoAuMaroc" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Météo au Maroc — Prévisions en Temps Réel",
    description: "Météo actuelle et prévisions 14 jours pour toutes les villes du Maroc.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: { index: true, follow: true },
};

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
    url: `${BASE_URL}/pages/contact`,
    availableLanguage: ["French", "Arabic", "English"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MeteoAuMaroc",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/cities/{search_term_string}` },
    "query-input": "required name=search_term_string",
  },
  inLanguage: ["fr", "ar", "en"],
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  return (
    <html lang={locale}>
      <head>
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

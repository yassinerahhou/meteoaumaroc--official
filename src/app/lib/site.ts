import type { Metadata } from "next";

export const SITE_URL = "https://www.meteoaumaroc.com";
export const SITE_NAME = "MeteoAuMaroc";
export const SUPPORTED_LOCALES = ["fr", "ar", "en"] as const;
export type SiteLocale = (typeof SUPPORTED_LOCALES)[number];

export function asLocale(value: string): SiteLocale {
  return SUPPORTED_LOCALES.includes(value as SiteLocale)
    ? (value as SiteLocale)
    : "fr";
}

export function localizedUrl(locale: SiteLocale, path = "") {
  const normalizedPath = path && !path.startsWith("/") ? `/${path}` : path;
  return `${SITE_URL}/${locale}${normalizedPath}`;
}

export function localizedAlternates(
  locale: SiteLocale,
  path = "",
): Metadata["alternates"] {
  return {
    canonical: localizedUrl(locale, path),
    languages: {
      fr: localizedUrl("fr", path),
      ar: localizedUrl("ar", path),
      en: localizedUrl("en", path),
      "x-default": localizedUrl("fr", path),
    },
  };
}

export const PUBLISHER_SCHEMA = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/assets/img/logo-01.png`,
  },
};

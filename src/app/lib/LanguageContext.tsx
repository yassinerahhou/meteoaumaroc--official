"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, TranslationKey, t as translate, LOCALES } from "./i18n";
import { useRouter, usePathname } from "next/navigation";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  dir: "ltr" | "rtl";
  isRTL: boolean;
  tempUnit: "C" | "F";
  setTempUnit: (u: "C" | "F") => void;
  formatTemp: (celsius: number) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "fr",
  setLocale: () => {},
  t: (key) => key,
  dir: "ltr",
  isRTL: false,
  tempUnit: "C",
  setTempUnit: () => {},
  formatTemp: (c) => `${Math.round(c)}°C`,
});

export function LanguageProvider({ 
  children, 
  initialLocale 
}: { 
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>(initialLocale || "fr");
  const [tempUnit, setTempUnitState] = useState<"C" | "F">("C");

  // Sync state if initialLocale changes (e.g. on navigation)
  useEffect(() => {
    if (initialLocale && initialLocale !== locale) {
      setLocaleState(initialLocale);
    }
  }, [initialLocale, locale]);

  useEffect(() => {
    try {
      const storedUnit = localStorage.getItem("tempUnit") as "C" | "F" | null;
      if (storedUnit === "C" || storedUnit === "F") setTempUnitState(storedUnit);
    } catch {}
  }, []);

  const setTempUnit = (u: "C" | "F") => {
    setTempUnitState(u);
    try { localStorage.setItem("tempUnit", u); } catch {}
  };

  const formatTemp = (celsius: number): string => {
    if (tempUnit === "F") return `${Math.round(celsius * 9 / 5 + 32)}°F`;
    return `${Math.round(celsius)}°C`;
  };

  const setLocale = (l: Locale) => {
    if (l === locale) return;
    
    // Perform route-level navigation
    const segments = pathname.split("/");
    // segments[0] is empty, segments[1] is the locale
    segments[1] = l;
    const newPath = segments.join("/");
    
    router.push(newPath);
  };

  const localeConfig = LOCALES.find((x) => x.code === locale);
  const dir = localeConfig?.dir ?? "ltr";

  // Update html attributes on mount/change
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", dir);
    html.setAttribute("lang", locale);
  }, [locale, dir]);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t: (key, vars) => translate(locale, key, vars),
        dir,
        isRTL: dir === "rtl",
        tempUnit,
        setTempUnit,
        formatTemp,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

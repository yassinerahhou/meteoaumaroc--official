"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, TranslationKey, t as translate, LOCALES } from "./i18n";

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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [tempUnit, setTempUnitState] = useState<"C" | "F">("C");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("locale") as Locale | null;
      if (stored && ["fr", "ar", "en"].includes(stored)) setLocaleState(stored);
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
    setLocaleState(l);
    try { localStorage.setItem("locale", l); } catch {}

    // Update html dir + lang attributes
    const html = document.documentElement;
    const localeConfig = LOCALES.find((x) => x.code === l);
    html.setAttribute("dir", localeConfig?.dir ?? "ltr");
    html.setAttribute("lang", l);
  };

  const localeConfig = LOCALES.find((x) => x.code === locale);
  const dir = localeConfig?.dir ?? "ltr";

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

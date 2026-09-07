"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from "@/app/lib/adsense";

const CONSENT_KEY = "cookie-consent";

export default function ConsentAwareScripts() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      try {
        setEnabled(localStorage.getItem(CONSENT_KEY) === "accepted");
      } catch {
        setEnabled(false);
      }
    };

    syncConsent();
    window.addEventListener("storage", syncConsent);
    window.addEventListener("consentchange", syncConsent as EventListener);

    return () => {
      window.removeEventListener("storage", syncConsent);
      window.removeEventListener("consentchange", syncConsent as EventListener);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <>
      {ADSENSE_ENABLED && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
      <GoogleAnalytics gaId="G-FTCZ07PXXM" />
    </>
  );
}

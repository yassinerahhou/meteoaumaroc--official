"use client";

import { useEffect, useRef, useState } from "react";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  style?: React.CSSProperties;
  className?: string;
  minHeight?: number;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit({
  slot,
  format = "auto",
  style,
  className,
  minHeight,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      try {
        setHasConsent(localStorage.getItem("cookie-consent") === "accepted");
      } catch {
        setHasConsent(false);
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

  useEffect(() => {
    if (!adRef.current || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(adRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (
      hasConsent &&
      isVisible &&
      !pushed.current &&
      adRef.current &&
      !adRef.current.hasAttribute("data-adsbygoogle-status")
    ) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      } catch (e) {
        console.error("AdSense Error: ", e);
      }
    }
  }, [hasConsent, isVisible, slot]);

  return (
    <div
      style={{
        textAlign: "center",
        overflow: "hidden",
        minHeight: minHeight ?? (format === "rectangle" ? 280 : format === "horizontal" ? 120 : 100),
        ...style,
      }}
      className={className}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5069334614306556"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

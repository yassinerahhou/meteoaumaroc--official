"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("cookie-consent")) {
        const id = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(id);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const respond = (value: "accepted" | "declined") => {
    try { localStorage.setItem("cookie-consent", value); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div
        role="dialog"
        aria-label="Consentement aux cookies"
        aria-live="polite"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: "rgba(15, 23, 42, 0.97)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          animation: "cookieSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          className="container"
          style={{
            padding: "1.25rem 1rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          {/* Text */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", flex: "1 1 300px", minWidth: 0 }}>
            <span style={{ fontSize: "1.375rem", flexShrink: 0, lineHeight: 1 }}>🍪</span>
            <p style={{ color: "#cbd5e1", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>
              Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et afficher des publicités pertinentes.{" "}
              <Link
                href="/pages/cookies"
                style={{ color: "#7dd3fc", fontWeight: 600, textDecoration: "underline", whiteSpace: "nowrap" }}
              >
                En savoir plus
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "0.625rem", flexShrink: 0, flexWrap: "wrap" }}>
            <button
              onClick={() => respond("declined")}
              style={{
                padding: "0.55rem 1.25rem",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "transparent",
                color: "#94a3b8",
                fontWeight: 600,
                fontSize: "0.8125rem",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "border-color 0.2s, color 0.2s",
                whiteSpace: "nowrap",
              }}
              className="cookie-decline-btn"
            >
              Refuser
            </button>
            <button
              onClick={() => respond("accepted")}
              style={{
                padding: "0.55rem 1.5rem",
                borderRadius: "6px",
                border: "none",
                background: "#0369a1",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.8125rem",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.2s, transform 0.15s",
                whiteSpace: "nowrap",
              }}
              className="cookie-accept-btn"
            >
              Accepter tout
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cookieSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .cookie-accept-btn:hover { background: #075985 !important; transform: translateY(-1px); }
        .cookie-decline-btn:hover { border-color: rgba(255,255,255,0.35) !important; color: #e2e8f0 !important; }
      `}</style>
    </>
  );
}

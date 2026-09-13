"use client";

import React, { useState } from "react";
import { useLanguage } from "@/app/lib/LanguageContext";
import { MOROCCAN_CITIES } from "@/app/lib/cities";

export default function WidgetBuilderPage() {
  const { locale } = useLanguage();
  const [city, setCity] = useState(MOROCCAN_CITIES[0].slug);
  const [theme, setTheme] = useState("light");
  
  const widgetUrl = `https://www.meteoaumaroc.com/${locale}/widget?city=${city}&theme=${theme}`;
  const iframeCode = `<iframe src="${widgetUrl}" width="332" height="190" frameborder="0" style="border:none;overflow:hidden;border-radius:12px;" allowtransparency="true"></iframe>`;

  return (
    <div className="container" style={{ maxWidth: 900, padding: "4rem 1rem", minHeight: "70vh" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem", color: "var(--color-text)" }}>
        {locale === "ar" ? "أداة الطقس المجانية لموقعك" : locale === "en" ? "Free Weather Widget for Your Website" : "Widget Météo Gratuit pour votre site"}
      </h1>
      <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", marginBottom: "2rem" }}>
        {locale === "ar" 
          ? "أضف الطقس المباشر في المغرب إلى موقع فندقك أو رياضك مجانًا. قم بتخصيص الأداة أدناه وانسخ الرمز." 
          : locale === "en" 
          ? "Add live Morocco weather to your hotel or riad website for free. Customize the widget below and copy the code." 
          : "Ajoutez la météo du Maroc en direct sur le site de votre hôtel ou riad. Personnalisez le widget ci-dessous et copiez le code."}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
        {/* Controls */}
        <div style={{ background: "var(--color-surface)", padding: "2rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.5rem" }}>
            {locale === "ar" ? "1. تخصيص" : locale === "en" ? "1. Customize" : "1. Personnaliser"}
          </h2>
          
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, fontSize: "0.9rem" }}>
              {locale === "ar" ? "اختر المدينة" : locale === "en" ? "Select City" : "Choisir la ville"}
            </label>
            <select 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
              style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg)", color: "var(--color-text)" }}
            >
              {MOROCCAN_CITIES.map(c => (
                <option key={c.slug} value={c.slug}>{locale === "ar" ? c.nameAr || c.name : c.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, fontSize: "0.9rem" }}>
              {locale === "ar" ? "اختر المظهر" : locale === "en" ? "Select Theme" : "Choisir le thème"}
            </label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button 
                onClick={() => setTheme("light")}
                style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: `2px solid ${theme === 'light' ? 'var(--color-primary)' : 'var(--color-border)'}`, background: "#fff", color: "#000", fontWeight: 600, cursor: "pointer" }}
              >
                Clair
              </button>
              <button 
                onClick={() => setTheme("dark")}
                style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: `2px solid ${theme === 'dark' ? 'var(--color-primary)' : 'var(--color-border)'}`, background: "#1e293b", color: "#fff", fontWeight: 600, cursor: "pointer" }}
              >
                Sombre
              </button>
            </div>
          </div>

          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "2rem 0 1rem" }}>
            {locale === "ar" ? "2. انسخ الرمز" : locale === "en" ? "2. Copy Code" : "2. Copier le code"}
          </h2>
          <textarea 
            readOnly
            value={iframeCode}
            style={{ width: "100%", height: "100px", padding: "1rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg)", color: "var(--color-text)", fontFamily: "monospace", fontSize: "0.85rem", resize: "none" }}
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
        </div>

        {/* Preview */}
        <div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.5rem" }}>
            {locale === "ar" ? "معاينة" : locale === "en" ? "Preview" : "Aperçu"}
          </h2>
          <div style={{ background: "url('/pattern.svg'), var(--color-bg)", padding: "2rem", borderRadius: "var(--radius-lg)", border: "1px dashed var(--color-border)", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
            <iframe 
              src={widgetUrl} 
              width="332" 
              height="190" 
              frameBorder="0" 
              style={{ border: "none", overflow: "hidden", borderRadius: "12px", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

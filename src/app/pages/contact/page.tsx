"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Breadcrumb from "@/app/components/Breadcrumb";
import { useLanguage } from "@/app/lib/LanguageContext";

type Status = "idle" | "loading" | "success" | "error";

const CONTACT_INFO = [
  { icon: "✉️", key: "Email",     value: "contact@meteoaumaroc.com" },
  { icon: "📞", key: "Téléphone", value: "+212 688 967 610" },
  { icon: "📍", key: "Adresse",   value: "Casablanca, Maroc" },
];

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? t("contact.errorGeneric"));
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrorMsg(t("contact.errorNetwork"));
      setStatus("error");
    }
  };

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "70vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)", padding: "3rem 0 4rem", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#fff", marginBottom: "0.75rem", letterSpacing: "-0.03em" }}>
            {t("contact.title")}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.0625rem", maxWidth: 480, margin: "0 auto" }}>
            {t("contact.subtitle")}
          </p>
        </div>
        <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, lineHeight: 0 }} aria-hidden>
          <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 40 }}>
            <path fill="var(--color-bg)" d="M0,24 C360,48 1080,0 1440,24 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </div>

      <Breadcrumb current={t("contact.title")} />

      {/* Content */}
      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
        {/* Form */}
        <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)", padding: "2.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.375rem" }}>
            {t("contact.formTitle")}
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
            {t("contact.formRequired")}
          </p>

          {status === "success" && (
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "var(--radius-md)", padding: "1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>✅</span>
              <div>
                <p style={{ fontWeight: 600, color: "#15803d", margin: "0 0 0.25rem" }}>{t("contact.successTitle")}</p>
                <p style={{ color: "#16a34a", fontSize: "0.875rem", margin: 0 }}>{t("contact.successMsg")}</p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-md)", padding: "1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>⚠️</span>
              <p style={{ color: "#dc2626", fontSize: "0.9rem", margin: 0 }}>{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label htmlFor="name" style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.375rem", color: "var(--color-text)" }}>
                {t("contact.labelName")}
              </label>
              <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required
                placeholder={t("contact.placeholderName")}
                style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-md)", fontSize: "1rem", color: "var(--color-text)", background: "var(--color-bg)", outline: "none", transition: "border-color 0.2s", fontFamily: "inherit" }}
                className="contact-input"
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label htmlFor="email" style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.375rem", color: "var(--color-text)" }}>
                {t("contact.labelEmail")}
              </label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required
                placeholder={t("contact.placeholderEmail")}
                style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-md)", fontSize: "1rem", color: "var(--color-text)", background: "var(--color-bg)", outline: "none", transition: "border-color 0.2s", fontFamily: "inherit" }}
                className="contact-input"
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: "1.75rem" }}>
              <label htmlFor="message" style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.375rem", color: "var(--color-text)" }}>
                {t("contact.labelMessage")}
              </label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5}
                placeholder={t("contact.placeholderMessage")}
                style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-md)", fontSize: "1rem", color: "var(--color-text)", background: "var(--color-bg)", outline: "none", transition: "border-color 0.2s", resize: "vertical", minHeight: 120, fontFamily: "inherit", lineHeight: 1.6 }}
                className="contact-input"
              />
            </div>

            <button type="submit" disabled={status === "loading"} className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", fontSize: "1rem", padding: "0.875rem", opacity: status === "loading" ? 0.7 : 1, cursor: status === "loading" ? "not-allowed" : "pointer" }}
            >
              {status === "loading" ? (
                <>
                  <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  {t("contact.sending")}
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  {t("contact.submit")}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)", padding: "2rem" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1.5rem" }}>
              {t("contact.infoTitle")}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
              {CONTACT_INFO.map((item) => (
                <div key={item.key} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{ width: 40, height: 40, background: "var(--color-primary-light)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 0.2rem" }}>
                      {item.key}
                    </p>
                    <p style={{ fontSize: "0.9375rem", color: "var(--color-text)", fontWeight: 500, margin: 0 }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "linear-gradient(135deg, #0369a1, #0ea5e9)", borderRadius: "var(--radius-xl)", padding: "2rem", color: "#fff" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>⏱️</div>
            <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, marginBottom: "0.5rem", color: "#fff" }}>
              {t("contact.responseTitle")}
            </h3>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,.8)", lineHeight: 1.65, margin: 0 }}>
              {t("contact.responseMsg", { hours: t("contact.responseStrong") })}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .contact-input:focus {
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 3px rgba(3,105,161,.12);
        }
      `}</style>
    </div>
  );
}

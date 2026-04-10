"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/lib/LanguageContext";
import Breadcrumb from "@/app/components/Breadcrumb";

const FAQ_DATA = {
  fr: [
    {
      q: "Quelle est la source des données météo ?",
      a: "Nous utilisons l'API OpenWeatherMap, l'une des sources météorologiques les plus fiables au monde. Les données sont mises en cache côté serveur toutes les 10 minutes pour garantir des réponses rapides.",
    },
    {
      q: "À quelle fréquence les prévisions sont-elles mises à jour ?",
      a: "Les données météo actuelles sont actualisées toutes les 10 minutes. Les prévisions 5 jours sont rafraîchies toutes les 30 minutes. La géolocalisation des villes est mise en cache 24 heures.",
    },
    {
      q: "Combien de villes marocaines sont couvertes ?",
      a: "MeteoAuMaroc couvre plus de 60 villes et régions du Maroc, des grandes métropoles comme Casablanca et Marrakech aux villes du Sahara comme Dakhla et Laayoune, en passant par les stations de montagne comme Ifrane.",
    },
    {
      q: "Comment fonctionne la recherche de ville ?",
      a: "La barre de recherche utilise l'API de géocodage d'OpenWeatherMap. Tapez le nom d'une ville au Maroc (ou dans le monde), sélectionnez dans la liste déroulante, et obtenez instantanément la météo actuelle et les prévisions 5 jours.",
    },
    {
      q: "D'où proviennent les horaires de prières ?",
      a: "Les horaires de prière sont fournis par l'API Aladhan, calculés selon la méthode de la Ligue mondiale du monde islamique (méthode 12), reconnue au Maroc. Ils sont mis à jour quotidiennement et adaptés à chaque ville.",
    },
    {
      q: "Le site est-il disponible en arabe ?",
      a: "Oui, MeteoAuMaroc est entièrement disponible en français, arabe et anglais. Utilisez le sélecteur de langue dans la barre de navigation (drapeau). Le site passe automatiquement en mode RTL pour l'arabe.",
    },
    {
      q: "Puis-je consulter la météo sur mobile ?",
      a: "Absolument. MeteoAuMaroc est entièrement responsive et optimisé pour tous les appareils : smartphones, tablettes et ordinateurs. Le menu hamburger s'active automatiquement sur petits écrans.",
    },
    {
      q: "Comment fonctionne le mode sombre ?",
      a: "Cliquez sur l'icône 🌙/☀️ dans la barre de navigation. Votre préférence est sauvegardée en localStorage. Le site détecte aussi automatiquement la préférence système (prefers-color-scheme) au premier chargement.",
    },
    {
      q: "Mes données personnelles sont-elles collectées ?",
      a: "MeteoAuMaroc utilise Google Analytics pour les statistiques de visite anonymes et Google AdSense pour la publicité. Nous ne collectons aucune donnée personnelle via les formulaires sans votre consentement. Consultez notre politique de confidentialité pour les détails.",
    },
    {
      q: "Comment nous contacter ?",
      a: "Via le formulaire de notre page Contact. Nous répondons généralement sous 24 à 48 heures. Vous pouvez aussi nous trouver sur Facebook et Instagram (liens en bas de page).",
    },
  ],
  ar: [
    { q: "ما هو مصدر بيانات الطقس؟", a: "نستخدم واجهة برمجة تطبيقات OpenWeatherMap، أحد أكثر مصادر الطقس موثوقية في العالم. يتم تخزين البيانات مؤقتاً على الخادم كل 10 دقائق لضمان استجابات سريعة." },
    { q: "كم مرة يتم تحديث التوقعات؟", a: "يتم تحديث بيانات الطقس الحالية كل 10 دقائق. يتم تحديث توقعات 5 أيام كل 30 دقيقة. يتم تخزين الموقع الجغرافي للمدن مؤقتاً لمدة 24 ساعة." },
    { q: "كم عدد المدن المغربية المغطاة؟", a: "يغطي MeteoAuMaroc أكثر من 60 مدينة ومنطقة في المغرب، من المدن الكبرى مثل الدار البيضاء ومراكش إلى مدن الصحراء مثل الداخلة والعيون ومحطات الجبال مثل إفران." },
    { q: "كيف يعمل البحث عن المدن؟", a: "يستخدم شريط البحث واجهة الترميز الجغرافي لـ OpenWeatherMap. اكتب اسم مدينة في المغرب (أو في العالم)، اختر من القائمة المنسدلة، واحصل فوراً على الطقس الحالي وتوقعات 5 أيام." },
    { q: "من أين تأتي أوقات الصلاة؟", a: "تأتي أوقات الصلاة من واجهة Aladhan API، محسوبة وفقاً لطريقة رابطة العالم الإسلامي (طريقة 12)، المعتمدة في المغرب. يتم تحديثها يومياً وتكيّفها لكل مدينة." },
    { q: "هل الموقع متوفر بالعربية؟", a: "نعم، MeteoAuMaroc متوفر بالكامل بالفرنسية والعربية والإنجليزية. استخدم محدد اللغة في شريط التنقل (العلم). ينتقل الموقع تلقائياً إلى وضع RTL للعربية." },
    { q: "هل يمكنني استشارة الطقس على الهاتف؟", a: "بالتأكيد. MeteoAuMaroc متجاوب بالكامل ومُحسّن لجميع الأجهزة: الهواتف الذكية والأجهزة اللوحية وأجهزة الكمبيوتر." },
    { q: "كيف يعمل الوضع الداكن؟", a: "انقر على أيقونة 🌙/☀️ في شريط التنقل. يتم حفظ تفضيلك في localStorage. يكتشف الموقع أيضاً تلقائياً تفضيل النظام عند التحميل الأول." },
    { q: "هل يتم جمع بياناتي الشخصية؟", a: "يستخدم MeteoAuMaroc تحليلات Google للإحصائيات المجهولة و Google AdSense للإعلانات. لا نجمع أي بيانات شخصية عبر النماذج دون موافقتك. راجع سياسة الخصوصية للتفاصيل." },
    { q: "كيف يمكنني التواصل معكم؟", a: "عبر نموذج صفحة اتصل بنا. نرد عادة في غضون 24 إلى 48 ساعة. يمكنك أيضاً العثور علينا على فيسبوك وإنستغرام (الروابط في أسفل الصفحة)." },
  ],
  en: [
    { q: "What is the source of weather data?", a: "We use the OpenWeatherMap API, one of the world's most reliable weather data sources. Data is cached server-side every 10 minutes to ensure fast responses." },
    { q: "How often are forecasts updated?", a: "Current weather data is updated every 10 minutes. 5-day forecasts are refreshed every 30 minutes. City geolocation is cached for 24 hours." },
    { q: "How many Moroccan cities are covered?", a: "MeteoAuMaroc covers over 60 cities and regions across Morocco, from major cities like Casablanca and Marrakech to Sahara towns like Dakhla and Laayoune, including mountain stations like Ifrane." },
    { q: "How does the city search work?", a: "The search bar uses the OpenWeatherMap geocoding API. Type a city name in Morocco (or worldwide), select from the dropdown, and instantly get current weather and 5-day forecasts." },
    { q: "Where do prayer times come from?", a: "Prayer times are provided by the Aladhan API, calculated using the Islamic World League method (method 12), recognized in Morocco. They are updated daily and adapted to each city." },
    { q: "Is the site available in Arabic?", a: "Yes, MeteoAuMaroc is fully available in French, Arabic and English. Use the language selector in the navigation bar (flag). The site automatically switches to RTL mode for Arabic." },
    { q: "Can I check weather on mobile?", a: "Absolutely. MeteoAuMaroc is fully responsive and optimized for all devices: smartphones, tablets and desktops. The hamburger menu activates automatically on smaller screens." },
    { q: "How does dark mode work?", a: "Click the 🌙/☀️ icon in the navigation bar. Your preference is saved in localStorage. The site also automatically detects your system preference (prefers-color-scheme) on first load." },
    { q: "Is my personal data collected?", a: "MeteoAuMaroc uses Google Analytics for anonymous visit statistics and Google AdSense for advertising. We do not collect any personal data through forms without your consent. See our privacy policy for details." },
    { q: "How can I contact you?", a: "Via the form on our Contact page. We typically respond within 24 to 48 hours. You can also find us on Facebook and Instagram (links at the bottom of the page)." },
  ],
};

export default function FaqContent() {
  const { t, locale } = useLanguage();
  const [search, setSearch] = useState("");

  const faqs = FAQ_DATA[locale as keyof typeof FAQ_DATA] ?? FAQ_DATA.fr;
  const filtered = search.trim()
    ? faqs.filter(
        (f) =>
          f.q.toLowerCase().includes(search.toLowerCase()) ||
          f.a.toLowerCase().includes(search.toLowerCase())
      )
    : faqs;

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "60vh" }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)",
          padding: "3rem 0 4rem",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "var(--radius-full)",
              padding: "0.35rem 1rem",
              marginBottom: "1rem",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {t("faq.badge")}
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: "0.75rem",
              letterSpacing: "-0.03em",
            }}
          >
            {t("faq.title")}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "1.0625rem",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            {t("faq.subtitle")}
          </p>
        </div>
        <div
          style={{ position: "absolute", bottom: -1, left: 0, right: 0, lineHeight: 0 }}
          aria-hidden
        >
          <svg
            viewBox="0 0 1440 40"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: 40 }}
          >
            <path
              fill="var(--color-bg)"
              d="M0,24 C360,48 1080,0 1440,24 L1440,40 L0,40 Z"
            />
          </svg>
        </div>
      </div>

      <Breadcrumb current="FAQ" />

      <div
        className="container"
        style={{ maxWidth: 740, paddingTop: "2rem", paddingBottom: "5rem" }}
      >
        {/* Search */}
        <div style={{ marginBottom: "2rem" }}>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              locale === "ar"
                ? "ابحث في الأسئلة الشائعة…"
                : locale === "en"
                ? "Search FAQs…"
                : "Rechercher dans la FAQ…"
            }
            style={{
              width: "100%",
              padding: "0.875rem 1.25rem",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--color-border)",
              background: "var(--color-surface)",
              color: "var(--color-text)",
              fontSize: "1rem",
              fontFamily: "inherit",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            className="faq-search-input"
          />
        </div>

        {/* FAQ accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 1rem",
                color: "var(--color-text-muted)",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🔍</div>
              <p style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                {t("faq.notFound")}
              </p>
              <Link
                href="/pages/contact"
                className="btn btn-primary"
                style={{ display: "inline-flex", marginTop: "0.75rem" }}
              >
                {t("faq.contact")}
              </Link>
            </div>
          ) : (
            filtered.map((faq, i) => (
              <details
                key={i}
                className="faq-item"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                }}
              >
                <summary
                  className="faq-summary"
                  style={{
                    padding: "1.125rem 1.5rem",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                    color: "var(--color-text)",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    transition: "background 0.15s",
                  }}
                >
                  <span>{faq.q}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2.5"
                    className="faq-chevron"
                    style={{ flexShrink: 0, transition: "transform 0.25s" }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div
                  style={{
                    padding: "0 1.5rem 1.25rem",
                    color: "var(--color-text-muted)",
                    fontSize: "0.9rem",
                    lineHeight: 1.8,
                    borderTop: "1px solid var(--color-border)",
                    paddingTop: "1rem",
                  }}
                >
                  {faq.a}
                </div>
              </details>
            ))
          )}
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            marginTop: "3rem",
            padding: "2rem",
            background: "linear-gradient(135deg, #0369a1, #0ea5e9)",
            borderRadius: "var(--radius-lg)",
            color: "#fff",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>💬</div>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              marginBottom: "0.5rem",
              color: "#fff",
            }}
          >
            {t("faq.notFound")}
          </h2>
          <Link
            href="/pages/contact"
            className="btn"
            style={{
              display: "inline-flex",
              marginTop: "0.75rem",
              background: "#fff",
              color: "#0369a1",
              fontWeight: 700,
            }}
          >
            {t("faq.contact")}
          </Link>
        </div>
      </div>

      <style>{`
        .faq-search-input:focus {
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 3px rgba(3,105,161,.12);
        }
        .faq-summary:hover {
          background: var(--color-primary-light);
        }
        .faq-summary::-webkit-details-marker { display: none; }
        .faq-item[open] .faq-chevron { transform: rotate(180deg); }
        .faq-item[open] .faq-summary { color: var(--color-primary) !important; }
      `}</style>
    </div>
  );
}

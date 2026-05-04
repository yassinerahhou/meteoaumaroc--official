import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://www.meteoaumaroc.com";

export const metadata: Metadata = {
  title: "Best Time to Visit Morocco – Month by Month Travel Guide | MeteoAuMaroc",
  description:
    "When is the best time to visit Morocco? Month-by-month guide covering temperatures, crowds, festivals, and region-specific advice for Marrakech, Fès, Agadir, Sahara, and more.",
  keywords: [
    "best time to visit morocco", "when to visit morocco", "morocco travel months",
    "أفضل وقت لزيارة المغرب", "meilleur moment pour visiter le Maroc",
    "morocco peak season", "morocco weather travel", "visit morocco spring",
    "morocco desert tour best time", "morocco avoid heat",
  ],
  alternates: { canonical: `${BASE}/best-time-to-visit-morocco` },
  openGraph: {
    title: "Best Time to Visit Morocco | MeteoAuMaroc",
    description: "Month-by-month Morocco travel guide: best months by region, weather highlights, and what to avoid.",
    url: `${BASE}/best-time-to-visit-morocco`,
    type: "article",
  },
};

const MONTHS = [
  {
    month: "January", monthAr: "يناير", monthFr: "Janvier",
    rating: 3, label: "Good",
    coast: "17–19°C", inland: "10–15°C", mountains: "−5–5°C", sahara: "20–22°C",
    crowds: "Low", rain: "High (coast)", highlights: ["Marrakech winter sun", "Atlas ski season opens", "Cheap flights & hotels"],
    avoid: "Mountain trekking (heavy snow), coastal hiking (rain)",
    verdict: "Best for: Marrakech city breaks, budget travelers, Sahara tours. Coastal beaches are too cold.",
  },
  {
    month: "February", monthAr: "فبراير", monthFr: "Février",
    rating: 3, label: "Good",
    coast: "18–20°C", inland: "12–17°C", mountains: "−3–7°C", sahara: "22–25°C",
    crowds: "Low–Medium", rain: "Medium", highlights: ["Almond blossom in Tafraout", "Improved inland weather", "Low-season prices"],
    avoid: "High Atlas roads (still icy), heavy rain weeks on coast",
    verdict: "Best for: Sahara + Marrakech combo tours, photography (almond blossoms), budget trips.",
  },
  {
    month: "March", monthAr: "مارس", monthFr: "Mars",
    rating: 5, label: "Excellent",
    coast: "20–22°C", inland: "17–24°C", mountains: "5–15°C", sahara: "26–30°C",
    crowds: "Medium", rain: "Light", highlights: ["Wildflowers across Atlas foothills", "Comfortable hiking temps", "Sahara cool enough for dune walks"],
    avoid: "Nothing major — occasional rain showers",
    verdict: "One of the best months. Perfect balance of warm temperatures, low crowds, and green landscapes.",
  },
  {
    month: "April", monthAr: "أبريل", monthFr: "Avril",
    rating: 5, label: "Excellent",
    coast: "22–24°C", inland: "20–28°C", mountains: "10–18°C", sahara: "30–35°C",
    crowds: "Medium–High (Easter)", rain: "Light", highlights: ["Rose Festival (Kelaat M'Gouna)", "Lush valley scenery", "Best beach weather begins"],
    avoid: "Easter week price spikes",
    verdict: "Peak spring. Marrakech, Fès, and the Atlantic coast are all ideal. Book accommodation early for Easter.",
  },
  {
    month: "May", monthAr: "ماي", monthFr: "Mai",
    rating: 5, label: "Excellent",
    coast: "22–26°C", inland: "24–32°C", mountains: "15–22°C", sahara: "33–38°C",
    crowds: "Medium", rain: "Very light", highlights: ["Last comfortable month for inland cities", "Moussem festivals begin", "Great for Atlas trekking"],
    avoid: "Sahara starts getting very hot",
    verdict: "Last chance for Marrakech and Fès before summer heat kicks in. Coastal and mountain regions perfect.",
  },
  {
    month: "June", monthAr: "يونيو", monthFr: "Juin",
    rating: 3, label: "Mixed",
    coast: "24–28°C", inland: "28–38°C", mountains: "20–28°C", sahara: "38–44°C",
    crowds: "High", rain: "Minimal", highlights: ["Atlantic beaches (Agadir, Essaouira) ideal", "Mountain resorts pleasant", "Long daylight hours"],
    avoid: "Marrakech, Fès, Meknès mid-day heat",
    verdict: "Good for coast and mountains. Avoid inland cities between 11am–4pm. Sahara becomes brutal.",
  },
  {
    month: "July", monthAr: "يوليوز", monthFr: "Juillet",
    rating: 2, label: "Challenging",
    coast: "25–30°C", inland: "35–44°C", mountains: "22–30°C", sahara: "42–48°C",
    crowds: "Peak", rain: "None", highlights: ["Beach resorts at peak", "Essaouira Gnaoua Festival", "Vibrant nightlife"],
    avoid: "All inland cities (extreme heat), Sahara",
    verdict: "Only recommended for Atlantic beaches. Marrakech and Fès are punishing (40°C+). Highest prices of the year.",
  },
  {
    month: "August", monthAr: "غشت", monthFr: "Août",
    rating: 2, label: "Challenging",
    coast: "26–30°C", inland: "36–45°C", mountains: "22–30°C", sahara: "42–48°C",
    crowds: "Peak", rain: "None", highlights: ["Best beach weather", "Festival season", "Atlantic surf at peak"],
    avoid: "Everything inland — hottest month of the year",
    verdict: "Same as July. Stick to the coast: Agadir, Essaouira, Asilah, Dakhla. Avoid all interior cities.",
  },
  {
    month: "September", monthAr: "شتنبر", monthFr: "Septembre",
    rating: 4, label: "Very Good",
    coast: "24–28°C", inland: "28–36°C", mountains: "18–26°C", sahara: "36–42°C",
    crowds: "Medium (dropping)", rain: "None", highlights: ["Imilchil Marriage Festival", "Inland cities become bearable", "Harvest season scenery"],
    avoid: "Early September still very hot inland; first rain in late September can cause flash floods",
    verdict: "Transition month. Better than summer but not quite as ideal as October. Prices begin to drop.",
  },
  {
    month: "October", monthAr: "أكتوبر", monthFr: "Octobre",
    rating: 5, label: "Excellent",
    coast: "22–26°C", inland: "22–30°C", mountains: "12–20°C", sahara: "28–35°C",
    crowds: "Medium", rain: "Light–Medium (north)", highlights: ["Date harvest in Draa Valley", "Perfect Sahara temperatures", "Excellent for all regions"],
    avoid: "Some rain in the north (Tanger, Tétouan)",
    verdict: "Tied with April for best month. Sahara is perfect (cool nights, warm days). All regions accessible.",
  },
  {
    month: "November", monthAr: "نونبر", monthFr: "Novembre",
    rating: 4, label: "Very Good",
    coast: "20–23°C", inland: "16–24°C", mountains: "6–14°C", sahara: "22–28°C",
    crowds: "Low", rain: "Medium", highlights: ["Low prices & fewer tourists", "Last good month for Sahara", "Cultural events in cities"],
    avoid: "Mountain passes (weather deteriorating), increased Atlantic rain",
    verdict: "Great for budget travelers and Sahara enthusiasts. City exploration excellent. Mountains getting cold.",
  },
  {
    month: "December", monthAr: "دجنبر", monthFr: "Décembre",
    rating: 3, label: "Good",
    coast: "17–20°C", inland: "10–17°C", mountains: "−5–5°C", sahara: "18–23°C",
    crowds: "Low (High Christmas week)", rain: "High", highlights: ["Atlas ski season (Oukaimeden)", "Marrakech winter sun tourism", "Christmas/NYE Marrakech"],
    avoid: "Beach holidays, Atlas trekking (snow), heavy rain on coast",
    verdict: "Good for Marrakech city breaks and ski trips. Christmas week sees price spikes. Sahara at its most comfortable.",
  },
];

const REGION_BEST = [
  { region: "Marrakech", slug: "marrakech", emoji: "🌴", best: "March–May, October–November", avoid: "July–August", why: "Continental climate means brutal summer heat (42°C+). Spring/autumn offer 25–30°C with dry days." },
  { region: "Agadir", slug: "agadir", emoji: "🏖️", best: "Year-round (peak: June–September)", avoid: "Nothing major", why: "Atlantic breezes keep temperatures mild (25–30°C) even in summer. Coldest months (Jan–Feb) are still 20–22°C." },
  { region: "Fès", slug: "fes", emoji: "🕌", best: "March–May, September–November", avoid: "July–August", why: "Historic medina exploration requires comfortable walking temps. Summer hits 38–40°C in narrow alleys." },
  { region: "Sahara / Merzouga", slug: "merzouga", emoji: "🏜️", best: "October–April", avoid: "June–September", why: "Desert temperatures exceed 45°C in summer. Winter nights are cold but days are perfect (20–25°C)." },
  { region: "Essaouira", slug: "essaouira", emoji: "🌊", best: "April–October (surf: year-round)", avoid: "January–February (rain)", why: "Famous for Atlantic trade winds (Alizés) — keeps summer temps around 24°C. Paradise for windsurfers and kite surfers." },
  { region: "Atlas Mountains", slug: "ifrane", emoji: "⛰️", best: "June–September (trekking), December–February (skiing)", avoid: "October–November (unpredictable)", why: "High passes close in winter. Summer is the only time for high-altitude trekking. Ifrane ski station open Dec–Feb." },
  { region: "Tanger", slug: "tanger", emoji: "🌉", best: "May–June, September–October", avoid: "December–February (heavy rain)", why: "The windiest and wettest part of Morocco. Spring and autumn offer pleasant 22–26°C weather." },
  { region: "Chefchaouen", slug: "chefchaouen", emoji: "💙", best: "April–June, September–October", avoid: "July–August (crowded), Winter (cold)", why: "The Blue City at 600m altitude stays cooler than coastal cities. Spring wildflowers make April–May magical." },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",                      item: BASE },
    { "@type": "ListItem", position: 2, name: "Best Time to Visit Morocco", item: `${BASE}/best-time-to-visit-morocco` },
  ],
};

const article = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Time to Visit Morocco – Complete Month-by-Month Guide",
  description: "Month-by-month Morocco travel guide with temperatures, crowd levels, and region-specific advice.",
  url: `${BASE}/best-time-to-visit-morocco`,
  publisher: { "@type": "Organization", name: "MeteoAuMaroc", url: BASE },
  inLanguage: ["en", "fr", "ar"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best time to visit Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best months to visit Morocco are March–May and October–November. These shoulder seasons offer comfortable temperatures (18–28°C), low rainfall, fewer tourists, and lower prices than peak summer. April and October are consistently rated the top two months by experienced travelers.",
      },
    },
    {
      "@type": "Question",
      name: "When should you avoid visiting Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Avoid visiting inland Morocco (Marrakech, Fès, Meknès) in July and August when temperatures regularly exceed 40–45°C. The Saharan south (Ouarzazate, Merzouga) becomes dangerous in peak summer (45–48°C). If visiting the Atlantic coast, avoid December–February for beach activities as sea temperatures drop significantly.",
      },
    },
    {
      "@type": "Question",
      name: "Is Morocco good to visit in winter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — Morocco is excellent for winter travel to coastal cities (Agadir stays 20–22°C in January) and Marrakech (15–18°C). The Atlas Mountains offer skiing at Oukaimeden. December–February is low season with great hotel deals. Avoid the mountains for trekking in winter due to snow-closed passes.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best time to visit the Sahara in Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "October to April is the best time for Morocco's Sahara. October and November offer warm days (28–35°C) and cool nights. December through February are the most comfortable months (20–25°C days) but nights can be near-freezing. Avoid June–September when temperatures exceed 45°C.",
      },
    },
    {
      "@type": "Question",
      name: "When is the cheapest time to visit Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cheapest months to visit Morocco are January–February and November. These are low-season months with fewer tourists, significantly lower hotel rates, and cheaper flights. Good weather can still be found in Agadir, Marrakech, and the Sahara during this period.",
      },
    },
  ],
};

const STAR_COLORS: Record<number, string> = { 5: "#22c55e", 4: "#84cc16", 3: "#f59e0b", 2: "#ef4444", 1: "#dc2626" };
const STAR_LABELS: Record<number, string> = { 5: "Excellent", 4: "Very Good", 3: "Good", 2: "Challenging", 1: "Avoid" };

export default function BestTimeToVisitMoroccoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main style={{ background: "var(--color-bg)", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9,#5b21b6)", padding: "4rem 0 3rem", color: "#fff" }}>
          <div className="container">
            <nav style={{ fontSize: "0.8rem", opacity: 0.8, marginBottom: "1rem" }}>
              <Link href="/" style={{ color: "#c4b5fd" }}>Home</Link>
              <span style={{ margin: "0 0.4rem" }}>›</span>
              <span>Best Time to Visit Morocco</span>
            </nav>
            <h1 style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.2 }}>
              Best Time to Visit Morocco
              <br /><span style={{ color: "#c4b5fd" }}>Month-by-Month Travel Guide</span>
            </h1>
            <p style={{ fontSize: "1.05rem", opacity: 0.88, maxWidth: 620, lineHeight: 1.8 }}>
              From spring wildflowers to winter desert nights — find the perfect month for
              your Morocco trip based on your destination and travel style.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
              {[
                { label: "Spring (Mar–May)", color: "#86efac", text: "#166534" },
                { label: "Autumn (Oct–Nov)", color: "#fde68a", text: "#92400e" },
                { label: "Best overall months", color: "#c4b5fd", text: "#5b21b6" },
              ].map(b => (
                <span key={b.label} style={{ background: b.color, color: b.text, padding: "0.35rem 1rem", borderRadius: "var(--radius-full)", fontSize: "0.82rem", fontWeight: 700 }}>
                  ✓ {b.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="container" style={{ maxWidth: 960, padding: "3rem 1rem" }}>

          {/* Quick summary banner */}
          <section style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", border: "1px solid #86efac", borderRadius: "var(--radius-lg)", padding: "1.5rem 2rem", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#166534", marginBottom: "0.75rem" }}>Quick Answer</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
              {[
                { label: "Best overall", value: "March–May & October", icon: "🏆" },
                { label: "Best for beaches", value: "June–September (coast)", icon: "🏖️" },
                { label: "Best for Sahara", value: "October–April", icon: "🏜️" },
                { label: "Cheapest months", value: "January & November", icon: "💰" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#166534", fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: "0.9rem", color: "#15803d", fontWeight: 700 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Month-by-month table */}
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--color-text)" }}>
              Morocco Month-by-Month Guide
            </h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", lineHeight: 1.75 }}>
              Temperatures shown are average daily highs for each major region.
            </p>
            <div style={{ display: "grid", gap: "1rem" }}>
              {MONTHS.map((m) => (
                <div key={m.month} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.5rem", borderLeft: `4px solid ${STAR_COLORS[m.rating]}` }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                    {/* Month name */}
                    <div style={{ minWidth: 110 }}>
                      <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--color-text)" }}>{m.month}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{m.monthFr} · {m.monthAr}</div>
                      <span style={{ display: "inline-block", marginTop: "0.4rem", background: STAR_COLORS[m.rating] + "22", color: STAR_COLORS[m.rating], padding: "0.15rem 0.6rem", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700 }}>
                        {STAR_LABELS[m.rating]}
                      </span>
                    </div>
                    {/* Temp grid */}
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "0.4rem 1rem", marginBottom: "0.75rem", fontSize: "0.8rem" }}>
                        {[
                          { label: "🌊 Coast", val: m.coast },
                          { label: "🏙️ Inland", val: m.inland },
                          { label: "⛰️ Mountains", val: m.mountains },
                          { label: "🏜️ Sahara", val: m.sahara },
                        ].map(r => (
                          <div key={r.label} style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                            <span style={{ color: "var(--color-text-muted)" }}>{r.label}</span>
                            <strong style={{ color: "var(--color-text)" }}>{r.val}</strong>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                        <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", padding: "0.15rem 0.6rem", borderRadius: "var(--radius-full)", fontSize: "0.75rem" }}>👥 Crowds: {m.crowds}</span>
                        <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", padding: "0.15rem 0.6rem", borderRadius: "var(--radius-full)", fontSize: "0.75rem" }}>🌧️ Rain: {m.rain}</span>
                      </div>
                      {m.highlights.length > 0 && (
                        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                          {m.highlights.map(h => <span key={h} style={{ background: "#f0fdf4", color: "#166534", border: "1px solid #86efac", padding: "0.1rem 0.5rem", borderRadius: "var(--radius-full)", fontSize: "0.72rem" }}>✓ {h}</span>)}
                        </div>
                      )}
                      <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.65 }}>
                        <strong style={{ color: "var(--color-primary)" }}>Verdict:</strong> {m.verdict}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Best time by region */}
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--color-text)" }}>
              Best Time to Visit by Region
            </h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", lineHeight: 1.75 }}>
              Morocco is not one climate — what is perfect for Agadir may be brutal in Marrakech.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}>
              {REGION_BEST.map((r) => {
                return (
                  <div key={r.region} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                      <span style={{ fontSize: "1.75rem" }}>{r.emoji}</span>
                      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text)", margin: 0 }}>{r.region}</h3>
                    </div>
                    <div style={{ marginBottom: "0.4rem" }}>
                      <span style={{ background: "#f0fdf4", color: "#166534", border: "1px solid #86efac", padding: "0.2rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700, marginRight: "0.4rem" }}>
                        ✓ Best: {r.best}
                      </span>
                    </div>
                    <div style={{ marginBottom: "0.75rem" }}>
                      <span style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fca5a5", padding: "0.2rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700 }}>
                        ✗ Avoid: {r.avoid}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: 1.65, margin: "0 0 0.75rem" }}>{r.why}</p>
                    <Link href={`/cities/${r.slug}`} style={{ fontSize: "0.78rem", color: "var(--color-primary)", fontWeight: 600, textDecoration: "none" }}>
                      View {r.region} forecast →
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--color-text)" }}>
              Frequently Asked Questions
            </h2>
            {faqSchema.mainEntity.map((item, i) => (
              <details key={i} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", marginBottom: "0.75rem", overflow: "hidden" }}>
                <summary style={{ padding: "1rem 1.25rem", cursor: "pointer", fontWeight: 600, color: "var(--color-text)", display: "flex", justifyContent: "space-between", alignItems: "center", listStyle: "none", fontSize: "0.95rem" }}>
                  {item.name}
                  <span style={{ color: "var(--color-primary)", fontSize: "1.2rem", flexShrink: 0, marginLeft: "0.5rem" }}>+</span>
                </summary>
                <div style={{ padding: "0 1.25rem 1rem", color: "var(--color-text-muted)", lineHeight: 1.75, fontSize: "0.9rem" }}>
                  {item.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </section>

          {/* Internal links */}
          <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1rem", marginBottom: "3rem" }}>
            {[
              { href: "/morocco-climate-guide", icon: "🗺️", title: "Morocco Climate Guide", desc: "Detailed breakdown of all 6 climate zones with monthly data." },
              { href: "/weather-morocco", icon: "🌤️", title: "Weather in Morocco", desc: "Real-time regional overviews and seasonal weather patterns." },
              { href: "/cities", icon: "📍", title: "All City Forecasts", desc: "Live weather for 60+ Moroccan cities with 14-day forecasts." },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.25rem 1.5rem", textDecoration: "none", display: "block" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{link.icon}</div>
                <div style={{ fontWeight: 700, color: "var(--color-primary)", marginBottom: "0.35rem", fontSize: "0.95rem" }}>{link.title}</div>
                <div style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>{link.desc}</div>
              </Link>
            ))}
          </section>

          {/* CTA */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/cities" style={{ background: "var(--color-primary)", color: "#fff", padding: "0.75rem 2rem", borderRadius: "var(--radius-full)", fontWeight: 700, textDecoration: "none" }}>
              Check City Forecasts →
            </Link>
            <Link href="/morocco-climate-guide" style={{ background: "var(--color-surface)", color: "var(--color-primary)", padding: "0.75rem 2rem", borderRadius: "var(--radius-full)", fontWeight: 700, textDecoration: "none", border: "1px solid var(--color-border)" }}>
              Climate Zone Guide →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

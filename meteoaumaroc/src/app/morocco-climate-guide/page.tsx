import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AdUnit from "@/app/components/AdUnit";

const BASE = "https://www.meteoaumaroc.com";

export const metadata: Metadata = {
  title: "Morocco Climate Guide – Regions, Zones & Seasonal Weather | MeteoAuMaroc",
  description:
    "In-depth Morocco climate guide: Mediterranean, Atlantic, Continental, and Saharan zones explained with monthly averages, rainfall maps, and regional comparisons.",
  keywords: [
    "morocco climate guide", "moroccan climate", "climate zones morocco",
    "مناخ المغرب", "دليل مناخ المغرب", "guide climatique maroc",
    "climat maroc", "météo régions maroc",
  ],
  alternates: { canonical: `${BASE}/morocco-climate-guide` },
  openGraph: {
    title: "Morocco Climate Guide | MeteoAuMaroc",
    description: "Detailed guide to Morocco's climate zones, monthly averages, and regional weather patterns.",
    url: `${BASE}/morocco-climate-guide`,
    type: "article",
  },
};

const CLIMATE_ZONES = [
  {
    id: "atlantic",
    emoji: "🌊",
    name: "Atlantic Mediterranean",
    nameAr: "المناخ الأطلسي المتوسطي",
    nameFr: "Atlantique méditerranéen",
    cities: ["Casablanca", "Rabat", "Kénitra", "Mohammedia"],
    avgSummer: "22–28°C",
    avgWinter: "10–18°C",
    annualRain: "400–650 mm",
    description: "The dominant climate of Morocco's Atlantic coast. Summers are warm and dry (June–September), winters mild and rainy (October–April). The Atlantic Ocean acts as a natural thermostat — preventing extreme heat in summer and frost in winter. Coastal fog is common in the mornings.",
    bestFor: "Year-round visits, beach holidays, city breaks",
  },
  {
    id: "semiarid-coastal",
    emoji: "🏖️",
    name: "Coastal Semi-Arid",
    nameAr: "الساحلي شبه الجاف",
    nameFr: "Côtier semi-aride",
    cities: ["Agadir", "Essaouira", "Safi", "Tiznit"],
    avgSummer: "24–30°C",
    avgWinter: "14–22°C",
    annualRain: "200–350 mm",
    description: "South of Agadir, the climate becomes drier while remaining mild due to cold Atlantic currents. Essaouira is famously windy (a paradise for kitesurfers). Summers are warm but never extreme. Winters are pleasant. Rainfall is low and concentrated in winter months.",
    bestFor: "Water sports, winter escapes, surf trips",
  },
  {
    id: "continental",
    emoji: "🌡️",
    name: "Continental Semi-Arid",
    nameAr: "القاري شبه الجاف",
    nameFr: "Continental semi-aride",
    cities: ["Marrakech", "Fès", "Meknès", "Béni Mellal"],
    avgSummer: "30–45°C",
    avgWinter: "6–18°C",
    annualRain: "150–300 mm",
    description: "The classic interior climate of Morocco. Summers are brutally hot — Marrakech regularly records 42°C+ in July and August. Winters are cool with occasional frost at night. Spring and autumn are the ideal seasons. The Chergui (hot east wind) can raise temperatures dramatically in spring.",
    bestFor: "Spring/autumn culture trips, winter sun breaks",
  },
  {
    id: "alpine",
    emoji: "⛰️",
    name: "Alpine Mountain",
    nameAr: "جبلي",
    nameFr: "Montagnard alpin",
    cities: ["Ifrane", "Azrou", "Midelt", "Oukaimeden"],
    avgSummer: "15–25°C",
    avgWinter: "−10–8°C",
    annualRain: "800–1200 mm",
    description: "The Atlas and Rif Mountains have a true alpine climate. Ifrane — called \"Morocco's Switzerland\" — regularly drops to −15°C in January. Heavy snowfall (December–February) feeds Morocco's rivers. Summers are cool and pleasant. This is Morocco's only true ski region.",
    bestFor: "Skiing (Dec–Feb), summer trekking, cool escapes",
  },
  {
    id: "mediterranean-north",
    emoji: "🍊",
    name: "Mediterranean North",
    nameAr: "المتوسطي الشمالي",
    nameFr: "Méditerranéen septentrional",
    cities: ["Tanger", "Tétouan", "Al Hoceima", "Nador"],
    avgSummer: "25–35°C",
    avgWinter: "8–16°C",
    annualRain: "500–900 mm",
    description: "The northern tip of Morocco bordering Spain has a classic Mediterranean climate — hot dry summers, mild wet winters. The Rif Mountains trap moisture, making this the wettest part of Morocco (Oued Laou over 900mm/year). Tanger is known for its fog, wind, and dramatic weather.",
    bestFor: "Spring wildflowers, summer beaches, cultural heritage",
  },
  {
    id: "saharan",
    emoji: "🏜️",
    name: "Saharan Desert",
    nameAr: "صحراوي",
    nameFr: "Saharien désertique",
    cities: ["Ouarzazate", "Zagora", "Errachidia", "Laâyoune"],
    avgSummer: "35–48°C",
    avgWinter: "10–22°C",
    annualRain: "30–100 mm",
    description: "South of the Anti-Atlas, Morocco transitions into the Sahara. Temperatures exceed 48°C in summer. Winters are surprisingly mild during the day (20–25°C) but cold at night. Annual rainfall is extremely low. The region is famous for sand dunes, kasbahs, and clear starry skies.",
    bestFor: "Desert adventures (Oct–Mar), stargazing, Sahara tours",
  },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",                item: BASE },
    { "@type": "ListItem", position: 2, name: "Morocco Climate Guide", item: `${BASE}/morocco-climate-guide` },
  ],
};

const article = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Morocco Climate Guide – All Climate Zones Explained",
  description: "In-depth guide to Morocco's 6 climate zones with monthly averages and travel advice.",
  url: `${BASE}/morocco-climate-guide`,
  publisher: { "@type": "Organization", name: "MeteoAuMaroc", url: BASE },
  inLanguage: ["en", "fr", "ar"],
};

export default function MoroccoClimateGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />

      <main style={{ background: "var(--color-bg)", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#064e3b,#065f46,#047857)", padding: "4rem 0 3rem", color: "#fff" }}>
          <div className="container">
            <nav style={{ fontSize: "0.8rem", opacity: 0.8, marginBottom: "1rem" }}>
              <Link href="/" style={{ color: "#6ee7b7" }}>Home</Link>
              <span style={{ margin: "0 0.4rem" }}>›</span>
              <span>Morocco Climate Guide</span>
            </nav>
            <h1 style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.2 }}>
              Morocco Climate Guide
              <br /><span style={{ color: "#6ee7b7" }}>6 Zones, One Country</span>
            </h1>
            <p style={{ fontSize: "1.05rem", opacity: 0.88, maxWidth: 600, lineHeight: 1.8 }}>
              From Alpine snow to Saharan dunes, Morocco spans climates that span three continents.
              This guide explains every climate zone with monthly data, travel tips, and city links.
            </p>
          </div>
        </section>

        <div className="container" style={{ maxWidth: 960, padding: "3rem 1rem" }}>

          {/* Featured Image */}
          <div style={{ position: "relative", width: "100%", height: 400, borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: "3rem", boxShadow: "var(--shadow-lg)" }}>
            <Image 
              src="/casablanca_coast_climate_1776173230824.png" 
              alt="Atlantic coast climate in Casablanca, Morocco" 
              fill 
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <AdUnit slot="1234567890" format="horizontal" style={{ marginBottom: "3rem" }} />

          {/* Monthly temperature table */}
          <section style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.75rem", marginBottom: "3rem", overflowX: "auto" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-text)" }}>Morocco Monthly Temperature Overview</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", minWidth: 540 }}>
              <thead>
                <tr style={{ background: "var(--color-primary)", color: "#fff" }}>
                  <th style={{ padding: "0.6rem 0.75rem", textAlign: "left" }}>City</th>
                  {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => (
                    <th key={m} style={{ padding: "0.6rem 0.4rem", textAlign: "center" }}>{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { city: "Casablanca", temps: [17,18,20,22,24,27,28,29,27,23,20,17] },
                  { city: "Marrakech",  temps: [18,20,24,27,32,37,40,40,35,28,22,18] },
                  { city: "Agadir",     temps: [20,22,24,25,27,28,29,30,29,27,24,21] },
                  { city: "Fès",        temps: [14,16,19,22,27,33,37,37,32,25,19,14] },
                  { city: "Ifrane",     temps: [5, 7, 10,14,18,23,27,28,22,15,9, 5 ] },
                  { city: "Ouarzazate", temps: [18,21,25,29,34,39,42,42,37,30,23,18] },
                ].map((row, i) => (
                  <tr key={row.city} style={{ background: i % 2 === 0 ? "var(--color-surface)" : "var(--color-bg)", borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "0.55rem 0.75rem", fontWeight: 700, color: "var(--color-text)", whiteSpace: "nowrap" }}>{row.city}</td>
                    {row.temps.map((t, j) => (
                      <td key={j} style={{ padding: "0.55rem 0.4rem", textAlign: "center", fontWeight: 600,
                        color: t >= 38 ? "#ef4444" : t >= 30 ? "#f97316" : t >= 22 ? "#f59e0b" : t >= 15 ? "#22c55e" : "#60a5fa" }}>
                        {t}°
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.75rem" }}>
              Average daily maximum temperature (°C). Colors: <span style={{ color: "#60a5fa" }}>●</span> Cold &nbsp;
              <span style={{ color: "#22c55e" }}>●</span> Mild &nbsp;
              <span style={{ color: "#f59e0b" }}>●</span> Warm &nbsp;
              <span style={{ color: "#f97316" }}>●</span> Hot &nbsp;
              <span style={{ color: "#ef4444" }}>●</span> Extreme
            </p>
          </section>

          {/* Climate zones */}
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--color-text)" }}>Morocco's 6 Climate Zones</h2>
          <div style={{ display: "grid", gap: "1.5rem", marginBottom: "3rem" }}>
            {CLIMATE_ZONES.map((z) => (
              <div key={z.id} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "2rem", flexShrink: 0 }}>{z.emoji}</span>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.2rem" }}>{z.name}</h3>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>{z.nameFr} · {z.nameAr}</div>
                    <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                      <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", padding: "0.2rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700 }}>☀️ Summer: {z.avgSummer}</span>
                      <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", padding: "0.2rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700 }}>❄️ Winter: {z.avgWinter}</span>
                      <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", padding: "0.2rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700 }}>🌧️ Rain: {z.annualRain}</span>
                    </div>
                    <p style={{ color: "var(--color-text-muted)", lineHeight: 1.75, fontSize: "0.9rem", marginBottom: "0.75rem" }}>{z.description}</p>
                    <div style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>
                      <strong style={{ color: "var(--color-primary)" }}>Best for:</strong> {z.bestFor}
                    </div>
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      {z.cities.map((c) => {
                        const slug = c.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        return (
                          <Link key={c} href={`/cities/${slug}`} style={{ fontSize: "0.78rem", color: "var(--color-primary)", background: "var(--color-bg)", border: "1px solid var(--color-border)", padding: "0.2rem 0.65rem", borderRadius: "var(--radius-full)", textDecoration: "none", fontWeight: 600 }}>
                            📍 {c}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/cities" style={{ background: "var(--color-primary)", color: "#fff", padding: "0.75rem 2rem", borderRadius: "var(--radius-full)", fontWeight: 700, textDecoration: "none" }}>
              All City Forecasts →
            </Link>
            <Link href="/best-time-to-visit-morocco" style={{ background: "var(--color-surface)", color: "var(--color-primary)", padding: "0.75rem 2rem", borderRadius: "var(--radius-full)", fontWeight: 700, textDecoration: "none", border: "1px solid var(--color-border)" }}>
              Best Time to Visit →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

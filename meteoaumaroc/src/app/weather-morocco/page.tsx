import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AdUnit from "@/app/components/AdUnit";

const BASE = "https://www.meteoaumaroc.com";

export const metadata: Metadata = {
  title: "Weather in Morocco – Complete Guide to Moroccan Climate | MeteoAuMaroc",
  description:
    "Everything about weather in Morocco: climate zones, regional forecasts, seasonal patterns, and real-time conditions for 60+ Moroccan cities. Updated daily.",
  keywords: [
    "weather morocco", "weather in morocco", "morocco weather", "météo maroc",
    "moroccan climate", "maroc météo", "الطقس في المغرب", "weather north africa",
  ],
  alternates: {
    canonical: `${BASE}/weather-morocco`,
  },
  openGraph: {
    title: "Weather in Morocco – Complete Guide | MeteoAuMaroc",
    description: "Climate zones, seasonal forecasts and real-time weather for every region of Morocco.",
    url: `${BASE}/weather-morocco`,
    type: "article",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the weather like in Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morocco has four main climate zones: Atlantic Mediterranean (mild, wet winters), Semi-arid (hot summers, cool winters), Continental (extreme seasonal variation), and Saharan (very hot and dry). Coastal cities like Casablanca and Agadir enjoy year-round mild weather, while inland cities like Marrakech and Fès experience hotter summers and cooler winters.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best time to visit Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best months to visit Morocco are March–May and September–November. Spring offers blooming landscapes and comfortable temperatures (18–25°C). Autumn brings warm days without the extreme summer heat. Avoid July–August for inland cities where temperatures regularly exceed 40°C.",
      },
    },
    {
      "@type": "Question",
      name: "Does it snow in Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Morocco receives snow mainly in the Atlas Mountains (December–February). Cities like Ifrane and Azrou can see significant snowfall. Coastal cities like Casablanca or Rabat almost never see snow.",
      },
    },
    {
      "@type": "Question",
      name: "How hot does Morocco get in summer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In summer (June–August), Morocco can reach extreme temperatures. Marrakech and inland cities regularly hit 40–45°C. Coastal cities like Agadir and Essaouira are cooled by Atlantic winds and stay around 25–30°C. The Saharan south can exceed 48°C.",
      },
    },
    {
      "@type": "Question",
      name: "What is the rainy season in Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morocco's rainy season runs from October to April. The Atlantic north and coastal regions receive 400–700mm annually. The interior and south receive far less (100–200mm). Summers are almost entirely dry across all regions.",
      },
    },
  ],
};

const REGIONS = [
  { name: "North Atlantic Coast",   nameAr: "الساحل الأطلسي الشمالي", cities: ["casablanca","rabat","tanger","sale","kenitra"],   temp: "16–28°C", rain: "Medium",  desc: "Mild Mediterranean-Atlantic climate with warm summers and rainy winters." },
  { name: "South Atlantic Coast",   nameAr: "الساحل الأطلسي الجنوبي", cities: ["agadir","essaouira","safi","tiznit"],              temp: "17–30°C", rain: "Low",     desc: "Semi-arid coastal climate — warm year-round with strong Atlantic breezes." },
  { name: "Interior Plains",        nameAr: "السهول الداخلية",          cities: ["marrakech","fes","meknes","beni-mellal"],          temp: "10–42°C", rain: "Low",     desc: "Continental semi-arid: hot dry summers, cool winters. Wide daily range." },
  { name: "High Atlas & Mountains", nameAr: "جبال الأطلس",              cities: ["ifrane","azrou","midelt"],                         temp: "−5–30°C", rain: "High",    desc: "Alpine climate with snow in winter. Morocco's most extreme cold region." },
  { name: "Mediterranean North",    nameAr: "الشمال المتوسطي",          cities: ["tetouan","al-hoceima","nador"],                    temp: "12–34°C", rain: "Medium",  desc: "Classic Mediterranean climate with hot dry summers and mild wet winters." },
  { name: "Saharan South",          nameAr: "الجنوب الصحراوي",          cities: ["ouarzazate","zagora","errachidia","laayoune"],      temp: "12–48°C", rain: "Minimal", desc: "Desert Saharan climate — extremely hot summers, mild winters, near-zero rain." },
];

export default function WeatherMoroccoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home",           item: BASE },
          { "@type": "ListItem", position: 2, name: "Weather Morocco", item: `${BASE}/weather-morocco` },
        ],
      }) }} />

      <main style={{ background: "var(--color-bg)", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#0c4a6e,#0369a1,#0284c7)", padding: "4rem 0 3rem", color: "#fff" }}>
          <div className="container">
            <nav style={{ fontSize: "0.8rem", opacity: 0.8, marginBottom: "1rem" }}>
              <Link href="/" style={{ color: "#7dd3fc" }}>Home</Link>
              <span style={{ margin: "0 0.4rem" }}>›</span>
              <span>Weather Morocco</span>
            </nav>
            <h1 style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.2 }}>
              Weather in Morocco<br />
              <span style={{ color: "#7dd3fc" }}>Complete Climate Guide</span>
            </h1>
            <p style={{ fontSize: "1.1rem", opacity: 0.88, maxWidth: 620, lineHeight: 1.75 }}>
              Morocco&apos;s climate spans Atlantic coasts, Saharan deserts, and Alpine mountains.
              Explore real-time weather and forecasts for every region.
            </p>
          </div>
        </section>

        <div className="container" style={{ maxWidth: 960, padding: "3rem 1rem" }}>
          
          {/* Featured Image */}
          <div style={{ position: "relative", width: "100%", height: 400, borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: "3rem", boxShadow: "var(--shadow-lg)" }}>
            <Image 
              src="/assets/img/Agadir.jpg" 
              alt="Weather on the Atlantic coast of Morocco in Agadir" 
              fill 
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <AdUnit slot="7890123456" format="horizontal" style={{ marginBottom: "3rem" }} />

          {/* Overview cards */}
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--color-text)" }}>
              Morocco Climate Overview
            </h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", lineHeight: 1.75 }}>
              Morocco occupies a unique geographic position between the Atlantic Ocean, Mediterranean Sea,
              and Sahara Desert — creating four distinct climate zones across a country smaller than Texas.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}>
              {REGIONS.map((r) => (
                <div key={r.name} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.25rem", color: "var(--color-text)" }}>{r.name}</h3>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>{r.nameAr}</div>
                  <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", padding: "0.2rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700 }}>🌡️ {r.temp}</span>
                    <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", padding: "0.2rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700 }}>🌧️ Rain: {r.rain}</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.65, margin: "0 0 1rem" }}>{r.desc}</p>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {r.cities.map((slug) => (
                      <Link key={slug} href={`/cities/${slug}`} style={{ fontSize: "0.78rem", color: "var(--color-primary)", background: "var(--color-primary-light)", padding: "0.2rem 0.6rem", borderRadius: "var(--radius-full)", textDecoration: "none", fontWeight: 600 }}>
                        {slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ")}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <AdUnit slot="8901234567" format="rectangle" style={{ marginBottom: "3rem" }} />

          {/* Seasonal guide */}
          <section style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "2rem", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--color-text)" }}>Morocco Weather by Season</h2>
            {[
              { season: "🌸 Spring (March–May)", temp: "18–28°C", summary: "Best season to visit. Landscapes bloom with wildflowers. Comfortable temperatures across all regions. Occasional rain in the north. Perfect for trekking in the Atlas Mountains and exploring medinas.", highlights: ["Atlas trekking","Sahara tours","City exploration"] },
              { season: "☀️ Summer (June–August)", temp: "25–45°C", summary: "Peak tourist season on Atlantic beaches. Agadir, Essaouira, and Asilah are ideal. Avoid inland cities (Marrakech, Fès) — temperatures regularly hit 40–45°C. Mountain resorts near Ifrane provide cool escapes.", highlights: ["Atlantic beaches","Mountain escapes","Festivals"] },
              { season: "🍂 Autumn (September–November)", temp: "15–30°C", summary: "Second best season. Summer heat fades, leaving warm days and cool nights. Fewer tourists than spring. Ideal for southern Morocco (Sahara dunes, Draa Valley) and cultural exploration.", highlights: ["Sahara tours","Date harvest","Fewer crowds"] },
              { season: "❄️ Winter (December–February)", temp: "6–20°C", summary: "Mild on the coasts, cold inland, alpine in the Atlas. Coastal cities stay pleasant (15–18°C). Ifrane can drop below −15°C and sees heavy snow. Marrakech is popular for winter sun tourism from Europe.", highlights: ["Marrakech winter sun","Atlas skiing","Low-season deals"] },
            ].map((s) => (
              <div key={s.season} style={{ borderBottom: "1px solid var(--color-border)", padding: "1.25rem 0", display: "grid", gridTemplateColumns: "200px 1fr", gap: "1.5rem", alignItems: "start" }} className="season-row">
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-text)", marginBottom: "0.35rem" }}>{s.season}</div>
                  <div style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", display: "inline-block", padding: "0.2rem 0.7rem", borderRadius: "var(--radius-full)", fontSize: "0.8rem", fontWeight: 700 }}>{s.temp}</div>
                </div>
                <div>
                  <p style={{ color: "var(--color-text-muted)", lineHeight: 1.75, marginBottom: "0.6rem", fontSize: "0.9rem" }}>{s.summary}</p>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {s.highlights.map((h) => <span key={h} style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)", padding: "0.15rem 0.6rem", borderRadius: "var(--radius-full)", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>✓ {h}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--color-text)" }}>Frequently Asked Questions about Morocco Weather</h2>
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

          {/* City links CTA */}
          <section style={{ background: "linear-gradient(135deg,#0c4a6e,#0369a1)", borderRadius: "var(--radius-lg)", padding: "2rem", textAlign: "center", color: "#fff" }}>
            <h2 style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: "0.75rem" }}>Check Real-Time Weather for Any Moroccan City</h2>
            <p style={{ opacity: 0.88, marginBottom: "1.5rem", fontSize: "0.95rem" }}>60+ cities covered with hourly forecasts, UV index, air quality, and prayer times.</p>
            <Link href="/cities" style={{ display: "inline-block", background: "#fff", color: "var(--color-primary)", padding: "0.65rem 2rem", borderRadius: "var(--radius-full)", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>
              Browse All Cities →
            </Link>
          </section>
        </div>
      </main>

      <style>{`
        @media (max-width: 600px) {
          .season-row { grid-template-columns: 1fr !important; gap: 0.5rem !important; }
        }
      `}</style>
    </>
  );
}

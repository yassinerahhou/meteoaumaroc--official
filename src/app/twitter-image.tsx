import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 55%, #38bdf8 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700 }}>MeteoAuMaroc</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
            Prévisions météo fiables
          </div>
          <div style={{ fontSize: 34, opacity: 0.92 }}>
            Météo actuelle, 14 jours et alertes partout au Maroc
          </div>
        </div>
        <div style={{ display: "flex", gap: 18, fontSize: 24, opacity: 0.95 }}>
          <div>60+ villes</div>
          <div>Données en temps réel</div>
          <div>Guides météo</div>
        </div>
      </div>
    ),
    size,
  );
}

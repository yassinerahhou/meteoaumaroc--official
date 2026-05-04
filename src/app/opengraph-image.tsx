import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
            }}
          >
            ☀
          </div>
          MeteoAuMaroc
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 74, fontWeight: 800, lineHeight: 1.05 }}>
            Météo au Maroc
          </div>
          <div style={{ fontSize: 34, opacity: 0.92 }}>
            Prévisions en temps réel, 14 jours et alertes pour 60+ villes
          </div>
        </div>

        <div style={{ display: "flex", gap: 18, fontSize: 24, opacity: 0.95 }}>
          <div>Casablanca</div>
          <div>Rabat</div>
          <div>Marrakech</div>
          <div>Agadir</div>
          <div>Tanger</div>
        </div>
      </div>
    ),
    size,
  );
}

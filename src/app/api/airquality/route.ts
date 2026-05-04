import { NextRequest, NextResponse } from "next/server";

const AQI_BASE = "https://api.openweathermap.org/data/2.5/air_pollution";

// Simple in-memory cache (1 hour for AQI - changes slowly)
const cache = new Map<string, { data: unknown; expires: number }>();
const TTL = 3600_000;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "lat and lon required" }, { status: 400 });
  }

  const key = `aqi:${lat}:${lon}`;
  const cached = cache.get(key);
  if (cached && Date.now() < cached.expires) {
    return NextResponse.json(cached.data, { headers: { "X-Cache": "HIT", "Cache-Control": "public, max-age=3600" } });
  }

  const apiKey = process.env.OWM_API_KEY ?? process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "API key not configured" }, { status: 500 });

  try {
    const url = `${AQI_BASE}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) return NextResponse.json({ error: "Upstream error" }, { status: res.status });
    const data = await res.json();
    cache.set(key, { data, expires: Date.now() + TTL });
    return NextResponse.json(data, { headers: { "X-Cache": "MISS", "Cache-Control": "public, max-age=3600" } });
  } catch {
    return NextResponse.json({ error: "Failed to fetch air quality" }, { status: 500 });
  }
}

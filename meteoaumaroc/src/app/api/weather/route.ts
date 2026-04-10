import { NextRequest, NextResponse } from "next/server";
import { weatherCache, WEATHER_TTL } from "@/app/lib/cache";

const OWM_BASE = "https://api.openweathermap.org/data/2.5/weather";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const lang = ["fr", "ar", "en"].includes(searchParams.get("lang") ?? "") ? searchParams.get("lang")! : "fr";

  if (!lat || !lon) {
    return NextResponse.json({ error: "lat and lon are required" }, { status: 400 });
  }

  const cacheKey = `weather:${lat}:${lon}:${lang}`;
  const cached = weatherCache.get(cacheKey);
  if (cached) {
    return NextResponse.json(cached, {
      headers: { "X-Cache": "HIT", "Cache-Control": "public, max-age=300" },
    });
  }

  const apiKey = process.env.OWM_API_KEY ?? process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const url = `${OWM_BASE}?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: WEATHER_TTL } });

    if (!res.ok) {
      return NextResponse.json({ error: "Upstream API error" }, { status: res.status });
    }

    const data = await res.json();
    weatherCache.set(cacheKey, data, WEATHER_TTL);

    return NextResponse.json(data, {
      headers: { "X-Cache": "MISS", "Cache-Control": "public, max-age=300" },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
}

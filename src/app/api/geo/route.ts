import { NextRequest, NextResponse } from "next/server";
import { weatherCache, GEO_TTL } from "@/app/lib/cache";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q");

  if (!q || q.trim().length < 2) {
    return NextResponse.json([], { status: 200 });
  }

  const cacheKey = `geo:${q.toLowerCase().trim()}`;
  const cached = weatherCache.get(cacheKey);
  if (cached) {
    return NextResponse.json(cached, { headers: { "X-Cache": "HIT" } });
  }

  const apiKey = process.env.OWM_API_KEY ?? process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=5&appid=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) {
      return NextResponse.json([], { status: 200 });
    }

    const data = await res.json();
    weatherCache.set(cacheKey, data, GEO_TTL);

    return NextResponse.json(data, { headers: { "X-Cache": "MISS" } });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

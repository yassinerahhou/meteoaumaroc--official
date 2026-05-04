import { NextRequest, NextResponse } from "next/server";
import { getForecastData, normalizeWeatherLanguage } from "@/app/lib/openWeather";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const lang = normalizeWeatherLanguage(searchParams.get("lang"));

  if (!lat || !lon) {
    return NextResponse.json({ error: "lat and lon are required" }, { status: 400 });
  }

  const data = await getForecastData(lat, lon, lang);
  if (!data) {
    return NextResponse.json({ error: "Failed to fetch forecast data" }, { status: 500 });
  }

  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=1800" },
  });
}

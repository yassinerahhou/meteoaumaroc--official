import { NextRequest, NextResponse } from "next/server";
import { getWeatherData, normalizeWeatherLanguage } from "@/app/lib/openWeather";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const lang = normalizeWeatherLanguage(searchParams.get("lang"));

  if (!lat || !lon) {
    return NextResponse.json({ error: "lat and lon are required" }, { status: 400 });
  }

  const data = await getWeatherData(lat, lon, lang);
  if (!data) {
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }

  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=300" },
  });
}

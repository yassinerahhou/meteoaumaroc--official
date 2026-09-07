import { NextResponse } from "next/server";
import { ADSENSE_PUBLISHER_ID } from "@/app/lib/adsense";

export async function GET() {
  const adsContent = `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0`;

  return new NextResponse(adsContent, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=0, s-maxage=0, must-revalidate",
    },
  });
}

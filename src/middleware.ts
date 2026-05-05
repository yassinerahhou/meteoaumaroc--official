import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["fr", "ar", "en"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Skip api, _next, assets, favicon, sitemap, robots
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname === "/favicon.ico" ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/ads.txt"
  ) {
    return;
  }

  // Redirect to /fr
  const url = request.nextUrl.clone();
  url.pathname = `/fr${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|assets|favicon.ico|sitemap.xml|robots.txt|ads.txt).*)"],
};

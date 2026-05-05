import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["fr", "ar", "en"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Skip paths that should not be redirected (static files, API, etc)
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.match(/\.(txt|xml|ico|png|jpg|jpeg|svg|webp|js|css)$/i)
  ) {
    return NextResponse.next();
  }

  // 2. Check if pathname already has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // 3. Redirect to /fr for everything else
  const url = request.nextUrl.clone();
  url.pathname = `/fr${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Any file with an extension (e.g. ads.txt, robots.txt, sitemap.xml)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};

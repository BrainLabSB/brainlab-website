import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "it"] as const;
type Locale = (typeof locales)[number];

function getLocale(request: NextRequest): Locale {
  const acceptLang = request.headers.get("accept-language") ?? "";
  const preferred = acceptLang.split(",")[0]?.split("-")[0]?.toLowerCase();
  return (locales as readonly string[]).includes(preferred ?? "") ? (preferred as Locale) : "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal Next.js paths, API routes, static files, studio
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.includes(".") // static files (favicon, images, etc.)
  ) {
    return NextResponse.next();
  }

  // Check if the path already has a locale prefix
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!hasLocale) {
    const locale = getLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // Detect current locale and forward it as a header to the root layout
  const currentLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  ) ?? "en";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", currentLocale);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Serves the embedded Sanity Studio on a dedicated subdomain.
 *
 * The Studio lives at `/studio` (basePath in sanity.config.ts). On
 * `studio.semirad.com` we redirect every non-Studio path to `/studio`, so the
 * subdomain root opens the CMS directly while the marketing site stays on the
 * main domain. Requests already under `/studio` pass through untouched, which
 * keeps the Studio's internal routing and assets working.
 */
export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0].toLowerCase();
  const isStudioHost = host.startsWith("studio.");

  if (isStudioHost && !req.nextUrl.pathname.startsWith("/studio")) {
    const url = req.nextUrl.clone();
    url.pathname = "/studio";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except Next internals and static files.
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)"],
};

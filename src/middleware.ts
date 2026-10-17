import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * URLs injected into the old (hacked) WordPress site that Google still has
 * indexed: product pages ending in a long numeric ID, and fake shop sections.
 * Answering 410 Gone instead of 404 tells Google they are removed for good,
 * so they drop out of the index faster.
 */
const SPAM_PATH =
  /^\/(?:reviews|cp|help|brand|account|my-items|ip)(?:\/|$)|-\d{5,}\/?$/i;
const SPAM_HOME_QUERY = ["x", "m"];

function isSpamUrl(req: NextRequest) {
  const { pathname, searchParams, search } = req.nextUrl;
  if (SPAM_PATH.test(pathname)) return true;
  return (
    pathname === "/" &&
    (SPAM_HOME_QUERY.some((key) => searchParams.has(key)) ||
      search.startsWith("?category"))
  );
}

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

  if (isSpamUrl(req)) {
    return new NextResponse("Tato stránka byla trvale odstraněna.", {
      status: 410,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-robots-tag": "noindex",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except Next internals and static files.
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)"],
};

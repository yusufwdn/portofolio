import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Decides the locale for every incoming request: reads the URL prefix, then
// the NEXT_LOCALE cookie, then the Accept-Language header.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, and anything with a file extension
  // (images, fonts, robots.txt) — those must not be locale-rewritten.
  // The dot is double-escaped: in a plain string "\." collapses to ".", which
  // turned the exclusion into "any path" and left only "/" under the middleware.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

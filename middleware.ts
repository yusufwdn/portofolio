import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Decides the locale for every incoming request: reads the URL prefix, then
// the NEXT_LOCALE cookie, then the Accept-Language header.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, and anything with a file extension
  // (images, fonts, robots.txt) — those must not be locale-rewritten.
  matcher: ["/((?!api|_next|_vercel|.*\..*).*)"],
};

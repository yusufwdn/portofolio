import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// No "/en" -> "/" redirect here. The next-intl middleware rewrites "/" to
// "/en" internally, and on Netlify a config-level redirect for "/en" also
// fires on that rewrite, looping forever (ERR_TOO_MANY_REDIRECTS). Duplicate
// content is already handled by the canonical URL in app/[locale]/layout.tsx.
const nextConfig: NextConfig = {};

// Points the build at i18n/request.ts and wires the message files into both
// the server and client bundles.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

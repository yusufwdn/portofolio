import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // generateStaticParams bakes an /en route even though "as-needed" means
      // English lives at "/". Fold the page back so the two URLs do not serve
      // identical content. Only the exact path — /en/opengraph-image is a real
      // asset that the og:image tag points at.
      { source: "/en", destination: "/", permanent: true },
    ];
  },
};

// Points the build at i18n/request.ts and wires the message files into both
// the server and client bundles.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

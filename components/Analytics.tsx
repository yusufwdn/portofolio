import Script from "next/script";

// The site token Cloudflare hands out for Web Analytics. It is public by
// design (it ships in every page), so it is an env var to keep dev and preview
// builds out of the numbers, not to keep it secret.
const TOKEN = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;

/**
 * Cloudflare Web Analytics: cookieless, no consent banner, and it works for a
 * site that is not proxied through Cloudflare. Renders nothing unless the
 * token is set and this is a production build, so `npm run dev` never counts.
 */
export default function Analytics() {
  if (!TOKEN || process.env.NODE_ENV !== "production") return null;

  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: TOKEN })}
      strategy="afterInteractive"
    />
  );
}

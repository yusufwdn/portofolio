import type { MetadataRoute } from "next";
import { hreflangs, routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Same map the page head carries — see hreflangs in i18n/routing.ts.
  const languages = hreflangs(SITE_URL);

  return routing.locales.map((locale) => ({
    url: languages[locale],
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    // Points each entry at its counterparts so crawlers pair them.
    alternates: { languages },
  }));
}

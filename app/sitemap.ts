import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    // Points each entry at its counterpart so crawlers pair the two.
    alternates: {
      languages: {
        en: SITE_URL,
        id: `${SITE_URL}/id`,
        // Mirrors the x-default in the page head; Google expects the two to
        // agree, and flags the sitemap when only one of them has it.
        "x-default": SITE_URL,
      },
    },
  }));
}

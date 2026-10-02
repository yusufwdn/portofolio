import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Be_Vietnam_Pro } from "next/font/google";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import {
  hreflangs,
  isRtl,
  localePath,
  ogLocales,
  routing,
  type Locale,
} from "@/i18n/routing";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { homeJsonLd } from "@/lib/structured-data";
import { isTheme, THEME_COOKIE, THEME_SCRIPT } from "@/lib/theme";
import "../globals.css";

// Vietnamese only: Poppins lacks ư, ơ, ệ and friends (see globals.css).
// Self-hosted at build time and not preloaded, so the files are fetched only
// by a page whose text actually uses the face — /vi — and never elsewhere.
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-vi",
  display: "swap",
  preload: false,
});

// Pre-renders every locale at build time instead of on demand.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: `%s — ${SITE_NAME}` },
    description: t("description"),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    // Google ignores this tag; Bing and a few smaller crawlers still read it.
    // Kept in step with the stack the page actually lists.
    keywords: [
      "Yusuf Wandana",
      "software engineer",
      "full stack developer",
      "backend developer",
      "Laravel",
      "Nest.js",
      "Next.js",
      "Node.js",
      "PHP",
      "TypeScript",
      "microservices",
      "Indonesia",
      "portfolio",
    ],
    // Tells search engines these URLs are the same page in different
    // languages rather than duplicate content.
    alternates: {
      canonical: localePath(locale as Locale),
      languages: hreflangs(),
    },
    openGraph: {
      type: "website",
      url:
        locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      title: t("title"),
      description: t("description"),
      locale: ogLocales[locale as Locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => ogLocales[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    // Static files under public/ rather than generated routes: a generated
    // /apple-icon has no dot in its path, so the middleware matcher would
    // catch it and rewrite it into the [locale] segment, where it does not
    // exist.
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-icon.png",
    },
    manifest: "/manifest.webmanifest",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

// Colours the browser chrome on mobile to match the page it is framing.
// Separate from generateMetadata because Next wants viewport in its own export.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#100e16" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Required for static rendering — without it every page opts into dynamic
  // rendering the moment a translation is read.
  setRequestLocale(locale);

  // Reading the cookie here is what makes React own the theme class. When the
  // locale changes, the root layout re-renders and re-applies exactly this
  // value, instead of whatever a client script last wrote.
  const stored = (await cookies()).get(THEME_COOKIE)?.value;
  const theme = isTheme(stored) ? stored : undefined;

  // Same description the meta tags carry, so the two never disagree.
  const t = await getTranslations({ locale, namespace: "meta" });
  const jsonLd = homeJsonLd(locale, t("description"));

  return (
    <html
      lang={locale}
      // Arabic flips the whole page. Components use logical classes
      // (ps-*, start-*, border-s) so they follow without per-locale code.
      dir={isRtl(locale) ? "rtl" : "ltr"}
      className={theme}
      style={theme ? { colorScheme: theme } : undefined}
      suppressHydrationWarning
    >
      <head>
        {/* Only fills in for a first visit with no cookie yet */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {/* Person / WebSite / ProfilePage graph — see lib/structured-data.ts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* The font variable sits on body, not html: THEME_SCRIPT compares and
          overwrites html's whole className. It only defines --font-vi, which
          only html:lang(vi) reads. */}
      <body className={`antialiased ${beVietnamPro.variable}`}>
        {/* Hands the message file to every client component below it */}
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { isTheme, THEME_COOKIE, THEME_SCRIPT } from "@/lib/theme";
import "../globals.css";

// Pre-renders both locales at build time instead of on demand.
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
    keywords: [
      "Yusuf Wandana",
      "software engineer",
      "full stack developer",
      "backend developer",
      "Laravel",
      "Node.js",
      "Next.js",
      "Go",
      "Indonesia",
    ],
    // Tells search engines these two URLs are the same page in two languages
    // rather than duplicate content.
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: { en: "/", id: "/id" },
    },
    openGraph: {
      type: "website",
      url: locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      title: t("title"),
      description: t("description"),
      locale: locale === "id" ? "id_ID" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

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

  return (
    <html
      lang={locale}
      className={theme}
      style={theme ? { colorScheme: theme } : undefined}
      suppressHydrationWarning
    >
      <head>
        {/* Only fills in for a first visit with no cookie yet */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="antialiased">
        {/* Hands the message file to every client component below it */}
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

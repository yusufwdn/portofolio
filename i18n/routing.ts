import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // "zh" is Simplified Chinese and "pt" is Brazilian Portuguese: the copy is
  // written for those readers, and zh-TW / pt-PT browsers fall back to them.
  // "ms" is Malaysian Malay, not a variant of Indonesian: it has its own
  // file, and ms-* browsers no longer land on English.
  locales: ["en", "id", "ms", "ja", "zh", "th", "vi", "km", "ar", "ru", "es", "pt"],
  defaultLocale: "en",

  // "as-needed" keeps the default locale unprefixed: "/" stays English, so
  // the URL already out in the world does not break, and the others live at
  // "/id", "/ja" and so on. With "always" every visitor would be redirected
  // to "/en".
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

// Each language named in itself, so a visitor can find theirs in the
// switcher without reading the language they are trying to leave.
export const localeNames: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
  ms: "Bahasa Melayu",
  ja: "日本語",
  zh: "简体中文",
  th: "ไทย",
  vi: "Tiếng Việt",
  km: "ខ្មែរ",
  ar: "العربية",
  ru: "Русский",
  es: "Español",
  pt: "Português",
};

// Open Graph wants language_TERRITORY. ar_AR is the code Facebook itself
// uses for Arabic, not a real territory.
export const ogLocales: Record<Locale, string> = {
  en: "en_US",
  id: "id_ID",
  ms: "ms_MY",
  ja: "ja_JP",
  zh: "zh_CN",
  th: "th_TH",
  vi: "vi_VN",
  km: "km_KH",
  ar: "ar_AR",
  ru: "ru_RU",
  es: "es_ES",
  pt: "pt_BR",
};

export function isRtl(locale: string) {
  return locale === "ar";
}

/** "/" for the default locale, "/{locale}" for the rest. */
export function localePath(locale: Locale) {
  return locale === routing.defaultLocale ? "/" : `/${locale}`;
}

/**
 * hreflang map shared by the page head and the sitemap. Google expects the
 * two to agree, and flags the sitemap when only one of them has x-default.
 */
export function hreflangs(base = "") {
  // With an absolute base the default locale is the bare origin, no
  // trailing slash, matching what the sitemap has always listed.
  const url = (l: Locale) =>
    base && l === routing.defaultLocale ? base : `${base}${localePath(l)}`;

  return Object.fromEntries([
    ...routing.locales.map((l) => [l, url(l)]),
    // x-default is the fallback a crawler serves to visitors whose language
    // is none of the above.
    ["x-default", url(routing.defaultLocale)],
  ]) as Record<string, string>;
}

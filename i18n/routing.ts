import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "id"],
  defaultLocale: "en",

  // "as-needed" keeps the default locale unprefixed: "/" stays English, so
  // the URL already out in the world does not break, and Indonesian lives at
  // "/id". With "always" every visitor would be redirected to "/en".
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

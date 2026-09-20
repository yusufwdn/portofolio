"use client";

import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Sits next to the theme toggle. `usePathname` from i18n/navigation returns
 * the route without its locale prefix, so replacing it with a different
 * locale keeps the visitor exactly where they were — "/id" rather than the
 * homepage.
 */
export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      // Also writes the NEXT_LOCALE cookie, so the choice sticks on the
      // next visit to "/".
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className="inline-flex items-center rounded-md border border-control p-0.5"
      role="group"
      aria-label={t("language")}
    >
      {routing.locales.map((code) => {
        const isActive = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            disabled={isPending}
            aria-label={
              code === "id" ? t("switchToIndonesian") : t("switchToEnglish")
            }
            aria-pressed={isActive}
            className={`relative rounded px-2 py-1 font-mono text-[11px] uppercase transition-colors disabled:cursor-wait ${
              isActive
                ? "text-primary-contrast"
                : "text-foreground/75 hover:text-foreground"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="locale-pill"
                className="absolute inset-0 rounded bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{code}</span>
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { Check, ChevronDown, Languages } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, routing, type Locale } from "@/i18n/routing";

/**
 * Sits next to the theme toggle. A menu rather than a row of buttons: four
 * locale pills do not fit beside the name and two icon buttons on a phone.
 *
 * `usePathname` from i18n/navigation returns the route without its locale
 * prefix, so replacing it with a different locale keeps the visitor exactly
 * where they were — "/ja" rather than the homepage.
 */
export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const switchTo = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      // Also writes the NEXT_LOCALE cookie, so the choice sticks on the
      // next visit to "/".
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={isPending}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t("language")}
        className="flex h-9 items-center gap-1.5 rounded-md border border-control px-2.5 text-muted transition-colors hover:border-primary hover:text-foreground disabled:cursor-wait"
      >
        <Languages className="h-4 w-4" />
        <span className="font-mono text-[11px] uppercase">{locale}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            aria-label={t("language")}
            className="absolute end-0 top-full z-50 mt-2 min-w-[11rem] overflow-hidden rounded-md border border-line bg-surface-raised p-1 shadow-lift"
          >
            {routing.locales.map((code) => {
              const isActive = code === locale;
              return (
                <li key={code}>
                  <button
                    type="button"
                    onClick={() => switchTo(code)}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={t("switchTo", { language: localeNames[code] })}
                    className={`flex w-full items-center gap-3 rounded px-3 py-2 text-start text-[14px] transition-colors ${
                      isActive
                        ? "bg-primary-soft text-primary"
                        : "text-foreground/80 hover:bg-surface-sunken hover:text-foreground"
                    }`}
                  >
                    {/* lang so each name is shaped and read in its own
                        language, whatever the page around it is in. */}
                    <span lang={code} className="flex-1">
                      {localeNames[code]}
                    </span>
                    {isActive ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <span className="font-mono text-[11px] uppercase text-muted">
                        {code}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

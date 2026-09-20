"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { motion, useScroll } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useActiveSection } from "@/components/useActiveSection";
import { useTheme } from "@/components/useTheme";
import { Link } from "@/i18n/navigation";
import { sections } from "@/lib/static-data";

export default function SiteHeader() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sections);
  const { scrollYProgress } = useScroll();
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link href="#about" className="flex items-baseline gap-2">
          <span className="font-semibold tracking-tight">Yusuf Wandana</span>
          <span className="hidden font-mono text-xs text-muted sm:inline">
            /dev
          </span>
        </Link>

        {/* lg, not md: the row is wider now that the locale switcher is in it */}
        <nav className="hidden items-center gap-1 lg:flex">
          {sections.map((section, i) => {
            const isActive = active === section;
            return (
              <Link
                key={section}
                href={`#${section}`}
                aria-current={isActive ? "true" : undefined}
                className={`group relative flex items-baseline gap-1.5 rounded-md px-3 py-2 text-[15px] transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-foreground/75 hover:text-foreground"
                }`}
              >
                {/* Painted BEFORE the label: both are positioned with z-index
                    auto, so DOM order decides what covers what — with the pill
                    last it was drawn on top of the text it should sit behind. */}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md bg-primary-soft"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative font-mono text-[11px] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative">{t(section)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <button
            onClick={toggle}
            aria-label={t("toggleTheme")}
            className="grid h-9 w-9 place-items-center rounded-md border border-control text-muted transition-colors hover:border-primary hover:text-foreground"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
            className="grid h-9 w-9 place-items-center rounded-md border border-control text-muted transition-colors hover:border-primary hover:text-foreground lg:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-line bg-background/95 px-4 py-2 backdrop-blur-xl lg:hidden">
          {sections.map((section, i) => (
            <Link
              key={section}
              href={`#${section}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-baseline gap-3 border-b border-line/60 py-3.5 text-[15px] last:border-0"
            >
              <span className="font-mono text-[11px] text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              {t(section)}
            </Link>
          ))}
        </nav>
      )}

      {/* Reading progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-primary"
      />
    </header>
  );
}

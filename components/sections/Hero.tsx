"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import Terminal from "@/components/Terminal";
import { useTheme } from "@/components/useTheme";
import { Link } from "@/i18n/navigation";
import { AVAILABILITY, availabilityKey, SOCIALS } from "@/lib/site";

export default function Hero() {
  const { toggle } = useTheme();
  const t = useTranslations("hero");
  const tAvail = useTranslations("availability");

  const mode = availabilityKey(AVAILABILITY);
  const isLive = mode === "open" || mode === "freelance";

  return (
    <section
      id="about"
      className="grid items-center gap-12 py-section lg:grid-cols-12 lg:gap-14"
    >
      <div className="lg:col-span-5">
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <p className="flex items-center gap-3 font-mono text-eyebrow uppercase text-muted">
              <span className="h-px w-8 bg-primary" />
              {t("eyebrow")}
            </p>

            {/* Driven by AVAILABILITY in lib/site.ts — set it to "hidden"
                and this disappears with no other edits. */}
            {mode && (
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-primary-soft px-3 py-1.5 text-[13px] font-medium text-primary">
                {isLive && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                )}
                {tAvail(`${mode}.pill`)}
              </span>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-6 text-display font-bold">
            {t("headlineBefore")}{" "}
            <span className="relative whitespace-nowrap text-primary">
              {t("headlineAccent")}
              <svg
                aria-hidden
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-2.5 w-full text-primary/35"
              >
                <path
                  d="M2,9 C50,2 150,2 198,8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            {t("headlineAfter")}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-7 max-w-md text-[17px] leading-relaxed text-muted">
            {t("pitch")}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-[15px] font-medium text-primary-contrast transition-colors hover:bg-primary/90"
            >
              {t("viewProjects")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-control px-5 py-3 text-[15px] font-medium transition-colors hover:border-primary hover:text-primary"
            >
              {mode ? tAvail(`${mode}.cta`) : t("getInTouch")}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-10 flex items-center gap-5 border-t border-line pt-6">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="text-muted transition-colors hover:text-primary"
              >
                <Icon className="h-[18px] w-[18px]" />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-7">
        <Reveal delay={0.12}>
          <Terminal onToggleTheme={toggle} />
        </Reveal>
      </div>
    </section>
  );
}

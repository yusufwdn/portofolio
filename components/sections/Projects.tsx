"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { projectTypes, projects } from "@/lib/static-data";
import type { ProjectTypeCode } from "@/types/types";
import SectionHeading from "./SectionHeading";

const PAGE_SIZE = 5;

export default function Projects() {
  // Professional leads: it is the work that carries the most weight, so it is
  // what a visitor sees before touching anything.
  const [activeType, setActiveType] = useState<ProjectTypeCode>("professional");
  const [page, setPage] = useState(0);
  const t = useTranslations("projects");

  const shown = projects.filter((p) => p.type === activeType);
  const pageCount = Math.ceil(shown.length / PAGE_SIZE);
  const visible = shown.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const selectType = (code: ProjectTypeCode) => {
    setActiveType(code);
    setPage(0); // otherwise switching to a shorter list lands on an empty page
  };

  return (
    <section id="projects" className="border-t border-line py-20">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading index={4} eyebrow={t("eyebrow")} title={t("title")} />

        <div className="inline-flex shrink-0 rounded-full border border-control bg-surface-sunken p-1.5">
          {projectTypes.map((code) => {
            const isActive = activeType === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => selectType(code)}
                aria-pressed={isActive}
                className={`relative rounded-full px-5 py-2 text-[15px] font-medium transition-colors ${
                  isActive
                    ? "text-primary-contrast"
                    : "text-foreground/75 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{t(`types.${code}`)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Re-keyed so switching tab or page replays the stagger instead of
          swapping the content instantly. */}
      <RevealGroup
        key={`${activeType}-${page}`}
        className="mt-14 space-y-20"
        stagger={0.12}
      >
        {visible.map((project, i) => {
          const title = t(`items.${project.id}.title`);
          const flip = i % 2 === 1;

          return (
            <RevealItem key={project.id}>
              <article className="group grid items-center gap-8 md:grid-cols-2 md:gap-14">
                <div
                  className={`relative aspect-[16/10] overflow-hidden rounded-card border border-line bg-surface-sunken ${
                    flip ? "md:order-2" : ""
                  }`}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={t("screenshotAlt", { name: title })}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    /* Internal work has nothing public to screenshot. A
                       deliberate panel reads better than a broken frame. */
                    <div className="dot-grid absolute inset-0 flex flex-col items-center justify-center gap-4 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000,transparent)]">
                      <span className="font-mono text-3xl font-bold tracking-tight text-primary/70 sm:text-4xl">
                        {title}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[13px] text-muted">
                        <Lock className="h-3.5 w-3.5" />
                        {t("internal")}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
                  <p className="mt-4 text-[17px] leading-relaxed text-muted">
                    {t(`items.${project.id}.description`)}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line px-3 py-1.5 font-mono text-[13px] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.link && project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex items-center gap-1.5 border-b border-primary/30 pb-0.5 text-[15px] font-medium text-primary transition-colors hover:border-primary"
                    >
                      {t("visit", { name: title })}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {pageCount > 1 && (
        <nav
          aria-label={t("pagination")}
          className="mt-16 flex items-center justify-center gap-3"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label={t("previous")}
            className="grid h-10 w-10 place-items-center rounded-md border border-control text-muted transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={t("goToPage", { page: i + 1 })}
                aria-current={i === page ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === page
                    ? "w-6 bg-primary"
                    : "w-2 bg-line-strong hover:bg-primary/50"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={page === pageCount - 1}
            aria-label={t("next")}
            className="grid h-10 w-10 place-items-center rounded-md border border-control text-muted transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </nav>
      )}

      {shown.length === 0 && (
        <p className="mt-14 rounded-card border border-dashed border-line-strong p-10 text-center text-[15px] text-muted">
          {t("empty")}
        </p>
      )}
    </section>
  );
}

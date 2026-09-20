"use client";

import { motion, useScroll } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { workExperiences } from "@/lib/static-data";
import SectionHeading from "./SectionHeading";

// The rail and the left column share a hard-coded 200px: wide enough for the
// longest range ("Sep 2021 - Nov 2023") to stay on one line. At 168px it
// wrapped, so every entry ended up a different shape.
export default function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("experience");

  // The rail fills as you read past it, rather than being a static bar.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 65%", "end 65%"],
  });

  return (
    <section id="experiences" className="border-t border-line py-20">
      <SectionHeading index={3} eyebrow={t("eyebrow")} title={t("title")} />

      <div ref={railRef} className="relative mt-14">
        <div
          aria-hidden
          className="absolute bottom-1 left-0 top-1 w-px bg-line md:left-[200px]"
        />
        <motion.div
          aria-hidden
          style={{ scaleY: scrollYProgress }}
          className="absolute bottom-1 left-0 top-1 w-px origin-top bg-primary md:left-[200px]"
        />

        <div className="space-y-16">
          {workExperiences.map((job) => {
            const many = job.roles.length > 1;

            return (
              <div
                key={job.id}
                className="relative pl-8 md:grid md:grid-cols-[200px_1fr] md:pl-0"
              >
                {/* Positioning lives on the wrapper. Motion animates `scale`
                    by writing an inline `transform`, which replaces any
                    transform utility on the same element, so a translate
                    class here would simply be discarded. */}
                <span
                  aria-hidden
                  className="absolute left-0 top-[9px] translate-x-[calc(-50%+0.5px)] md:left-[200px]"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-35% 0px -35% 0px" }}
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                    className="block h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background"
                  />
                </span>

                {/* The company's whole span sits in the left column, so two
                    titles at one employer read as one tenure. */}
                <div className="md:pr-8 md:text-right">
                  <p className="whitespace-nowrap font-mono text-[13px] text-muted">
                    {t(`items.${job.id}.span`)}
                  </p>
                  <p className="mt-1 whitespace-nowrap font-mono text-[13px] text-muted/70">
                    {t(`items.${job.id}.type`)}
                  </p>
                </div>

                <Reveal className="md:pl-8">
                  <h3 className="text-xl font-semibold leading-snug md:mt-[-3px]">
                    {job.company}
                  </h3>

                  <div
                    className={
                      many ? "mt-6 space-y-8 border-l border-line pl-6" : "mt-5"
                    }
                  >
                    {job.roles.map((role) => (
                      <div key={role.id} className="relative">
                        {many && (
                          <span
                            aria-hidden
                            // The border sits at -25..-24, so its centre is
                            // -24.5. Anything else leaves the dot off the line.
                            className="absolute left-[-24.5px] top-[11px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-line-strong ring-4 ring-background"
                          />
                        )}

                        <p className="text-[17px] font-medium text-primary">
                          {t(`items.${job.id}.roles.${role.id}.role`)}
                        </p>
                        <p className="mt-1 font-mono text-[13px] text-muted">
                          {/* The period repeats only when it adds something:
                              with one role it would echo the left column. */}
                          {many &&
                            `${t(`items.${job.id}.roles.${role.id}.period`)} · `}
                          {t(`items.${job.id}.roles.${role.id}.location`)}
                        </p>

                        <ul className="mt-4 space-y-2.5">
                          {(
                            t.raw(
                              `items.${job.id}.roles.${role.id}.points`
                            ) as string[]
                          ).map((desc, i) => (
                            <li
                              key={i}
                              className="relative pl-5 text-[15px] leading-relaxed text-muted"
                            >
                              <span
                                aria-hidden
                                className="absolute left-0 top-[9px] h-1 w-1 rounded-full bg-line-strong"
                              />
                              {desc}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {role.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-line px-3 py-1.5 font-mono text-[13px] text-muted"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

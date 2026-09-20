import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { certificates, educations } from "@/lib/static-data";
import SectionHeading from "./SectionHeading";

export default function Credentials() {
  const t = useTranslations("credentials");

  return (
    <section id="educations" className="border-t border-line py-20">
      <SectionHeading
        index={5}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />

      <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* Education — kept borderless so it reads as prose, not more cards */}
        <div>
          <h3 className="font-mono text-eyebrow uppercase text-muted">
            {t("education")}
          </h3>
          <RevealGroup className="mt-7 space-y-9">
            {educations.map((edu) => (
              <RevealItem key={edu.id}>
                <div className="border-l-2 border-line pl-5 transition-colors hover:border-primary">
                  {/* A grid, not flex-wrap: a long degree title used to push
                      the date onto its own line, so one entry showed the range
                      on the right and the next showed it underneath. */}
                  <div className="grid gap-x-4 gap-y-1 sm:grid-cols-[1fr_auto] sm:items-baseline">
                    <h4 className="text-[17px] font-semibold leading-snug">
                      {t(`items.${edu.id}.degree`)}
                    </h4>
                    <span className="whitespace-nowrap font-mono text-[13px] text-muted">
                      {t(`items.${edu.id}.period`)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[15px] text-primary">
                    {edu.institution}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    {t(`items.${edu.id}.description`)}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Certificates — the whole row is the link, not just the heading */}
        <div>
          <h3 className="font-mono text-eyebrow uppercase text-muted">
            {t("certificates")}
          </h3>
          <Reveal className="mt-7 overflow-hidden rounded-card border border-line">
            <ul className="divide-y divide-line">
              {certificates.map((cert) => (
                <li key={cert.id}>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-4 bg-surface p-5 transition-colors hover:bg-surface-sunken"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-medium leading-snug transition-colors group-hover:text-primary">
                        {cert.name}
                      </p>
                      <p className="mt-2 text-[13px] text-muted">
                        {cert.issuer}
                        <span className="mx-2 opacity-40">·</span>
                        <span className="font-mono">{cert.date}</span>
                      </p>
                    </div>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

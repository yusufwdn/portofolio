import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { skillGroups, skills } from "@/lib/static-data";
import SectionHeading from "./SectionHeading";

export default function Stack() {
  const t = useTranslations("stack");

  return (
    <section id="skills" className="border-t border-line py-20">
      <SectionHeading
        index={2}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />

      <div className="mt-12 space-y-px overflow-hidden rounded-card border border-line bg-line">
        {skillGroups.map((group) => (
          <Reveal key={group}>
            <div className="grid gap-4 bg-surface p-6 md:grid-cols-[180px_1fr] md:items-baseline md:gap-8 md:p-7">
              <div>
                <h3 className="font-mono text-eyebrow uppercase text-primary">
                  {t(`groups.${group}`)}
                </h3>
                <p className="mt-2 hidden text-[13px] leading-relaxed text-muted md:block">
                  {t(`notes.${group}`)}
                </p>
              </div>

              <RevealGroup className="flex flex-wrap gap-2" stagger={0.03}>
                {skills[group].map((skill) => {
                  const label = skill.name;
                  return (
                    <RevealItem key={label}>
                      {/* Sized down against the group label on the left: at
                          15px the chips out-shouted the heading they belong
                          to. */}
                      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-sunken py-1.5 pl-1.5 pr-3.5 text-[14px] transition-colors hover:border-primary/40 hover:text-primary">
                        <Image
                          src={skill.icon}
                          alt=""
                          aria-hidden
                          width={18}
                          height={18}
                          className="h-[18px] w-[18px] object-contain"
                        />
                        {label}
                      </span>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

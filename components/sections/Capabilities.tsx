import { useTranslations } from "next-intl";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import SectionHeading from "./SectionHeading";

// A capability is only interesting next to the thing it shipped. These ids
// match keys under "capabilities" in the message files.
// Chips are technologies in every card. Mixing project names into one row
// and tool names into the next made the three cards read as unrelated lists.
const CAPABILITIES = [
  { id: "backend", shipped: ["Microservices", "NATS", "REST API", "Docker"] },
  { id: "product", shipped: ["Laravel", "PostgreSQL", "Microsoft SQL Server"] },
  { id: "systems", shipped: ["Next.js", "Nest.js", "Typescript", "Redis"] },
];

export default function Capabilities() {
  const t = useTranslations("capabilities");

  return (
    <section className="border-t border-line py-20">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

      <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
        {CAPABILITIES.map((cap) => (
          <RevealItem key={cap.id}>
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col p-6">
                <p className="font-mono text-eyebrow uppercase text-muted">
                  {t(`${cap.id}.kicker`)}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-snug">
                  {t(`${cap.id}.title`)}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {t(`${cap.id}.body`)}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {cap.shipped.map((name) => (
                    <span
                      key={name}
                      className="rounded-full bg-primary-soft px-3 py-1.5 font-mono text-[13px] text-primary"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

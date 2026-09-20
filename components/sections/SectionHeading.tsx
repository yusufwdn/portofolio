import { Reveal } from "@/components/Reveal";

/**
 * One heading treatment for the whole page, replacing the repeated
 * `h2 + div.h-1.w-1/3.bg-purple-500` bar. The number ties each section back
 * to its slot in the nav.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
}: {
  index?: number;
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal className="max-w-xl">
      <p className="font-mono text-eyebrow uppercase text-primary">
        {index !== undefined && `${String(index).padStart(2, "0")} / `}
        {eyebrow}
      </p>
      <h2 className="mt-4 text-title font-bold">{title}</h2>
      {lead && (
        <p className="mt-4 text-[17px] leading-relaxed text-muted">{lead}</p>
      )}
    </Reveal>
  );
}

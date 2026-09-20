import { Github, Linkedin, Mail } from "lucide-react";

// Plain module, no "use client" — a client component cannot re-export plain
// data to a server component across the boundary, so shared constants live here.

export const EMAIL = "yusuf.wandana1@gmail.com";

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/yusufwdn", Icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yusuf-wandana/",
    Icon: Linkedin,
  },
  { label: "Email", href: `mailto:${EMAIL}`, Icon: Mail },
];

// Overridable so a preview deploy can advertise its own origin.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://itswandana.netlify.app";

export const SITE_NAME = "Yusuf Wandana";
export const SITE_TAGLINE = "Software Engineer & Full-Stack Developer";
export const SITE_DESCRIPTION =
  "Backend-leaning full stack engineer from Indonesia. Laravel, Node.js, Next.js and Go — schemas, queues, API contracts, and the systems behind them.";

/* ------------------------------------------------------------------ */
/* Availability                                                        */
/* Flip AVAILABILITY and the hero pill + contact CTA follow. Nothing   */
/* else needs touching.                                                */
/* ------------------------------------------------------------------ */

export type Availability = "open" | "freelance" | "employed" | "hidden";

export const AVAILABILITY: Availability = "open";

// Copy for each mode lives in messages/{en,id}.json under "availability",
// so the pill and CTA speak whichever language the visitor picked.
//
// Takes a parameter rather than reading AVAILABILITY directly: TypeScript
// narrows a `const` with a union annotation down to its initializer literal,
// so comparing it to "hidden" inline is rejected as impossible.
export function availabilityKey(mode: Availability) {
  return mode === "hidden" ? null : (mode as Exclude<Availability, "hidden">);
}


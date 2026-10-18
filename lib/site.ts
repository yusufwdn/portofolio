import { Github, Linkedin, Mail } from "lucide-react";

// Plain module, no "use client" — a client component cannot re-export plain
// data to a server component across the boundary, so shared constants live here.

export const EMAIL = "yusuf.wandana1@gmail.com";

// `id` keys the contact-section label in the message files; `handle` is how
// the address reads on screen.
export const SOCIALS = [
  {
    id: "github",
    label: "GitHub",
    handle: "github.com/yusufwdn",
    href: "https://github.com/yusufwdn",
    Icon: Github,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "linkedin.com/in/yusuf-wandana",
    href: "https://www.linkedin.com/in/yusuf-wandana/",
    Icon: Linkedin,
  },
  { id: "email", label: "Email", handle: EMAIL, href: `mailto:${EMAIL}`, Icon: Mail },
] as const;

// Languages the person speaks, for the structured data. Not the site's
// translations: those are routing.locales.
export const SPOKEN_LANGUAGES = [
  { name: "Indonesian", code: "id" },
  { name: "English", code: "en" },
] as const;

// Overridable so a preview deploy can advertise its own origin.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://itswandana.netlify.app";

export const SITE_NAME = "Yusuf Wandana";
export const SITE_TAGLINE = "Software Engineer & Full-Stack Developer";
/* ------------------------------------------------------------------ */
/* Availability                                                        */
/* Flip AVAILABILITY and the hero pill + contact CTA follow. Nothing   */
/* else needs touching.                                                */
/* ------------------------------------------------------------------ */

export type Availability = "open" | "freelance" | "employed" | "hidden";

export const AVAILABILITY: Availability = "open";

// Copy for each mode lives in messages/*.json under "availability",
// so the pill and CTA speak whichever language the visitor picked.
//
// Takes a parameter rather than reading AVAILABILITY directly: TypeScript
// narrows a `const` with a union annotation down to its initializer literal,
// so comparing it to "hidden" inline is rejected as impossible.
export function availabilityKey(mode: Availability) {
  return mode === "hidden" ? null : (mode as Exclude<Availability, "hidden">);
}


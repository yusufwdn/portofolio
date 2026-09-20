# Portfolio

Personal portfolio site of Yusuf Wandana [Software Engineer & Full-Stack Developer].

Live site: [https://itswandana.netlify.app](https://itswandana.netlify.app)

## Features

- Bilingual (English / Indonesian) via `next-intl`, switchable from the header
- Interactive terminal in the hero — visitors can run `help`, `ls`, `cat about.md`, `skills`, `projects`
- Light/dark theme, persisted in `localStorage`, applied before first paint
- Scroll-linked experience timeline, pointer-tracked project and capability cards
- Availability status driven by one flag in `lib/site.ts`
- Generated Open Graph image per language, plus sitemap and hreflang
- Contact form that drafts a message in the visitor's own mail client — no backend

## Tech Stack

Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS, next-intl, Motion, Lucide React.

## Getting Started

```bash
git clone https://github.com/yusufwdn/portofolio.git
cd portofolio
npm install
npm run dev
```

Runs at [http://localhost:3000](http://localhost:3000). Indonesian is at `/id`.

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Project Structure

```
app/[locale]/        # Layout, page and OG image, one set per language
app/globals.css      # Design tokens and global styles
components/          # Terminal, reveal/spotlight primitives, hooks
components/sections/ # One file per section of the page
i18n/                # next-intl routing, request config and navigation helpers
messages/            # en.json and id.json — every sentence on the site
lib/static-data.tsx  # Structure only: links, images, dates, tech names
lib/site.ts          # Site constants, socials, availability mode
middleware.ts        # Locale detection and routing
```

## Editing content

Two places, on purpose:

- **`messages/en.json` and `messages/id.json`** hold everything a reader sees
  as a sentence. Both files share the same key structure.
- **`lib/static-data.tsx`** holds what is identical in every language: links,
  images, dates, and the names of technologies, companies and certificates.

Items are matched between the two by their `id`.

## Design tokens

Colors live as raw HSL channels on `:root` and `.dark` in `app/globals.css`,
and are mapped in `tailwind.config.ts` so opacity modifiers work
(`bg-surface/60`, `text-primary/80`).

`--control` is reserved for the boundary of an interactive element — inputs,
icon buttons, outline buttons — because those need 3:1 contrast to be
identifiable. `--line` is for decorative borders and dividers, and is
deliberately much lighter.

## Availability

Set `AVAILABILITY` in `lib/site.ts` to `open`, `freelance`, `employed` or
`hidden`. The hero pill and the contact CTA follow; `hidden` removes the pill.
Copy for each mode lives under `availability` in the message files.

## Versioning

Major iterations are tagged (`v1.0.0`, `v2.0.0`, ...) so older designs stay
reachable while `main` keeps moving.

## Contact

- Email: yusuf.wandana1@gmail.com
- LinkedIn: [linkedin.com/in/yusuf-wandana](https://www.linkedin.com/in/yusuf-wandana/)
- GitHub: [github.com/yusufwdn](https://github.com/yusufwdn)

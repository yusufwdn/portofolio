# Portfolio

Personal portfolio site of Yusuf Wandana  [Software Engineer & Full-Stack Developer].

Live site: [https://itswandana.netlify.app](https://itswandana.netlify.app)

## Features

- Smooth-scroll single page with active-section highlighting in the nav
- Light/dark theme, persisted in `localStorage`
- Animated background shapes and SVG path drawing/morphing
- About, Skills, Work Experience, Projects, Education & Certificates, Contact
- Skills and Projects are filterable by tabs (category / personal-professional)
- Contact form opens a pre-filled Gmail compose window, no backend needed

## Tech Stack

Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS, Motion, Flubber, Lucide React.

## Getting Started

```bash
git clone https://github.com/yusufwdn/portofolio.git
cd portofolio
npm install
npm run dev
```

Runs at [http://localhost:3000](http://localhost:3000).

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Project Structure

```
app/                 # App Router pages, layout & global styles
components/          # Animated components (box rotate/reorder, path draw/morph)
lib/static-data.tsx  # Content: skills, experiences, projects, education, certificates
types/               # Shared TypeScript types
public/              # Static assets
```

Most content updates only require editing `lib/static-data.tsx`.

## Versioning

Major iterations are tagged (`v1.0.0`, `v2.0.0`, ...) so older designs stay reachable while `main` keeps moving.

## Contact

- Email: yusuf.wandana1@gmail.com
- LinkedIn: [linkedin.com/in/yusuf-wandana](https://www.linkedin.com/in/yusuf-wandana/)
- GitHub: [github.com/yusufwdn](https://github.com/yusufwdn)

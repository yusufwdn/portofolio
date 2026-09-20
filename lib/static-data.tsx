import { Brain, Code, LampDesk, Palette, PersonStanding, Server } from "lucide-react";
import { JSX } from "react";
import type { ProjectTypeCode, Skill, SkillGroup } from "@/types/types";

/* -------------------------------------------------------------------------
 * Structure only.
 *
 * Anything a reader sees as a sentence lives in messages/{en,id}.json and is
 * looked up by the `id` fields below. What stays here is the stuff that is
 * the same in every language: links, images, dates, icons, and the names of
 * technologies, companies and certificates, which are proper nouns.
 * ---------------------------------------------------------------------- */

export const sections = [
  "about",
  "skills",
  "experiences",
  "projects",
  "educations",
  "contact",
] as const;

export const skillGroups: SkillGroup[] = ["frontend", "backend", "tools", "soft"];

// Leading slash matters: without it these resolve relative to the current
// route and 404 on anything but "/".
export const skills: Record<SkillGroup, Skill[]> = {
  frontend: [
    { name: "HTML", icon: "/icons8/icons8-html-5-96.png" },
    { name: "CSS", icon: "/icons8/icons8-css3-96.png" },
    { name: "Javascript", icon: "/icons8/icons8-javascript-96.png" },
    { name: "Typescript", icon: "/icons8/icons8-typescript-96.png" },
    { name: "Bootstrap", icon: "/icons8/icons8-bootstrap-96.png" },
    { name: "TailwindCSS", icon: "/icons8/icons8-tailwindcss-96.png" },
    { name: "React.js", icon: "/icons8/icons8-react-native-96.png" },
    { name: "Next.js", icon: "/icons8/icons8-next.js-96.png" },
  ],
  backend: [
    { name: "Node.js", icon: "/icons8/icons8-nodejs-96.png" },
    { name: "Express.js", icon: "/icons8/icons8-express-js-96.png" },
    { name: "PHP", icon: "/icons8/icons8-php-96.png" },
    { name: "Laravel", icon: "/icons8/icons8-laravel-96.png" },
    { name: "Go", icon: "/icons8/icons8-golang-96.png" },
    { name: "Java", icon: "/icons8/icons8-java-96.png" },
    { name: "REST API", icon: "/icons8/icons8-api-64.png" },
    { name: "Microservices", icon: "/icons8/icons8-microservice-60.png" },
  ],
  tools: [
    { name: "Git", icon: "/icons8/icons8-git-96.png" },
    { name: "GitHub", icon: "/icons8/icons8-github-96.png" },
    { name: "Gitlab", icon: "/icons8/icons8-gitlab-96.png" },
    { name: "Docker", icon: "/icons8/icons8-docker-96.png" },
    { name: "VS Code", icon: "/icons8/icons8-visual-studio-code-2019-96.png" },
    { name: "MySQL", icon: "/icons8/icons8-mysql-logo-96.png" },
    { name: "PostgreSQL", icon: "/icons8/icons8-postgresql-96.png" },
    { name: "Microsoft SQL Server", icon: "/icons8/icons8-microsoft-sql-server-96.png" },
    { name: "Postman", icon: "/icons8/icons8-postman-inc-96.png" },
  ],
  // Left in English on purpose: this is how these are actually said in
  // Indonesian tech, and translating them ("Pemecahan Masalah") reads like a
  // school report card. Identical in both locales, so they stay in the data.
  soft: [
    { name: "Problem Solving", icon: "/icons8/icons8-problem-solving-skills-100.png" },
    { name: "Communication", icon: "/icons8/icons8-communication-100.png" },
    { name: "Teamwork", icon: "/icons8/icons8-teamwork-100.png" },
    { name: "Adaptability", icon: "/icons8/icons8-adaptable-64.png" },
    { name: "Leadership", icon: "/icons8/icons8-leadership-100.png" },
    { name: "Critical Thinking", icon: "/icons8/icons8-critical-thinking-100.png" },
    { name: "Creativity", icon: "/icons8/icons8-creativity-64.png" },
    { name: "Fast Learning", icon: "/icons8/icons8-rocket-100.png" },
  ],
};

export const skillIcons: Record<SkillGroup, JSX.Element> = {
  frontend: <Code className="h-5 w-5" />,
  backend: <Server className="h-5 w-5" />,
  tools: <Palette className="h-5 w-5" />,
  soft: <Brain className="h-5 w-5" />,
};

// Professional first — it is the work that carries the most weight.
export const projectTypes: ProjectTypeCode[] = ["professional", "personal"];

export const projectTypeIcons: Record<ProjectTypeCode, JSX.Element> = {
  professional: <LampDesk className="h-5 w-5" />,
  personal: <PersonStanding className="h-5 w-5" />,
};

export const workExperiences = [
  {
    id: "elistec",
    company: "PT Elistec Informatika Utama",
    roles: [
      {
        id: "softwareEngineer",
        technologies: [
          "Microservices",
          "Nest.js",
          "Next.js",
          "Typescript",
          "Laravel",
          "PHP",
          "REST API",
          "NATS",
          "Redis",
          "Docker",
          "PostgreSQL",
          "Microsoft SQL Server",
        ],
      },
      {
        id: "k2Developer",
        technologies: [
          "Nintex K2 Workflow",
          "SQL",
          "Microsoft SQL Server",
          "Database Design",
        ],
      },
    ],
  },
  {
    id: "wan",
    company: "PT WAN Teknologi Internasional",
    roles: [
      {
        id: "backendDeveloper",
        technologies: [
          "PHP",
          "Laravel",
          "Lumen",
          "CodeIgniter",
          "Livewire",
          "Bootstrap",
          "JQuery",
          "MySQL",
          "REST API",
        ],
      },
    ],
  },
  {
    id: "madani",
    company: "PT Madani Intelsysdata",
    roles: [
      {
        id: "etlDeveloper",
        technologies: [
          "Extract Transform Load",
          "SQL Server Integration Service",
          "SQL Server Reporting Service",
          "SQL Server Data Tools",
          "Microsoft SQL Server",
        ],
      },
    ],
  },
];

export const projects = [
  {
    id: "tces",
    type: "professional" as ProjectTypeCode,
    // No image and no link: it is an internal platform with nothing public
    // to point at. Projects.tsx renders a panel instead of a screenshot.
    technologies: ["Laravel", "PHP", "Microservices", "REST API"],
  },
  {
    id: "bundapedia",
    type: "professional" as ProjectTypeCode,
    image: "/projects/bundapedia.19dae19c47d9b6563bb9.jpg",
    technologies: ["PHP", "Laravel", "Bootstrap", "Javascript", "JQuery", "MySQL"],
    link: "https://bundapedia.co.id/",
  },
  {
    id: "sinIndonesia",
    type: "professional" as ProjectTypeCode,
    image: "/projects/sin-indonesia.34213054db1fbdae4a60.png",
    technologies: ["Lumen", "PHP", "REST API", "MySQL"],
    link: "https://sinindonesia.co.id/",
  },
  {
    id: "pepiSiakad",
    type: "professional" as ProjectTypeCode,
    image: "/projects/pepi-dashboard.a565ddcb6c580a6f607a.png",
    technologies: ["Laravel", "Livewire", "Bootstrap", "Javascript", "JQuery", "MySQL"],
    link: "https://siakad.pepi.ac.id",
  },
  {
    id: "beliyuu",
    type: "professional" as ProjectTypeCode,
    image: "/projects/beliyuu.c5df70f3d958f8fda490.jpg",
    technologies: ["Lumen", "CodeIgniter", "MySQL", "REST API"],
    link: "https://beliyuu.com",
  },
  {
    id: "bumdesKita",
    type: "professional" as ProjectTypeCode,
    image: "/projects/bumdes.5d8d4793179c8587f7ad.jpg",
    technologies: ["PHP", "Laravel", "Lumen", "Bootstrap", "Javascript", "MySQL"],
    link: "https://bumdeskita.com/",
  },
  {
    id: "jadipintar",
    type: "personal" as ProjectTypeCode,
    image: "/projects/jadipintar.218xd8asas28d3u0288ox.png",
    technologies: ["Next.js", "TailwindCSS"],
    link: "https://jadipintar.vercel.app/",
  },
  {
    id: "miniStore",
    type: "personal" as ProjectTypeCode,
    image: "/projects/store.d39hfkslv4ppqweiza9.png",
    technologies: ["Laravel", "Livewire", "Bootstrap", "JQuery", "Vue.js"],
    link: "https://github.com/yusufwdn/mini-store",
  },
];

export const educations = [
  { id: "swadharma", institution: "Institut Teknologi dan Bisnis Swadharma" },
  { id: "wikrama", institution: "SMK Wikrama Bogor" },
];

// Certificate names stay here: they are the titles printed on the documents,
// so translating them would misquote the issuer.
export const certificates = [
  {
    id: "buildWithAnggaReact",
    name: "Master Class : React.js and Tailwind Web Development",
    issuer: "BuildWithAngga",
    date: "Oct 2023",
    url: "https://drive.google.com/file/d/1m_9_AEoFuSuh2t4y1zHviL3gsmtmSuL7/view",
  },
  {
    id: "pznNode",
    name: "Node.js : Pemula Sampai Mahir",
    issuer: "Udemy - Programmer Zaman Now",
    date: "Aug 2023",
    url: "https://www.udemy.com/certificate/UC-5eddc9ea-f8a7-4588-bfef-799231035a97/",
  },
  {
    id: "buildWithAnggaEcommerce",
    name: "Website Developer : E-commerce",
    issuer: "BuildWithAngga",
    date: "Nov 2021",
    url: "https://drive.google.com/file/d/1XKwcWJu5-AY1LVh2inOWjGn9WpddBrZa/view",
  },
  {
    id: "codingStudioLaravel",
    name: "Mahir Membuat Website dengan Laravel",
    issuer: "Coding Studio",
    date: "Apr 2021",
    url: "https://drive.google.com/file/d/15azwuFcCBFj8Zv3W87DckOFpEtBzHS6k/view",
  },
  {
    id: "madaniInternship",
    name: "Internship Certificate",
    issuer: "PT Madani Intelsysdata",
    date: "Mar 2020",
    url: "https://drive.google.com/file/d/1syOaKbiNSAe4jFpRkktQAcf4URSz8FyJ/view",
  },
];

import {
  Certificate,
  Education,
  Project,
  ProjectType,
  ProjectTypeCode,
  WorkExperience,
} from "@/types/types";
import {
  Brain,
  Code,
  LampDesk,
  Palette,
  PersonStanding,
  Server,
} from "lucide-react";
import { JSX } from "react";

export const sections = [
  "about",
  "skills",
  "experiences",
  "projects",
  "educations",
  "contact",
];

export const skills = {
  frontend: [
    {
      name: "HTML",
      icon: "icons8/icons8-html-5-96.png",
    },
    {
      name: "CSS",
      icon: "icons8/icons8-css3-96.png",
    },
    {
      name: "Javascript",
      icon: "icons8/icons8-javascript-96.png",
    },
    {
      name: "Typescript",
      icon: "icons8/icons8-typescript-96.png",
    },
    {
      name: "Bootstrap",
      icon: "icons8/icons8-bootstrap-96.png",
    },
    {
      name: "TailwindCSS",
      icon: "icons8/icons8-tailwindcss-96.png",
    },
    {
      name: "React.js",
      icon: "icons8/icons8-react-native-96.png",
    },
    {
      name: "Next.js",
      icon: "icons8/icons8-next.js-96.png",
    },
  ],
  backend: [
    {
      name: "Node.js",
      icon: "icons8/icons8-nodejs-96.png",
    },
    {
      name: "Express.js",
      icon: "icons8/icons8-express-js-96.png",
    },
    {
      name: "PHP",
      icon: "icons8/icons8-php-96.png",
    },
    {
      name: "Laravel",
      icon: "icons8/icons8-laravel-96.png",
    },
    {
      name: "Go",
      icon: "icons8/icons8-golang-96.png",
    },
    {
      name: "Java",
      icon: "icons8/icons8-java-96.png",
    },
    {
      name: "REST API",
      icon: "icons8/icons8-api-64.png",
    },
    {
      name: "Microservices",
      icon: "icons8/icons8-microservice-60.png",
    },
  ],
  tools: [
    {
      name: "Git",
      icon: "icons8/icons8-git-96.png",
    },
    {
      name: "GitHub",
      icon: "icons8/icons8-github-96.png",
    },
    {
      name: "Gitlab",
      icon: "icons8/icons8-gitlab-96.png",
    },
    {
      name: "Docker",
      icon: "icons8/icons8-docker-96.png",
    },
    {
      name: "VS Code",
      icon: "icons8/icons8-visual-studio-code-2019-96.png",
    },
    {
      name: "MySQL",
      icon: "icons8/icons8-mysql-logo-96.png",
    },
    {
      name: "PostgreSQL",
      icon: "icons8/icons8-postgresql-96.png",
    },
    {
      name: "Microsoft SQL Server",
      icon: "icons8/icons8-microsoft-sql-server-96.png",
    },
    {
      name: "Postman",
      icon: "icons8/icons8-postman-inc-96.png",
    },
  ],
  soft: [
    {
      name: "Problem Solving",
      icon: "icons8/icons8-problem-solving-skills-100.png",
    },
    {
      name: "Communication",
      icon: "icons8/icons8-communication-100.png",
    },
    {
      name: "Teamwork",
      icon: "icons8/icons8-teamwork-100.png",
    },
    {
      name: "Adaptability",
      icon: "icons8/icons8-adaptable-64.png",
    },
    {
      name: "Leadership",
      icon: "icons8/icons8-leadership-100.png",
    },
    {
      name: "Critical Thinking",
      icon: "icons8/icons8-critical-thinking-100.png",
    },
    {
      name: "Creativity",
      icon: "icons8/icons8-creativity-64.png",
    },
    {
      name: "Fast Learning",
      icon: "icons8/icons8-rocket-100.png",
    },
  ],
};

export const skillIcons = {
  frontend: <Code className="h-5 w-5" />,
  backend: <Server className="h-5 w-5" />,
  tools: <Palette className="h-5 w-5" />,
  soft: <Brain className="h-5 w-5" />,
};

export const projectTypes: ProjectType[] = [
  {
    code: "personal",
    label: "Personal",
    icon: "icons8/icons8-html-5-96.png",
  },
  {
    code: "professional",
    label: "Professional",
    icon: "icons8/icons8-html-5-96.png",
  },
];

export const projectTypeIcons: Record<ProjectTypeCode, JSX.Element> = {
  personal: <PersonStanding className="h-5 w-5" />,
  professional: <LampDesk className="h-5 w-5" />,
};

export const workExperiences: WorkExperience[] = [
  {
    title: "Full Stack Developer",
    company: "PT Elistec Informatika Utama",
    period: "Nov 2023 - Present",
    description_list: [
      "Design and develop web applications and RESTful APIs using Laravel and Next.js.",
      "Build modular application systems with K2 by Nintex, covering database design, form creation, and workflow automation.",
      "Optimize dynamic workflows to streamline and automate complex business processes.",
      "Conduct thorough testing and validation to ensure modules are functional, reliable, and meet client expectations.",
      "Work closely with clients to deliver tailored solutions aligned with specific business goals.",
      "Maintain, enhance, and adapt applications to support ongoing business growth and evolving requirements.",
    ],
    technologies: [
      "Next.js",
      "Javascript",
      "Typescript",
      "Laravel",
      "PHP",
      "TailwindCSS",
      "Nintex K2 Workflow",
      "PostgreSQL",
      "Microsoft SQL Server",
    ],
  },
  {
    title: "Backend Developer",
    company: "PT WAN Teknologi Internasional",
    period: "Sep 2021 - Nov 2023",
    description_list: [
      "Analyzing client system requirements to deliver optimal solutions.",
      "Designing and developing web applications based on defined business flows, and building and maintaining API services for both web and mobile platforms.",
      "Ensure application performance through regular maintenance and bug fixes.",
      "Collaborate closely with cross-functional teams and have led multiple projects as a team leader.",
    ],
    technologies: [
      "PHP",
      "Laravel",
      "Lumen",
      "CodeIgniter",
      "Bootstrap",
      "TailwindCSS",
      "Javascript",
      "AJAX",
      "JQuery",
    ],
  },
  {
    title: "ETL Developer",
    company: "PT Madani Intelsysdata",
    period: "Sep 2020 - Aug 2021",
    description_list: [
      "Develop reporting application for monthly financial report in Bank Fama International and Bank Woori Saudara.",
      "Maintenance existing SLIK application (including bug fixes and feature additions).",
      "Become a consultant to assist finance companies in working on monthly financial report.",
    ],
    technologies: [
      "Extract Transform Load",
      "Microsoft SQL Server",
      "SQL Server Data Tools",
      "SQL Server Integration Service",
      "SQL Server Reporting Service",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Bundapedia",
    type: "professional",
    description:
      "A platform offering educational content and products for pregnancy, childbirth, and early parenting.",
    image: "/projects/bundapedia.19dae19c47d9b6563bb9.jpg",
    technologies: [
      "PHP",
      "Laravel",
      "Bootstrap",
      "Javascript",
      "JQuery",
      "MySQL",
    ],
    link: "https://bundapedia.co.id/",
  },
  // {
  //   title: "Spazie",
  //   type: "professional",
  //   description:
  //     "It is a web and mobile based application built for hotel accommodation booking needs.",
  //   image: "/projects/spazie.d38d10afa843d34029b5.jpg",
  //   technologies: [
  //     "PHP",
  //     "Laravel",
  //     "Bootstrap",
  //     "Javascript",
  //     "JQuery",
  //     "MySQL",
  //   ],
  //   link: "#",
  // },
  {
    title: "SIN Indonesia",
    type: "professional",
    description:
      "A mobile-based online store application built specifically to sell SIN Indonesia's products.",
    image: "/projects/sin-indonesia.34213054db1fbdae4a60.png",
    technologies: ["Lumen", "PHP", "REST API", "MySQL"],
    link: "https://sinindonesia.co.id/",
  },
  {
    title: "PEPI SIAKAD",
    type: "professional",
    description:
      "A web-based academic and learning management system (LMS) to support lecturers and students at Politeknik Enjiniring Pertanian Indonesia (PEPI).",
    image: "/projects/pepi-dashboard.a565ddcb6c580a6f607a.png",
    technologies: [
      "Laravel",
      "Livewire",
      "Bootstrap",
      "Javascript",
      "JQuery",
      "MySQL",
    ],
    link: "https://siakad.pepi.ac.id",
  },
  {
    title: "Beliyuu",
    type: "professional",
    description:
      "A web and mobile-based marketplace application system built to sell products from local micro-medium entrepreneurs.",
    image: "/projects/beliyuu.c5df70f3d958f8fda490.jpg",
    technologies: ["Lumen", "CodeIgniter", "MySQL", "REST API"],
    link: "https://beliyuu.com",
  },
  {
    title: "BUMDES KITA",
    type: "professional",
    description:
      "A marketplace application that sells products and rents services related to the fields of agriculture, plantations, and animal husbandry created for farmers and similar entrepreneurs.",
    image: "/projects/bumdes.5d8d4793179c8587f7ad.jpg",
    technologies: [
      "PHP",
      "Laravel",
      "Lumen",
      "Bootstrap",
      "Javascript",
      "MySQL",
    ],
    link: "https://bumdeskita.com/",
  },
  {
    title: "jadipintar",
    type: "personal",
    description:
      "jadipintar is an interactive quiz app that presents questions from various categories. Users can choose a category, answer questions one by one, and view their final score upon completion. The app is built with Next.js and Tailwind CSS, and currently uses static JSON data. A backend built with Golang is in progress to support dynamic data and scalability.",
    image: "/projects/jadipintar.218xd8asas28d3u0288ox.png",
    technologies: [
      "Next.js",
      "TailwindCSS",
    ],
    link: "https://jadipintar.vercel.app/",
  },
  {
    title: "Mini Store",
    type: "personal",
    description:
      "This is a simple online store web application I built during a hands-on course project (in 2021). It features a role-based system for admins and customers, including product management, order processing, and payment integration using Midtrans. This project helped me deepen my understanding of Laravel, Bootstrap, a bit of Vue.js, and third-party service integration.",
    image: "/projects/store.d39hfkslv4ppqweiza9.png",
    technologies: [
      "Laravel",
      "Livewire",
      "Bootstrap",
      "JQuery",
      "Vue.js"
    ],
    link: "https://github.com/yusufwdn/mini-store",
  },
];

export const educations: Education[] = [
  {
    degree: "Bachelor of Computer Science",
    institution: "Institut Teknologi dan Bisnis Swadharma",
    period: "2022 - 2026",
    description:
      "Currently pursuing a bachelor's degree with a focus on software development, web technologies, and system design.",
    icon: "🎓",
  },
  {
    degree: "Vocational High School in Software Engineering",
    institution: "SMK Wikrama Bogor",
    period: "2017 - 2020",
    description:
      "Focused on software development fundamentals including web and desktop applications. Completed several practical projects and internships.",
    icon: "💻",
  },
];

export const certificates: Certificate[] = [
  {
    name: "Master Class : React.js and Tailwind Web Development",
    issuer: "BuildWithAngga",
    date: "Oct 2023",
    url: "https://drive.google.com/file/d/1m_9_AEoFuSuh2t4y1zHviL3gsmtmSuL7/view",
    icon: "🏆",
  },
  {
    name: "Node.js : Pemula Sampai Mahir",
    issuer: "Udemy - Programmer Zaman Now",
    date: "Aug 2023",
    url: "https://www.udemy.com/certificate/UC-5eddc9ea-f8a7-4588-bfef-799231035a97/",
    icon: "🏆",
  },
  {
    name: "Website Developer : E-commerce",
    issuer: "BuildWithAngga",
    date: "Nov 2021",
    url: "https://drive.google.com/file/d/1XKwcWJu5-AY1LVh2inOWjGn9WpddBrZa/view",
    icon: "🏆",
  },
  {
    name: "Mahir Membuat Website dengan Laravel",
    issuer: "Coding Studio",
    date: "Apr 2021",
    url: "https://drive.google.com/file/d/15azwuFcCBFj8Zv3W87DckOFpEtBzHS6k/view",
    icon: "🏆",
  },
  {
    name: "Internship Certificate",
    issuer: "PT Madani Intelsysdata",
    date: "Mar 2020",
    url: "https://drive.google.com/file/d/1syOaKbiNSAe4jFpRkktQAcf4URSz8FyJ/view",
    icon: "🏆",
  },
];

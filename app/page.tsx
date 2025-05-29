"use client";

import {
  ArrowUpRight,
  Brain,
  Code,
  Github,
  Linkedin,
  Mail,
  Moon,
  Palette,
  Server,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Portofolio() {
  const [isClient, setIsClient] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [activeTab, setActiveTab] = useState("frontend");
  const [theme, setTheme] = useState("light");
  const observerRefs = useRef<IntersectionObserver[]>([]);

  const sections = [
    "about",
    "skills",
    "experiences",
    "projects",
    "educations",
    "contact",
  ];

  const skills = {
    frontend: [
      "HTML",
      "CSS",
      "Javascript",
      "Typescript",
      "Bootstrap",
      "TailwindCSS",
      "React",
      "Next.js",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "PHP",
      "Laravel",
      "Go",
      "Java",
      "REST API",
      "Microservices",
    ],
    tools: [
      "Git",
      "GitHub",
      "Docker",
      "VS Code",
      "MySQL",
      "PostgreSQL",
      "Microsoft SQL Server",
      "Postman",
    ],
    soft: [
      "Problem Solving",
      "Communication",
      "Teamwork",
      "Adaptability",
      "Leadership",
      "Critical Thinking",
      "Creativity",
      "Fast Learning",
    ],
  };

  const skillIcons = {
    frontend: <Code className="h-5 w-5" />,
    backend: <Server className="h-5 w-5" />,
    tools: <Palette className="h-5 w-5" />,
    soft: <Brain className="h-5 w-5" />,
  };

  const workExperiences = [
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

  const projects = [
    {
      title: "Bundapedia",
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
      description:
        "A mobile-based online store application built specifically to sell SIN Indonesia's products.",
      image: "/projects/sin-indonesia.34213054db1fbdae4a60.png",
      technologies: ["Lumen", "PHP", "REST API", "MySQL"],
      link: "https://sinindonesia.co.id/",
    },
    {
      title: "PEPI SIAKAD",
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
      description:
        "A web and mobile-based marketplace application system built to sell products from local micro-medium entrepreneurs.",
      image: "/projects/beliyuu.c5df70f3d958f8fda490.jpg",
      technologies: ["Lumen", "CodeIgniter", "MySQL", "REST API"],
      link: "https://beliyuu.com",
    },
    {
      title: "BUMDES KITA",
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
  ];

  const educations = [
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

  const certificates = [
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

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  type buttonMetadata = {
    children: React.ReactNode;
    variant?: "default" | "outline" | "ghost";
    className?: string | null;
    onClick?: () => void;
  };

  const Button = ({
    children,
    variant = "default",
    className = "",
    onClick,
    ...props
  }: buttonMetadata) => {
    const baseClasses =
      "px-4 py-2 rounded-md font-medium transition-all duration-300 inline-flex items-center justify-center";
    const variants = {
      default:
        "bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20",
      outline:
        "border border-purple-300 text-purple-700 hover:bg-purple-50 hover:scale-105 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/30",
      ghost:
        "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
    };

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };

  type cardMetadata = {
    children: React.ReactNode;
    className?: string | null;
    style?: React.CSSProperties;
  };

  const Card = ({ children, className = "", ...props }: cardMetadata) => {
    return (
      <div
        className={`bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };

  const handleSendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement)
      .value;
    const body = (form.elements.namedItem("body") as HTMLTextAreaElement).value;

    const to = "yusuf.wandana1@gmail.com";
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      to
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${body}`
    )}`;

    window.open(gmailUrl, "_blank");
  };

  useEffect(() => {
    // Clean up previous observers
    observerRefs.current.forEach((observer) => observer.disconnect());
    observerRefs.current = [];

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(section);
              element.classList.add("animate-in");
            }
          },
          { threshold: 0.1 }
        );

        observer.observe(element);
        observerRefs.current.push(observer);
      }
    });

    setIsClient(true);

    return () => {
      observerRefs.current.forEach((observer) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    document.documentElement.className = initialTheme;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Creative background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Purple gradient */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Geometric shapes */}
        {isClient && (
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-lg border border-purple-200/20 dark:border-purple-500/10"
                style={{
                  width: `${Math.random() * 100 + 20}px`,
                  height: `${Math.random() * 100 + 20}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  opacity: Math.random() * 0.3 + 0.1,
                }}
              />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i + 100}
                className="absolute rounded-full border border-purple-200/20 dark:border-purple-500/10"
                style={{
                  width: `${Math.random() * 80 + 10}px`,
                  height: `${Math.random() * 80 + 10}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.3 + 0.1,
                }}
              />
            ))}
          </div>
        )}

        {/* Animated dots */}
        {isClient && (
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i + 200}
                className="absolute rounded-full bg-purple-500/20 dark:bg-purple-500/30 animate-pulse"
                style={{
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 8 + 2}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700/50">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="font-bold text-xl text-purple-600 dark:text-purple-400">
            Yusuf Wandana
          </div>
          <nav className="hidden md:flex gap-8">
            {sections.map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                className={`text-md font-medium transition-all duration-300 hover:text-purple-600 dark:hover:text-purple-400 ${
                  activeSection === section
                    ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-105"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>
            {/* <Button variant="outline" className="hidden md:flex">
              Download CV
            </Button> */}
            <Button variant="outline" className="hidden">
              Menu
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        {/* Hero Section */}
        <section
          id="about"
          className="py-14 md:py-32 flex flex-col md:flex-row gap-10 items-center opacity-0 transition-all duration-1000 translate-y-10"
        >
          <div className="flex-1 space-y-6 max-w-2xl mx-auto md:mx-0">
            <div className="inline-block relative">
              <div className="absolute -inset-1 bg-purple-500/20 rounded-lg blur-md"></div>
              <h1 className="relative text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
                {`Hello, It's Yusuf Wandana`}
              </h1>
            </div>
            <div className="h-1 w-32 bg-purple-500"></div>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 mt-5 mb-2">
              Software Engineer & Full-Stack Developer
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              I build accessible, user-friendly web applications with modern
              technologies. Passionate about creating solutions that make a
              difference.
            </p>

            {/* Creative code snippet */}
            <div className="relative mt-6 rounded-lg overflow-hidden w-full">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/10 to-purple-400/10"></div>
              <div className="overflow-x-auto w-full">
                <pre className="p-4 bg-gray-900/90 text-gray-300 rounded-lg text-sm whitespace-pre-wrap break-words">
                  <code>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-yellow-300">developer</span> = {"{"}
                    <br />
                    {"  "}name:{" "}
                    <span className="text-green-400">{`"Cupsky"`}</span>,
                    <br />
                    {"  "}skills: [
                    <span className="text-green-400">{`"PHP"`}</span>,{" "}
                    <span className="text-green-400">{`"Laravel"`}</span>,{" "}
                    <span className="text-green-400">{`"Node.js"`}</span>,{" "}
                    <span className="text-green-400">{`"Next.js"`}</span>,{" "}
                    <span className="text-green-400">{`"Go"`}</span>],
                    <br />
                    {"  "}passion:{" "}
                    <span className="text-green-400">{`"Solving real-world problem & build systems through code with a cup of coffee ☕︎"`}</span>
                    <br />
                    {"}"};
                  </code>
                </pre>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  contactSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact Me
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const projectSection = document.getElementById("projects");
                  projectSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Projects
              </Button>
            </div>

            <div className="flex gap-4 pt-6">
              <Link
                href={`https://github.com/yusufwdn`}
                target="_blank"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href={`https://www.linkedin.com/in/yusuf-wandana/`}
                target="_blank"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=yusuf.wandana1@gmail.com`}
                target="_blank"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            {/* Creative geometric shape instead of photo */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full relative">
                  {/* Animated shapes */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 border-8 border-purple-500/30 rounded-full animate-spin-slow"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-60 h-60 border-2 border-purple-400/40 rounded-full animate-reverse-spin-slow"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-purple-500/20 rounded-full blur-md animate-pulse"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-purple-600/30 rounded-lg rotate-45 animate-bounce-slow"></div>
                  </div>

                  {/* Code symbols */}
                  <div className="absolute top-10 left-10 text-2xl font-mono text-purple-600 dark:text-purple-400 animate-float">
                    {"{"}
                  </div>
                  <div className="absolute bottom-10 right-10 text-2xl font-mono text-purple-600 dark:text-purple-400 animate-float-delay">
                    {"}"}
                  </div>
                  <div className="absolute top-20 right-20 text-2xl font-mono text-purple-600 dark:text-purple-400 animate-float-delay-2">
                    {"<>"}
                  </div>
                  <div className="absolute bottom-20 left-20 text-2xl font-mono text-purple-600 dark:text-purple-400 animate-float">
                    {"</>"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="py-14 border-t border-gray-200 dark:border-gray-700/50 opacity-0 transition-all duration-1000 translate-y-10"
        >
          <div className="inline-block">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              Skills & Technologies
            </h2>
            <div className="h-1 w-1/3 bg-purple-500"></div>
          </div>
          <div className="w-full mt-10">
            <div className="flex overflow-x-auto hide-scrollbar" id="skill-tab">
              {Object.keys(skills).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium text-sm transition-all duration-300 border-b-2 flex items-center gap-2 ${
                    activeTab === tab
                      ? "border-purple-500 text-purple-600 dark:text-purple-400"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  }`}
                >
                  {skillIcons[tab as keyof typeof skillIcons]}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {skills[activeTab as keyof typeof skills].map((skill, i) => (
                  <Card
                    key={skill}
                    className="overflow-hidden group"
                    style={{
                      animationDelay: `{${i} * 100}ms`,
                      animationDuration: "500ms",
                    }}
                  >
                    <div className="p-6 flex items-center gap-4 relative overflow-hidden">
                      <div className="absolute -right-6 -bottom-6 w-12 h-12 bg-purple-500/10 rounded-full group-hover:scale-150 transition-all duration-500"></div>
                      <div className="w-10 h-10 rounded bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold relative z-10">
                        {skill.charAt(0)}
                      </div>
                      <span className="font-medium relative z-10">{skill}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Work Experiences Section */}
        <section
          id="experiences"
          className="py-14 border-t border-gray-200 dark:border-gray-700/50 opacity-0 transition-all duration-1000 translate-y-10"
        >
          <div className="inline-block">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              Work Experience
            </h2>
            <div className="h-1 w-1/3 bg-purple-500"></div>
          </div>
          <div className="space-y-10 mt-10 relative">
            {/* Timeline */}
            <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-1 bg-purple-200 dark:bg-purple-900/50 transform md:translate-x-[-0.5px]"></div>
            {workExperiences.map((experince, key) => (
              <div
                key={key}
                className={`relative md:flex ${
                  key % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-purple-500 transform md:translate-x-[-8px] mt-6"></div>

                <div className="md:w-1/2 md:px-10">
                  <Card
                    className={`ml-8 md:ml-0 ${
                      key % 2 === 0 ? "md:mr-5" : "md:ml-5"
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">
                            {experince.title}
                          </h3>
                          <p className="font-bold mt-2 text-gray-600 dark:text-gray-400">
                            {experince.company}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-500 mt-2 md:mt-0">
                          {experince.period}
                        </span>
                      </div>
                      {/* <p className="mb-4 text-gray-600 dark:text-gray-400">{experince.description}</p> */}
                      <ul className="list-disc space-y-3 px-3 py-1 mb-4 text-gray-600 dark:text-gray-400">
                        {experince.description_list.map((desc, key) => (
                          <li key={key}>{desc}</li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {experince.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 transition-all duration-300 hover:scale-105"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Project section */}
        <section
          id="projects"
          className="py-20 border-t border-gray-200 dark:border-gray-700/50 opacity-0 transition-all duration-1000 translate-y-10"
        >
          <div className="inline-block">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            <div className="h-1 w-1/3 bg-purple-500"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {projects.map((project, key) => (
              <Card
                key={key}
                className="overflow-hidden group"
                style={{
                  animationDelay: `${key * 150}ms`,
                  animationDuration: "500ms",
                }}
              >
                <div className="p-6 relative">
                  <div className="absolute inset-0">
                    {/* <span className="absolute top-1 left-2 z-10 text-[14px]">Project X</span> */}
                    <div className="absolute top-2 left-2 z-10 text-md font-bold mb-2 text-purple-600 dark:text-purple-400">
                      {project.title}
                    </div>
                    <div className="absolute top-[14px] right-2 w-[9px] h-[9px] rounded-full bg-red-400 z-10"></div>
                    <div className="absolute top-[14px] right-6 w-[9px] h-[9px] rounded-full bg-yellow-400 z-10"></div>
                    <div className="absolute top-[14px] right-10 w-[9px] h-[9px] rounded-full bg-green-400 z-10"></div>
                    <div className="absolute top-0 left-0 right-0 h-10 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"></div>
                  </div>
                  <div className="mt-8 mb-4 md:h-72 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark-to-purple-800/20 flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-all duration-500 relative">
                    <img className="w-full object-cover" src={project.image} alt={project.title} />
                  </div>

                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100 dark:bg-purple-900/20 opacity-20 rounded-bl-full -mt-6 -mr-6"></div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 transition-all duration-300 hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </div>
                  <Link
                    href={project.link}
                    className="group inline-flex items-center text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-all duration-300"
                    target="_blank"
                  >
                    <span className="relative">
                      View Project
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </span>
                    <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Education & Certificates Section */}
        <section
          id="educations"
          className="py-20 border-t border-gray-200 dark:border-gray-700/50 opacity-0 transition-all duration-1000 translate-y-10"
        >
          <div className="inline-block">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              Education & Certificates
            </h2>
            <div className="h-1 w-1/3 bg-purple-500"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-10 mt-10">
            <div>
              <h3 className="text-xl font-bold mb-6 text-purple-600 dark:text-purple-400">
                Education
              </h3>
              <div className="space-y-6">
                {educations.map((edu, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animationDuration: "500ms",
                    }}
                  >
                    <div className="p-6 relative">
                      <div className="absolute top-0 left-0 w-16 h-16 bg-purple-100 dark:bg-purple-900/20 opacity-20 rounded-br-full"></div>
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{edu.icon}</div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h4 className="font-bold text-purple-600 dark:text-purple-400">
                              {edu.degree}
                            </h4>
                            <span className="md:text-right text-sm text-gray-500 dark:text-gray-500 mt-1 md:mt-0 md:w-[85px]">
                              {edu.period}
                            </span>
                          </div>
                          <p className="font-bold text-gray-600 dark:text-gray-400 mb-2">
                            {edu.institution}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            {edu.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-purple-600 dark:text-purple-400">
                Certificates
              </h3>
              <div className="space-y-6">
                {certificates.map((cert, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animationDuration: "500ms",
                    }}
                  >
                    <div className="p-6 relative">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-purple-100 dark:bg-purple-900/20 opacity-20 rounded-bl-full"></div>
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{cert.icon}</div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <Link href={cert.url} target="_blank">
                              <h4 className="font-bold text-purple-600 dark:text-purple-400">
                                {cert.name}
                              </h4>
                            </Link>
                            <span className="align-top md:text-right text-sm text-gray-500 dark:text-gray-500 mt-1 md:mt-0 md:w-[85px]">
                              {cert.date}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-2">
                            {cert.issuer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 border-t border-gray-200 dark:border-gray-700/50 opacity-0 transition-all duration-1000 translate-y-10"
        >
          <div className="inline-block">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              Get In Touch
            </h2>
            <div className="h-1 w-1/3 bg-purple-500"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-10 mt-10">
            <Card className="overflow-hidden relative group">
              <div className="absolute -inset-0.5 bg-purple-300 dark:bg-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="p-6 relative bg-white dark:bg-gray-800 rounded-lg">
                <form className="space-y-4" onSubmit={handleSendEmail}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="body"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Message
                    </label>
                    <textarea
                      id="body"
                      className="flex min-h-[120px] w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                      placeholder="Your message"
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </div>
            </Card>
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <div className="p-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      yusuf.wandana1@gmail.com
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="overflow-hidden">
                <div className="p-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">LinkedIn</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      linkedin.com/in/yusuf-wandana
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="overflow-hidden">
                <div className="p-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">GitHub</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      github.com/yusufwdn
                    </p>
                  </div>
                </div>
              </Card>

              {/* Creative contact decoration */}
              <div className="relative h-40 mt-6 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">👋</div>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">
                      {`Let's work together!`}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    className="text-purple-500/10"
                  >
                    <path
                      fill="currentColor"
                      fillOpacity="1"
                      d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700/50 py-10 bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start">
            <div className="font-bold text-xl mb-2 text-purple-600 dark:text-purple-400">
              Yusuf Wandana
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              Software Engineer & Full-Stack Developer
            </p>
          </div>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Yusuf Wandana. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

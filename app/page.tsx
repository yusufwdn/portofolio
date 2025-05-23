"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
// import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Portofolio() {
  const [isClient, setIsClient] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  // const [activeTab, setActiveTab] = useState("frontend")
  const [theme, setTheme] = useState("light");
  const observerRefs = useRef<IntersectionObserver[]>([]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme
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

  useEffect(() => {
    const sections = [
      "about",
      "skills",
      "experiences",
      "projects",
      "educations",
      "contact",
    ];

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
          { threshold: 0.3 }
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
            {[
              "about",
              "skills",
              "experiences",
              "projects",
              "educations",
              "contact",
            ].map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                className={`text-sm font-medium transition-all duration-300 hover:text-purple-600 dark:hover:text-purple-400 ${
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
            <Button variant="outline" className="hidden md:flex">
              Download CV
            </Button>
            <Button variant="outline" className="md:hidden">
              Menu
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        {/* Hero Section */}
        <section
          id="about"
          className="py-20 md:py-32 flex flex-col md:flex-row gap-10 items-center opacity-0 transition-all duration-1000 translate-y-10"
        >
          <div className="flex-1 space-6 max-w-2xl mx-auto md:mx-0">
            <div className="inline-block relative">
              <div className="absolute -inset-1 bg-purple-500/20 rounded-lg blur-md"></div>
              <h1 className="relative text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
                {`I'm, Yusuf Wandana`}
              </h1>
            </div>
            <div className="h-1 w-32 bg-purple-500"></div>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300">
              Software Engineer & Full-Stack Developer
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              I build accessible, user-friendly web applications with modern
              technologies. Passionate about creating solutions that make a
              difference.
            </p>

            {/* Creative code snippet */}
            <div className="relative mt-6 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-400/10"></div>
              <pre className="p-4 bg-gray-900/90 text-gray-300 rounded-lg overflow-x-auto text-sm">
                <code>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-yellow-300">developer</span> = {"{"}
                  <br />
                  {"  "}name:{" "}
                  <span className="text-green-400">{`"Cupsky"`}</span>,
                  <br />
                  {"  "}skills: [
                  <span className="text-green-400">{`"Laravel"`}</span>,{" "}
                  <span className="text-green-400">{`"Node.js"`}</span>,{" "}
                  <span className="text-green-400">{`"Next.js"`}</span>,{" "}
                  <span className="text-green-400">{`"Go"`}</span>],
                  <br />
                  {"  "}passion:{" "}
                  <span className="text-green-400">{`"Building amazing web experiences..."`}</span>
                  <br />
                  {"}"};
                </code>
              </pre>
            </div>
          </div>
        </section>


      </main>
    </div>
  );
}

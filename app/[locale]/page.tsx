import { setRequestLocale } from "next-intl/server";
import Capabilities from "@/components/sections/Capabilities";
import Contact from "@/components/sections/Contact";
import Credentials from "@/components/sections/Credentials";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import SiteFooter from "@/components/sections/SiteFooter";
import SiteHeader from "@/components/sections/SiteHeader";
import Stack from "@/components/sections/Stack";

// A server component: only the sections that need state ship JavaScript.
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background: one dot grid + two soft blooms, instead of 65 randomly
          positioned divs re-rolled on every mount. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="dot-grid absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,#000,transparent)]" />
        <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] animate-bloom-drift rounded-full bg-primary/[0.13] blur-[110px]" />
        <div className="absolute bottom-[-15%] left-[-10%] h-[440px] w-[440px] rounded-full bg-coffee/[0.07] blur-[120px]" />
      </div>

      <SiteHeader />

      <main className="container mx-auto px-4">
        <Hero />
        <Capabilities />
        <Stack />
        <Experience />
        <Projects />
        <Credentials />
        <Contact />
      </main>

      <SiteFooter />
    </div>
  );
}

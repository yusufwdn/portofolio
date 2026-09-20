import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Every token is stored as raw HSL channels so Tailwind can inject
        // opacity: bg-surface/60, border-line/50, text-primary/80 all work.
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        surface: {
          DEFAULT: "hsl(var(--surface) / <alpha-value>)",
          raised: "hsl(var(--surface-raised) / <alpha-value>)",
          sunken: "hsl(var(--surface-sunken) / <alpha-value>)",
        },
        line: {
          DEFAULT: "hsl(var(--line) / <alpha-value>)",
          strong: "hsl(var(--line-strong) / <alpha-value>)",
        },
        // Reserved for control boundaries only — using it on cards and
        // dividers would make the whole page read as heavy boxes.
        control: "hsl(var(--control) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          soft: "hsl(var(--primary-soft) / <alpha-value>)",
          contrast: "hsl(var(--primary-contrast) / <alpha-value>)",
        },
        // Warm counterweight to the violet — picked off the "cup of coffee"
        // line in the bio. Used sparingly, so it still reads as an accent.
        coffee: "hsl(var(--coffee) / <alpha-value>)",
        // The terminal stays dark in both themes: it anchors the page instead
        // of flattening into another light card.
        term: {
          bg: "hsl(var(--term-bg) / <alpha-value>)",
          chrome: "hsl(var(--term-chrome) / <alpha-value>)",
          text: "hsl(var(--term-text) / <alpha-value>)",
          dim: "hsl(var(--term-dim) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Cascadia Code",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        // A real scale with a gap in it, so headings and body never tie.
        display: [
          "clamp(2.75rem, 7vw, 4.75rem)",
          { lineHeight: "0.95", letterSpacing: "-0.035em" },
        ],
        title: [
          "clamp(1.75rem, 3.5vw, 2.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.16em" }],
      },
      spacing: {
        section: "clamp(5rem, 12vh, 9rem)",
      },
      borderRadius: {
        card: "0.875rem",
      },
      boxShadow: {
        card: "0 1px 2px hsl(var(--shadow) / 0.05), 0 8px 24px -12px hsl(var(--shadow) / 0.12)",
        lift: "0 2px 4px hsl(var(--shadow) / 0.06), 0 18px 40px -16px hsl(var(--shadow) / 0.22)",
      },
      keyframes: {
        caret: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "bloom-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.06)" },
        },
      },
      animation: {
        caret: "caret 1.05s steps(1) infinite",
        "bloom-drift": "bloom-drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;

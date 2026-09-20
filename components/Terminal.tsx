"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects, skillGroups, skills } from "@/lib/static-data";

type LineKind = "input" | "output" | "accent" | "dim" | "error";

type Line = {
  id: number;
  kind: LineKind;
  text: string;
};

// Command names stay English in both locales — they are commands, not prose.
// Only what the terminal prints back gets translated.
const COMMANDS = [
  "help",
  "whoami",
  "ls",
  "cat",
  "skills",
  "projects",
  "contact",
  "theme",
  "clear",
] as const;

const FILE_NAMES = ["about.md", "stack.json", "coffee.txt"];

// Literal in both languages: one is code, the other is a drawing.
const STACK_JSON = [
  "{",
  '  "backend":  ["PHP", "Laravel", "Node.js", "Express", "Go"],',
  '  "frontend": ["TypeScript", "React", "Next.js", "TailwindCSS"],',
  '  "data":     ["MySQL", "PostgreSQL", "SQL Server"],',
  '  "ops":      ["Docker", "Git", "Postman"]',
  "}",
];

const COFFEE_ART = [
  "        ( (",
  "         ) )",
  "      ........",
  "      |      |]",
  "      \\      /",
  "       `----'",
  "",
];

export default function Terminal({
  onToggleTheme,
}: {
  onToggleTheme?: () => void;
}) {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [booting, setBooting] = useState(true);
  const [ghost, setGhost] = useState("");

  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("terminal");
  const tProjects = useTranslations("projects");
  const tStack = useTranslations("stack");

  const push = useCallback((kind: LineKind, text: string | string[]) => {
    const texts = Array.isArray(text) ? text : [text];
    setLines((prev) => {
      const added = texts.map((tx) => ({ id: nextId.current++, kind, text: tx }));
      // Cap the buffer so a long session can't grow without bound.
      return [...prev, ...added].slice(-160);
    });
  }, []);

  const run = useCallback(
    (raw: string) => {
      const input = raw.trim();
      push("input", input);
      if (!input) return;

      const [cmd, ...args] = input.split(/\s+/);

      switch (cmd.toLowerCase()) {
        case "help":
          push("output", t.raw("help") as string[]);
          break;

        case "whoami":
          push("output", t.raw("whoami") as string[]);
          push("dim", t("hint"));
          break;

        case "ls":
          push("accent", FILE_NAMES.join("   "));
          break;

        case "cat": {
          const name = args[0]?.toLowerCase();
          if (!name) {
            push("error", t("catMissing"));
            break;
          }
          if (name === "about.md") push("output", t.raw("about") as string[]);
          else if (name === "stack.json") push("output", STACK_JSON);
          else if (name === "coffee.txt")
            push("output", [...COFFEE_ART, ...(t.raw("coffee") as string[])]);
          else push("error", t("catNoFile", { name: args[0] }));
          break;
        }

        // Not advertised in help — a small reward for poking around.
        case "coffee":
          push("output", [...COFFEE_ART, ...(t.raw("coffee") as string[])]);
          break;

        case "skills": {
          const group = args[0]?.toLowerCase();

          if (!group) {
            skillGroups.forEach((g) => {
              push("accent", tStack(`groups.${g}`));
              push("output", "  " + skills[g].map((s) => s.name).join(", "));
            });
            break;
          }
          if (!skillGroups.includes(group as (typeof skillGroups)[number])) {
            push(
              "error",
              t("skillsUnknown", { group, groups: skillGroups.join(" · ") })
            );
            break;
          }
          const key = group as (typeof skillGroups)[number];
          push("output", skills[key].map((s) => `  ${s.name}`));
          break;
        }

        case "projects":
          projects.forEach((p) => {
            push("accent", tProjects(`items.${p.id}.title`));
            push("output", `  ${tProjects(`items.${p.id}.description`)}`);
            // TCES has no public URL, so printing p.link raw would show
            // "undefined" in the terminal.
            const tail = p.link ? `  →  ${p.link}` : ` · ${tProjects("internal")}`;
            push("dim", `  ${p.technologies.join(" · ")}${tail}`);
          });
          break;

        case "contact":
          push("output", t.raw("contact") as string[]);
          push("dim", t("contactHint"));
          break;

        case "theme":
          onToggleTheme?.();
          push("output", t("themeFlipped"));
          break;

        case "clear":
          setLines([]);
          break;

        case "sudo":
          push("error", t("sudo"));
          break;

        default: {
          const guess = COMMANDS.find((c) => c.startsWith(cmd.toLowerCase()));
          push("error", t("notFound", { cmd }));
          push("dim", guess ? t("didYouMean", { guess }) : t("runHelp"));
        }
      }
    },
    [push, onToggleTheme, t, tProjects, tStack]
  );

  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Boot: type `whoami` as if someone were sitting there, then hand over
  // control. Anyone who prefers reduced motion just gets the result. The
  // effect only schedules timers — the terminal renders empty on the server
  // and fills in after mount, so there is nothing to mismatch on hydration.
  useEffect(() => {
    const demo = "whoami";
    const timers: ReturnType<typeof setTimeout>[] = [];

    const finish = () => {
      setGhost("");
      run(demo);
      setBooting(false);
    };

    if (reducedMotion) {
      timers.push(setTimeout(finish, 0));
    } else {
      demo.split("").forEach((_, i) => {
        timers.push(
          setTimeout(() => setGhost(demo.slice(0, i + 1)), 420 + i * 85)
        );
      });
      timers.push(setTimeout(finish, 420 + demo.length * 85 + 320));
    }

    return () => timers.forEach(clearTimeout);
    // Runs once on mount; `run` changes identity with the locale but the
    // boot sequence should not replay on a language switch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the newest line in view.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [lines, ghost]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      if (value.trim()) setHistory((h) => [...h, value.trim()]);
      setValue("");
      setHistoryIndex(null);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const i =
        historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(i);
      setValue(history[i]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const i = historyIndex + 1;
      if (i >= history.length) {
        setHistoryIndex(null);
        setValue("");
      } else {
        setHistoryIndex(i);
        setValue(history[i]);
      }
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(value.trim().toLowerCase()));
      if (match) setValue(match + " ");
      return;
    }

    if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const toneFor: Record<LineKind, string> = {
    input: "text-term-text",
    output: "text-term-text/85",
    accent: "text-primary font-medium",
    dim: "text-term-dim",
    error: "text-coffee",
  };

  return (
    <div
      className="group/term relative overflow-hidden rounded-card border border-white/10 bg-term-bg shadow-lift"
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-term-chrome px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-term-dim">
          {t("windowTitle")}
        </span>
      </div>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label={t("outputLabel")}
        // Grows with its output instead of sitting at a fixed height with a
        // hollow gap under the boot lines, then caps and scrolls.
        className="hide-scrollbar max-h-[440px] min-h-[260px] overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed sm:min-h-[300px] sm:text-[15px]"
      >
        {lines.map((line) =>
          line.kind === "input" ? (
            <p key={line.id} className="mt-3 break-words first:mt-0">
              <span className="select-none text-primary">❯ </span>
              <span className="text-term-text">{line.text}</span>
            </p>
          ) : (
            <p
              key={line.id}
              className={`whitespace-pre-wrap break-words ${toneFor[line.kind]}`}
            >
              {line.text || " "}
            </p>
          )
        )}

        {/* Live prompt */}
        <p className="mt-3 flex items-baseline break-words">
          <span className="select-none text-primary">❯&nbsp;</span>
          {booting ? (
            <span className="text-term-text">
              {ghost}
              <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-[1px] animate-caret bg-term-text align-middle" />
            </span>
          ) : (
            <span className="relative flex-1">
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                aria-label={t("inputLabel")}
                className="w-full bg-transparent font-mono text-term-text caret-primary outline-none placeholder:text-term-dim/70"
                placeholder={t("placeholder")}
              />
            </span>
          )}
        </p>
      </div>

      {/* The "this thing is real" signal lives on the terminal itself — it is
          the only place a visitor is already looking when they wonder. */}
      <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-3 font-mono text-[12px] text-term-dim">
        {/* Keyboard affordances are desktop-only; on a phone they are noise. */}
        <span className="hidden sm:inline">
          <kbd className="rounded bg-white/10 px-1.5 py-0.5">Tab</kbd>{" "}
          {t("complete")}
          <span className="mx-2 opacity-40">·</span>
          <kbd className="rounded bg-white/10 px-1.5 py-0.5">↑</kbd>{" "}
          {t("history")}
        </span>
        <span className="ml-auto flex items-center gap-2 text-term-text/70">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#28c840] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#28c840]" />
          </span>
          {t("live")}
        </span>
      </div>
    </div>
  );
}

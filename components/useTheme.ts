"use client";

import { useCallback, useSyncExternalStore } from "react";
import { THEME_COOKIE, type Theme } from "@/lib/theme";

// The <html> class is the single source of truth. The server renders it from
// the theme cookie, so it survives a locale change (which re-renders the root
// layout) instead of depending on a client script running at the right moment.
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next: Theme = root.classList.contains("dark") ? "light" : "dark";

    // `theme-switching` is what lets globals.css animate the swap without a
    // blanket `* { transition }` slowing every hover down.
    root.classList.add("theme-switching");
    root.classList.toggle("dark", next === "dark");
    root.classList.toggle("light", next === "light");
    root.style.colorScheme = next;

    // The cookie is what the server reads on the next render, so the choice
    // survives navigation. localStorage is kept as a second copy for the
    // pre-paint script.
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    try {
      localStorage.setItem(THEME_COOKIE, next);
    } catch {
      // Private mode / blocked storage — the cookie still carries it.
    }

    listeners.forEach((l) => l());
    window.setTimeout(() => root.classList.remove("theme-switching"), 320);
  }, []);

  return { theme, toggle };
}

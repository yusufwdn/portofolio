export type Theme = "light" | "dark";

export const THEME_COOKIE = "theme";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

/**
 * Runs before first paint. It is deliberately idempotent: if the server
 * already rendered a theme class (because the visitor has a theme cookie),
 * it returns immediately. React re-inserts <head> scripts on a client
 * navigation, which re-executes them, and a script that rewrote the class
 * every time it ran was free to disagree with what React had rendered.
 */
export const THEME_SCRIPT = `
(function () {
  try {
    var root = document.documentElement;
    if (root.className === 'light' || root.className === 'dark') return;
    var m = document.cookie.match(/(?:^|; )theme=(light|dark)/);
    var t = m
      ? m[1]
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    root.className = t;
    root.style.colorScheme = t;
  } catch (e) {}
})();
`;

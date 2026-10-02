import { getTranslations, setRequestLocale } from "next-intl/server";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { routing, type Locale } from "@/i18n/routing";

export const alt = "Yusuf Wandana, Software Engineer & Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Without this the image is rendered on demand per request; with it every
// locale gets baked at build time like the pages it belongs to.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Hex rather than the CSS tokens: Satori renders outside the browser, so it
// cannot resolve custom properties. These are the dark-theme values.
const C = {
  bg: "#100e16",
  term: "#14101e",
  chrome: "#201b2c",
  fg: "#f4f3f7",
  muted: "#9e98ae",
  primary: "#ad7bf4",
  line: "#2d2938",
};

// Locales whose headline Poppins cannot draw. Montserrat for Russian: it is
// geometric like Poppins and has Cyrillic, so the card keeps its look.
//
// `primary` sets the font on the headline outright instead of leaving it as a
// per-glyph fallback: Poppins has some Vietnamese letters but not all, and
// falling back glyph by glyph put two fonts inside one word.
const OG_FONTS: Partial<
  Record<
    Locale,
    { family: string; name: string; cjk: boolean; primary?: boolean }
  >
> = {
  ja: { family: "Noto+Sans+JP", name: "Noto Sans JP", cjk: true },
  zh: { family: "Noto+Sans+SC", name: "Noto Sans SC", cjk: true },
  ru: { family: "Montserrat", name: "Montserrat", cjk: false },
  vi: {
    family: "Be+Vietnam+Pro",
    name: "Be Vietnam Pro",
    cjk: false,
    primary: true,
  },
};

// Satori has no text shaping. Arabic needs joining and right-to-left order;
// Thai and Khmer need their vowels and subscripts positioned around the base
// letter. Drawn without that they come out garbled, so these cards use the
// English headline.
const UNSHAPED: readonly string[] = ["ar", "th", "km"];

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Same reason as the page: without it, reading a translation drags the
  // route into on-demand rendering.
  setRequestLocale(locale);

  const fontsDir = path.join(process.cwd(), "public", "fonts");
  const [bold, regular] = await Promise.all([
    readFile(path.join(fontsDir, "Poppins-Bold.ttf")),
    readFile(path.join(fontsDir, "Poppins-Regular.ttf")),
  ]);

  // The non-empty parts of the hero headline. Japanese, Chinese, Thai and
  // Khmer leave headlineBefore empty: the sentence has no spaces to split on.
  const headlineIn = async (l: string) => {
    const t = await getTranslations({ locale: l, namespace: "hero" });
    return [t("headlineBefore"), t("headlineAccent"), t("headlineAfter")].filter(
      Boolean
    );
  };

  let parts = await headlineIn(
    UNSHAPED.includes(locale) ? routing.defaultLocale : locale
  );

  // Poppins has no kana, hanzi or Cyrillic, and only part of Vietnamese.
  // Fetch just the glyphs this
  // headline uses from Google Fonts at build time; if that fails, fall back
  // to English rather than ship a card full of tofu boxes.
  const extraFonts: { name: string; data: ArrayBuffer; weight: 700 }[] = [];
  let cjk = false;
  let headlineFont: string | undefined;
  const fallback = OG_FONTS[locale as Locale];
  if (fallback) {
    const data = await loadGoogleFont(fallback.family, 700, parts.join(""));
    if (data) {
      extraFonts.push({ name: fallback.name, data, weight: 700 });
      cjk = fallback.cjk;
      if (fallback.primary) headlineFont = fallback.name;
    } else {
      parts = await headlineIn(routing.defaultLocale);
    }
  }

  // Satori may break CJK text between any two characters, which split
  // システム across lines. One sentence per line keeps each word whole.
  const headline = parts.join(" ");
  const lines = cjk ? parts : [headline];

  // Spanish and Portuguese run longer than English for the same line, so the
  // type steps down instead of wrapping to four lines and crowding the name
  // above it.
  const fontSize = headline.length > 40 ? 64 : 78;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: C.bg,
          backgroundImage: `radial-gradient(900px circle at 78% -10%, rgba(173,123,244,0.22), transparent 60%), radial-gradient(700px circle at 0% 115%, rgba(247,164,69,0.10), transparent 60%)`,
          padding: 72,
          // Satori falls through the loaded fonts per glyph: Latin from
          // Poppins, everything else from the locale's fallback, if any.
          fontFamily: "Poppins",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 40, height: 2, background: C.primary }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              color: C.muted,
              textTransform: "uppercase",
            }}
          >
            Yusuf Wandana
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize,
              fontWeight: 700,
              // Only the headline: its font was subset to these words, and
              // the tagline below still needs Poppins. Spread, not set to
              // undefined: Satori splits any fontFamily key it is given.
              ...(headlineFont ? { fontFamily: headlineFont } : {}),
              flexDirection: "column",
              lineHeight: cjk ? 1.25 : 1.05,
              // Negative tracking that tightens Latin caps crushes kanji.
              letterSpacing: cjk ? 0 : -2.5,
              color: C.fg,
              maxWidth: 780,
            }}
          >
            {lines.map((line) => (
              <div key={line} style={{ display: "flex" }}>
                {line}
              </div>
            ))}
          </div>
          <div
            style={{ display: "flex", fontSize: 28, color: C.muted, marginTop: 28 }}
          >
            Software Engineer & Full-Stack Developer
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 24, color: C.muted }}>
            itswandana.netlify.app
          </div>

          {/* A nod to the terminal that runs on the site itself */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 360,
              borderRadius: 14,
              border: `1px solid ${C.line}`,
              background: C.term,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: C.chrome,
                padding: "10px 14px",
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 5, background: "#ff5f57" }} />
              <div style={{ width: 10, height: 10, borderRadius: 5, background: "#febc2e" }} />
              <div style={{ width: 10, height: 10, borderRadius: 5, background: "#28c840" }} />
            </div>
            {/* Drawn, not typed: Poppins has no U+276F, and Satori only has
                the fonts embedded here to fall back on — the character
                rendered as a tofu box. */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 16px",
                fontSize: 20,
              }}
            >
              <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                <path
                  d="M2 3L8 8L2 13"
                  stroke={C.primary}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{ color: C.fg }}>whoami</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins", data: bold, weight: 700, style: "normal" },
        { name: "Poppins", data: regular, weight: 400, style: "normal" },
        ...extraFonts.map((f) => ({ ...f, style: "normal" as const })),
      ],
    }
  );
}

/**
 * Pulls a font from Google Fonts subset to exactly `text`, so the Japanese
 * card ships a few dozen glyphs instead of a 5 MB CJK font. Without a browser
 * User-Agent the CSS API answers with a TrueType URL, the format Satori reads.
 * Returns null on any failure so the caller can fall back.
 */
async function loadGoogleFont(family: string, weight: number, text: string) {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;

    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

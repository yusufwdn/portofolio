import { getTranslations, setRequestLocale } from "next-intl/server";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { routing } from "@/i18n/routing";

export const alt = "Yusuf Wandana, Software Engineer & Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Without this the image is rendered on demand per request; with it both
// locales get baked at build time like the pages they belong to.
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

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Same reason as the page: without it, reading a translation drags the
  // route into on-demand rendering.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "hero" });
  const headline = [
    t("headlineBefore"),
    t("headlineAccent"),
    t("headlineAfter"),
  ].join(" ");

  // Indonesian runs longer than English for the same line, so the type
  // steps down instead of crowding the tagline underneath it.
  const fontSize = headline.length > 46 ? 64 : 78;

  const fontsDir = path.join(process.cwd(), "public", "fonts");
  const [bold, regular] = await Promise.all([
    readFile(path.join(fontsDir, "Poppins-Bold.ttf")),
    readFile(path.join(fontsDir, "Poppins-Regular.ttf")),
  ]);

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
              lineHeight: 1.05,
              letterSpacing: -2.5,
              color: C.fg,
              maxWidth: 780,
            }}
          >
            {headline}
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
      ],
    }
  );
}

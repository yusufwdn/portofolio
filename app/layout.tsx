import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yusuf Wandana - Full Stack Developer",
  description: "Explore the portfolio of me, a passionate full stack developer skilled in Laravel, Node.js, Next.js, and Go. Discover real-world projects, creative solutions, and a deep love for building meaningful systems through code and coffee.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme');
                var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                var initialTheme = theme || systemTheme;
                document.documentElement.className = initialTheme;
              } catch (e) {}
            })();
          `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

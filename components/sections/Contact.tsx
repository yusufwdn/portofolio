"use client";

import { Check, Copy, Github, Linkedin, Mail, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { EMAIL } from "@/lib/site";
import SectionHeading from "./SectionHeading";

const CHANNELS = [
  { id: "email", Icon: Mail, value: EMAIL, href: `mailto:${EMAIL}` },
  {
    id: "linkedin",
    Icon: Linkedin,
    value: "linkedin.com/in/yusuf-wandana",
    href: "https://www.linkedin.com/in/yusuf-wandana/",
  },
  {
    id: "github",
    Icon: Github,
    value: "github.com/yusufwdn",
    href: "https://github.com/yusufwdn",
  },
];

const fieldClass =
  "w-full rounded-md border border-control bg-surface-sunken px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-muted/70 focus:border-primary";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = useTranslations("contact");

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked — the address is on screen anyway.
    }
  };

  // mailto opens whatever the visitor actually uses, instead of assuming
  // Gmail web (which breaks for everyone else and on most phones).
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = String(data.get("subject") ?? "");
    const body = [
      `Name: ${data.get("name") ?? ""}`,
      `Email: ${data.get("email") ?? ""}`,
      "",
      String(data.get("body") ?? ""),
    ].join("\n");

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="border-t border-line py-20">
      <SectionHeading
        index={6}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* sm:grid-cols-2, so these two stop being squeezed on a phone */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-[15px] font-medium">
                  {t("name")}
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder={t("namePlaceholder")}
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-[15px] font-medium">
                  {t("email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={t("emailPlaceholder")}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="block text-[15px] font-medium">
                {t("subject")}
              </label>
              <input
                id="subject"
                name="subject"
                required
                placeholder={t("subjectPlaceholder")}
                className={fieldClass}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="body" className="block text-[15px] font-medium">
                {t("message")}
              </label>
              <textarea
                id="body"
                name="body"
                required
                rows={6}
                placeholder={t("messagePlaceholder")}
                className={`${fieldClass} resize-y`}
              />
            </div>

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-[15px] font-medium text-primary-contrast transition-colors hover:bg-primary/90 sm:w-auto"
            >
              {t("submit")}
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <p className="text-[13px] text-muted">{t("disclaimer")}</p>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-card border border-line">
            <ul className="divide-y divide-line">
              {CHANNELS.map(({ id, Icon, value, href }) => (
                <li key={id} className="flex items-center gap-4 bg-surface p-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-eyebrow uppercase text-muted">
                      {t(`channels.${id}`)}
                    </p>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      className="block truncate text-[15px] transition-colors hover:text-primary"
                    >
                      {value}
                    </a>
                  </div>
                  {id === "email" && (
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label={t("copyEmail")}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-control text-muted transition-colors hover:border-primary hover:text-primary"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 rounded-card border border-dashed border-line-strong p-6">
            <p className="text-[15px] leading-relaxed text-muted">
              {t("terminalHintBefore")}{" "}
              <code className="rounded bg-primary-soft px-1.5 py-0.5 font-mono text-[13px] text-primary">
                contact
              </code>{" "}
              {t("terminalHintAfter")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

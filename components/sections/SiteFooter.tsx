import { useTranslations } from "next-intl";
import { SOCIALS } from "@/lib/site";

export default function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-line">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-10 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-semibold tracking-tight">Yusuf Wandana</p>
          <p className="mt-1.5 text-[15px] text-muted">{t("tagline")}</p>
        </div>

        {/* These pointed at href="#" on the old page — dead on every one */}
        <div className="flex gap-5">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="text-muted transition-colors hover:text-primary"
            >
              <Icon className="h-[18px] w-[18px]" />
              <span className="sr-only">{label}</span>
            </a>
          ))}
        </div>

        <div className="text-center text-[13px] text-muted md:text-right">
          <p>{t("rights", { year: new Date().getFullYear() })}</p>
          <p className="mt-1">
            {t("iconsBy")}{" "}
            <a
              href="https://icons8.com"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-primary"
            >
              Icons8
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

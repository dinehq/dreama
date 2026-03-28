"use client";

import Link from "next/link";

const seg =
  "flex items-center h-6 px-2.5 rounded-full text-xs transition-colors whitespace-nowrap";
const active = `${seg} bg-page-bg text-ink/70 shadow-xs`;
const inactive = `${seg} text-ink/40 hover:text-ink/60 cursor-pointer`;

export default function LocaleLink({ locale }: { locale: "zh" | "en" }) {
  const targetLocale = locale === "zh" ? "en" : "zh";
  return (
    <div className="flex rounded-full bg-ink/5 p-0.5">
      {locale === "zh" ? (
        <>
          <span className={active}>中文</span>
          <Link
            href="/en"
            className={inactive}
            onClick={() => {
              try {
                localStorage.setItem("dreama-locale", targetLocale);
              } catch {}
            }}
          >
            EN
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/"
            className={inactive}
            onClick={() => {
              try {
                localStorage.setItem("dreama-locale", targetLocale);
              } catch {}
            }}
          >
            中文
          </Link>
          <span className={active}>EN</span>
        </>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";

export default function LocaleLink({
  locale,
}: {
  locale: "zh" | "en";
}) {
  const targetLocale = locale === "zh" ? "en" : "zh";
  return (
    <Link
      href={locale === "zh" ? "/en" : "/"}
      className="
        text-xs whitespace-nowrap text-ink/40 transition-colors
        hover:text-ink/60
      "
      onClick={() => {
        try {
          localStorage.setItem("dreama-locale", targetLocale);
        } catch {}
      }}
    >
      {locale === "zh" ? "English" : "中文"}
    </Link>
  );
}

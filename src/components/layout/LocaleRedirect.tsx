"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Client-side locale auto-redirect for static exports.
 * Placed in the Chinese (default) layout only — redirects to /en
 * if the browser language prefers English and the user hasn't
 * manually chosen a language via the footer switcher.
 */
export default function LocaleRedirect() {
  const router = useRouter();

  useEffect(() => {
    try {
      if (localStorage.getItem("dreama-locale")) return;
      const langs = navigator.languages ?? [navigator.language];
      const prefersEn = langs.some((l) => l.startsWith("en"));
      const prefersChinese = langs.some(
        (l) => l.startsWith("zh") || l.startsWith("cn"),
      );
      if (prefersEn && !prefersChinese) {
        localStorage.setItem("dreama-locale", "en");
        router.replace("/en");
      }
    } catch {}
  }, [router]);

  return null;
}

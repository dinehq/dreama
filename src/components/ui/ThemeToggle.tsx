"use client";

import { useSyncExternalStore, useEffect } from "react";

const STORAGE_KEY = "dreama-theme";
const THEME_CHANGE = "dreama-theme-change";

function syncClass(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

const noopSubscribe = () => () => {};

function subscribePref(cb: () => void) {
  window.addEventListener(THEME_CHANGE, cb);
  return () => window.removeEventListener(THEME_CHANGE, cb);
}

function getPref() {
  return localStorage.getItem(STORAGE_KEY) as "light" | "dark" | null;
}

function subscribeMedia(cb: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getSystemDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function writePref(next: "light" | "dark" | null) {
  if (next) localStorage.setItem(STORAGE_KEY, next);
  else localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(THEME_CHANGE));
}

type Pref = "light" | "dark" | null;

const iconProps = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function DeviceIcon() {
  return (
    <svg {...iconProps}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg {...iconProps}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

const seg =
  "flex items-center justify-center size-6 rounded-full transition-colors";
const active = `${seg} bg-page-bg text-ink/70 shadow-xs`;
const inactive = `${seg} text-ink/40 hover:text-ink/60 cursor-pointer`;

const options: { value: Pref; label: string; icon: React.FC }[] = [
  { value: null, label: "System", icon: DeviceIcon },
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
];

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const pref = useSyncExternalStore(subscribePref, getPref, () => null);
  const systemDark = useSyncExternalStore(
    subscribeMedia,
    getSystemDark,
    () => false,
  );

  const isDark = pref ? pref === "dark" : systemDark;

  useEffect(() => {
    if (mounted) syncClass(isDark);
  }, [mounted, isDark]);

  return (
    <div className={`flex rounded-full bg-ink/5 p-0.5 ${className}`}>
      {options.map((opt) => {
        const isActive = mounted && pref === opt.value;
        return (
          <button
            key={opt.label}
            onClick={() => writePref(opt.value)}
            aria-label={opt.label}
            aria-pressed={isActive}
            className={isActive ? active : inactive}
          >
            <opt.icon />
          </button>
        );
      })}
    </div>
  );
}

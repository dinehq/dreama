"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import HoverPopover from "@/components/ui/HoverPopover";
import {
  DownloadQRCode,
  APP_DOWNLOAD_URL,
} from "@/components/ui/DownloadQRCode";
import type { Dict } from "@/i18n/zh";

type NavDict = Dict["nav"];

const LINK_CLASS =
  "text-base text-ink hover:text-brand transition-colors whitespace-nowrap";
const SCROLL_OFFSET = 120;

const NAV_LINKS = [
  { href: "#features", dictKey: "creators" },
  { href: "#about", dictKey: "about" },
  { href: "#join", dictKey: "join" },
] as const;

function scrollToHash(href: string) {
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Nav({ dict }: { dict: NavDict }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [qrPlaySignal, setQrPlaySignal] = useState(0);

  // null = CSS `md:` classes control layout (SSR + first paint, no flash either side)
  // true/false = JS probe has measured and takes over
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const locale = pathname.startsWith("/en") ? "en" : "zh";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dynamic breakpoint: switch to desktop nav only when all content actually fits.
  // The probe renders all desktop items at natural width (no flex distribution).
  // probe.scrollWidth = minimum nav width needed, including page gutters + pill padding.
  useEffect(() => {
    const nav = navRef.current;
    const probe = probeRef.current;
    if (!nav || !probe) return;

    const check = () => {
      const fits = nav.clientWidth >= probe.scrollWidth;
      setIsDesktop(fits);
      if (fits) setOpen(false);
    };

    const ro = new ResizeObserver(check);
    ro.observe(nav);
    ro.observe(probe);
    check();
    return () => ro.disconnect();
  }, []);

  // In CSS mode (null): open controls mobile dropdown; CSS hides it on desktop.
  // In JS mode: also gate on !isDesktop.
  const expanded = isDesktop === null ? open : !isDesktop && open;

  // Helpers: show desktop/mobile items in CSS mode via md: classes;
  // show unconditionally once JS has confirmed the layout.
  const desktopOnly =
    isDesktop === null ? "hidden md:block" : isDesktop ? "" : "hidden";
  const mobileOnly =
    isDesktop === null ? "md:hidden" : isDesktop ? "hidden" : "";

  return (
    <nav ref={navRef} className="fixed inset-x-0 top-0 z-50">
      {/*
       * Measurement probe — invisible, out of flow.
       * Outer div: page-gutter padding (block absolute, shrink-to-fit).
       * Inner div: px-2 simulates pill's p-2 padding on each side.
       * probe.scrollWidth = gutters + pill-padding + all desktop items at natural width.
       */}
      <div
        ref={probeRef}
        aria-hidden="true"
        className="invisible absolute top-0 left-0 page-gutter whitespace-nowrap"
        style={{ pointerEvents: "none" }}
      >
        <div className="flex items-center gap-9 px-2">
          {/*
           * Fixed-size logo placeholder: avoids measuring 0 before the image
           * loads. Dimensions from the source PNGs (297×72 zh, 293×72 en) at
           * h-9 (36px): width = 36 × (w/h). Both locales round to ~148px.
           */}
          <div
            style={{
              width: locale === "en" ? "146px" : "149px",
              height: "36px",
              flexShrink: 0,
            }}
          />
          <div className="flex shrink-0 items-center gap-9">
            {NAV_LINKS.map(({ href, dictKey }) => (
              <span key={href} className="text-base">
                {dict[dictKey]}
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-6">
            <span className="text-base">{dict.login}</span>
            <span className="inline-flex items-center px-4 text-base font-medium">
              {dict.download}
            </span>
          </div>
        </div>
      </div>

      {/* Outer container — applies page gutters, max-width, and top spacing */}
      <div
        className="mx-auto max-w-360 page-gutter"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)" }}
      >
        {/* Pill nav bar */}
        <div
          className={`flex items-center justify-between rounded-full bg-nav-bg/90 p-2 backdrop-blur-sm transition-shadow duration-300 ${
            scrolled ? "shadow-[0_2px_12px_0_rgb(0_0_0/0.08)]" : "shadow-none"
          }`}
        >
          {/* Left — logo */}
          <div className="flex flex-1 items-center">
            <Link href={locale === "en" ? "/en" : "/"}>
              <LogoIcon
                variant="full"
                className="h-9 w-auto"
                priority
                locale={locale}
              />
            </Link>
          </div>

          {/* Center — nav links (desktop only) */}
          <div
            className={
              isDesktop === null
                ? "hidden items-center gap-9 md:flex"
                : isDesktop
                  ? "flex items-center gap-9"
                  : "hidden"
            }
          >
            {NAV_LINKS.map(({ href, dictKey }) => (
              <a
                key={href}
                href={href}
                className={LINK_CLASS}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash(href);
                }}
              >
                {dict[dictKey]}
              </a>
            ))}
          </div>

          {/* Right — actions */}
          <div
            className={`flex flex-1 items-center justify-end ${
              isDesktop === null
                ? "gap-4 md:gap-6"
                : isDesktop
                  ? "gap-6"
                  : "gap-4"
            }`}
          >
            {/* Login — desktop only */}
            <a
              href="https://ai.ideaflow.pro/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${desktopOnly} ${LINK_CLASS}`}
            >
              {dict.login}
            </a>

            {/* Download — mobile: direct link, desktop: QR popover */}
            <a
              href={APP_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={mobileOnly}
            >
              <Button>{dict.download}</Button>
            </a>
            <div className={desktopOnly}>
              <HoverPopover
                content={<DownloadQRCode playSignal={qrPlaySignal} />}
                onHoverChange={(hovered) => {
                  if (hovered) setQrPlaySignal((n) => n + 1);
                }}
              >
                <Button>{dict.download}</Button>
              </HoverPopover>
            </div>

            {/* Hamburger — mobile only */}
            <button
              className={`${mobileOnly} flex size-8 flex-col items-center justify-center gap-1 pr-2`}
              onClick={() => setOpen((v) => !v)}
              aria-label={expanded ? dict.closeMenu : dict.openMenu}
              aria-expanded={expanded}
            >
              <span
                className="block h-0.5 w-5 origin-center rounded-full bg-ink transition-all duration-300"
                style={
                  open
                    ? { transform: "translateY(6px) rotate(45deg)" }
                    : undefined
                }
              />
              <span
                className="block h-0.5 w-5 rounded-full bg-ink transition-all duration-300"
                style={
                  open ? { opacity: 0, transform: "scaleX(0)" } : undefined
                }
              />
              <span
                className="block h-0.5 w-5 origin-center rounded-full bg-ink transition-all duration-300"
                style={
                  open
                    ? { transform: "translateY(-6px) rotate(-45deg)" }
                    : undefined
                }
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isDesktop === null ? "md:hidden" : ""
          }`}
          style={{ maxHeight: expanded ? "360px" : "0px" }}
          aria-hidden={!expanded}
          inert={!expanded}
        >
          <div
            className="transition-all duration-300 ease-in-out"
            style={{
              opacity: expanded ? 1 : 0,
              transform: expanded ? "translateY(0)" : "translateY(-8px)",
            }}
          >
            <div className="mt-2 flex flex-col gap-1 rounded-2xl bg-nav-bg/90 px-4 py-2 backdrop-blur-sm">
              {NAV_LINKS.map(({ href, dictKey }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    scrollToHash(href);
                  }}
                  className={`${LINK_CLASS} border-b border-border py-3`}
                >
                  {dict[dictKey]}
                </a>
              ))}
              <a
                href="https://ai.ideaflow.pro/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`${LINK_CLASS} py-3`}
              >
                {dict.login}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

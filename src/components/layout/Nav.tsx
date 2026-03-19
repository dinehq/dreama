"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogoIcon } from "@/components/icons";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "#features", label: "创作者" },
  { href: "#about",    label: "关于我们" },
  { href: "#join",     label: "加入我们" },
] as const;

const LINK_CLASS = "text-[15px] text-ink hover:text-brand transition-colors";
const SCROLL_OFFSET = 120;

function scrollToHash(href: string) {
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
      scrolled ? "bg-nav-bg/90 backdrop-blur-sm border-border" : "bg-transparent border-transparent"
    }`}>
      <div className="max-w-[1440px] mx-auto page-gutter h-14 flex items-center justify-between gap-4">

        {/* Left — logo */}
        <Link href="/" className="shrink-0 min-w-0">
          <LogoIcon variant="full" className="h-9 w-auto" priority />
        </Link>

        {/* Center — nav links (hidden below md) */}
        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className={LINK_CLASS}
              onClick={(e) => { e.preventDefault(); scrollToHash(href); }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right — CTA + hamburger */}
        <div className="flex items-center gap-4 md:gap-6 shrink-0">
          <a href="#" className={`hidden md:block ${LINK_CLASS}`}>
            创作者登录
          </a>
          <Button>下载App</Button>

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "关闭菜单" : "打开菜单"}
            aria-expanded={open}
          >
            <span
              className="block w-5 h-[1.5px] bg-ink rounded-full transition-all duration-300 origin-center"
              style={open ? { transform: "translateY(6.5px) rotate(45deg)" } : undefined}
            />
            <span
              className="block w-5 h-[1.5px] bg-ink rounded-full transition-all duration-300"
              style={open ? { opacity: 0, transform: "scaleX(0)" } : undefined}
            />
            <span
              className="block w-5 h-[1.5px] bg-ink rounded-full transition-all duration-300 origin-center"
              style={open ? { transform: "translateY(-6.5px) rotate(-45deg)" } : undefined}
            />
          </button>
        </div>

      </div>

      {/* Mobile dropdown */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "300px" : "0px" }}
      >
        <div
          className="transition-all duration-300 ease-in-out"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(-8px)",
          }}
        >
          <div className="px-4 py-2 flex flex-col gap-1 border-t border-border">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); setOpen(false); scrollToHash(href); }}
                className={`${LINK_CLASS} py-3 border-b border-border`}
              >
                {label}
              </a>
            ))}
            <a
              href="#"
              onClick={() => setOpen(false)}
              className={`${LINK_CLASS} py-3`}
            >
              创作者登录
            </a>
          </div>
        </div>
      </div>

    </nav>
  );
}

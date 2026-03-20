"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogoIcon } from "@/components/icons";
import Image from "next/image";
import Button from "@/components/ui/Button";
import HoverPopover from "@/components/ui/HoverPopover";
import qrCode from "@public/download-app-qr.png";

const NAV_LINKS = [
  { href: "#features", label: "创作者" },
  { href: "#about",    label: "关于我们" },
  { href: "#join",     label: "加入我们" },
] as const;

const LINK_CLASS = "text-sm text-ink hover:text-brand transition-colors";
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
    <nav className={`
      fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300
      ${
      scrolled || open ? "border-border bg-nav-bg/90 backdrop-blur-sm" : `
        border-transparent bg-transparent
      `
    }
    `}>
      <div className="
        mx-auto flex h-14 max-w-360 items-center justify-between gap-4
        page-gutter
      ">

        {/* Left — logo */}
        <Link href="/" className="min-w-0 shrink-0">
          <LogoIcon variant="full" className="h-9 w-auto" priority />
        </Link>

        {/* Center — nav links (hidden below md) */}
        <div className="
          hidden items-center gap-9
          md:flex
        ">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className={LINK_CLASS}
              onClick={(e) => { e.preventDefault(); scrollToHash(href); }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right — CTA + hamburger */}
        <div className="
          flex shrink-0 items-center gap-4
          md:gap-6
        ">
          <a href="https://ai.ideaflow.pro/" className={`
            hidden
            md:block
            ${LINK_CLASS}
          `}>
            创作者登录
          </a>
          <HoverPopover
            content={
              <Image src={qrCode} alt="下载App二维码" width={144} height={144} className="
                max-w-none rounded-lg
              " />
            }
          >
            <Button>下载App</Button>
          </HoverPopover>

          {/* Hamburger button — mobile only */}
          <button
            className="
              flex size-8 flex-col items-center justify-center gap-1
              md:hidden
            "
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "关闭菜单" : "打开菜单"}
            aria-expanded={open}
          >
            <span
              className="
                block h-[1.5px] w-5 origin-center rounded-full bg-ink
                transition-all duration-300
              "
              style={open ? { transform: "translateY(5.5px) rotate(45deg)" } : undefined}
            />
            <span
              className="
                block h-[1.5px] w-5 rounded-full bg-ink transition-all
                duration-300
              "
              style={open ? { opacity: 0, transform: "scaleX(0)" } : undefined}
            />
            <span
              className="
                block h-[1.5px] w-5 origin-center rounded-full bg-ink
                transition-all duration-300
              "
              style={open ? { transform: "translateY(-5.5px) rotate(-45deg)" } : undefined}
            />
          </button>
        </div>

      </div>

      {/* Mobile dropdown */}
      <div
        className="
          overflow-hidden transition-all duration-300 ease-in-out
          md:hidden
        "
        style={{ maxHeight: open ? "300px" : "0px" }}
      >
        <div
          className="transition-all duration-300 ease-in-out"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(-8px)",
          }}
        >
          <div className="flex flex-col gap-1 border-t border-border px-4 py-2">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); setOpen(false); scrollToHash(href); }}
                className={`
                  ${LINK_CLASS}
                  border-b border-border py-3
                `}
              >
                {label}
              </a>
            ))}
            <a
              href="https://ai.ideaflow.pro/"
              onClick={() => setOpen(false)}
              className={`
                ${LINK_CLASS}
                py-3
              `}
            >
              创作者登录
            </a>
          </div>
        </div>
      </div>

    </nav>
  );
}

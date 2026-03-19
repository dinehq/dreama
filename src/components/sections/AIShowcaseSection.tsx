"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import carousel1 from "@public/primary-carousel/1.jpg";
import carousel2 from "@public/primary-carousel/2.jpg";
import carousel3 from "@public/primary-carousel/3.jpg";

const ITEMS = [
  {
    title: "先进AI模型",
    description: "集成最前沿的生成式AI技术，从文本到图像，从角色到世界",
    src: carousel1,
  },
  {
    title: "强大创作工具",
    description: "直观的创作界面，让复杂的AI能力触手可及",
    src: carousel2,
  },
  {
    title: "用户体验",
    description: "技术持续迭代升级，创作能力无限延展",
    src: carousel3,
  },
] as const;

const DURATION_MS = 4000;

/**
 * AI showcase section — "AI 让这一切发生"
 *
 * Structure:
 *  ┌──────────────────────────────────────┐
 *  │  section heading                     │
 *  ├──────────────────────────────────────┤
 *  │  large media area (changes on tab)   │
 *  ├──────────────────────────────────────┤
 *  │  [tab 1 ▓▓▓░░] [tab 2] [tab 3]      │  ← auto-play with progress fill
 *  └──────────────────────────────────────┘
 *
 * Clicking a tab immediately activates it and restarts the timer.
 * After DURATION_MS the carousel advances automatically.
 *
 * TODO: replace placeholder <div> in media area with <Image> / <video> per tab.
 */
const FADE_MS = 300; // must match transition-opacity duration below

export default function AIShowcaseSection() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0); // 0–100
  const [prevActive, setPrevActive] = useState<number | null>(null);
  const [exitWidth, setExitWidth] = useState(0); // frozen width of the outgoing bar
  const rafRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Start fade-out for `outgoing` tab, frozen at `width`. */
  const beginFadeOut = (outgoing: number, width: number) => {
    setExitWidth(width);
    setPrevActive(outgoing);
    if (fadeTimerRef.current !== null) clearTimeout(fadeTimerRef.current);
    fadeTimerRef.current = setTimeout(() => setPrevActive(null), FADE_MS);
  };

  useEffect(() => {
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const pct = Math.min(((now - startTime) / DURATION_MS) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        beginFadeOut(active, 100);
        setProgress(0);
        setActive((prev) => (prev + 1) % ITEMS.length);
      }
    };

    rafRef.current = requestAnimationFrame(() => {
      setProgress(0);
      rafRef.current = requestAnimationFrame(tick);
    });

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [active]);

  const handleSelect = (idx: number) => {
    if (idx === active) return;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    beginFadeOut(active, progress);
    setProgress(0);
    setActive(idx);
  };

  return (
    <section className="pt-20 page-gutter pb-20">
      <div className="max-w-[1280px] mx-auto">

        {/* Heading */}
        <FadeIn>
          <h2 className="text-[40px] font-bold text-ink text-center mb-10">
            AI 让这一切发生
          </h2>
        </FadeIn>

        {/* Media area */}
        <FadeIn delay={100}>
        <div className="relative w-full h-[648px] rounded-[48px] overflow-hidden">
          {ITEMS.map((item, idx) => (
            <Image
              key={item.title}
              src={item.src}
              alt={item.title}
              fill
              className={`object-cover transition-opacity duration-500 ${idx === active ? "opacity-100" : "opacity-0"}`}
              priority={idx === 0}
              placeholder="blur"
            />
          ))}
        </div>
        </FadeIn>

        {/* Tab bar */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          {ITEMS.map((item, idx) => {
            const isActive = idx === active;
            return (
              <FadeIn key={item.title} delay={200 + idx * 100} className="flex-1">
              <button
                onClick={() => handleSelect(idx)}
                className={`relative w-full text-left px-4 py-4 rounded-card overflow-hidden transition-colors cursor-pointer ${
                  isActive ? "bg-brand-light" : "bg-surface-alt hover:bg-surface"
                }`}
              >
                {/* Progress fill — grows left→right behind text */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 bg-brand rounded-card transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
                  style={{
                    width: `${isActive ? progress : idx === prevActive ? exitWidth : 0}%`,
                  }}
                />

                {/* Text — always above the fill */}
                <span className="relative z-10 flex flex-col">
                  <span className="text-sm font-bold text-ink">{item.title}</span>
                  <span className="mt-1 text-sm text-ink/70 leading-5">
                    {item.description}
                  </span>
                </span>
              </button>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import FadeInGroup from "@/components/ui/FadeInGroup";
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
 *  │  [tab 1 ▓▓▓░░] [tab 2] [tab 3]       │  ← auto-play with progress fill
 *  └──────────────────────────────────────┘
 *
 * Clicking a tab immediately activates it and restarts the timer.
 * After DURATION_MS the carousel advances automatically.
 *
 * Progress bar width is written directly to the DOM via refs to avoid
 * 60 React re-renders/second during the RAF animation loop.
 */
export default function AIShowcaseSection() {
  const [active, setActive] = useState(0);

  const rafRef = useRef<number | null>(null);
  // Tracks current progress (0–100) without triggering re-renders.
  const progressRef = useRef(0);
  // Direct refs to each tab's progress bar span.
  // Width is managed entirely via these refs so React never overwrites a
  // frozen outgoing bar — the CSS transition-opacity handles the fade-out.
  const progressBarRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const pct = Math.min(((now - startTime) / DURATION_MS) * 100, 100);
      progressRef.current = pct;
      const bar = progressBarRefs.current[active];
      if (bar) bar.style.width = `${pct}%`;

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        progressRef.current = 0;
        setActive((prev) => (prev + 1) % ITEMS.length);
      }
    };

    // One frame to let the bar reset to 0 before animating.
    rafRef.current = requestAnimationFrame(() => {
      progressRef.current = 0;
      const bar = progressBarRefs.current[active];
      if (bar) bar.style.width = "0%";
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
    progressRef.current = 0;
    setActive(idx);
  };

  return (
    <section className="
      py-10 page-gutter
      md:py-20
    ">
      <FadeInGroup className="mx-auto max-w-7xl">

        {/* Heading */}
        <FadeIn>
          <h2 className="
            mb-10 text-center text-3xl font-bold text-ink
            md:text-5xl
          ">
            AI 让这一切发生
          </h2>
        </FadeIn>

        {/* Media area */}
        <FadeIn delay={100}>
        <div className="
          relative h-[260px] w-full overflow-hidden rounded-3xl
          md:h-[648px]
        ">
          {ITEMS.map((item, idx) => (
            <Image
              key={item.title}
              src={item.src}
              alt={item.title}
              fill
              className={`
                object-cover transition-opacity duration-500
                ${idx === active ? `opacity-100` : `opacity-0`}
              `}
              priority={idx === 0}
              placeholder="blur"
            />
          ))}
        </div>
        </FadeIn>

        {/* Tab bar */}
        <div className="
          mt-8 flex flex-col gap-4
          md:flex-row
        ">
          {ITEMS.map((item, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={item.title}
                onClick={() => handleSelect(idx)}
                className={`
                  relative w-full flex-1 cursor-pointer overflow-hidden
                  rounded-3xl p-4 text-left transition-colors
                  ${
                  isActive ? "bg-brand-mint" : `
                    bg-surface-alt
                    hover:bg-surface
                  `
                }
                `}
              >
                {/* Progress fill — width written directly by RAF for the active tab */}
                <span
                  ref={(el) => { progressBarRefs.current[idx] = el; }}
                  aria-hidden="true"
                  className={`
                    absolute inset-y-0 left-0 rounded-none bg-brand-vivid
                    transition-opacity duration-300
                    ${isActive ? `opacity-100` : `opacity-0`}
                  `}
                />

                {/* Text — always above the fill */}
                <span className="relative z-10 flex flex-col">
                  <span className="text-base font-bold text-ink">{item.title}</span>
                  <span className="mt-1 text-sm/5 text-ink/70">
                    {item.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

      </FadeInGroup>
    </section>
  );
}

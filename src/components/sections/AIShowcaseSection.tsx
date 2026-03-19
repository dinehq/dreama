"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const ITEMS = [
  {
    title: "先进AI模型",
    description: "集成最前沿的生成式AI技术，从文本到图像，从角色到世界",
    src: "/primary-carousel/1.jpg",
  },
  {
    title: "强大创作工具",
    description: "直观的创作界面，让复杂的AI能力触手可及",
    src: "/primary-carousel/2.jpg",
  },
  {
    title: "用户体验",
    description: "技术持续迭代升级，创作能力无限延展",
    src: "/primary-carousel/3.jpg",
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
export default function AIShowcaseSection() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0); // 0–100
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const pct = Math.min(((now - startTime) / DURATION_MS) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Batch progress reset with tab switch so the new active tab
        // never renders with the old progress value (avoids twitch).
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
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    // Reset progress in the same batch as the active change so the newly
    // selected tab never inherits the previous tab's progress value.
    setProgress(0);
    setActive(idx);
  };

  return (
    <section className="pt-20 px-5 lg:px-20 pb-20">
      <div className="max-w-[1280px] mx-auto">

        {/* Heading */}
        <h2 className="text-[40px] font-bold text-ink text-center mb-10">
          AI 让这一切发生
        </h2>

        {/* Media area */}
        <div className="relative w-full h-[648px] rounded-[48px] overflow-hidden">
          {ITEMS.map((item, idx) => (
            <Image
              key={item.src}
              src={item.src}
              alt={item.title}
              fill
              className={`object-cover transition-opacity duration-500 ${idx === active ? "opacity-100" : "opacity-0"}`}
              priority={idx === 0}
            />
          ))}
        </div>

        {/* Tab bar */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          {ITEMS.map((item, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={item.title}
                onClick={() => handleSelect(idx)}
                className={`relative flex-1 text-left px-4 py-4 rounded-card overflow-hidden transition-colors cursor-pointer ${
                  isActive ? "bg-brand-light" : "bg-surface-alt hover:bg-surface"
                }`}
              >
                {/* Progress fill — grows left→right behind text */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 bg-brand rounded-card"
                    style={{ width: `${progress}%` }}
                  />
                )}

                {/* Text — always above the fill */}
                <span className="relative z-10 flex flex-col">
                  <span className="text-sm font-bold text-ink">{item.title}</span>
                  <span className="mt-1 text-sm text-ink/70 leading-5">
                    {item.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

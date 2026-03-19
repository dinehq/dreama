"use client";

import { useState, useEffect, useRef } from "react";
import ChevronLeftIcon from "@/components/icons/chevron-left.svg";
import ChevronRightIcon from "@/components/icons/chevron-right.svg";

const ITEMS = [
  {
    quote:
      "Dreama 让我的角色真正活了起来。观众不再只是旁观者，他们可以参与到故事中，这种体验是前所未有的。",
    author: "张明轩",
    role: "独立创作者",
  },
  {
    quote:
      "在造梦次元，我的故事不再只是我的故事。玩家带着自己的创意延续了我的世界，这才是真正的共创。",
    author: "李晓雯",
    role: "漫画作者",
  },
  {
    quote:
      "以前变现是最头疼的问题，现在内容本身就是产品。造梦次元让我第一次感受到创作可以养活自己。",
    author: "陈建国",
    role: "独立游戏开发者",
  },
] as const;

const DURATION_MS = 5000;
const FADE_MS = 200;

export default function TestimonialSection() {
  const [active, setActive] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);

  // Ref so timer callbacks always read the latest index without stale closures.
  const activeRef = useRef(0);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAll = () => {
    if (autoRef.current) clearTimeout(autoRef.current);
    if (fadeRef.current) clearTimeout(fadeRef.current);
  };

  const scheduleAutoPlay = () => {
    autoRef.current = setTimeout(() => {
      goTo((activeRef.current + 1) % ITEMS.length);
    }, DURATION_MS);
  };

  // Fade out quote/author, swap content, fade back in, then restart auto-play.
  const goTo = (idx: number) => {
    clearAll();
    setContentVisible(false);
    fadeRef.current = setTimeout(() => {
      activeRef.current = idx;
      setActive(idx);
      setContentVisible(true);
      scheduleAutoPlay();
    }, FADE_MS);
  };

  useEffect(() => {
    scheduleAutoPlay();
    return clearAll;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const item = ITEMS[active];

  return (
    <section className="py-20 px-5 lg:px-20">
      <div className="max-w-[891px] mx-auto">

        {/* Image placeholder — three-circle blob */}
        <div className="relative w-full" style={{ paddingBottom: "51.17%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/94665f4b75119d043b5469bb6a6a0e889689d6aa.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full"
          />
          {/* TODO: replace with three overlapping user portrait <Image> components */}
        </div>

        {/* ── Fading area: only quote + author animate on slide change ── */}
        <div
          className="mt-16 px-4 md:px-[6%] transition-opacity duration-200"
          style={{ opacity: contentVisible ? 1 : 0 }}
        >
          <blockquote className="text-2xl font-bold text-ink leading-relaxed">
            &ldquo;{item.quote}&rdquo;
          </blockquote>
          <p className="mt-10 text-base text-ink/80">
            {item.author}，{item.role}
          </p>
        </div>

        {/* ── Stable area: buttons and counter never fade ── */}
        <div className="mt-6 px-4 md:px-[6%] flex justify-end items-center gap-3">
          <button
            onClick={() => goTo((activeRef.current - 1 + ITEMS.length) % ITEMS.length)}
            aria-label="上一条"
            className="w-9 h-9 rounded-full bg-black/6 flex items-center justify-center text-ink hover:bg-black/10 transition-colors cursor-pointer"
          >
            <ChevronLeftIcon width={36} height={36} />
          </button>
          <button
            onClick={() => goTo((activeRef.current + 1) % ITEMS.length)}
            aria-label="下一条"
            className="w-9 h-9 rounded-full bg-black/6 flex items-center justify-center text-ink hover:bg-black/10 transition-colors cursor-pointer"
          >
            <ChevronRightIcon width={36} height={36} />
          </button>

          <span className="block h-px w-12 bg-ink/40" aria-hidden="true" />

          <span className="text-sm text-ink/60">
            {String(active + 1).padStart(2, "0")}/{String(ITEMS.length).padStart(2, "0")}
          </span>
        </div>

      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import ChevronLeftIcon from "@/components/icons/chevron-left.svg";
import ChevronRightIcon from "@/components/icons/chevron-right.svg";
import FadeIn from "@/components/ui/FadeIn";

const BLOB_PATH =
  "M724.1 0C816.386 0 891.2 74.813 891.2 167.1V288.9C891.2 381.187 816.386 456 724.1 456C671.157 456 623.968 431.378 593.352 392.961C589.076 387.596 580.623 387.595 576.347 392.961C545.731 431.378 498.542 456 445.6 456C392.657 456 345.468 431.378 314.852 392.961C310.576 387.596 302.123 387.595 297.847 392.961C267.231 431.378 220.042 456 167.1 456C74.8131 456 0.00023831 381.187 0 288.9V167.1C0.000230964 74.8131 74.8131 0.000214411 167.1 0C220.042 0 267.231 24.622 297.847 63.0384C302.123 68.4037 310.576 68.4036 314.852 63.0383C345.468 24.6219 392.658 0.000123001 445.6 0C498.542 0 545.731 24.622 576.347 63.0384C580.623 68.4037 589.076 68.4036 593.352 63.0383C623.968 24.6219 671.158 0.000123001 724.1 0Z";

const ITEMS = [
  {
    quote:
      "Dreama 让我的角色真正活了起来。观众不再只是旁观者，他们可以参与到故事中，这种体验是前所未有的。",
    author: "张明轩",
    role: "独立创作者",
    avatar: "/creators/1.png",
    color: "#06C755",
  },
  {
    quote:
      "在造梦次元，我的故事不再只是我的故事。玩家带着自己的创意延续了我的世界，这才是真正的共创。",
    author: "李晓雯",
    role: "漫画作者",
    avatar: "/creators/2.png",
    color: "#45C7FF",
  },
  {
    quote:
      "以前变现是最头疼的问题，现在内容本身就是产品。造梦次元让我第一次感受到创作可以养活自己。",
    author: "陈建国",
    role: "独立游戏开发者",
    avatar: "/creators/3.png",
    color: "#FFE23C",
  },
] as const;

const DURATION_MS = 5000;
const FADE_MS = 200;
const PARALLAX_STRENGTH = 6; // max SVG-unit offset
const LERP_FACTOR = 0.1;      // smoothing — lower = lazier

export default function TestimonialSection() {
  const [active, setActive] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);

  // Ref so timer callbacks always read the latest index without stale closures.
  const activeRef = useRef(0);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Parallax — no state, pure RAF + direct DOM mutation.
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const rafRef = useRef<number | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      mouse.current.x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      mouse.current.y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    };
    const onLeave = () => { mouse.current.x = 0; mouse.current.y = 0; };

    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * LERP_FACTOR;
      pos.current.y += (mouse.current.y - pos.current.y) * LERP_FACTOR;
      imageRef.current?.setAttribute(
        "transform",
        `translate(${-pos.current.x * PARALLAX_STRENGTH}, ${-pos.current.y * PARALLAX_STRENGTH})`
      );
      rafRef.current = requestAnimationFrame(tick);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
    <section ref={sectionRef} className="py-20 px-5 lg:px-20">
      <FadeIn className="max-w-[891px] mx-auto">

        {/* Wrapper pt gives space for the person's head to overflow above the blob */}
        <div className="pt-24">
          <svg
            viewBox="0 0 892 456"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            style={{ overflow: "visible" }}
            aria-hidden="true"
          >
            <defs>
              <clipPath id="blob-clip">
                {/* Oversized rect so parallax shifts never expose an edge */}
                <rect x="-50" y="-300" width="992" height="528" />
                {/* Bottom half clips to the blob boundary */}
                <path d={BLOB_PATH} />
              </clipPath>
            </defs>
            {/* Green blob background */}
            <path
              d={BLOB_PATH}
              fill={item.color}
              style={{ transition: "fill 0.4s ease" }}
            />
            {/* Clip is on the static <g>; only the image inside moves with parallax */}
            <g clipPath="url(#blob-clip)">
              <image
                ref={imageRef}
                href={item.avatar}
                x={-14}
                y={-110}
                width={924}
                height={584}
                preserveAspectRatio="xMidYMid slice"
                style={{
                  opacity: contentVisible ? 1 : 0,
                  transition: `opacity ${FADE_MS}ms`,
                }}
              />
            </g>
          </svg>
        </div>

        {/* ── Fading area: only quote + author animate on slide change ── */}
        <div
          className="mt-16 px-4 md:px-[6%] transition-opacity duration-200"
          style={{ opacity: contentVisible ? 1 : 0 }}
        >
          <blockquote className="text-2xl font-bold text-ink leading-relaxed">
            &ldquo;{item.quote}&rdquo;
          </blockquote>
        </div>

        {/* ── Stable area: buttons and counter never fade ── */}
        <div className="mt-10 px-4 md:px-[6%] flex justify-between items-center">
          <p
            className="text-base text-ink/80 transition-opacity duration-200"
            style={{ opacity: contentVisible ? 1 : 0 }}
          >
            {item.author}，{item.role}
          </p>
          <div className="flex items-center gap-3">
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
            <span className="text-sm text-ink/60 tabular-nums">
              {String(active + 1).padStart(2, "0")}/{String(ITEMS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

      </FadeIn>
    </section>
  );
}

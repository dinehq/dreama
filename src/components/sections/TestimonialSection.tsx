"use client";

import { useState, useEffect, useRef } from "react";
import ChevronLeftIcon from "@/components/icons/chevron-left.svg";
import ChevronRightIcon from "@/components/icons/chevron-right.svg";
import FadeIn from "@/components/ui/FadeIn";
import { useParallaxMouse } from "@/hooks/useParallaxMouse";
import creator1 from "@/assets/creators/1.webp";
import creator2 from "@/assets/creators/2.webp";
import creator3 from "@/assets/creators/3.webp";
import type { Dict } from "@/i18n/zh";

const BLOB_PATH =
  "M724.1 0C816.386 0 891.2 74.813 891.2 167.1V288.9C891.2 381.187 816.386 456 724.1 456C671.157 456 623.968 431.378 593.352 392.961C589.076 387.596 580.623 387.595 576.347 392.961C545.731 431.378 498.542 456 445.6 456C392.657 456 345.468 431.378 314.852 392.961C310.576 387.596 302.123 387.595 297.847 392.961C267.231 431.378 220.042 456 167.1 456C74.8131 456 0.00023831 381.187 0 288.9V167.1C0.000230964 74.8131 74.8131 0.000214411 167.1 0C220.042 0 267.231 24.622 297.847 63.0384C302.123 68.4037 310.576 68.4036 314.852 63.0383C345.468 24.6219 392.658 0.000123001 445.6 0C498.542 0 545.731 24.622 576.347 63.0384C580.623 68.4037 589.076 68.4036 593.352 63.0383C623.968 24.6219 671.158 0.000123001 724.1 0Z";

const ITEM_VISUALS = [
  { avatar: creator1.src, color: "var(--color-brand)" },
  { avatar: creator2.src, color: "var(--color-accent-blue)" },
  { avatar: creator3.src, color: "var(--color-accent-yellow)" },
] as const;

const DURATION_MS = 5000;
const EXIT_MS = 160; // exit transition duration
const PARALLAX_STRENGTH = 6; // max SVG-unit offset
const LERP_FACTOR = 0.1; // smoothing — lower = lazier

type SlidePhase = "enter" | "exit" | "pre-enter";

export default function TestimonialSection({
  dict,
}: {
  dict: Dict["testimonials"];
}) {
  const [active, setActive] = useState(0);
  const [blobColor, setBlobColor] = useState<string>(ITEM_VISUALS[0].color);
  const [phase, setPhase] = useState<SlidePhase>("enter");
  const [dir, setDir] = useState<1 | -1>(1); // 1 = forward, -1 = backward

  // Ref so timer callbacks always read the latest index without stale closures.
  const activeRef = useRef(0);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterRafRef = useRef<number | null>(null);

  // Parallax — no state, pure RAF + direct DOM mutation.
  const imageRef = useRef<SVGImageElement>(null);
  const sectionRef = useParallaxMouse(LERP_FACTOR, (x, y) => {
    imageRef.current?.setAttribute(
      "transform",
      `translate(${-x * PARALLAX_STRENGTH}, ${-y * PARALLAX_STRENGTH})`,
    );
  });

  const clearAll = () => {
    if (autoRef.current) clearTimeout(autoRef.current);
    if (fadeRef.current) clearTimeout(fadeRef.current);
    if (enterRafRef.current) cancelAnimationFrame(enterRafRef.current);
  };

  const scheduleAutoPlay = () => {
    autoRef.current = setTimeout(() => {
      goTo((activeRef.current + 1) % ITEM_VISUALS.length, 1);
    }, DURATION_MS);
  };

  /**
   * Three-phase directional transition:
   *  1. exit   — content slides out in `dir` direction + fades (EXIT_MS)
   *  2. pre-enter — instantly reposition to opposite side (no transition)
   *  3. enter  — content slides to rest + fades in (expo-out curve)
   */
  const goTo = (idx: number, dir: 1 | -1) => {
    clearAll();
    setDir(dir);
    setBlobColor(ITEM_VISUALS[idx].color); // update blob color immediately
    setPhase("exit");
    fadeRef.current = setTimeout(() => {
      activeRef.current = idx;
      setActive(idx);
      setPhase("pre-enter");
      // One frame later: start enter animation so the pre-enter position commits first.
      enterRafRef.current = requestAnimationFrame(() => {
        setPhase("enter");
        scheduleAutoPlay();
      });
    }, EXIT_MS);
  };

  useEffect(() => {
    scheduleAutoPlay();
    return clearAll;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const visual = ITEM_VISUALS[active];
  const item = dict.items[active];

  const exitX = dir > 0 ? -16 : 16; // exit slides in direction of travel
  const enterX = dir > 0 ? 16 : -16; // enter arrives from the opposite side
  const slideStyle = (delay = 0): React.CSSProperties =>
    phase === "exit"
      ? {
          opacity: 0,
          transform: `translateX(${exitX}px)`,
          transition: `opacity ${EXIT_MS}ms ease, transform ${EXIT_MS}ms ease`,
        }
      : phase === "pre-enter"
        ? {
            opacity: 0,
            transform: `translateX(${enterX}px)`,
            transition: "none",
          }
        : {
            opacity: 1,
            transform: "translateX(0)",
            transition: `opacity 520ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 520ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
          };

  const imageSlideStyle: React.CSSProperties =
    phase === "exit"
      ? {
          transform: `translateX(${exitX}px)`,
          transition: `transform ${EXIT_MS}ms ease`,
        }
      : phase === "pre-enter"
        ? { transform: `translateX(${enterX}px)`, transition: "none" }
        : {
            transform: "translateX(0)",
            transition: `transform 520ms cubic-bezier(0.22,1,0.36,1) 60ms`,
          };

  return (
    <section ref={sectionRef} className="page-gutter">
      <FadeIn className="mx-auto max-w-222">
        {/* Wrapper pt gives space for the person's head to overflow above the blob */}
        <div className="pt-12 md:pt-24">
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
              style={{ fill: blobColor, transition: "fill 0.3s linear" }}
            />
            {/* Clip is on the static <g>; only the image inside moves with parallax */}
            <g clipPath="url(#blob-clip)">
              <g style={imageSlideStyle}>
                <image
                  ref={imageRef}
                  href={visual.avatar}
                  x={-14}
                  y={-110}
                  width={924}
                  height={584}
                  preserveAspectRatio="xMidYMid slice"
                  style={{
                    opacity: phase === "enter" ? 1 : 0,
                    transition:
                      phase === "enter"
                        ? `opacity 520ms cubic-bezier(0.22,1,0.36,1) 180ms`
                        : `opacity ${EXIT_MS}ms ease`,
                  }}
                />
              </g>
            </g>
          </svg>
        </div>

        {/* ── Animated area: quote + author slide on slide change ── */}
        {/* All quotes are rendered stacked in the same grid cell so the
            container always holds the height of the tallest quote,
            preventing layout shift during transitions. */}
        <div className="mt-16 px-4 md:px-[6%]">
          <div className="grid">
            {dict.items.map((it, i) => (
              <blockquote
                key={i}
                className="text-2xl/snug font-medium text-ink [grid-area:1/1] md:text-4xl"
                aria-hidden={i !== active}
                style={
                  i === active
                    ? slideStyle()
                    : { opacity: 0, pointerEvents: "none", userSelect: "none" }
                }
              >
                &ldquo;{it.quote}&rdquo;
              </blockquote>
            ))}
          </div>
        </div>

        {/* ── Stable area: buttons and counter never animate ── */}
        <div className="mt-10 flex flex-wrap items-center gap-3 px-4 md:px-[6%]">
          <p className="text-lg text-ink/80 md:text-2xl" style={slideStyle(80)}>
            {item.author}
            {dict.separator}
            {item.role}
          </p>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() =>
                goTo(
                  (activeRef.current - 1 + ITEM_VISUALS.length) %
                    ITEM_VISUALS.length,
                  -1,
                )
              }
              aria-label={dict.prev}
              className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-ink/8 text-ink transition-colors hover:bg-ink/12"
            >
              <ChevronLeftIcon width={36} height={36} />
            </button>
            <button
              onClick={() =>
                goTo((activeRef.current + 1) % ITEM_VISUALS.length, 1)
              }
              aria-label={dict.next}
              className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-ink/8 text-ink transition-colors hover:bg-ink/12"
            >
              <ChevronRightIcon width={36} height={36} />
            </button>
            <span
              className="relative block h-px w-6 overflow-hidden bg-ink/10 md:w-12"
              aria-hidden="true"
            >
              <span
                key={active}
                className="absolute inset-y-0 left-0 w-full origin-left bg-ink/40"
                style={{
                  transform: phase === "enter" ? "scaleX(1)" : "scaleX(0)",
                  transition:
                    phase === "enter"
                      ? `transform ${DURATION_MS}ms linear`
                      : "none",
                }}
              />
            </span>
            <span className="text-base text-ink/60 tabular-nums">
              {String(active + 1).padStart(2, "0")}/
              {String(ITEM_VISUALS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

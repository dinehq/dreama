/**
 * Hero section — full-width, 810 px tall.
 * The fixed Nav (56 px) overlays the top; title is positioned at y≈153 px
 * matching the Figma layout.
 */
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import heroBg from "@public/hero.png";

const TILT_STRENGTH = 8;
const LERP = 0.12;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const startRAF = () => {
      if (rafRef.current) return;
      const tick = () => {
        const dx = mouse.current.x - pos.current.x;
        const dy = mouse.current.y - pos.current.y;
        pos.current.x += dx * LERP;
        pos.current.y += dy * LERP;
        if (cloudRef.current) {
          const rx = pos.current.y * -TILT_STRENGTH;
          const ry = pos.current.x * TILT_STRENGTH;
          cloudRef.current.style.transform =
            `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translate(${ry * 0.8}px, ${rx * -0.8}px)`;
        }
        if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
          rafRef.current = null;
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      mouse.current.x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      mouse.current.y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      startRAF();
    };
    const onLeave = () => {
      mouse.current.x = 0;
      mouse.current.y = 0;
      startRAF();
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[810px] overflow-hidden"
    >
      <Image src={heroBg} alt="" fill className="object-cover" priority placeholder="blur" />

      <div className="absolute left-1/2 -translate-x-1/2 top-[153px] flex flex-col items-center gap-10">
        <h1 className="text-[40px] font-bold text-ink text-center whitespace-nowrap">
          让想像发生
        </h1>

        <div className="animate-float">
          <div ref={cloudRef} style={{ willChange: "transform" }}>
            <Image src="/hero-cloud.svg" alt="" width={321} height={241} />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Hero section — full-width, 810 px tall.
 * The fixed Nav (56 px) overlays the top; title is positioned at y≈153 px
 * matching the Figma layout.
 */
"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import heroBg from "@public/hero.png";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[810px] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image src={heroBg} alt="" fill className="object-cover" priority placeholder="blur" />

      <div className="absolute left-1/2 -translate-x-1/2 top-[153px] flex flex-col items-center gap-10">
        <h1 className="text-[40px] font-bold text-ink text-center whitespace-nowrap">
          让想像发生
        </h1>

        <div className="animate-float">
          <div
            style={{
              transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translate(${tilt.y * 0.8}px, ${tilt.x * -0.8}px)`,
              transition: "transform 0.15s ease-out",
              willChange: "transform",
            }}
          >
            <Image src="/hero-cloud.svg" alt="" width={321} height={241} />
          </div>
        </div>
      </div>
    </section>
  );
}

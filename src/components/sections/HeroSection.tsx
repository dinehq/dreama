/**
 * Hero section — full-width, 810 px tall.
 * The fixed Nav (56 px) overlays the top; title is positioned at y≈153 px
 * matching the Figma layout.
 */
"use client";

import Image from "next/image";
import { useRef } from "react";
import heroBg from "@public/hero.png";
import { useParallaxMouse } from "@/hooks/useParallaxMouse";
import MarkerHighlight from "@/components/ui/MarkerHighlight";
const TILT_STRENGTH = 8;
const LERP = 0.12;

export default function HeroSection({ dict }: { dict: { tagline: string } }) {
  const cloudRef = useRef<HTMLDivElement>(null);
  const sectionRef = useParallaxMouse(LERP, (x, y) => {
    if (!cloudRef.current) return;
    const rx = y * -TILT_STRENGTH;
    const ry = x * TILT_STRENGTH;
    cloudRef.current.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translate(${ry * 0.8}px, ${rx * -0.8}px)`;
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-[90vh] min-h-170 w-full overflow-hidden"
    >
      <Image
        src={heroBg}
        alt=""
        fill
        className="object-cover"
        priority
        placeholder="blur"
      />

      {/* Title: bottom edge sits above the cloud top (cloud center = 50%) */}
      <h1 className="absolute bottom-[calc(50%+161px)] left-1/2 -translate-x-1/2 text-center text-5xl font-bold whitespace-nowrap text-ink sm:text-6xl md:text-7xl">
        <MarkerHighlight variant={1}>{dict.tagline}</MarkerHighlight>
      </h1>

      {/* Cloud: vertically and horizontally centered */}
      <div className="animate-float absolute top-1/2 left-1/2 -translate-1/2">
        <div ref={cloudRef} style={{ willChange: "transform" }}>
          <Image
            src="/hero-cloud.svg"
            alt=""
            width={321}
            height={241}
            priority
          />
        </div>
      </div>
    </section>
  );
}

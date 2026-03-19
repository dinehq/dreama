"use client";

import { useEffect, useRef, useState } from "react";
import { useFadeInGroup } from "./FadeInGroup";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const groupVisible = useFadeInGroup();
  const ref = useRef<HTMLDivElement>(null);
  const [selfVisible, setSelfVisible] = useState(false);

  useEffect(() => {
    // When inside a FadeInGroup the group's observer handles the trigger.
    if (groupVisible) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSelfVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [groupVisible]);

  const visible = groupVisible || selfVisible;
  // Smooth expo-out deceleration — feels natural rather than mechanical.
  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ${easing} ${delay}ms, transform 0.75s ${easing} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

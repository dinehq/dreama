"use client";

import { useRef } from "react";
import { useFadeInGroup } from "./FadeInGroup";
import { useIntersectionOnce } from "./useIntersectionOnce";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// Smooth expo-out deceleration — feels natural rather than mechanical.
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const groupVisible = useFadeInGroup();
  const ref = useRef<HTMLDivElement>(null);
  // When inside a FadeInGroup the group's observer handles the trigger.
  const selfVisible = useIntersectionOnce(ref, groupVisible);

  const visible = groupVisible || selfVisible;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: `opacity 0.75s ${EASING} ${delay}ms, transform 0.75s ${EASING} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

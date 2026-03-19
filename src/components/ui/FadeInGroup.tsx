"use client";

import { createContext, useContext, useRef } from "react";
import { useIntersectionOnce } from "./useIntersectionOnce";

/** True once the nearest FadeInGroup's section has entered the viewport. */
export const FadeInGroupContext = createContext(false);

export function useFadeInGroup() {
  return useContext(FadeInGroupContext);
}

interface FadeInGroupProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrap a section's inner container with this to synchronise all child FadeIn
 * animations. The group fires as soon as any part of the container enters the
 * viewport — each FadeIn then plays at its own delay from that shared moment.
 */
export default function FadeInGroup({ children, className }: FadeInGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersectionOnce(ref);

  return (
    <FadeInGroupContext.Provider value={visible}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </FadeInGroupContext.Provider>
  );
}

import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Tracks mouse position relative to a container, lerps toward it each RAF
 * frame, then calls `onTick(x, y)` with the smoothed normalized position
 * (–1…1 on each axis). Stops the RAF loop once the position converges.
 *
 * Returns a ref to attach to the container element.
 */
export function useParallaxMouse(
  lerp: number,
  onTick: (x: number, y: number) => void
) {
  const sectionRef = useRef<HTMLElement>(null);
  // Keep onTick current without re-running the effect on every render.
  const onTickRef = useRef(onTick);
  useLayoutEffect(() => { onTickRef.current = onTick; });

  const mouse = useRef({ x: 0, y: 0 });
  const pos   = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const startRAF = () => {
      if (rafRef.current) return;
      const tick = () => {
        const dx = mouse.current.x - pos.current.x;
        const dy = mouse.current.y - pos.current.y;
        pos.current.x += dx * lerp;
        pos.current.y += dy * lerp;
        onTickRef.current(pos.current.x, pos.current.y);
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
      mouse.current.x = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
      mouse.current.y = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
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
  }, [lerp]);

  return sectionRef;
}

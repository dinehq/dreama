import { RefObject, useEffect, useState } from "react";

/**
 * Returns true once the element referenced by `ref` has entered the viewport.
 * The observer disconnects immediately after the first intersection.
 * Pass `disabled = true` to skip observation (e.g. when a parent group handles it).
 */
export function useIntersectionOnce<T extends Element>(
  ref: RefObject<T | null>,
  disabled = false
): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [disabled, ref]);

  return visible;
}

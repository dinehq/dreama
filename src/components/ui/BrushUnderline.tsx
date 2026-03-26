/**
 * Decorative brush underline beneath a heading.
 * A smooth, gentle arc — feels intentional, not random.
 *
 * Usage:
 *   <h2><BrushUnderline>AI Makes It All Possible</BrushUnderline></h2>
 */

const BRUSH_PATHS = [
  // Gentle single arc — slight rise in the middle
  "M4 12 Q62 4, 125 6 Q188 4, 246 12",
  // Subtle double-weight: a confident stroke with a thinner echo
  "M4 10 Q125 2, 246 10",
  // Flat with a soft dip — calm, minimal
  "M4 8 Q80 14, 125 10 Q170 6, 246 12",
] as const;

export default function BrushUnderline({
  children,
  variant = 0,
  className = "",
}: {
  children: React.ReactNode;
  /** Pick a brush shape (0–2). */
  variant?: 0 | 1 | 2;
  className?: string;
}) {
  return (
    <span className={`relative inline-block pb-[0.25em] ${className}`}>
      {children}
      <svg
        className="pointer-events-none absolute bottom-[0.15em] left-0 h-[0.22em] w-full overflow-visible"
        viewBox="0 0 250 16"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={BRUSH_PATHS[variant]}
          stroke="var(--color-brand)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />
      </svg>
    </span>
  );
}

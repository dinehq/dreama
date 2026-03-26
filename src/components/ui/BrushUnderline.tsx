/**
 * Decorative hand-drawn brush stroke that sits beneath a heading.
 * Wrap inline text in this component to get an organic underline effect.
 *
 * Usage:
 *   <h1>Let <BrushUnderline>Imagination</BrushUnderline> Happen</h1>
 *   <h2><BrushUnderline>AI Makes It All Possible</BrushUnderline></h2>
 */

const BRUSH_PATHS = [
  // Wavy horizontal stroke — organic, slightly off-center
  "M4 8 C12 4, 28 12, 44 7 S76 10, 96 8 S120 4, 140 9 S164 12, 180 7 S196 6, 210 9 S230 11, 246 8",
  // Thicker undulating underline
  "M2 10 Q30 4, 60 10 T120 8 T180 11 T248 7",
  // Quick confident brushstroke
  "M6 9 C40 5, 80 13, 120 7 S200 11, 244 8",
] as const;

export default function BrushUnderline({
  children,
  variant = 0,
  className = "",
}: {
  children: React.ReactNode;
  /** Pick a brush shape (0–2). Each gives a different hand-drawn feel. */
  variant?: 0 | 1 | 2;
  className?: string;
}) {
  return (
    <span className={`relative inline-block pb-[0.3em] ${className}`}>
      {children}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 h-[0.3em] w-full overflow-visible"
        viewBox="0 0 250 16"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={BRUSH_PATHS[variant]}
          stroke="var(--color-brand)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.45"
        />
      </svg>
    </span>
  );
}

/**
 * Decorative marker-pen highlight behind text.
 * Uses a 9-slice-like SVG trick: the left/right caps have fixed width
 * while the middle stretches, preserving the organic hand-drawn edges.
 *
 * Usage:
 *   <h3><MarkerHighlight>给每个人</MarkerHighlight></h3>
 */

const CAP = 20; // px width of each end cap in viewBox coords

// Left cap path (0–20), right cap path (230–250), middle fill (20–230)
const SHAPES = [
  {
    left: "M8 4 Q2 6, 4 12 Q6 16, 16 15 L20 15 L20 3 L14 4 Q6 4, 8 4 Z",
    right: "M230 13 L234 13 Q244 12, 244 8 Q244 3, 236 3 L230 3 Z",
    mid: "M20 3 L230 3 L230 15 L20 15 Z",
  },
  {
    left: "M12 3 Q2 5, 3 10 Q4 15, 20 14 L20 2 L18 2 Q8 2, 12 3 Z",
    right: "M230 15 Q246 14, 247 9 Q248 4, 238 3 L230 3 Z",
    mid: "M20 2 L230 3 L230 15 L20 14 Z",
  },
] as const;

export default function MarkerHighlight({
  children,
  variant = 0,
  color = "brand",
  className = "",
}: {
  children: React.ReactNode;
  /** Pick a highlight shape (0–1). */
  variant?: 0 | 1;
  /** Fill color: "brand" (green) or "white". */
  color?: "brand" | "white";
  className?: string;
}) {
  const shape = SHAPES[variant];
  const fill = color === "white" ? "#ffffff" : "var(--color-brand)";
  const opacity = color === "white" ? 0.35 : 0.1;

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Left cap — fixed width */}
      <svg
        className="pointer-events-none absolute top-[0.15em] left-[-0.35em] h-[calc(100%+0.1em)] w-[0.5em]"
        viewBox={`0 0 ${CAP} 18`}
        fill="none"
        preserveAspectRatio="xMinYMid meet"
        aria-hidden="true"
      >
        <path d={shape.left} fill={fill} fillOpacity={opacity} />
      </svg>
      {/* Middle — stretches */}
      <svg
        className="pointer-events-none absolute inset-x-[0.15em] top-[0.15em] h-[calc(100%+0.1em)] w-[calc(100%-0.3em)]"
        viewBox={`${CAP} 0 ${250 - CAP * 2} 18`}
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={shape.mid} fill={fill} fillOpacity={opacity} />
      </svg>
      {/* Right cap — fixed width */}
      <svg
        className="pointer-events-none absolute top-[0.15em] right-[-0.35em] h-[calc(100%+0.1em)] w-[0.5em]"
        viewBox={`${250 - CAP} 0 ${CAP} 18`}
        fill="none"
        preserveAspectRatio="xMaxYMid meet"
        aria-hidden="true"
      >
        <path d={shape.right} fill={fill} fillOpacity={opacity} />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

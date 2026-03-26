/**
 * Decorative marker-pen highlight behind text.
 * Renders a hand-drawn SVG highlight shape behind the text,
 * giving a "marked with a highlighter" feel.
 *
 * Usage:
 *   <h3><MarkerHighlight>给每个人</MarkerHighlight></h3>
 */

const HIGHLIGHT_PATHS = [
  // Loose rectangular highlight — slightly tilted, rough edges
  "M8 4 Q2 6, 4 12 Q6 16, 16 15 L234 13 Q244 12, 244 8 Q244 3, 236 3 L14 4 Q6 4, 8 4 Z",
  // Rounder, softer blob — more organic
  "M12 3 Q2 5, 3 10 Q4 15, 20 14 L230 15 Q246 14, 247 9 Q248 4, 238 3 L18 2 Q8 2, 12 3 Z",
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
  return (
    <span className={`relative inline-block ${className}`}>
      <svg
        className="pointer-events-none absolute inset-x-[-0.35em] inset-y-[-0.05em] h-[calc(100%+0.1em)] w-[calc(100%+0.7em)]"
        viewBox="0 0 250 18"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={HIGHLIGHT_PATHS[variant]}
          fill={color === "white" ? "#ffffff" : "var(--color-brand)"}
          fillOpacity={color === "white" ? 0.35 : 0.1}
        />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

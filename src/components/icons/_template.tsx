// Usage: copy this file → rename → replace viewBox and <path> content
import type { IconProps } from "./types";

export function TemplateIcon({ className, style, "aria-label": ariaLabel }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"       // ← replace with your viewBox
      width="1em"               // scales with fontSize
      height="1em"
      fill="currentColor"       // inherits color/text-* class
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
      className={className}
      style={style}
    >
      {/* paste SVG <path>/<g> content here */}
    </svg>
  );
}

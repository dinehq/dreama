"use client";

interface HoverPopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: "top" | "bottom";
  onHoverChange?: (hovered: boolean) => void;
}

/**
 * Shows `content` in a floating card when the user hovers over `children`.
 * Pure CSS — no JS state needed.
 */
export default function HoverPopover({
  children,
  content,
  placement = "bottom",
  onHoverChange,
}: HoverPopoverProps) {
  const popoverPos =
    placement === "bottom"
      ? "top-[calc(100%+10px)]"
      : "bottom-[calc(100%+10px)]";

  return (
    <div
      className="group/popover relative"
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
    >
      {children}
      <div
        className={`
          pointer-events-none absolute
          ${popoverPos}
          left-1/2 -translate-x-1/2 rounded-2xl bg-nav-bg p-3 opacity-0
          shadow-lg ring-1 ring-border transition-opacity duration-200
          group-hover/popover:pointer-events-auto
          group-hover/popover:opacity-100
        `}
      >
        {content}
      </div>
    </div>
  );
}

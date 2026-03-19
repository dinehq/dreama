type TextPosition = "top" | "bottom";
type CardColor = "gray" | "yellow" | "orange" | "green" | "blue";

interface FeatureCardProps {
  title: string;
  description: string;
  color?: CardColor;
  textPosition?: TextPosition;
  className?: string;
}

const colorMap: Record<CardColor, string> = {
  gray:   "bg-surface-alt",
  yellow: "bg-accent-yellow",
  orange: "bg-accent-orange",
  green:  "bg-brand",
  blue:   "bg-accent-blue",
};

/**
 * Feature detail card — colored rounded rectangle with title + description.
 * textPosition controls whether the label is anchored to the top or bottom.
 */
export default function FeatureCard({
  title,
  description,
  color = "gray",
  textPosition = "bottom",
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={`relative w-full rounded-feature overflow-hidden ${colorMap[color]} ${className}`}
    >
      {/* TODO: <Image> illustration */}
      <div
        className={`absolute left-8 ${
          textPosition === "top" ? "top-8" : "bottom-8"
        } max-w-[240px]`}
      >
        <p className="text-xl font-bold text-ink leading-tight">{title}</p>
        <p className="mt-1 text-sm text-ink/70 leading-5">{description}</p>
      </div>
    </div>
  );
}

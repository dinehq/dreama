import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

type TextPosition = "top" | "bottom";
type CardColor = "gray" | "yellow" | "orange" | "green" | "blue";
type TextTheme = "light" | "dark";
type ImageAlign =
  | "top-left"  | "top"    | "top-right"
  | "left"      | "center" | "right"
  | "bottom-left" | "bottom" | "bottom-right";

/** px number, percentage string (e.g. "50%"), or "auto" */
type SizeValue = number | `${number}%` | "auto";

interface CardImage {
  src: string | StaticImageData;
  /**
   * Display width — px number, "100%" (fills card width), or "auto".
   * When either dimension is non-numeric, height follows aspect ratio automatically.
   */
  width?: SizeValue;
  /** Display height — px number, "100%", or "auto". */
  height?: SizeValue;
  minWidth?: SizeValue;
  minHeight?: SizeValue;
  /**
   * Which edge/corner of the card the image is anchored to (default: "top-left").
   * x/y offsets are measured inward from the anchored edge(s).
   * For centered axes (e.g. align="top"), the perpendicular axis is centered automatically.
   */
  align?: ImageAlign;
  /** Offset from the horizontal anchor edge in px (default: 0) */
  x?: number;
  /** Offset from the vertical anchor edge in px (default: 0) */
  y?: number;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  color?: CardColor;
  textPosition?: TextPosition;
  /** "dark" = black text (default), "light" = white text */
  textTheme?: TextTheme;
  className?: string;
  image?: CardImage;
}

const colorMap: Record<CardColor, string> = {
  gray:   "bg-surface-alt",
  yellow: "bg-accent-yellow",
  orange: "bg-accent-orange",
  green:  "bg-brand",
  blue:   "bg-accent-blue",
};

function positionStyle({ align = "top-left", x = 0, y = 0 }: CardImage): CSSProperties {
  const style: CSSProperties = { position: "absolute",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
   };
  const transforms: string[] = [];

  const anchorLeft   = align.includes("left");
  const anchorRight  = align.includes("right");
  const anchorTop    = align.includes("top");
  const anchorBottom = align.includes("bottom");

  if (anchorLeft)        style.left   = x;
  else if (anchorRight)  style.right  = x;
  else { style.left = "50%"; transforms.push("translateX(-50%)"); }

  if (anchorTop)         style.top    = y;
  else if (anchorBottom) style.bottom = y;
  else { style.top = "50%"; transforms.push("translateY(-50%)"); }

  if (transforms.length) style.transform = transforms.join(" ");
  return style;
}

/** True when either dimension needs CSS-based sizing (non-numeric). */
function isFluid(image: CardImage) {
  return typeof image.width !== "number" || typeof image.height !== "number";
}

function toCSS(v: SizeValue | undefined): string | number {
  return v ?? "auto";
}

/**
 * Wrapper style: handles absolute positioning + centering transforms.
 * Width/height go on the wrapper so that fluid % values (e.g. "100%") are
 * resolved against the card (the containing block), not the image content.
 */
function wrapperStyle(image: CardImage): CSSProperties {
  const style: CSSProperties = { ...positionStyle(image) };
  if (image.width     !== undefined) style.width     = toCSS(image.width);
  if (image.height    !== undefined) style.height    = toCSS(image.height);
  if (image.minWidth  !== undefined) style.minWidth  = toCSS(image.minWidth);
  if (image.minHeight !== undefined) style.minHeight = toCSS(image.minHeight);
  return style;
}

/**
 * Feature detail card — colored rounded rectangle with title + description.
 * image.align controls which corner/edge the illustration is anchored to.
 * image.x / image.y are pixel offsets inward from the anchored edge(s).
 */
const textThemeMap: Record<TextTheme, { title: string; description: string }> = {
  dark:  { title: "text-ink",       description: "text-ink/70" },
  light: { title: "text-white",     description: "text-white/70" },
};

export default function FeatureCard({
  title,
  description,
  color = "gray",
  textPosition = "bottom",
  textTheme = "dark",
  className = "",
  image,
}: FeatureCardProps) {
  const textColors = textThemeMap[textTheme];

  const imageBlock = image ? (
    <div style={wrapperStyle(image)}>
      {isFluid(image) ? (
        <Image
          src={image.src}
          alt=""
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, 640px"
          style={{
            width: image.width !== undefined ? toCSS(image.width) : "100%",
            height: image.height !== undefined ? toCSS(image.height) : "auto",
            objectFit:
              image.width === "auto" && image.height === "100%"
                ? "contain"
                : "cover",
          }}
          className="
            origin-center transition-[scale] duration-500 ease-out
            group-hover:scale-101
          "
          placeholder={typeof image.src === "object" ? "blur" : undefined}
        />
      ) : (
        <Image
          src={image.src}
          alt=""
          width={image.width as number}
          height={image.height as number}
          style={{ objectFit: "cover" }}
          className="
            block origin-center transition-[scale] duration-500 ease-out
            group-hover:scale-101
          "
          placeholder={typeof image.src === "object" ? "blur" : undefined}
        />
      )}
    </div>
  ) : null;

  const textBlock = (
    <div
      className={`
        absolute left-8 z-10
        ${
        textPosition === "top" ? "top-8" : "bottom-8"
      }
        max-w-60
      `}
    >
      <p className={`
        text-xl/tight font-bold
        ${textColors.title}
      `}>{title}</p>
      <p className={`
        mt-1 text-sm/5
        ${textColors.description}
      `}>{description}</p>
    </div>
  );

  return (
    <div
      className={`
        group relative w-full overflow-hidden rounded-5xl
        ${colorMap[color]}
        ${className}
      `}
    >
      {imageBlock}
      {textBlock}
    </div>
  );
}

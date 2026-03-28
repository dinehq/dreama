"use client";

import { useState } from "react";
import FeatureCard, {
  type FeatureCardProps,
} from "@/components/ui/FeatureCard";
import FadeIn from "@/components/ui/FadeIn";
import MarkerHighlight from "@/components/ui/MarkerHighlight";
import FadeInGroup from "@/components/ui/FadeInGroup";
import feature1 from "@/assets/features/1.webp";
import feature2 from "@/assets/features/2.webp";
import feature3 from "@/assets/features/3.webp";
import feature4 from "@/assets/features/4.svg";
import feature5 from "@/assets/features/5.svg";
import feature6 from "@/assets/features/6.svg";
import type { Dict } from "@/i18n/zh";

type CardConfig = Omit<FeatureCardProps, "className" | "imageScale"> & {
  delay?: number;
  /**
   * Default flex-grow (≈ card height in px on desktop).
   * Sum of all cards in a column must equal the column height (680 mobile / 1066 desktop).
   */
  baseGrow: number;
  /**
   * flex-grow target when this card is hovered (≈ target height in px on desktop).
   * Other cards keep their baseGrow; flex handles proportional shrinking automatically.
   * Defaults to baseGrow * 1.8.
   */
  hoverGrow?: number;
  /**
   * Scale applied to this card's image when hovered.
   * 1 = no change (default), >1 = zoom in, <1 = zoom out.
   */
  imageHoverScale?: number;
};

type CardVisual = Omit<CardConfig, "title" | "description">;

const FLEX_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

const LEFT_CARD_VISUALS: CardVisual[] = [
  {
    color: "gray",
    textPosition: "bottom",
    baseGrow: 445,
    hoverGrow: 700,
    imageHoverScale: 1,
    delay: 0,
    image: { src: feature1, width: "120%", x: 0, y: 0, align: "center" },
  },
  {
    color: "gray",
    textPosition: "bottom",
    textTheme: "light",
    baseGrow: 300,
    hoverGrow: 430,
    imageHoverScale: 1,
    delay: 150,
    image: {
      src: feature2,
      width: "100%",
      height: "100%",
      x: 0,
      y: 0,
      align: "center",
    },
  },
  {
    color: "yellow",
    textPosition: "top",
    baseGrow: 321,
    hoverGrow: 500,
    imageHoverScale: 1,
    delay: 300,
    image: { src: feature3, width: "80%", x: 0, y: 0, align: "center" },
  },
];

const RIGHT_CARD_VISUALS: CardVisual[] = [
  {
    color: "orange",
    textPosition: "bottom",
    baseGrow: 280,
    hoverGrow: 400,
    imageHoverScale: 1,
    delay: 0,
    image: {
      src: feature4,
      width: "105%",
      x: 32,
      y: 42,
      align: "bottom-left",
    },
  },
  {
    color: "green",
    textPosition: "bottom",
    baseGrow: 465,
    hoverGrow: 700,
    imageHoverScale: 1,
    delay: 150,
    image: {
      src: feature5,
      width: "70%",
      x: 0,
      y: 0,
      align: "center",
    },
  },
  {
    color: "blue",
    textPosition: "top",
    baseGrow: 321,
    hoverGrow: 460,
    imageHoverScale: 1,
    delay: 300,
    image: {
      src: feature6,
      width: "100%",
      x: 0,
      y: 0,
      align: "bottom-left",
    },
  },
];

function CardColumn({
  label,
  visuals,
  texts,
}: {
  label: string;
  visuals: CardVisual[];
  texts: { title: string; description: string }[];
}) {
  const cards: CardConfig[] = visuals.map(
    (v, i) => ({ ...v, ...texts[i] }) as CardConfig,
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-[clamp(1rem,2.5vw,2rem)]">
      <FadeIn>
        <h3 className="text-center text-xl font-semibold text-ink md:text-[28px]">
          <MarkerHighlight>{label}</MarkerHighlight>
        </h3>
      </FadeIn>
      {/* Aspect-ratio container — height scales with column width */}
      <div className="flex aspect-350/680 w-full flex-col gap-[clamp(1rem,2.5vw,2rem)] md:aspect-628/1256">
        {cards.map(
          (
            { delay, baseGrow, hoverGrow, imageHoverScale = 1, ...props },
            i,
          ) => {
            const isHovered = hoveredIndex === i;
            const flexGrow = isHovered
              ? (hoverGrow ?? baseGrow * 1.8)
              : baseGrow;

            return (
              <div
                key={props.title}
                style={{
                  flexGrow,
                  flexShrink: 1,
                  flexBasis: 0,
                  minHeight: 0,
                  transition: `flex-grow 0.5s ${FLEX_EASING}`,
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <FadeIn delay={delay} className="h-full">
                  <FeatureCard
                    {...props}
                    className="h-full"
                    imageScale={isHovered ? imageHoverScale : 1}
                  />
                </FadeIn>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}

/**
 * "为什么是造梦次元" — two-column feature grid.
 * Left column targets individual users; right column targets creators.
 */
export default function FeaturesSection({ dict }: { dict: Dict["features"] }) {
  return (
    <section id="features" className="page-gutter">
      <FadeInGroup className="mx-auto max-w-7xl">
        <FadeIn className="mb-16 text-center">
          <h2 className="text-3xl font-semibold text-ink md:text-5xl">
            <MarkerHighlight variant={1}>{dict.heading}</MarkerHighlight>
          </h2>
          <p className="mt-4 text-base text-ink/80">{dict.subheading}</p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-x-[clamp(1rem,2.5vw,2rem)] gap-y-[clamp(2.5rem,6vw,3rem)] md:grid-cols-2">
          <CardColumn
            label={dict.forEveryone}
            visuals={LEFT_CARD_VISUALS}
            texts={dict.left}
          />
          <CardColumn
            label={dict.forCreators}
            visuals={RIGHT_CARD_VISUALS}
            texts={dict.right}
          />
        </div>
      </FadeInGroup>
    </section>
  );
}

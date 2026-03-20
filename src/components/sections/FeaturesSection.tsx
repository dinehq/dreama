"use client";

import { useState } from "react";
import FeatureCard, { type FeatureCardProps } from "@/components/ui/FeatureCard";
import FadeIn from "@/components/ui/FadeIn";
import FadeInGroup from "@/components/ui/FadeInGroup";
import feature1 from "@public/features/1.png";
import feature2 from "@public/features/2.jpg";
import feature3 from "@public/features/3.png";

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

const FLEX_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

const LEFT_CARDS: CardConfig[] = [
  {
    title: "低门槛的创造",
    description: "AI帮你，想到就能做到",
    color: "gray",
    textPosition: "bottom",
    baseGrow: 445,
    hoverGrow: 700,
    imageHoverScale: 1,
    delay: 0,
    image: { src: feature1, width: "120%", x: 0, y: 0, align: "center" },
  },
  {
    title: "有意思的玩法",
    description: "不只是看，是真的参与和生成",
    color: "gray",
    textPosition: "bottom",
    textTheme: "light",
    baseGrow: 300,
    hoverGrow: 430,
    imageHoverScale: 1,
    delay: 150,
    image: { src: feature2, width: "100%", height: "100%", x: 0, y: 0, align: "center" },
  },
  {
    title: "找到同类",
    description: "基于创造力而非单纯消费的连接",
    color: "orange",
    textPosition: "top",
    baseGrow: 321,
    hoverGrow: 500,
    imageHoverScale: 1,
    delay: 300,
    image: { src: feature3, width: "80%", x: 0, y: 0, align: "center" },
  },
];

const RIGHT_CARDS: CardConfig[] = [
  {
    title: "强大工具",
    description: "AI帮你，从创造到创作的进阶路径",
    color: "yellow",
    textPosition: "bottom",
    baseGrow: 280,
    hoverGrow: 400,
    imageHoverScale: 1,
    delay: 0,
    image: { src: "/features/4.svg", width: "110%", x: 32, y: 21, align: "bottom-left" },
  },
  {
    title: "活跃社区",
    description: "你的IP有人玩、有人创造衍生内容",
    color: "green",
    textPosition: "bottom",
    baseGrow: 465,
    hoverGrow: 700,
    imageHoverScale: 1,
    delay: 150,
    image: { src: "/features/5.svg", width: "70%", x: 0, y: 0, align: "center" },
  },
  {
    title: "商业空间",
    description: "内容能变现，创作能养活自己",
    color: "blue",
    textPosition: "top",
    baseGrow: 321,
    hoverGrow: 460,
    imageHoverScale: 1,
    delay: 300,
    image: { src: "/features/6.svg", width: "100%", x: 0, y: 0, align: "bottom-left" },
  },
];

function CardColumn({ label, cards }: { label: string; cards: CardConfig[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-[clamp(1rem,2.5vw,2rem)]">
      <FadeIn>
        <h3 className="text-center text-2xl font-bold text-ink">{label}</h3>
      </FadeIn>
      {/* Aspect-ratio container — height scales with column width */}
      <div className="
        flex aspect-350/680 w-full flex-col gap-[clamp(1rem,2.5vw,2rem)]
        md:aspect-624/1066
      ">
        {cards.map(({ delay, baseGrow, hoverGrow, imageHoverScale = 1, ...props }, i) => {
          const isHovered = hoveredIndex === i;
          const flexGrow = isHovered ? (hoverGrow ?? baseGrow * 1.8) : baseGrow;

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
        })}
      </div>
    </div>
  );
}

/**
 * "为什么是造梦次元" — two-column feature grid.
 * Left column targets individual users; right column targets creators.
 */
export default function FeaturesSection() {
  return (
    <section id="features" className="
      mt-10 page-gutter pb-10
      md:mt-20 md:pb-20
    ">
      <FadeInGroup className="mx-auto max-w-7xl">

        {/* Section header */}
        <FadeIn className="mb-16 text-center">
          <h2 className="
            text-3xl font-bold text-ink
            md:text-5xl
          ">为什么是造梦次元</h2>
          <p className="mt-4 text-base text-ink/60">
            与AI共创内容，让每个参与者既是创造者也是世界的延续者。
          </p>
        </FadeIn>

        {/* Two-column grid */}
        <div className="
          grid grid-cols-1 gap-x-[clamp(1rem,2.5vw,2rem)]
          gap-y-[clamp(2.5rem,6vw,3rem)]
          md:grid-cols-2
        ">
          <CardColumn label="给每个人" cards={LEFT_CARDS} />
          <CardColumn label="给创作者" cards={RIGHT_CARDS} />
        </div>

      </FadeInGroup>
    </section>
  );
}

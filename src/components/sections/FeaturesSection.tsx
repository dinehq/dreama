import FeatureCard, { type FeatureCardProps } from "@/components/ui/FeatureCard";
import FadeIn from "@/components/ui/FadeIn";
import FadeInGroup from "@/components/ui/FadeInGroup";
import feature1 from "@public/features/1.png";
import feature2 from "@public/features/2.jpg";
import feature3 from "@public/features/3.png";

type CardConfig = FeatureCardProps & { delay?: number };

const LEFT_CARDS: CardConfig[] = [
  {
    title: "低门槛的创造",
    description: "AI帮你，想到就能做到",
    color: "gray",
    textPosition: "bottom",
    className: "h-[445px]",
    delay: 0,
    image: { src: feature1, width: "100%", x: 0, y: 0, align: "center" },
  },
  {
    title: "有趣激励机制",
    description: "多种玩法，兴趣驱动创作",
    color: "gray",
    textPosition: "bottom",
    textTheme: "light",
    className: "h-[300px]",
    delay: 150,
    image: { src: feature2, width: "100%", height: "100%", x: 0, y: 0, align: "center" },
  },
  {
    title: "找到同类",
    description: "基于创造力而非单纯消费的连接",
    color: "orange",
    textPosition: "top",
    className: "h-[300px]",
    delay: 300,
    image: { src: feature3, width: "100%", x: 0, y: 0, align: "center" },
  },
];

const RIGHT_CARDS: CardConfig[] = [
  {
    title: "强大工具",
    description: "AI帮你，从创造到创作的进阶路径",
    color: "yellow",
    textPosition: "bottom",
    className: "h-[280px]",
    delay: 0,
    image: { src: "/features/4.svg", width: 631, height: 276, x: 32, y: 21, align: "bottom-left" },
  },
  {
    title: "活跃社区",
    description: "你的IP有人玩、有人创造衍生内容",
    color: "green",
    textPosition: "bottom",
    className: "h-[443px]",
    delay: 150,
    image: { src: "/features/5.svg", width: "50%", x: 0, y: 0, align: "center" },
  },
  {
    title: "商业空间",
    description: "内容能变现，创作能养活自己",
    color: "blue",
    textPosition: "top",
    className: "h-[321px]",
    delay: 300,
    image: { src: "/features/6.svg", width: "100%", x: 0, y: 0, align: "bottom-left" },
  },
];

function CardColumn({ label, cards }: { label: string; cards: CardConfig[] }) {
  return (
    <div className="flex flex-col gap-8">
      <FadeIn>
        <h3 className="text-2xl font-bold text-ink text-center">{label}</h3>
      </FadeIn>
      {cards.map(({ delay, ...props }) => (
        <FadeIn key={props.title} delay={delay}>
          <FeatureCard {...props} />
        </FadeIn>
      ))}
    </div>
  );
}

/**
 * "为什么是造梦次元" — two-column feature grid.
 * Left column targets individual users; right column targets creators.
 * Card heights match the Figma proportions.
 */
export default function FeaturesSection() {
  return (
    <section id="features" className="mt-20 page-gutter pb-20">
      <FadeInGroup className="max-w-[1280px] mx-auto">

        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-[40px] font-bold text-ink">为什么是造梦次元</h2>
          <p className="mt-4 text-base text-ink/60">
            与AI共创内容，让每个参与者既是创造者也是世界的延续者。
          </p>
        </FadeIn>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CardColumn label="给每个人" cards={LEFT_CARDS} />
          <CardColumn label="给创作者" cards={RIGHT_CARDS} />
        </div>

      </FadeInGroup>
    </section>
  );
}

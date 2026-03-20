import FeatureCard, { type FeatureCardProps } from "@/components/ui/FeatureCard";
import FadeIn from "@/components/ui/FadeIn";
import FadeInGroup from "@/components/ui/FadeInGroup";
import feature1 from "@public/features/1.png";
import feature2 from "@public/features/2.jpg";
import feature3 from "@public/features/3.png";

type CardConfig = FeatureCardProps & { delay?: number };

/** Bottom row — same height; column sums must match so both stacks align at the bottom */
const LAST_ROW_CARD_CLASS = "h-[200px] md:h-[321px]";
// 445+300+321 === 280+RIGHT_MID+321 → RIGHT_MID = 465
const RIGHT_MIDDLE_CARD_CLASS = "h-[280px] md:h-[465px]";

const LEFT_CARDS: CardConfig[] = [
  {
    title: "低门槛的创造",
    description: "AI帮你，想到就能做到",
    color: "gray",
    textPosition: "bottom",
    className: "h-[280px] md:h-[445px]",
    delay: 0,
    image: { src: feature1, width: "100%", x: 0, y: 0, align: "center" },
  },
  {
    title: "有意思的玩法",
    description: "不只是看，是真的参与和生成",
    color: "gray",
    textPosition: "bottom",
    textTheme: "light",
    className: "h-[200px] md:h-[300px]",
    delay: 150,
    image: { src: feature2, width: "100%", height: "100%", x: 0, y: 0, align: "center" },
  },
  {
    title: "找到同类",
    description: "基于创造力而非单纯消费的连接",
    color: "orange",
    textPosition: "top",
    className: LAST_ROW_CARD_CLASS,
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
    className: "h-[200px] md:h-[280px]",
    delay: 0,
    image: { src: "/features/4.svg", width: '110%', x: 32, y: 21, align: "bottom-left" },
  },
  {
    title: "活跃社区",
    description: "你的IP有人玩、有人创造衍生内容",
    color: "green",
    textPosition: "bottom",
    className: RIGHT_MIDDLE_CARD_CLASS,
    delay: 150,
    image: { src: "/features/5.svg", width: "50%", x: 0, y: 0, align: "center" },
  },
  {
    title: "商业空间",
    description: "内容能变现，创作能养活自己",
    color: "blue",
    textPosition: "top",
    className: LAST_ROW_CARD_CLASS,
    delay: 300,
    image: { src: "/features/6.svg", width: "100%", x: 0, y: 0, align: "bottom-left" },
  },
];

function CardColumn({ label, cards }: { label: string; cards: CardConfig[] }) {
  return (
    <div className="flex flex-col gap-8">
      <FadeIn>
        <h3 className="text-center text-2xl font-bold text-ink">{label}</h3>
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
 */
export default function FeaturesSection() {
  return (
    <section id="features" className="mt-20 page-gutter pb-20">
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
          grid grid-cols-1 gap-8
          md:grid-cols-2
        ">
          <CardColumn label="给每个人" cards={LEFT_CARDS} />
          <CardColumn label="给创作者" cards={RIGHT_CARDS} />
        </div>

      </FadeInGroup>
    </section>
  );
}

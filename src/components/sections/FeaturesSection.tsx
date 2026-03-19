import FeatureCard from "@/components/ui/FeatureCard";

/**
 * "为什么是造梦次元" — two-column feature grid.
 * Left column targets individual users; right column targets creators.
 * Card heights match the Figma proportions.
 */
export default function FeaturesSection() {
  return (
    <section id="features" className="mt-20 px-5 lg:px-20 pb-20">
      <div className="max-w-[1280px] mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-bold text-ink">为什么是造梦次元</h2>
          <p className="mt-4 text-base text-ink/60">
            与AI共创内容，让每个参与者既是创造者也是世界的延续者。
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* ── Left column: 给每个人 ── */}
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold text-ink text-center">给每个人</h3>

            {/* Card 1 — gray, tall, text at bottom */}
            <FeatureCard
              title="低门槛的创造"
              description="AI帮你，想到就能做到"
              color="gray"
              textPosition="bottom"
              className="h-[445px]"
              image={{ src: "/features/1.png", width: '100%', x: 0, y: 0, align: 'center' }}
            />

            {/* Card 2 — gray, medium, text at bottom */}
            <FeatureCard
              title="有趣激励机制"
              description="多种玩法，兴趣驱动创作"
              textTheme="light"
              color="gray"
              textPosition="bottom"
              className="h-[300px]"
              image={{ src: "/features/2.jpg", width: '100%', x: 0, y: 0, align: 'center' }}
            />

            {/* Card 3 — orange, medium, text at top */}
            <FeatureCard
              title="找到同类"
              description="基于创造力而非单纯消费的连接"
              color="orange"
              textPosition="top"
              className="h-[300px]"
              image={{ src: "/features/3.png", width: '100%', x: 0, y: 0, align: 'center' }}
            />
          </div>

          {/* ── Right column: 给创作者 ── */}
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold text-ink text-center">给创作者</h3>

            {/* Card 4 — yellow, medium, text at bottom */}
            <FeatureCard
              title="强大工具"
              description="AI帮你，从创造到创作的进阶路径"
              color="yellow"
              textPosition="bottom"
              className="h-[280px]"
              image={{ src: "/features/4.svg", width: 631, height: 276, x: 32, y: 21, align: 'bottom-left' }}
            />

            {/* Card 5 — green, tall, text at bottom */}
            <FeatureCard
              title="活跃社区"
              description="你的IP有人玩、有人创造衍生内容"
              color="green"
              textPosition="bottom"
              className="h-[443px]"
              image={{ src: "/features/5.svg", width: '50%', x: 0, y: 0, align: 'center' }}
            />

            {/* Card 6 — blue, medium, text at top */}
            <FeatureCard
              title="商业空间"
              description="内容能变现，创作能养活自己"
              color="blue"
              textPosition="top"
              className="h-[321px]"
              image={{ src: "/features/6.svg", width: '100%', x: 0, y: 0, align: 'bottom-left' }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

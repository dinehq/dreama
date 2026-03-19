import FadeIn from "@/components/ui/FadeIn";

/**
 * About Us section — yellow rounded card with team description.
 * Matches the Figma "About Us Container" (1280 × 445 px, accent-yellow bg).
 */
export default function AboutSection() {
  return (
    <section id="about" className="page-gutter pb-20">
      <div className="max-w-[1280px] mx-auto">
        <FadeIn>
          <div className="bg-accent-yellow rounded-[48px] h-[445px] flex flex-col items-center justify-center px-8 md:px-[15%] text-center">
            <h2 className="text-[40px] font-bold text-ink">关于我们</h2>
            <p className="mt-6 text-base text-ink/80 leading-7 max-w-[680px]">
              我们是一支懂内容又懂AI的复合型团队，由内容和AI领域具备10年以上产品/技术落地经验的创始团队及一群优秀的科学家、工程师、极客组成。
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import FadeIn from "@/components/ui/FadeIn";

/**
 * About Us section — yellow rounded card with team description.
 * Matches the Figma "About Us Container" (1280 × 445 px, accent-yellow bg).
 */
export default function AboutSection() {
  return (
    <section id="about" className="
      page-gutter pb-10
      md:pb-20
    ">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="
            flex flex-col items-center justify-center rounded-5xl
            bg-accent-yellow px-8 py-16 text-center
            md:h-187.5 md:px-[15%] md:py-0
          ">
            <h2 className="
              text-3xl font-bold text-ink
              md:text-5xl
            ">关于我们</h2>
            <p className="
              mt-6 max-w-170 text-base/normal text-ink/80
              md:text-2xl
            ">
              我们是一支懂内容又懂AI的复合型团队，由内容和AI领域具备10年以上产品/技术落地经验的创始团队及一群优秀的科学家、工程师、极客组成。
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

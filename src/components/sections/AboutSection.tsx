import FadeIn from "@/components/ui/FadeIn";

/**
 * About Us section — yellow rounded card with team description.
 * Matches the Figma "About Us Container" (1280 × 445 px, accent-yellow bg).
 */
export default function AboutSection({
  dict,
}: {
  dict: { heading: string; body: string };
}) {
  return (
    <section id="about" className="py-10 page-gutter md:py-0">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="flex flex-col items-center justify-center rounded-4xl bg-accent-yellow px-8 py-16 text-center md:h-187.5 md:rounded-5xl md:px-[15%] md:py-0">
            <h2 className="text-3xl font-bold text-ink md:text-5xl">
              {dict.heading}
            </h2>
            <p className="mt-6 max-w-170 text-base/normal text-ink/80 md:text-2xl">
              {dict.body}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

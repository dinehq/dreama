/**
 * Hero section — full-width, 810 px tall, gray background.
 * The fixed Nav (56 px) overlays the top; title is positioned at y≈153 px
 * matching the Figma layout.
 *
 * TODO: replace the placeholder <div> with a hero <Image> / <video>.
 */
export default function HeroSection() {
  return (
    <section className="relative w-full h-[810px] bg-hero-bg overflow-hidden">
      {/* TODO: <Image> hero background */}

      <h1 className="absolute left-1/2 -translate-x-1/2 top-[153px] text-[40px] font-bold text-ink text-center whitespace-nowrap">
        让想像发生
      </h1>
    </section>
  );
}

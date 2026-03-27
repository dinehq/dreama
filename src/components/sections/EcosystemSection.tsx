import img1 from "@/assets/ecosystem-marquee/1.png";
import img2 from "@/assets/ecosystem-marquee/2.png";
import img3 from "@/assets/ecosystem-marquee/3.png";
import img4 from "@/assets/ecosystem-marquee/4.png";
import img5 from "@/assets/ecosystem-marquee/5.png";
import img6 from "@/assets/ecosystem-marquee/6.png";
import img7 from "@/assets/ecosystem-marquee/7.png";
import type { Dict } from "@/i18n/zh";

const ITEMS = [img1, img2, img3, img4, img5, img6, img7];

export default function EcosystemSection({
  dict,
}: {
  dict: Dict["ecosystem"];
}) {
  return (
    <section id="ecosystem" className="flex flex-col gap-10 md:gap-14">
      {/* Header */}
      <div className="page-gutter">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-center md:gap-16 md:text-left">
          <h2 className="shrink-0 text-4xl leading-snug font-semibold text-ink md:text-5xl">
            {dict.heading1}
            <br />
            {dict.heading2}
          </h2>
          <p className="max-w-2xl text-xl leading-relaxed text-ink/75 md:text-2xl">
            {dict.body}
          </p>
        </div>
      </div>

      {/* Auto-scrolling marquee */}
      <div className="overflow-hidden">
        <div
          className="flex w-max animate-marquee items-center"
          style={{ gap: "clamp(2rem, 7.2vw, 6.5rem)" }}
        >
          {/* Duplicate items for seamless loop */}
          {[...ITEMS, ...ITEMS].map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={img.src}
              alt=""
              className="h-[clamp(120px,10vw,144px)] w-auto shrink-0 object-contain"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

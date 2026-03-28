import Image from "next/image";
import heroBg from "@/assets/hero.webp";
import MarkerHighlight from "@/components/ui/MarkerHighlight";

export default function HeroSection({ dict }: { dict: { tagline: string } }) {
  return (
    <section className="relative h-200 w-full overflow-hidden sm:min-h-170">
      <Image
        src={heroBg}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
        placeholder="blur"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-center text-6xl leading-none font-semibold tracking-tight whitespace-nowrap text-ink">
          <MarkerHighlight variant={1}>{dict.tagline}</MarkerHighlight>
        </h1>
      </div>
    </section>
  );
}

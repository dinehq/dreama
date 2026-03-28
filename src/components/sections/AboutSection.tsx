import Image from "next/image";
import aboutBg from "@/assets/about.webp";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

export default function AboutSection({
  dict,
}: {
  dict: { heading: string; body: string; press: string; join: string };
}) {
  return (
    <section id="about" className="page-gutter">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="relative min-h-88 overflow-clip rounded-3xl md:aspect-1280/750 md:min-h-0 md:rounded-4xl">
            <Image
              src={aboutBg}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />

            {/* gradient overlay — stronger on mobile, lighter on desktop */}
            <div
              className="pointer-events-none absolute inset-0 md:hidden"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-3/5 md:block"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)",
              }}
            />

            {/* text content */}
            <div className="absolute inset-x-6 bottom-6 flex flex-col gap-3 text-white md:inset-x-10 md:bottom-10 md:max-w-160 md:gap-4">
              <h2 className="text-2xl font-semibold md:text-[32px] md:leading-12">
                {dict.heading}
              </h2>
              <p className="text-base/relaxed md:text-2xl/relaxed">
                {dict.body}
              </p>
              <div className="flex gap-4">
                <Button variant="light" href="#">
                  {dict.press}
                </Button>
                <Button variant="light" href="#">
                  {dict.join}
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import { zh } from "@/i18n/zh";
import HeroSection from "@/components/sections/HeroSection";
import AIShowcaseSection from "@/components/sections/AIShowcaseSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import AboutSection from "@/components/sections/AboutSection";

export default function Home() {
  return (
    <main className="flex flex-col gap-20 pb-20 md:gap-40 md:pb-40">
      <HeroSection dict={zh.hero} />
      <AIShowcaseSection dict={zh.aiShowcase} />
      <FeaturesSection dict={zh.features} />
      <TestimonialSection dict={zh.testimonials} />
      <AboutSection dict={zh.about} />
    </main>
  );
}

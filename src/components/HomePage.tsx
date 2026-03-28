import HeroSection from "@/components/sections/HeroSection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import AIShowcaseSection from "@/components/sections/AIShowcaseSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import AboutSection from "@/components/sections/AboutSection";
import type { Dict } from "@/i18n/zh";

export default function HomePage({ dict }: { dict: Dict }) {
  return (
    <main className="flex flex-col gap-24 pb-12 md:gap-40 md:pb-12">
      <HeroSection dict={dict.hero} />
      <EcosystemSection dict={dict.ecosystem} />
      <AIShowcaseSection dict={dict.aiShowcase} />
      <FeaturesSection dict={dict.features} />
      <TestimonialSection dict={dict.testimonials} />
      <AboutSection dict={dict.about} />
    </main>
  );
}

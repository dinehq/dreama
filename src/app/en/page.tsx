import { en } from "@/i18n/en";
import HeroSection from "@/components/sections/HeroSection";
import AIShowcaseSection from "@/components/sections/AIShowcaseSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import AboutSection from "@/components/sections/AboutSection";

export default function EnHome() {
  return (
    <main className="flex flex-col gap-10 pb-10 md:gap-20 md:pb-20">
      <HeroSection dict={en.hero} />
      <AIShowcaseSection dict={en.aiShowcase} />
      <FeaturesSection dict={en.features} />
      <TestimonialSection dict={en.testimonials} />
      <AboutSection dict={en.about} />
    </main>
  );
}

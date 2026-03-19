import HeroSection from "@/components/sections/HeroSection";
import AIShowcaseSection from "@/components/sections/AIShowcaseSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import AboutSection from "@/components/sections/AboutSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AIShowcaseSection />
      <FeaturesSection />
      <TestimonialSection />
      <AboutSection />
    </main>
  );
}

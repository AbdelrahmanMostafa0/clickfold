import Hero from "@/components/home-page/Hero";
import HowItWorks from "@/components/home-page/HowItWorks";
import OGPreview from "@/components/home-page/OGPreview";
import SlugCarousel from "@/components/home-page/SlugCarousel";
import StatsBar from "@/components/home-page/StatsBar";
import FinalCTA from "@/components/home-page/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <OGPreview />
      <SlugCarousel />
      <StatsBar />
      <FinalCTA />
    </>
  );
}

import type { Metadata } from "next";
import Hero from "@/components/home-page/Hero";
import HowItWorks from "@/components/home-page/HowItWorks";
import OGPreview from "@/components/home-page/OGPreview";
import SlugCarousel from "@/components/home-page/SlugCarousel";
import StatsBar from "@/components/home-page/StatsBar";
import FinalCTA from "@/components/home-page/FinalCTA";
import { createPageMetadata, DEFAULT_DESCRIPTION } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Campaign-Ready Short Links",
  description: DEFAULT_DESCRIPTION,
  path: "/",
});

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <HowItWorks />
      <OGPreview />
      <SlugCarousel />
      <StatsBar />
      <FinalCTA />
    </main>
  );
}

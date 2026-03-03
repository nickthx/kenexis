import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { PillarsSection } from "@/components/sections/pillars-section";
import { homeSEO } from "@/lib/data/home";

export const metadata: Metadata = {
  title: homeSEO.title,
  description: homeSEO.description,
  openGraph: {
    title: homeSEO.title,
    description: homeSEO.description,
    images: homeSEO.ogImage ? [homeSEO.ogImage] : undefined,
  },
};

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <PillarsSection />
    </div>
  );
}

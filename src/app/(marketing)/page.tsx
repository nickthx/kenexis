import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { PillarsSection } from "@/components/sections/pillars-section";
import { StatsSection } from "@/components/sections/stats-section";
import { FeaturedContentSection } from "@/components/sections/featured-content-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
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
    <>
      <HeroSection />
      <PillarsSection />
      <StatsSection />
      <FeaturedContentSection />
      <NewsletterSection />
      <ContactCTASection />
    </>
  );
}

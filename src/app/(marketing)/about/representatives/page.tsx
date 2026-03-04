import type { Metadata } from "next";
import { ServicesHeroSection } from "@/components/sections/services-hero-section";
import { RepresentativesSection } from "@/components/sections/representatives-section";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { representativesSEO } from "@/lib/data/company";

export const metadata: Metadata = {
  title: representativesSEO.title,
  description: representativesSEO.description,
  openGraph: {
    title: representativesSEO.title,
    description: representativesSEO.description,
    images: representativesSEO.ogImage
      ? [representativesSEO.ogImage]
      : undefined,
  },
};

export default function RepresentativesPage() {
  return (
    <>
      <ServicesHeroSection
        title="Global Representatives"
        subtitle="Local support for process safety worldwide"
        backgroundImage="/images/stock/about-hero.jpg"
      />
      <RepresentativesSection />
      <ContactCTASection />
    </>
  );
}

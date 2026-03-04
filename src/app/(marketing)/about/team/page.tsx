import type { Metadata } from "next";
import { ServicesHeroSection } from "@/components/sections/services-hero-section";
import { TeamSection } from "@/components/sections/team-section";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { teamSEO } from "@/lib/data/company";

export const metadata: Metadata = {
  title: teamSEO.title,
  description: teamSEO.description,
  openGraph: {
    title: teamSEO.title,
    description: teamSEO.description,
    images: teamSEO.ogImage ? [teamSEO.ogImage] : undefined,
  },
};

export default function TeamPage() {
  return (
    <>
      <ServicesHeroSection
        title="Meet Our Team"
        subtitle="Experienced process safety engineers and consultants"
        backgroundImage="/images/stock/about-hero.jpg"
      />
      <TeamSection />
      <ContactCTASection />
    </>
  );
}

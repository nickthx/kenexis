import type { Metadata } from "next";
import { ServicesHeroSection } from "@/components/sections/services-hero-section";
import { CompanyOverviewSection } from "@/components/sections/company-overview-section";
import { LeadershipPreviewSection } from "@/components/sections/leadership-preview-section";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { aboutSEO } from "@/lib/data/company";

export const metadata: Metadata = {
  title: aboutSEO.title,
  description: aboutSEO.description,
  openGraph: {
    title: aboutSEO.title,
    description: aboutSEO.description,
    images: aboutSEO.ogImage ? [aboutSEO.ogImage] : undefined,
  },
};

export default function AboutPage() {
  return (
    <>
      <ServicesHeroSection
        title="About Kenexis"
        subtitle="Process safety experts since 2004"
        backgroundImage="/images/stock/about-hero.jpg"
      />
      <CompanyOverviewSection />
      <LeadershipPreviewSection />
      <ContactCTASection />
    </>
  );
}

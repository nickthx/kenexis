import type { Metadata } from "next";
import { ServicesHeroSection } from "@/components/sections/services-hero-section";
import { ServicesGridSection } from "@/components/sections/services-grid-section";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { serviceAreas, servicesSEO } from "@/lib/data/services";

export const metadata: Metadata = {
  title: servicesSEO.title,
  description: servicesSEO.description,
  openGraph: {
    title: servicesSEO.title,
    description: servicesSEO.description,
    images: servicesSEO.ogImage ? [servicesSEO.ogImage] : undefined,
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHeroSection />
      <ServicesGridSection services={serviceAreas} />
      <ContactCTASection />
    </>
  );
}

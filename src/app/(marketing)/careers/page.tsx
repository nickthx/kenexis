import type { Metadata } from "next";
import { ServicesHeroSection } from "@/components/sections/services-hero-section";
import { JobListingsSection } from "@/components/sections/job-listings-section";
import { CompanyCultureSection } from "@/components/sections/company-culture-section";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { careersSEO } from "@/lib/data/careers";

export const metadata: Metadata = {
  title: careersSEO.title,
  description: careersSEO.description,
  openGraph: {
    title: careersSEO.title,
    description: careersSEO.description,
  },
};

export default function CareersPage() {
  return (
    <>
      <ServicesHeroSection
        title="Careers at Kenexis"
        subtitle="Build your career in process safety engineering"
        backgroundImage="/images/stock/hero-safety-equipment.jpg"
      />
      <JobListingsSection />
      <CompanyCultureSection />
      <ContactCTASection />
    </>
  );
}

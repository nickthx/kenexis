import type { Metadata } from "next";
import { ServicesHeroSection } from "@/components/sections/services-hero-section";
import { TrainingInfoSection } from "@/components/sections/training-info-section";
import { TrainingCoursesSection } from "@/components/sections/training-courses-section";
import { KenexisUnlimitedSection } from "@/components/sections/kenexis-unlimited-section";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { trainingSEO } from "@/lib/data/training";

export const metadata: Metadata = {
  title: trainingSEO.title,
  description: trainingSEO.description,
  openGraph: {
    title: trainingSEO.title,
    description: trainingSEO.description,
    images: trainingSEO.ogImage ? [trainingSEO.ogImage] : undefined,
  },
};

export default function TrainingPage() {
  return (
    <>
      <ServicesHeroSection
        title="Process Safety Training Center"
        subtitle="Online on-demand courses with video instruction, quizzes, and completion certificates"
        backgroundImage="/images/stock/training-hero.jpg"
      />
      <TrainingInfoSection />
      <TrainingCoursesSection />
      <KenexisUnlimitedSection />
      <ContactCTASection />
    </>
  );
}

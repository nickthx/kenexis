import type { Metadata } from "next";
import { ServicesHeroSection } from "@/components/sections/services-hero-section";
import { ResourceCategoriesSection } from "@/components/sections/resource-categories-section";
import { WebinarsSection } from "@/components/sections/webinars-section";
import { PapersSection } from "@/components/sections/papers-section";
import { PodcastSection } from "@/components/sections/podcast-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { resourcesSEO } from "@/lib/data/resources";

export const metadata: Metadata = {
  title: resourcesSEO.title,
  description: resourcesSEO.description,
  openGraph: {
    title: resourcesSEO.title,
    description: resourcesSEO.description,
  },
};

export default function ResourcesPage() {
  return (
    <>
      <ServicesHeroSection
        title="Process Safety Resources"
        subtitle="Webinars, papers, tools, and expert content for safety professionals"
        backgroundImage="/images/stock/hero-control-room.jpg"
      />
      <ResourceCategoriesSection />
      <WebinarsSection />
      <PapersSection />
      <PodcastSection />
      <NewsletterSection
        title="Stay Updated on Process Safety"
        description="Subscribe to receive monthly safety articles, webinar announcements, and industry insights"
        buttonText="Subscribe"
      />
      <ContactCTASection />
    </>
  );
}

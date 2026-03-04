import type { Metadata } from "next";
import { ServicesHeroSection } from "@/components/sections/services-hero-section";
import { ContactInfoSection } from "@/components/sections/contact-info-section";
import { ContactFormSection } from "@/components/sections/contact-form-section";
import { contactSEO } from "@/lib/data/contact";

export const metadata: Metadata = {
  title: contactSEO.title,
  description: contactSEO.description,
  openGraph: {
    title: contactSEO.title,
    description: contactSEO.description,
  },
};

export default function ContactPage() {
  return (
    <>
      <ServicesHeroSection
        title="Contact Us"
        subtitle="Get in touch with our process safety experts"
        backgroundImage="/images/stock/hero-control-room.jpg"
      />
      <ContactInfoSection />
      <ContactFormSection />
    </>
  );
}

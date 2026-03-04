import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceAreas, getServiceBySlug } from "@/lib/data/services";
import { ServicesHeroSection } from "@/components/sections/services-hero-section";
import {
  ServiceDescriptionSection,
  ServiceMethodologySection,
  ServiceSubServicesSection,
  ServiceDeliverablesSection,
} from "@/components/sections/service-detail-sections";
import { RelatedServicesSection } from "@/components/sections/related-services-section";
import { ContactCTASection } from "@/components/sections/contact-cta-section";

export function generateStaticParams() {
  return serviceAreas.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.seo.title,
    description: service.seo.description,
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      images: service.seo.ogImage ? [service.seo.ogImage] : undefined,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = serviceAreas.filter((s) =>
    service.relatedServiceIds.includes(s.id)
  );

  return (
    <>
      <ServicesHeroSection
        title={service.name}
        subtitle={service.shortDescription}
        backgroundImage={service.heroImage}
      />
      <ServiceDescriptionSection description={service.fullDescription} />
      <ServiceMethodologySection
        methodology={service.methodology}
        serviceName={service.name}
      />
      <ServiceSubServicesSection subServices={service.subServices} />
      <ServiceDeliverablesSection deliverables={service.deliverables} />
      <RelatedServicesSection services={relatedServices} />
      <ContactCTASection />
    </>
  );
}

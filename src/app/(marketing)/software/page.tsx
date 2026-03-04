import type { Metadata } from "next";
import { SoftwareHeroSection } from "@/components/sections/software-hero-section";
import { ProductGridSection } from "@/components/sections/product-grid-section";
import { ProductEcosystemSection } from "@/components/sections/product-ecosystem-section";
import { ProductCTASection } from "@/components/sections/product-cta-section";
import {
  softwareProducts,
  kissOverview,
  softwareSEO,
} from "@/lib/data/software";

export const metadata: Metadata = {
  title: softwareSEO.title,
  description: softwareSEO.description,
  openGraph: {
    title: softwareSEO.title,
    description: softwareSEO.description,
    images: softwareSEO.ogImage ? [softwareSEO.ogImage] : undefined,
  },
};

export default function SoftwarePage() {
  return (
    <>
      <SoftwareHeroSection overview={kissOverview} />
      <ProductGridSection products={softwareProducts} />
      <ProductEcosystemSection products={softwareProducts} />
      <ProductCTASection overview={kissOverview} />
    </>
  );
}

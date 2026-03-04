import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  softwareProducts,
  getProductBySlug,
  kissOverview,
} from "@/lib/data/software";
import { ProductHeroSection } from "@/components/sections/product-hero-section";
import { ProductFeaturesSection } from "@/components/sections/product-features-section";
import { ProductIntegrationsSection } from "@/components/sections/product-integrations-section";
import { ProductComparisonSection } from "@/components/sections/product-comparison-section";
import { ProductDetailCTASection } from "@/components/sections/product-detail-cta-section";
import { ContactCTASection } from "@/components/sections/contact-cta-section";

export function generateStaticParams() {
  return softwareProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.seo.title,
    description: product.seo.description,
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      images: product.seo.ogImage ? [product.seo.ogImage] : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductHeroSection product={product} />
      <ProductFeaturesSection
        features={product.features}
        productName={product.name}
      />
      <ProductComparisonSection
        productName={product.name}
        trademark={product.trademark}
        rows={product.comparisonTable.rows}
        title={product.comparisonTable.title}
      />
      <ProductIntegrationsSection
        integrations={product.integrations}
        productName={product.name}
      />
      <ProductDetailCTASection product={product} overview={kissOverview} />
      <ContactCTASection />
    </>
  );
}

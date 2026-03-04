"use client";

import { motion, type Variants } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SoftwareProduct, KISSOverview } from "@/lib/data/software";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

interface ProductDetailCTASectionProps {
  product: SoftwareProduct;
  overview: KISSOverview;
}

export function ProductDetailCTASection({
  product,
  overview,
}: ProductDetailCTASectionProps) {
  return (
    <section className="bg-navy-900 text-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl sm:text-4xl font-bold mb-10"
        >
          Get Started with {product.name}
          <sup className="text-xs font-normal">{product.trademark}</sup>
        </motion.h2>

        {/* Pricing tiers */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          {product.pricing.map((tier) => (
            <motion.div
              key={tier.label}
              variants={itemVariants}
              className="rounded-lg border border-white/20 bg-white/5 backdrop-blur px-6 py-5 min-w-[200px]"
            >
              <p className="text-sm font-medium text-navy-200 uppercase tracking-wide mb-2">
                {tier.label}
              </p>
              {tier.type === "free" ? (
                <p className="text-2xl font-bold text-accent">Free</p>
              ) : tier.amount != null ? (
                <p className="text-2xl font-bold">
                  {formatPrice(tier.amount)}
                  <span className="text-sm font-normal text-navy-200">
                    /year
                  </span>
                </p>
              ) : (
                <p className="text-2xl font-bold text-navy-200">Contact Us</p>
              )}
              {tier.unit && (
                <p className="text-sm text-navy-300 mt-1">{tier.unit}</p>
              )}
              {tier.note && tier.type === "free" && (
                <p className="text-sm text-navy-300 mt-1">{tier.note}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-orange-600"
            asChild
          >
            <a
              href={overview.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Try on KISS Platform
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
            asChild
          >
            <a
              href={overview.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Kenexis Store
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, type Variants } from "motion/react";
import { softwareProducts } from "@/lib/data/software";
import { getNavIcon } from "@/lib/navigation-utils";

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

interface ProductIntegrationsSectionProps {
  integrations: string[];
  productName: string;
}

export function ProductIntegrationsSection({
  integrations,
  productName,
}: ProductIntegrationsSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl font-bold text-foreground mb-3"
          >
            Integrations
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-lg text-muted-foreground mb-10"
          >
            {productName} integrates seamlessly with these KISS platform modules
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap justify-center gap-4"
          >
            {integrations.map((integrationName) => {
              const integrationProduct = softwareProducts.find(
                (p) => p.name === integrationName
              );
              const Icon = getNavIcon(integrationProduct?.icon);

              return (
                <motion.div
                  key={integrationName}
                  variants={itemVariants}
                  className="flex items-center gap-3 rounded-lg border border-border bg-background px-5 py-3 shadow-sm"
                >
                  {Icon && (
                    <Icon
                      size={24}
                      className="text-accent flex-shrink-0"
                      strokeWidth={1.5}
                    />
                  )}
                  <span className="text-base font-medium text-foreground">
                    {integrationName}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, type Variants } from "motion/react";
import { Check } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

interface ProductFeaturesSectionProps {
  features: string[];
  productName: string;
}

export function ProductFeaturesSection({
  features,
  productName,
}: ProductFeaturesSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl font-bold text-foreground mb-8 text-center"
          >
            {productName} Features
          </motion.h2>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <Check
                  className="text-accent flex-shrink-0 mt-1"
                  size={20}
                  strokeWidth={2.5}
                />
                <span className="text-lg text-muted-foreground">{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

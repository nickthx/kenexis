"use client";

import { motion, type Variants } from "motion/react";
import type { ComparisonRow } from "@/lib/data/software";

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

interface ProductComparisonSectionProps {
  productName: string;
  trademark: string;
  rows: ComparisonRow[];
  title?: string;
}

export function ProductComparisonSection({
  productName,
  trademark,
  rows,
  title,
}: ProductComparisonSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-muted/50">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-foreground mb-3">
            {title || "Modern vs. Traditional"}
          </h2>
          <p className="text-lg text-muted-foreground">
            See how {productName}
            <sup className="text-xs">{trademark}</sup> compares to traditional
            approaches
          </p>
        </motion.div>

        {/* Desktop table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="hidden md:block"
        >
          {/* Header row */}
          <div className="grid grid-cols-3 gap-4 mb-2">
            <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3">
              Aspect
            </div>
            <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3">
              Traditional Approach
            </div>
            <div className="text-sm font-semibold text-accent uppercase tracking-wide px-4 py-3">
              {productName}
              <sup className="text-[10px]">{trademark}</sup>
            </div>
          </div>

          {/* Data rows */}
          {rows.map((row, index) => (
            <motion.div
              key={row.aspect}
              variants={itemVariants}
              className={`grid grid-cols-3 gap-4 rounded-lg ${
                index % 2 === 0 ? "bg-background" : ""
              }`}
            >
              <div className="px-4 py-4 font-medium text-foreground">
                {row.aspect}
              </div>
              <div className="px-4 py-4 text-muted-foreground">
                {row.traditional}
              </div>
              <div className="px-4 py-4 text-foreground font-medium">
                {row.modern}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile stacked cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="md:hidden space-y-4"
        >
          {rows.map((row) => (
            <motion.div
              key={row.aspect}
              variants={itemVariants}
              className="rounded-lg border border-border bg-background p-4"
            >
              <p className="font-semibold text-foreground mb-3">
                {row.aspect}
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground font-medium">
                    Traditional:{" "}
                  </span>
                  <span className="text-muted-foreground">
                    {row.traditional}
                  </span>
                </div>
                <div>
                  <span className="text-accent font-medium">
                    {productName}:{" "}
                  </span>
                  <span className="text-foreground">{row.modern}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

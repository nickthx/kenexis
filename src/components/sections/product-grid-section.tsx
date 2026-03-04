"use client";

import { Link } from "next-view-transitions";
import { motion, type Variants } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SoftwareProduct } from "@/lib/data/software";
import { getNavIcon } from "@/lib/navigation-utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface ProductGridSectionProps {
  products: SoftwareProduct[];
}

export function ProductGridSection({ products }: ProductGridSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            KISS Software Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seven specialized modules for comprehensive process safety
            management, available individually or as an integrated suite
          </p>
        </div>

        {/* Product cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {products.map((product) => {
            const Icon = getNavIcon(product.icon);
            const hasFree = product.pricing.some((t) => t.type === "free");

            return (
              <motion.div key={product.id} variants={itemVariants}>
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    {Icon && (
                      <Icon
                        className="text-accent mb-2"
                        size={40}
                        strokeWidth={1.5}
                      />
                    )}
                    <CardTitle className="text-xl">
                      {product.name}
                      <sup className="text-xs">{product.trademark}</sup>
                    </CardTitle>
                    <CardDescription className="text-base">
                      {product.tagline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto flex items-center gap-3">
                    <Button variant="outline" asChild>
                      <Link href={`/software/${product.slug}`}>Explore</Link>
                    </Button>
                    {hasFree && (
                      <Badge variant="secondary">Free Desktop Version</Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

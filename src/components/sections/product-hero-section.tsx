"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { SoftwareProduct } from "@/lib/data/software";
import { getNavIcon } from "@/lib/navigation-utils";

interface ProductHeroSectionProps {
  product: SoftwareProduct;
}

export function ProductHeroSection({ product }: ProductHeroSectionProps) {
  const Icon = getNavIcon(product.icon);

  return (
    <section className="relative min-h-[300px] lg:h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src={product.heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/60 to-navy-900/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
        {Icon && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="flex justify-center mb-4"
          >
            <Icon size={48} className="text-accent" strokeWidth={1.5} />
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        >
          {product.name}
          <sup className="text-xs font-normal">{product.trademark}</sup>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg text-navy-200 sm:text-xl lg:text-2xl max-w-3xl mx-auto"
        >
          {product.tagline}
        </motion.p>
      </div>
    </section>
  );
}

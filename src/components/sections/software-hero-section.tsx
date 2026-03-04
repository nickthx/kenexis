"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { KISSOverview } from "@/lib/data/software";

interface SoftwareHeroSectionProps {
  overview: KISSOverview;
}

export function SoftwareHeroSection({ overview }: SoftwareHeroSectionProps) {
  return (
    <section className="relative min-h-[300px] lg:h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/stock/software-hero.jpg"
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
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        >
          {overview.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg text-navy-200 sm:text-xl lg:text-2xl max-w-3xl mx-auto"
        >
          {overview.description}
        </motion.p>
      </div>
    </section>
  );
}

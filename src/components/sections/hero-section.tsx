"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { homeHero } from "@/lib/data/home";

export function HeroSection() {
  return (
    <section className="relative -mt-16 min-h-[500px] lg:h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src={homeHero.backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/60 to-navy-900/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-16 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          {homeHero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-navy-200 sm:text-xl lg:text-2xl max-w-3xl mx-auto"
        >
          {homeHero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-orange-600"
            asChild
          >
            <Link href={homeHero.primaryCTA.href}>
              {homeHero.primaryCTA.text}
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            asChild
          >
            <Link href={homeHero.secondaryCTA.href}>
              {homeHero.secondaryCTA.text}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

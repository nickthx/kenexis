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
import { homePillars } from "@/lib/data/home";
import { HardHat, Monitor, GraduationCap, type LucideIcon } from "lucide-react";

const pillarIconMap: Record<string, LucideIcon> = {
  "hard-hat": HardHat,
  "monitor": Monitor,
  "graduation-cap": GraduationCap,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

export function PillarsSection() {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            What We Do
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive process safety solutions spanning engineering
            consulting, cloud software, and professional training
          </p>
        </div>

        {/* Pillar cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {homePillars.map((pillar) => {
            const Icon = pillarIconMap[pillar.icon];
            return (
              <motion.div key={pillar.name} variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    {Icon && (
                      <Icon
                        className="text-accent mb-2"
                        size={40}
                        strokeWidth={1.5}
                      />
                    )}
                    <CardTitle className="text-xl">{pillar.name}</CardTitle>
                    <CardDescription className="text-base">
                      {pillar.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" asChild>
                      <Link href={pillar.href}>{pillar.ctaText}</Link>
                    </Button>
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

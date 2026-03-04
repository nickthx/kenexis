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
import type { ServiceArea } from "@/lib/data/services";
import { getNavIcon } from "@/lib/navigation-utils";

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

interface ServicesGridSectionProps {
  services: ServiceArea[];
}

export function ServicesGridSection({ services }: ServicesGridSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive process safety consulting spanning hazard analysis,
            risk quantification, detection mapping, and safety system lifecycle
            management
          </p>
        </div>

        {/* Service cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {services.map((service) => {
            const Icon = getNavIcon(service.icon);
            return (
              <motion.div key={service.id} variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    {Icon && (
                      <Icon
                        className="text-accent mb-2"
                        size={40}
                        strokeWidth={1.5}
                      />
                    )}
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <CardDescription className="text-base">
                      {service.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" asChild>
                      <Link href={`/services/${service.slug}`}>
                        Learn More
                      </Link>
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

"use client";

import { motion, type Variants } from "motion/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import type { SubService } from "@/lib/data/services";

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

/* ------------------------------------------------------------------ */
/*  ServiceDescriptionSection                                         */
/* ------------------------------------------------------------------ */

interface ServiceDescriptionSectionProps {
  description: string;
}

export function ServiceDescriptionSection({
  description,
}: ServiceDescriptionSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-foreground mb-6">Overview</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ServiceMethodologySection                                         */
/* ------------------------------------------------------------------ */

interface ServiceMethodologySectionProps {
  methodology: string[];
  serviceName: string;
}

export function ServiceMethodologySection({
  methodology,
  serviceName,
}: ServiceMethodologySectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl font-bold text-foreground mb-8 text-center"
          >
            Our {serviceName} Methodology
          </motion.h2>

          <motion.ol
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            {methodology.map((step, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold text-sm">
                  {index + 1}
                </span>
                <span className="text-lg text-muted-foreground pt-0.5">
                  {step}
                </span>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ServiceSubServicesSection                                         */
/* ------------------------------------------------------------------ */

interface ServiceSubServicesSectionProps {
  subServices: SubService[];
}

export function ServiceSubServicesSection({
  subServices,
}: ServiceSubServicesSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl font-bold text-foreground mb-8 text-center"
        >
          Specialized Services
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {subServices.map((sub) => (
            <motion.div key={sub.name} variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{sub.name}</CardTitle>
                  <CardDescription className="text-base">
                    {sub.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ServiceDeliverablesSection                                        */
/* ------------------------------------------------------------------ */

interface ServiceDeliverablesSectionProps {
  deliverables: string[];
}

export function ServiceDeliverablesSection({
  deliverables,
}: ServiceDeliverablesSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Key Deliverables
          </motion.h2>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            {deliverables.map((item, index) => (
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
                <span className="text-lg text-navy-200">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

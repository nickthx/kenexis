"use client";

import { motion, type Variants } from "motion/react";
import { Clock, DollarSign, CalendarCheck, Award } from "lucide-react";
import { trainingInfo } from "@/lib/data/training";

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

const infoItems = [
  {
    icon: Clock,
    label: "Format",
    value: trainingInfo.format,
  },
  {
    icon: DollarSign,
    label: "Pricing",
    value: trainingInfo.pricing,
  },
  {
    icon: CalendarCheck,
    label: "Trial",
    value: trainingInfo.trialInfo,
  },
  {
    icon: Award,
    label: "Certificates",
    value: trainingInfo.certificates,
  },
];

export function TrainingInfoSection() {
  return (
    <section className="py-16 sm:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {infoItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                  <Icon className="text-accent" size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {item.label}
                </h3>
                <p className="text-foreground font-medium">{item.value}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

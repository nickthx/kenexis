"use client";

import { motion } from "motion/react";
import { Heart, CheckCircle } from "lucide-react";
import { companyValues, benefits } from "@/lib/data/careers";

export function CompanyCultureSection() {
  return (
    <section className="bg-muted/50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Our Values
            </h2>
            <ul className="space-y-4">
              {companyValues.map((value) => (
                <li key={value} className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Benefits
            </h2>
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

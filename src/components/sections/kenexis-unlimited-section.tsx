"use client";

import { Link } from "next-view-transitions";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { kenexisUnlimited } from "@/lib/data/training";

export function KenexisUnlimitedSection() {
  return (
    <section className="py-16 sm:py-24 bg-navy-900 text-white">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {kenexisUnlimited.name}
          </h2>
          <p className="text-lg text-navy-200 mb-10 max-w-2xl mx-auto">
            {kenexisUnlimited.description}
          </p>

          {/* Feature list */}
          <ul className="space-y-4 mb-10 max-w-md mx-auto text-left">
            {kenexisUnlimited.includes.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check
                  className="text-accent shrink-0 mt-0.5"
                  size={20}
                  strokeWidth={2}
                />
                <span className="text-navy-100">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Pricing note */}
          <p className="text-navy-300 mb-8 text-sm">
            {kenexisUnlimited.pricingNote}
          </p>

          {/* CTA */}
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-orange-600"
            asChild
          >
            <Link href="/contact">Contact for Quote</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

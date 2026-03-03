"use client";

import { motion } from "motion/react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { homeStats } from "@/lib/data/home";

export function StatsSection() {
  return (
    <section className="bg-navy-900 text-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Kenexis by the Numbers
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        >
          {homeStats.map((stat) => (
            <div key={stat.label}>
              <div className="text-5xl font-bold text-accent">
                {stat.prefix}
                <NumberTicker value={stat.value} className="text-5xl font-bold text-accent" />
                {stat.suffix}
              </div>
              <p className="text-lg font-semibold text-white mt-2">
                {stat.label}
              </p>
              <p className="text-sm text-navy-200 mt-1">
                {stat.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

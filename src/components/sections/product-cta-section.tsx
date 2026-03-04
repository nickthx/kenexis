"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { KISSOverview } from "@/lib/data/software";

interface ProductCTASectionProps {
  overview: KISSOverview;
}

export function ProductCTASection({ overview }: ProductCTASectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-muted/50">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-foreground mb-4"
        >
          Ready to Transform Your Safety Workflow?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Access the full KISS platform or explore individual product licenses
          through the Kenexis Store.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button size="lg" asChild>
            <a
              href={overview.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Login to KISS
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>

          <Button size="lg" variant="outline" asChild>
            <a
              href={overview.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Kenexis Store
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

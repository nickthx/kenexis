"use client";

import { Link } from "next-view-transitions";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { homeContactCTA } from "@/lib/data/home";

export function ContactCTASection() {
  return (
    <section className="bg-navy-900 text-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {homeContactCTA.title}
          </h2>
          <p className="text-lg text-navy-200 mb-8 max-w-xl mx-auto">
            {homeContactCTA.description}
          </p>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-orange-600"
            asChild
          >
            <Link href={homeContactCTA.href}>
              {homeContactCTA.buttonText}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

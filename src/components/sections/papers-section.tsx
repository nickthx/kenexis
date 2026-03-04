"use client";

import { motion, type Variants } from "motion/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleArticles } from "@/lib/data/resources";

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

export function PapersSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Papers, Articles &amp; Books
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technical papers, articles, and books on process safety authored by
            Kenexis engineers and industry experts
          </p>
        </div>

        {/* Articles cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {sampleArticles.map((article) => (
            <motion.div key={article.title} variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {article.category}
                  </Badge>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription className="text-base">
                    {article.description}
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

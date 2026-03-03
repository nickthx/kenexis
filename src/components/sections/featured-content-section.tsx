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
import { homeFeaturedContent } from "@/lib/data/home";

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

export function FeaturedContentSection() {
  return (
    <section className="bg-muted/50 py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Latest from Kenexis
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay current with the latest process safety insights, industry
            trends, and product updates
          </p>
        </div>

        {/* Content cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {homeFeaturedContent.map((item) => (
            <motion.div key={item.title} variants={itemVariants}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <span className="bg-accent/10 text-accent text-xs font-medium px-2.5 py-0.5 rounded-full w-fit">
                    {item.category}
                  </span>
                  <CardTitle className="text-xl mt-3">{item.title}</CardTitle>
                  <CardDescription className="text-base line-clamp-3">
                    {item.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Link
                    href={item.href}
                    className="text-accent hover:text-orange-600 font-medium"
                  >
                    Read More &rarr;
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

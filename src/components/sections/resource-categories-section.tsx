"use client";

import { Link } from "next-view-transitions";
import { motion, type Variants } from "motion/react";
import {
  Newspaper,
  Video,
  Mail,
  Wrench,
  BookOpen,
  PlayCircle,
  Headphones,
  ExternalLink,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { resourceCategories } from "@/lib/data/resources";

const iconMap: Record<string, LucideIcon> = {
  newspaper: Newspaper,
  video: Video,
  mail: Mail,
  wrench: Wrench,
  "book-open": BookOpen,
  "play-circle": PlayCircle,
  headphones: Headphones,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export function ResourceCategoriesSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Explore Our Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive process safety resources including webinars, technical
            papers, tools, podcasts, and expert content for safety professionals
          </p>
        </div>

        {/* Category cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {resourceCategories.map((category) => {
            const Icon = iconMap[category.icon];
            const isExternal = category.href.startsWith("http");

            const cardContent = (
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  {Icon && (
                    <Icon
                      className="text-accent mb-2"
                      size={40}
                      strokeWidth={1.5}
                    />
                  )}
                  <CardTitle className="text-xl flex items-center gap-2">
                    {category.name}
                    {isExternal && (
                      <ExternalLink className="text-muted-foreground" size={16} />
                    )}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );

            return (
              <motion.div key={category.id} variants={itemVariants}>
                {isExternal ? (
                  <a
                    href={category.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <Link href={category.href}>{cardContent}</Link>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

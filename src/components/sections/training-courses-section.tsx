"use client";

import { motion, type Variants } from "motion/react";
import { Shield, Monitor, Flame } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trainingCourses, type TrainingCourse } from "@/lib/data/training";

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

const categoryLabels: Record<TrainingCourse["category"], string> = {
  "process-safety": "Process Safety",
  "software-training": "Software Training",
  "fire-gas": "Fire & Gas",
};

const categoryDescriptions: Record<TrainingCourse["category"], string> = {
  "process-safety":
    "Foundational and advanced courses covering hazard analysis, safety instrumented systems, and risk assessment methodologies.",
  "software-training":
    "Hands-on training for Kenexis software products including Open-PHA, Effigy, and Vertigo.",
  "fire-gas":
    "Specialized courses on fire and gas detection system design, mapping techniques, and ISA standards.",
};

const categoryIcons: Record<TrainingCourse["category"], typeof Shield> = {
  "process-safety": Shield,
  "software-training": Monitor,
  "fire-gas": Flame,
};

const categoryOrder: TrainingCourse["category"][] = [
  "process-safety",
  "software-training",
  "fire-gas",
];

export function TrainingCoursesSection() {
  // Group courses by category
  const grouped = trainingCourses.reduce<
    Record<TrainingCourse["category"], TrainingCourse[]>
  >(
    (acc, course) => {
      acc[course.category].push(course);
      return acc;
    },
    { "process-safety": [], "software-training": [], "fire-gas": [] }
  );

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Course Catalog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            16 online on-demand courses covering process safety fundamentals,
            Kenexis software products, and fire &amp; gas engineering
          </p>
        </div>

        {/* Category groups */}
        {categoryOrder.map((category) => {
          const courses = grouped[category];
          const Icon = categoryIcons[category];
          return (
            <div key={category} className="mb-16 last:mb-0">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-2">
                <Icon
                  className="text-accent shrink-0"
                  size={28}
                  strokeWidth={1.5}
                />
                <h3 className="text-2xl font-semibold text-foreground">
                  {categoryLabels[category]}
                </h3>
              </div>
              <p className="text-muted-foreground mb-6 ml-[40px]">
                {categoryDescriptions[category]}
              </p>

              {/* Course cards grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {courses.map((course) => (
                  <motion.div key={course.id} variants={itemVariants}>
                    <Card className="h-full flex flex-col">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg">
                            {course.name}
                          </CardTitle>
                        </div>
                        <Badge variant="secondary" className="w-fit">
                          Online On-Demand
                        </Badge>
                        <CardDescription className="text-sm">
                          {course.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="mt-auto">
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href="https://kiss.kenexis.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Register on KISS
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

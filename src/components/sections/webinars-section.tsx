"use client";

import { motion, type Variants } from "motion/react";
import { Video } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sampleWebinars, externalLinks } from "@/lib/data/resources";

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

export function WebinarsSection() {
  return (
    <section className="py-16 sm:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Recorded Webinars
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch recorded webinars on process safety topics presented by
            Kenexis experts and industry leaders
          </p>
        </div>

        {/* Webinar cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sampleWebinars.map((webinar) => (
            <motion.div key={webinar.title} variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {webinar.category}
                  </Badge>
                  <CardTitle className="text-xl">{webinar.title}</CardTitle>
                  <CardDescription className="text-base">
                    {webinar.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* YouTube CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-10"
        >
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-orange-600"
            asChild
          >
            <a
              href={externalLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Video className="mr-2" size={20} />
              Watch All on YouTube
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

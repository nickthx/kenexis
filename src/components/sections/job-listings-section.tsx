"use client";

import { motion } from "motion/react";
import { Briefcase, MapPin, Mail } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { jobListings, applicationEmail } from "@/lib/data/careers";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function JobListingsSection() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Briefcase className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium uppercase tracking-wider text-accent">
              Open Positions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Open Positions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our team of process safety experts
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {jobListings.map((job) => (
            <motion.div key={job.id} variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-3 pt-1">
                    <span className="inline-flex items-center gap-1 text-sm">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <Badge variant="secondary" className="capitalize">
                      Full-time
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-2">
            Interested? Send your resume to
          </p>
          <a
            href={`mailto:${applicationEmail}`}
            className="inline-flex items-center gap-2 text-accent hover:underline font-medium text-lg"
          >
            <Mail className="h-5 w-5" />
            {applicationEmail}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

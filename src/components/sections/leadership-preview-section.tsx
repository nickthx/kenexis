"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { motion, type Variants } from "motion/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLeadership } from "@/lib/data/company";

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

export function LeadershipPreviewSection() {
  const leadership = getLeadership();

  return (
    <section className="py-16 sm:py-24 bg-muted/50">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Leadership
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the founders who have shaped Kenexis into a leading process
            safety firm
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto"
        >
          {leadership.map((member) => (
            <motion.div key={member.id} variants={itemVariants}>
              <Card className="text-center">
                <CardHeader className="items-center">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden mb-2">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.credentials.map((credential) => (
                      <Badge key={credential} variant="secondary">
                        {credential}
                      </Badge>
                    ))}
                  </div>
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
          className="text-center mt-10"
        >
          <Button variant="outline" asChild>
            <Link href="/about/team">Meet Our Full Team</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, type Variants } from "motion/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Phone, ExternalLink, Mail } from "lucide-react";
import { representatives, type Representative } from "@/lib/data/company";

const regionGroups = [
  {
    name: "North America",
    filter: (r: Representative) =>
      ["Texas, USA", "Canada", "Michigan/Midwest, USA"].some((region) =>
        r.regions.includes(region)
      ),
  },
  {
    name: "South & Central America",
    filter: (r: Representative) =>
      r.regions.some((region) =>
        [
          "Brazil",
          "Argentina",
          "Chile",
          "Trinidad",
          "Caribbean",
          "Latin America",
        ].includes(region)
      ),
  },
  {
    name: "Middle East & Central Asia",
    filter: (r: Representative) =>
      r.regions.some((region) =>
        ["UAE", "Algeria", "India", "Iraq", "Azerbaijan"].includes(region)
      ),
  },
  {
    name: "Europe",
    filter: (r: Representative) =>
      r.regions.some((region) => ["Turkey", "Bulgaria"].includes(region)),
  },
  {
    name: "Africa",
    filter: (r: Representative) =>
      r.regions.some((region) => ["South Africa"].includes(region)),
  },
  {
    name: "Asia Pacific & Oceania",
    filter: (r: Representative) =>
      r.regions.some((region) =>
        ["South Korea", "Australia", "New Zealand"].includes(region)
      ),
  },
];

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

export function RepresentativesSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4 space-y-16">
        {regionGroups.map((group) => {
          const groupReps = representatives.filter(group.filter);
          if (groupReps.length === 0) return null;

          return (
            <div key={group.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex items-center gap-3 mb-8"
              >
                <Globe className="text-accent shrink-0" size={24} />
                <h3 className="text-2xl font-bold text-foreground">
                  {group.name}
                </h3>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {groupReps.map((rep) => (
                  <motion.div key={rep.id} variants={itemVariants}>
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {rep.company}
                        </CardTitle>
                        {rep.contactName && (
                          <p className="text-sm text-muted-foreground">
                            {rep.contactName}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {rep.regions.map((region) => (
                            <Badge
                              key={region}
                              variant="outline"
                              className="text-xs"
                            >
                              {region}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <a
                          href={`tel:${rep.phone}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Phone size={14} className="shrink-0" />
                          {rep.phone}
                        </a>
                        {rep.website && (
                          <a
                            href={rep.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <ExternalLink size={14} className="shrink-0" />
                            {new URL(rep.website).hostname}
                          </a>
                        )}
                        {rep.email && (
                          <a
                            href={`mailto:${rep.email}`}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Mail size={14} className="shrink-0" />
                            {rep.email}
                          </a>
                        )}
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

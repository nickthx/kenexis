"use client";

import { motion } from "motion/react";
import { Building2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { companyInfo } from "@/lib/data/company";

export function CompanyOverviewSection() {
  return (
    <>
      {/* Company description and mission */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                Who We Are
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {companyInfo.description}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Our Mission
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {companyInfo.mission}
              </p>
            </div>

            <div className="flex items-center gap-3 text-muted-foreground">
              <Building2 className="text-accent shrink-0" size={20} />
              <span>
                Founded {companyInfo.founded} by{" "}
                {companyInfo.founders.join(" and ")}
              </span>
            </div>

            <div className="flex items-start gap-3 text-muted-foreground">
              <MapPin className="text-accent shrink-0 mt-0.5" size={20} />
              <span>{companyInfo.headquarters.address}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industries and regulatory alignment */}
      <section className="py-16 sm:py-24 bg-muted/50">
        <div className="mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Industries We Serve
              </h3>
              <div className="flex flex-wrap gap-2">
                {companyInfo.industries.map((industry) => (
                  <Badge key={industry} variant="secondary" className="text-sm">
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Regulatory Alignment
              </h3>
              <div className="flex flex-wrap gap-2">
                {companyInfo.regulatoryAlignment.map((standard) => (
                  <Badge key={standard} variant="outline" className="text-sm">
                    {standard}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

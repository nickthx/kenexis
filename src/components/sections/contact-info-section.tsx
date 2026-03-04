"use client";

import { motion } from "motion/react";
import { Phone, Mail, MapPin, Printer } from "lucide-react";
import { contactInfo } from "@/lib/data/contact";

const infoItems = [
  {
    icon: Phone,
    label: "Phone",
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: contactInfo.address,
    href: null,
  },
  {
    icon: Printer,
    label: "Fax",
    value: contactInfo.fax,
    href: null,
  },
];

export function ContactInfoSection() {
  return (
    <section className="bg-muted/50 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-4xl px-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {infoItems.map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 inline-flex items-center justify-center mb-4">
                <item.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                {item.label}
              </h3>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-accent transition"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

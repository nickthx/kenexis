"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { homeNewsletterCTA } from "@/lib/data/home";

interface NewsletterSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export function NewsletterSection({
  title,
  description,
  buttonText,
}: NewsletterSectionProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-background py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-2xl px-4 text-center"
      >
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {title ?? homeNewsletterCTA.title}
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          {description ?? homeNewsletterCTA.description}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="you@company.com"
            required
            disabled={submitted}
            aria-label="Email address"
            className="bg-muted/50"
          />
          <Button
            type="submit"
            disabled={submitted}
            className="bg-accent text-accent-foreground hover:bg-orange-600"
          >
            {submitted ? "Subscribed!" : (buttonText ?? homeNewsletterCTA.buttonText)}
          </Button>
        </form>

        {submitted && (
          <p className="text-sm text-accent mt-3">
            Thank you! You&apos;ll hear from us soon.
          </p>
        )}
      </motion.div>
    </section>
  );
}

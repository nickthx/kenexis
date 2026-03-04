"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactFormFields } from "@/lib/data/contact";

export function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-background py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-2xl px-4"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-8">
          Send Us a Message
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-6"
        >
          {/* Name and Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactFormFields
              .filter((f) => f.name === "name" || f.name === "email")
              .map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>
                    {field.label}
                    {field.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    disabled={submitted}
                    className="bg-muted/50"
                  />
                </div>
              ))}
          </div>

          {/* Company and Phone row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactFormFields
              .filter((f) => f.name === "company" || f.name === "phone")
              .map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>
                    {field.label}
                    {field.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    disabled={submitted}
                    className="bg-muted/50"
                  />
                </div>
              ))}
          </div>

          {/* Service Interest select - full width */}
          {contactFormFields
            .filter((f) => f.name === "serviceInterest")
            .map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>
                  {field.label}
                  {field.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </Label>
                <Select disabled={submitted}>
                  <SelectTrigger id={field.name} className="bg-muted/50">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}

          {/* Message textarea - full width */}
          {contactFormFields
            .filter((f) => f.name === "message")
            .map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>
                  {field.label}
                  {field.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  maxLength={field.maxLength}
                  disabled={submitted}
                  rows={5}
                  className="bg-muted/50 resize-none"
                />
              </div>
            ))}

          <Button
            type="submit"
            disabled={submitted}
            className="w-full bg-accent text-accent-foreground hover:bg-orange-600"
          >
            {submitted ? "Message Sent!" : "Send Message"}
          </Button>
        </form>

        {submitted && (
          <p className="text-sm text-accent mt-4 text-center">
            Thank you for your inquiry! We will respond within one business day.
          </p>
        )}
      </motion.div>
    </section>
  );
}

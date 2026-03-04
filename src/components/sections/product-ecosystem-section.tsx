"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import type { SoftwareProduct } from "@/lib/data/software";
import { getNavIcon } from "@/lib/navigation-utils";

interface ProductEcosystemSectionProps {
  products: SoftwareProduct[];
}

// Calculate circular position as percentage
function getCirclePosition(index: number, total: number, radius: number) {
  const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);
  return { x, y };
}

export function ProductEcosystemSection({
  products,
}: ProductEcosystemSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const kissRef = useRef<HTMLDivElement>(null);

  // Create refs for each product node
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setProductRef = (index: number) => (el: HTMLDivElement | null) => {
    productRefs.current[index] = el;
  };

  return (
    <section className="py-16 sm:py-24 bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            The KISS Ecosystem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-navy-200 max-w-2xl mx-auto"
          >
            Seven integrated modules working together on a single platform
          </motion.p>
        </div>

        {/* Ecosystem visualization */}
        <div
          ref={containerRef}
          className="relative min-h-[500px] mx-auto max-w-4xl"
        >
          {/* Center KISS hub */}
          <div
            ref={kissRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white font-bold text-lg shadow-lg shadow-accent/30"
          >
            KISS
          </div>

          {/* Product nodes arranged in a circle */}
          {products.map((product, i) => {
            const Icon = getNavIcon(product.icon);
            const pos = getCirclePosition(i, products.length, 38);

            return (
              <div
                key={product.id}
                ref={setProductRef(i)}
                className="absolute z-10 flex flex-col items-center gap-1"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur">
                  {Icon && (
                    <Icon className="text-accent" size={28} strokeWidth={1.5} />
                  )}
                </div>
                <span className="text-xs font-medium text-navy-200 whitespace-nowrap">
                  {product.name}
                </span>
              </div>
            );
          })}

          {/* Animated beams connecting each product to KISS center */}
          {products.map((product, i) => (
            <AnimatedBeam
              key={`beam-${product.id}`}
              containerRef={containerRef as React.RefObject<HTMLElement>}
              fromRef={
                {
                  get current() {
                    return productRefs.current[i];
                  },
                } as React.RefObject<HTMLElement>
              }
              toRef={kissRef as React.RefObject<HTMLElement>}
              gradientStartColor="#e87722"
              gradientStopColor="#0a1628"
              pathColor="rgba(255,255,255,0.15)"
              delay={i * 0.5}
              duration={4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

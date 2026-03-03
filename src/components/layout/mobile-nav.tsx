"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { Menu, ExternalLink } from "lucide-react";
import { mainNavigation } from "@/lib/data/navigation";
import { getNavIcon } from "@/lib/navigation-utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 overflow-y-auto">
        <SheetTitle className="sr-only">Navigation</SheetTitle>

        {/* Logo */}
        <div className="border-b px-4 pb-4">
          <Link href="/" onClick={() => setOpen(false)}>
            <Image
              src="/images/logo/kenexis-logo.jpg"
              alt="Kenexis"
              width={120}
              height={31}
            />
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="px-4 py-2">
          <Accordion type="multiple" className="w-full">
            {mainNavigation.map((item) => {
              if (item.children && item.children.length > 0) {
                return (
                  <AccordionItem key={item.href} value={item.href}>
                    <AccordionTrigger className="text-sm font-medium">
                      {item.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-1 pl-1">
                        {item.children.map((child) => {
                          const Icon = getNavIcon(child.icon);
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-md px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
                            >
                              {Icon && (
                                <Icon className="size-4 shrink-0 text-orange" />
                              )}
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              }

              return (
                <div key={item.href} className="border-b">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </Accordion>
        </div>

        {/* External Links */}
        <div className="mt-auto border-t px-4 py-4">
          <div className="flex flex-col gap-2">
            <a
              href="https://kiss.kenexis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              KISS Login
              <ExternalLink className="size-3.5" />
            </a>
            <a
              href="https://store.kenexis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Kenexis Store
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

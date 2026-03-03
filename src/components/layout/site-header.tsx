"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollHeader } from "@/hooks/use-scroll-header";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const scrolled = useScrollHeader(50);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b text-foreground"
          : "bg-transparent text-white"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Left: Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo/kenexis-logo.jpg"
            alt="Kenexis Consulting Corporation"
            width={140}
            height={36}
            priority
          />
        </Link>

        {/* Center: Desktop navigation (hidden on mobile) */}
        <div className="hidden md:flex">
          <MegaMenu />
        </div>

        {/* Right: CTA button + Mobile hamburger */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-md bg-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 sm:inline-flex"
          >
            Contact Us
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

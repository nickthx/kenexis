"use client";

import { Link } from "next-view-transitions";
import { mainNavigation } from "@/lib/data/navigation";
import { getNavIcon } from "@/lib/navigation-utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

function MegaMenuChildLink({
  href,
  label,
  description,
  icon,
}: {
  href: string;
  label: string;
  description?: string;
  icon?: string;
}) {
  const Icon = getNavIcon(icon);

  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-accent/10"
      >
        {Icon && (
          <Icon className="mt-0.5 size-5 shrink-0 text-orange" />
        )}
        <div>
          <div className="text-sm font-medium leading-none">{label}</div>
          {description && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </Link>
    </NavigationMenuLink>
  );
}

export function MegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {mainNavigation.map((item) => {
          if (item.children && item.children.length > 0) {
            const isSoftware = item.label === "Software";
            const gridWidth = isSoftware ? "md:w-[600px]" : "md:w-[500px]";

            return (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuTrigger className="bg-transparent">
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className={cn("grid gap-1 p-3", gridWidth, "md:grid-cols-2")}>
                    {isSoftware && (
                      <li className="col-span-2">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/software"
                            className="flex w-full items-center rounded-md bg-navy/5 p-4 transition-colors hover:bg-navy/10"
                          >
                            <div>
                              <div className="text-sm font-semibold">
                                KISS Software Platform
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">
                                View all software products
                              </p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    )}
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <MegaMenuChildLink
                          href={child.href}
                          label={child.label}
                          description={child.description}
                          icon={child.icon}
                        />
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href={item.href} className="bg-transparent">
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

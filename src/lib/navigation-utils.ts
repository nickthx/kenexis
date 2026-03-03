import type { LucideIcon } from "lucide-react";
import {
  Shield,
  BarChart3,
  Flame,
  Cpu,
  ClipboardCheck,
  Gauge,
  GitBranch,
  Target,
  CheckSquare,
  Map as MapIcon,
  Code,
  Building,
  Users,
  Globe,
} from "lucide-react";
import { mainNavigation } from "@/lib/data/navigation";

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  "chart-bar": BarChart3,
  flame: Flame,
  cpu: Cpu,
  "clipboard-check": ClipboardCheck,
  gauge: Gauge,
  "git-branch": GitBranch,
  target: Target,
  "check-square": CheckSquare,
  map: MapIcon,
  code: Code,
  building: Building,
  users: Users,
  globe: Globe,
};

export function getNavIcon(iconName?: string): LucideIcon | null {
  if (!iconName) return null;
  return iconMap[iconName] ?? null;
}

export function buildBreadcrumbMap(): Record<string, string> {
  const map: Record<string, string> = { "/": "Home" };

  function walk(items: typeof mainNavigation) {
    for (const item of items) {
      map[item.href] = item.label;
      if (item.children) {
        walk(item.children);
      }
    }
  }

  walk(mainNavigation);
  return map;
}

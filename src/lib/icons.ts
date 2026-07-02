import {
  Users,
  Gauge,
  ShieldCheck,
  Sparkles,
  Car,
  Zap,
  RefreshCw,
  BadgeCheck,
  GraduationCap,
  Truck,
  Scale,
  Snowflake,
  Star,
  type LucideIcon,
} from "lucide-react";

/** Maps the icon string keys used in Sanity schemas to lucide components. */
export const iconMap: Record<string, LucideIcon> = {
  users: Users,
  gauge: Gauge,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  car: Car,
  zap: Zap,
  refresh: RefreshCw,
  "badge-check": BadgeCheck,
  "graduation-cap": GraduationCap,
  truck: Truck,
  scale: Scale,
  snowflake: Snowflake,
  star: Star,
};

/** Resolve an icon key to a component, falling back to a sensible default. */
export function resolveIcon(key: string | undefined, fallback: LucideIcon): LucideIcon {
  if (!key) return fallback;
  return iconMap[key] ?? fallback;
}

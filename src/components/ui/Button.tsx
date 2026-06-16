import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "outlineDark" | "ghostDark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  solid:
    "bg-accent text-white shadow-[0_8px_24px_rgba(192,0,10,0.25)] hover:bg-accent-light hover:-translate-y-0.5",
  outline:
    "border border-ink/20 text-ink hover:border-accent hover:text-accent",
  outlineDark:
    "border border-white/30 text-white hover:border-white hover:bg-white/10",
  ghostDark: "bg-white text-dark hover:bg-white/90 hover:-translate-y-0.5",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  variant = "solid",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

export const buttonClass = (variant: Variant = "solid", className?: string) =>
  cn(base, variants[variant], className);

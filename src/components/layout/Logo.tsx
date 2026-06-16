import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Royal Cars, domů">
      <span className="relative flex h-9 w-9 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-110" />
        <span className="absolute inset-[3px] rounded-full border border-white/30" />
        <span className="relative text-[13px] font-bold text-white">R</span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-bold tracking-tight",
            dark ? "text-white" : "text-ink",
          )}
        >
          Royal Cars
        </span>
        <span
          className={cn(
            "text-[11px] font-medium uppercase tracking-[0.18em]",
            dark ? "text-white/50" : "text-ink-muted",
          )}
        >
          Autoškola Liberec
        </span>
      </span>
    </Link>
  );
}

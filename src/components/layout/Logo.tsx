import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
      aria-label="Royal Cars Liberec, domů"
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={369}
        height={252}
        priority
        className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
      />
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

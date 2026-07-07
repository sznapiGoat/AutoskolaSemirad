"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Send } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Persistent call-to-action bar pinned to the bottom of the viewport on
 * mobile. Phone is the primary conversion path for this audience.
 */
export function MobileCallBar({
  phone = site.phone,
  phoneHref = site.phoneHref,
}: {
  phone?: string;
  phoneHref?: string;
} = {}) {
  const pathname = usePathname();
  const onContact = pathname === "/kontakt";

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-container gap-3">
        <a
          href={phoneHref}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"
        >
          <Phone className="h-4 w-4" />
          {phone}
        </a>
        {!onContact && (
          <Link
            href="/kontakt"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-ink"
          >
            <Send className="h-4 w-4 text-accent" />
            Poptávka
          </Link>
        )}
      </div>
    </div>
  );
}

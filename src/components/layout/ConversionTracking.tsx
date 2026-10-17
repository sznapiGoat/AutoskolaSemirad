"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Counts clicks on phone and e-mail links site-wide as Vercel Analytics
 * custom events, so the dashboard shows enquiries and not just visits.
 * One delegated listener instead of wiring every `tel:` link separately.
 */
export function ConversionTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        track("Kliknutí na telefon", { stranka: window.location.pathname });
      } else if (href.startsWith("mailto:")) {
        track("Kliknutí na e-mail", { stranka: window.location.pathname });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

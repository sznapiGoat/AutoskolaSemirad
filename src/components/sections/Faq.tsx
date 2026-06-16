"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { faqs } from "@/lib/data";

export function Faq({ tone = "muted" }: { tone?: "muted" | "white" }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={tone === "white" ? "bg-bg" : "bg-bg-muted"}>
      <div className="mx-auto grid max-w-container gap-12 py-20 container-px sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Časté dotazy"
            title="Na co se nejčastěji ptáte"
            description="Nenašli jste odpověď? Zavolejte nám, rádi poradíme."
          />
          <Reveal delay={0.1} className="mt-8 hidden lg:block">
            <ButtonLink href="/kontakt" variant="outline">
              Zeptat se přímo
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-bg-muted/60"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-semibold text-ink">
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      isOpen
                        ? "rotate-45 border-accent bg-accent text-white"
                        : "border-line text-ink-muted",
                    )}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pr-12 text-sm leading-relaxed text-ink-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

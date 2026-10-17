"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";

export function Navbar({
  phone = site.phone,
  phoneHref = site.phoneHref,
  logoUrl = null,
}: {
  phone?: string;
  phoneHref?: string;
  logoUrl?: string | null;
} = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Flip the solid navbar background past 50px without a raw scroll listener;
  // the state only changes when the threshold is crossed.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 50));
  useEffect(() => {
    setScrolled(scrollY.get() > 50);
  }, [scrollY]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-line bg-white/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-[72px] max-w-container items-center justify-between container-px">
        <Logo logoUrl={logoUrl} />

        <div className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  active ? "text-accent" : "text-ink hover:text-accent",
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <ButtonLink href="/kontakt">Chci řidičák</ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:bg-bg-muted lg:hidden"
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {scrolled && (
        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
        />
      )}
    </header>

    {/* Rendered outside <header>: its backdrop-blur makes it the containing
        block for fixed descendants, which would pin this overlay to the 72px
        bar instead of the viewport. */}
    <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[72px] z-40 overflow-y-auto bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1.5 px-4 py-5">
              {nav.map((item, i) => {
                const active = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-4 text-xl font-display font-semibold transition-colors",
                        active
                          ? "bg-accent/[0.08] text-accent"
                          : "bg-bg-muted text-ink active:bg-line/60",
                      )}
                    >
                      {item.label}
                      <ChevronRight
                        className={cn(
                          "h-5 w-5 shrink-0",
                          active ? "text-accent" : "text-ink-muted",
                        )}
                      />
                    </Link>
                  </motion.div>
                );
              })}

              <div className="mt-6 flex flex-col gap-4">
                <ButtonLink href="/kontakt" className="w-full">
                  Chci řidičák
                </ButtonLink>
                <a
                  href={phoneHref}
                  className="flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white py-3 text-lg font-semibold text-ink"
                >
                  <Phone className="h-5 w-5 text-accent" />
                  {phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
    </AnimatePresence>
    </>
  );
}

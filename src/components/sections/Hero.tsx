"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

const easeOut = [0.22, 1, 0.36, 1] as const;

const lineVariants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut, delay: 0.15 + i * 0.12 },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-dark">
      <div className="absolute inset-0">
        <SmartImage
          src="/images/hero.jpg"
          alt="BMW X2 autoškoly Royal Cars v Liberci"
          label="BMW X2 exteriér — hero"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-container pb-16 pt-32 container-px">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Autoškola v Liberci
        </motion.span>

        <h1 className="max-w-3xl font-display text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
          <motion.span
            custom={0}
            variants={lineVariants}
            initial="hidden"
            animate="show"
            className="block"
          >
            Jiná liga.
          </motion.span>
          <motion.span
            custom={1}
            variants={lineVariants}
            initial="hidden"
            animate="show"
            className="block text-accent-light"
          >
            Autoškola v Liberci.
          </motion.span>
        </h1>

        <motion.p
          custom={2}
          variants={lineVariants}
          initial="hidden"
          animate="show"
          className="mt-7 max-w-xl text-lg leading-relaxed text-white/70"
        >
          Individuální přístup, BMW X2 a vysoká úspěšnost u zkoušek. Začít
          můžete ihned.
        </motion.p>

        <motion.div
          custom={3}
          variants={lineVariants}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <ButtonLink href="/cenik">
            Zjistit ceny
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/sluzby" variant="outlineDark">
            Více o nás
          </ButtonLink>
        </motion.div>

        <motion.a
          custom={4}
          variants={lineVariants}
          initial="hidden"
          animate="show"
          href={site.phoneHref}
          className="group mt-9 inline-flex items-center gap-3 text-white"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent transition-transform duration-200 group-hover:scale-105">
            <Phone className="h-5 w-5" />
          </span>
          <span className="text-2xl font-semibold tracking-tight">
            {site.phone}
          </span>
        </motion.a>
      </div>
    </section>
  );
}

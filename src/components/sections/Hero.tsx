"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, Star, ShieldCheck, Car } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

const easeOut = [0.22, 1, 0.36, 1] as const;

const lineVariants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut, delay: 0.15 + i * 0.1 },
  }),
};

const trust = [
  { icon: Star, label: "Vysoká úspěšnost u zkoušek" },
  { icon: Car, label: "Výcvik v BMW X2" },
  { icon: ShieldCheck, label: "Splátky bez navýšení" },
];

type HeroProps = {
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
  phoneHref?: string;
};

export function Hero({
  titleLine1 = "Jiná liga.",
  titleLine2 = "Autoškola v Liberci.",
  subtitle = "Individuální přístup, výcvik v BMW X2 a vysoká úspěšnost u zkoušek. Začít můžete prakticky ihned.",
  ctaLabel = "Zjistit ceny",
  ctaHref = "/cenik",
  phone = site.phone,
  phoneHref = site.phoneHref,
}: HeroProps = {}) {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-dark">
      {/* photo layer (falls back to a branded panel when missing) */}
      <div className="absolute inset-0">
        <SmartImage
          src="/images/hero.jpg"
          alt="BMW X2 autoškoly Royal Cars v Liberci"
          label="BMW X2 exteriér"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
      </div>

      {/* animated brand field */}
      <div className="pointer-events-none absolute inset-0">
        <div className="grid-texture grid-texture-mask absolute inset-0 opacity-70" />
        <div className="absolute -left-24 top-1/4 h-[28rem] w-[28rem] animate-float rounded-full bg-accent/30 blur-[120px]" />
        <div className="absolute -right-16 bottom-0 h-[24rem] w-[24rem] animate-float-slow rounded-full bg-accent-light/20 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-dark to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-container pb-20 pt-32 container-px">
        <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-[5.25rem]">
          <motion.span custom={0} variants={lineVariants} initial="hidden" animate="show" className="block">
            {titleLine1}
          </motion.span>
          <motion.span
            custom={1}
            variants={lineVariants}
            initial="hidden"
            animate="show"
            className="block bg-gradient-to-r from-accent-light via-accent to-accent-light bg-clip-text text-transparent"
          >
            {titleLine2}
          </motion.span>
        </h1>

        <motion.p
          custom={2}
          variants={lineVariants}
          initial="hidden"
          animate="show"
          className="mt-7 max-w-xl text-lg leading-relaxed text-white/70 text-pretty"
        >
          {subtitle}
        </motion.p>

        <motion.div
          custom={3}
          variants={lineVariants}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <ButtonLink href={ctaHref}>
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <a
            href={phoneHref}
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-white backdrop-blur transition-colors hover:border-white/40"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent transition-transform duration-200 group-hover:scale-110">
              <Phone className="h-4 w-4" />
            </span>
            <span className="text-lg font-semibold tracking-tight">{phone}</span>
          </a>
        </motion.div>

        <motion.ul
          custom={4}
          variants={lineVariants}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-wrap gap-x-7 gap-y-3"
        >
          {trust.map((t) => (
            <li key={t.label} className="flex items-center gap-2.5 text-sm text-white/65">
              <t.icon className="h-4 w-4 text-accent-light" />
              {t.label}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-white/70"
          />
        </div>
      </motion.div>
    </section>
  );
}

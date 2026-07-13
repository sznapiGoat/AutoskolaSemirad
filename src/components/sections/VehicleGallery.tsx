"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { TiltCard } from "@/components/ui/TiltCard";

const easeOut = [0.22, 1, 0.36, 1] as const;

const wipeReveal = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0 round 1rem)" },
  show: (i: number) => ({
    opacity: 1,
    clipPath: "inset(0 0% 0 0 round 1rem)",
    transition: { duration: 0.9, ease: easeOut, delay: i * 0.15 },
  }),
};

/**
 * BMW showcase: wipe-in reveal, scroll parallax (the two photos drift at
 * different speeds for depth) and a reactbits-style 3D tilt + glare on hover.
 */
export function VehicleGallery({
  exteriorSrc = "/images/bmw-x2.jpg",
  interiorSrc = "/images/bmw-x2-interior.jpg",
}: {
  exteriorSrc?: string;
  interiorSrc?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yExterior = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const yInterior = useTransform(scrollYProgress, [0, 1], [72, -24]);

  return (
    <div ref={ref} className="space-y-5">
      <motion.div
        custom={0}
        variants={wipeReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        style={reduceMotion ? undefined : { y: yExterior }}
      >
        <TiltCard className="rounded-2xl">
          <SmartImage
            src={exteriorSrc}
            alt="BMW X2 autoškoly Royal Cars"
            label="BMW X2 exteriér"
            width={880}
            height={620}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[7/5] w-full rounded-2xl object-cover"
          />
        </TiltCard>
      </motion.div>
      <motion.div
        custom={1}
        variants={wipeReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        style={reduceMotion ? undefined : { y: yInterior }}
      >
        <TiltCard className="rounded-2xl">
          <SmartImage
            src={interiorSrc}
            alt="Červený interiér BMW X2"
            label="BMW X2 interiér"
            width={880}
            height={420}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[16/7] w-full rounded-2xl object-cover"
          />
        </TiltCard>
      </motion.div>
    </div>
  );
}

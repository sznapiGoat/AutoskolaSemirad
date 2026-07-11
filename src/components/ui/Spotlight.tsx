"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Soft light that follows the cursor across the parent section, in the style
 * of reactbits' Spotlight. Drop it inside any `relative overflow-hidden`
 * container; it listens on the parent so buttons above it stay clickable.
 * Pointer-driven only (inert on touch) and disabled for reduced motion.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  const spring = { stiffness: 120, damping: 22, mass: 0.6 };
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);
  const background = useTransform(
    [x, y],
    ([cx, cy]) =>
      `radial-gradient(28rem circle at ${cx}px ${cy}px, rgba(255,255,255,0.14), rgba(255,255,255,0.05) 45%, transparent 70%)`,
  );

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent || reduceMotion) return;

    function onMove(e: globalThis.MouseEvent) {
      const rect = parent!.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
      setActive(true);
    }
    function onLeave() {
      setActive(false);
    }

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [reduceMotion, x, y]);

  if (reduceMotion) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={{ background }}
      className={
        "pointer-events-none absolute inset-0 transition-opacity duration-500 " +
        (active ? "opacity-100" : "opacity-0")
      }
    />
  );
}

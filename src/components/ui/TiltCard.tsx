"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** max tilt in degrees */
  maxTilt?: number;
};

/**
 * 3D tilt card with a cursor-following glare, in the style of reactbits'
 * TiltedCard. Pointer-driven only, so it stays inert on touch devices, and
 * it disables itself entirely for prefers-reduced-motion users.
 */
export function TiltCard({ children, className, maxTilt = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const px = useMotionValue(0.5); // pointer position, 0..1
  const py = useMotionValue(0.5);

  const spring = { stiffness: 160, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), spring);
  const scale = useSpring(1, spring);

  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(farthest-corner at ${x} ${y}, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 42%, transparent 68%)`,
  );

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseEnter() {
    if (reduceMotion) return;
    scale.set(1.02);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
    scale.set(1);
  }

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className={cn("relative isolate will-change-transform", className)}
      >
        {children}
        {/* glare sweep */}
        <motion.div
          aria-hidden="true"
          style={{ background: glareBackground }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      </motion.div>
    </div>
  );
}

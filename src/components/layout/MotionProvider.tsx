"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Honors the visitor's prefers-reduced-motion setting for all framer animations. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

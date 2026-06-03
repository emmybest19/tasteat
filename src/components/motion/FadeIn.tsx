"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Animates in on mount (for above-the-fold content like the hero). */
export default function FadeIn({
  children,
  className,
  delay = 0,
  x = 0,
  y = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

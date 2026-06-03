"use client";

import { motion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Wraps every page. Re-mounts on navigation (templates get a unique key),
 *  giving each route a soft cross-fade in. A pure opacity fade (no vertical
 *  shift) keeps navigation smooth instead of "jumping". MotionConfig also
 *  honors the user's "reduce motion" OS setting app-wide. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ willChange: "opacity" }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

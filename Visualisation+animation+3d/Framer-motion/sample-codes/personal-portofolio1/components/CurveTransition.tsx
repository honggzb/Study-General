"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  /** Optional: background color of the wipe */
  color?: string;
  /** Optional: animation duration in seconds */
  duration?: number;
};

/**
 * A curved SVG "wipe" overlay that:
 * - starts as "covering" the screen
 * - animates to "revealed" on enter
 * - animates back to "covering" on exit
 */
export default function CurveTransition({
  color = "#0b1220",
  duration = 0.75,
}: Props) {
  const shouldReduceMotion = useReducedMotion();

  // Path commands must match for smooth morphing.
  // viewBox is 0..100 so it scales to any screen.
  /*
    Smaller number → deeper curve
    Larger number → flatter curve
  */
  /* 1.top →  bottom */
  //const openPath = "M0 0 H100 V100 Q50 80 0 100 V0 Z";   // covers screen with a curved bottom edge
 //deeper curve (pulls the curve upward more)
  const openPath = "M0 0 H100 V100 Q50 60 0 100 V0 Z";
  const closedPath = "M0 0 H100 V0 Q50 0 0 0 V0 Z";      // collapsed to the top (reveals page)

  if (shouldReduceMotion) return null;

  const pathVariants = {
    initial: { d: openPath },
    animate: {
      d: closedPath,
      transition: { duration, ease: [0.22, 1, 0.36, 1] }, // easeOutCubic-ish
    },
    exit: {
      d: openPath,
      transition: { duration: duration * 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  return (
    <motion.svg
      aria-hidden="true"
      focusable="false"
      // Full-screen overlay
      className="absolute inset-0 w-screen h-screen left-0 right-0 top-0 bottom-0 pointer-events-none z-99"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path
        fill={color}
        variants={pathVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />
    </motion.svg>
  );
}
"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSfx } from "./useSfx";

type DoorTransitionProps = {
  /** Color of the doors */
  color?: string;
  /** Duration (seconds) */
  duration?: number;
  /** Optional: add a subtle center seam/glow */
  seam?: boolean;
// Sound sources (optional)
  closeSfxSrc?: string;
  openSfxSrc?: string;
  // Sound volume (0..1)
  sfxVolume?: number;

};

export default function CloseDoorTransition({
  color = "#1b4a2c",
  duration = 0.75,
  seam = true,
  closeSfxSrc = "/sounds/door-close.mp3",
  openSfxSrc = "/sounds/door-open.mp3",
  sfxVolume = 0.7,

}: DoorTransitionProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  const closeSfx = useSfx(closeSfxSrc, { volume: sfxVolume });
  const openSfx = useSfx(openSfxSrc, { volume: sfxVolume });
  // Track whether we're currently running enter or exit animations.
  // "enter": initial -> animate (doors opening)
  // "exit": animate -> exit (doors closing)
  const phaseRef = React.useRef<"enter" | "exit">("enter");


  // Doors are 50vw each. Open state pushes them off-screen.
  const leftDoor = {
    initial: { x: "0%" },        // closed (covering left half)
    animate: { x: "-100%" },     // open (slides left off-screen)
    exit: { x: "0%" },           // close on route exit
  };

  const rightDoor = {
    initial: { x: "0%" },        // closed (covering right half)
    animate: { x: "100%" },      // open (slides right off-screen)
    exit: { x: "0%" },           // close on route exit
  };

  const transition = {
    duration,
    ease: [0.22, 1, 0.36, 1], // smooth easeOut-like curve
  } as const;

  return (
    <div aria-hidden="true" className="fixed inset-0 z-90 pointer-events-none overflow-hidden">
      {/* Left door */}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={leftDoor}
        transition={transition}
        onAnimationStart={() => {
          // Framer Motion will trigger this for both enter and exit.
          // We determine phase by observing current x target:
          // - When exiting, AnimatePresence triggers exit state.
          // - A reliable trick: set phase to "exit" via onExitStart on wrapper (see Template below).
          if (phaseRef.current === "exit") closeSfx.play();
          else openSfx.play();
        }}

        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "50vw",
          background: color,
          boxShadow: "inset -18px 0 30px rgba(0,0,0,0.35)"
        }}
      />

      {/* Right door */}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={rightDoor}
        transition={transition}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "50vw",
          background: color,
          boxShadow: "inset 18px 0 30px rgba(0,0,0,0.35)"
        }}
      />

      {/* Optional seam line in the center (adds “door” realism) */}
      {seam && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: duration * 0.8, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 2,
            transform: "translateX(-1px)",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.18), rgba(255,255,255,0.05), rgba(255,255,255,0.18))",
            filter: "blur(0.2px)",
          }}
        />
      )}
      {/* Expose a way for the parent to set phase (see Template usage below) */}
      <PhaseSetter setPhase={(p) => (phaseRef.current = p)} />
    </div>
  );
}


/**
 * Small helper component so the parent can toggle "enter/exit" phase
 * via a window event (keeps DoorTransition self-contained).
 */
function PhaseSetter({ setPhase }: { setPhase: (p: "enter" | "exit") => void }) {
  React.useEffect(() => {
    const onEnter = () => setPhase("enter");
    const onExit = () => setPhase("exit");

    window.addEventListener("door:enter", onEnter);
    window.addEventListener("door:exit", onExit);

    return () => {
      window.removeEventListener("door:enter", onEnter);
      window.removeEventListener("door:exit", onExit);
    };
  }, [setPhase]);

  return null;
}

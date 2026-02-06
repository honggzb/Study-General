"use client";

import { motion, useAnimate } from "motion/react";
import { useState } from "react";

/**
 *
 * Framer Motion : Animation Sequences 3
 * https://motion.dev/docs/animate#timeline-sequences
 */


const ChangeNumber = () => {

  const [scope, animate] = useAnimate();
  const [numberText, setNumberText] = useState<string>("");

  const numberAnimating = () => {
    animate(0, 100, {
        duration: 2,
        ease: "circOut",
        onUpdate: (latest) => setNumberText(Math.round(latest).toString()),
    })
  }

  return (
    <div ref={scope} className="relative flex flex-col items-center h-screen bg-neutral-900 justify-center">
      <button onClick={numberAnimating} className="flex items-center justify-center h-20 w-100 rounded-lg bg-linear-to-r from-purple-500 via-violet-600 to-indigo-500 text-white font-medium">Start counting</button>
      <motion.div className="text-white text-4xl mt-4">{numberText}</motion.div>
    </div>
  )
}

export default ChangeNumber
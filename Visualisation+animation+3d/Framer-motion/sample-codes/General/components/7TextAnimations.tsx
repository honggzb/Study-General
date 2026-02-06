"use client";

import { AnimatePresence, motion, stagger, useAnimate } from "motion/react";
import { div } from "motion/react-client";
import { useEffect, useRef, useState } from "react";

/**
 *
 * Framer Motion : 3 must know Text Animation
 */

const TextAnimations = () => {

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center m-auto gap-3">
      {/* slide and fadin effect */}
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="font-bold text-4xl"
      >
        The code creative!
      </motion.div>
      {/* typewrite effect, the display cannot be flex */}
      <div className="">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="font-bold text-4xl overflow-hidden whitespace-nowrap"
        >
          The code creative!
        </motion.div>
      </div>
      {/* text color animation effect */}
      <motion.div
          initial={{ color: "#333333" }}
          animate={{ color: ["#6a9bd1", "#4c6ef5", "#1a3e96", "#ff0000", "#c7e11f", "#0008ff"] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="font-bold text-4xl"
        >
          The code creative!
      </motion.div>
    </div>
  )
}

export default TextAnimations

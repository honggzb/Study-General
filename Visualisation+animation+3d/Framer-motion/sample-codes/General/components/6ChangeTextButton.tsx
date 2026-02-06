"use client";

import { motion, useAnimate } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 *
 * Framer Motion : Animation Sequences 2
 * https://motion.dev/docs/animate#timeline-sequences
 */


const ChangeTextButton = () => {

  const [scope, animate] = useAnimate();
  const [numberText, setNumberText] = useState<string>("");

  const sequence: any = [
    [".loader", { opacity: [0, 1], width: "2rem" },  {duration: 0.1 }],
    [".loader", { rotate: 360 * 4 }, {duration: 2 }],
    [".loader", { opacity: [1, 0], scale: 0 }, {duration: 0.1 }],
    [".text", { display: "none" }, {duration: 0.1 }],
    ["button", { width: "5rem", borderRadius: "1000px" }, {duration: 0.3 }],
    ["button", { opacity: 1, scale: [0,1.2,0.8,1] }, {duration: 0.8 }],
    ["button", { backgroundImage: "linear-gradient(to right, #00ff99, #00ccff" }, {duration: 0.8 }],
    [".check-icon",{ opacity: [0, 1]}, {duration: 0.1, at: "-0.4" }],
    [".check-icon path",{ pathLength: 1 }, {duration: 0.3, type: "tween", ease: "easeOut" }]
  ];

  const startAnimating = async () => {
    //animate(sequence);
    animate(
      ".loader",
      { opacity: [0, 1], width: "2rem" },
      {duration: 0.1 }
    );
    await animate(
      ".loader",
      { rotate: 360 * 4 },
      {duration: 2 }
    );
    animate(
      ".loader",
      { opacity: [1, 0], scale: 0 },
      {duration: 0.1 }
    );
    animate(
      ".text",
      { display: "none" },
      {duration: 0.1 }
    );
    await animate(
      "button",
      { width: "5rem", borderRadius: "1000px" },
      {duration: 0.3 }
    );
    await animate(
      "button",
      { opacity: 1, scale: [0,1.2,0.8,1] },
      {duration: 0.8 }
    );
    animate(
      "button",
      { backgroundImage: "linear-gradient(to right, #00ff99, #00ccff" },
      {duration: 0.8 }
    );
    animate(
      ".check-icon",
      { opacity: [0, 1] },
      {duration: 0.1, at: "-0.4"  }
    );
    animate(
      ".check-icon path",
      { pathLength: 1 },
      {duration: 0.3, type: "tween", ease: "easeOut" }
    );
  }

  return (
    <div ref={scope} className="relative flex items-center h-screen bg-neutral-900 justify-center">
      <motion.button
        onClick={startAnimating}
        style={{ width: "30rem" }}
        className="flex items-center justify-center h-20 rounded-lg bg-linear-to-r from-purple-500 via-violet-600 to-indigo-500 text-white font-medium"
      >
        <motion.svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="loader h-5 w-5 text-white"
        initial={{ width:"0rem" }}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 3a9 9 0 1 0 9 9" />
      </motion.svg>
      <span className="text">Purchase now ($169)</span>
      </motion.button>
      {/* <motion.div
        style={{ opacity: 0, scale: 0 }}
        className="spinning-circle absolute inset-0 m-auto h-20 w-20 rounded-full bg-green-500"
      ></motion.div> */}

      <motion.svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="#FFFFFF"
        strokeWidth={3}
        className="check-icon h-8 w-8 absolute inset-0 m-auto z-80 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <motion.path
          initial={{ pathLength: 0 }}
          transition={{ duration: 0.3, type: "tween", ease: "easeInOut"}}
          strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </motion.svg>
    </div>
  )
}

export default ChangeTextButton
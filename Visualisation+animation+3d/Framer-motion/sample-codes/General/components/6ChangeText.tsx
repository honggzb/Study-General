"use client";

import { AnimatePresence, motion, stagger, useAnimate } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 *
 * Framer Motion : Animation Sequences 1
 *
 */

const ChangeText = () => {
  const [scope, animate] = useAnimate();   // usAnimate hook
  const text = "Welcome to Fxx Cxxx. Voluptate aliqua magna excepteur voluptate excepteur. Tempor tempor tempor nisi voluptate occaecat in deserunt aliqua ea ipsum est in. Aute cillum incididunt qui esse nulla anim laborum ea reprehenderit voluptate aute officia reprehenderit officia. Aliquip irure excepteur ea excepteur cupidatat id reprehenderit anim.";

  const startAnimating = () => {
    // animate can use id, classname, div
    animate(
      "span",
      { opacity: 1, filter: "blur(0px)", y: 1 },
      { duration: 0.5, ease: "easeInOut", delay: stagger(0.02) })
  }

  // useEffect(() => {
  //   startAnimating();
  // }, []);

  return (
    <div ref={scope} className="text-black max-w-2xl mx-auto font-bold text-4xl mt-20">
      <button
          onClick={startAnimating}
          className="bg-neutral-200 px-4 py-2 rounded-md cursor-pointer active:scale-110 transition duration-200"
      >
          {" "}What is FC?
      </button>
      {/* <motion.span style={{ opacity: 0 }} className="inline-block">
          {text};
      </motion.span> */}
      <AnimatePresence>
        { text.split(" ").map((word, i) => (
          <motion.span
            style={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            key={word+i}
            className="item inline-block"
          >
            {word} &nbsp;
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ChangeText
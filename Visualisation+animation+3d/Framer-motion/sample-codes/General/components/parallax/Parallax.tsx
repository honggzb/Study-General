"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

const Parallax = ({type}: { type: string}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useSpring(scrollYProgress, { damping: 50 });
  const yText = useTransform(y, [0, 1], ["0%", "500%"]);
  const yBg = useTransform(y, [0, 1], ["0%", "10%"]);

  return (
    <div ref={ref}
        style={{ background: type === "services" ? "linear-gradient(180deg, #111132, #0c0c1d)" : "linear-gradient(180deg, #111132, #505064)"}}
    >
        <motion.h1
            className="mx-auto flex justify-center items-center text-7xl"
            style={{ y: yText }}
        >
            {type === "services" ? "What we do?" : "What we did?"}
        </motion.h1>
        <motion.div className="mountains"></motion.div>
        <motion.div
            style={{
                y: yBg,
                backgroundImage: `url(${type === "services" ? "/planets.png" : "/sun.png"})`
            }}
            className="planets"
        ></motion.div>
        <motion.div style={{ x: yBg }} className="stars"></motion.div>
    </div>
  )
}

export default Parallax

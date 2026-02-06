"use client";
/**
 *
 * Framer Motion : basic
 */
import { motion } from 'motion/react';

const AnimateButton = () => {
  return (
    <div
        className='[perpective::1000px] [transform-style:perserve-3d] h-screen w-full bg-neutral-900 flex items-center justify-center'
        // spot background
        style={{
            backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(6,182,212,0.2) 0.5px, transparent 0)`,
            backgroundSize: "8px 8px",
            backgroundRepeat: "repeat",
        }}
    >
        <motion.button
            // initial={{ rotateX: 20, rotateY: 20 }}
            // animate= {{ rotate: [0,10,0] }}
            transition={{
                duration: 0.5,
                ease: "easeInOut"
            }}
            whileHover={{
                rotateX: 25,
                rotateY: 10,
                boxShadow: " 0px 20px 50px rgba(8, 112,184,0.7)",
                y: -5
             }}
            whileTap={ { y: 0 }}
            style={{ translateZ: 100 }}
            className='group relative text-neutral-500 px-12 py-4 rounded-lg bg-black shadow-[0px_1px_2px_0px_rgba(255,255,255,0.1)_inset,0px_-1px_2px_0px_rgba(255,255,255,0.1)_inset]'
        >
            <span className='group-hover:text-cyan-500 transition-colors duration-300'>Subscribe</span>
            <span className='absolute inset-x-0 bottom-px bg-linear-to-r from-transparent via-cyan-500 to-transparent h-px w-3/4 mx-auto'></span>
            <span className='absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 inset-x-0 bottom-px bg-linear-to-r from-transparent via-cyan-500 to-transparent h-1 w-full mx-auto blur-sm'></span>
        </motion.button>
    </div>
  )
}

export default AnimateButton
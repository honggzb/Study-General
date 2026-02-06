"use client";

import { motion } from 'motion/react'

const stairAnimation = {
    initial: { top: "0%" },
    animate: { top: "100%" },
    exit: { top: ["100%", "0%"] }
};

const reverseIndex = (index: number) => {
    const totalsteps = 6;
    return totalsteps - index - 1;
}

const Stairs = () => {
  return (
    <>
        {/* render 6 motion divs, each will have the same animation by stairAnimation object. The delay for each div is  */}
        {[...Array(6)].map((_, index) => {
            return (
                <motion.div
                    key={index}
                    variants={stairAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                        delay: reverseIndex(index) * 0.1,
                    }}
                    className='h-full w-full bg-white relative'
                />
            )
        })}
    </>
  )
}

export default Stairs
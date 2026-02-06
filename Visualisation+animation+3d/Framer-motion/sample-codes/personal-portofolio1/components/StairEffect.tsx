"use client";

import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation';
import Stairs from './Stairs';

const StairEffect = () => {
  const pathname = usePathname();
  return (
    <>
        <AnimatePresence mode='wait'>
            <div key={pathname}>
                <div className='h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-40 flex'>
                    <Stairs />
                </div>
                {/* optional div */}
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{
                        opacity: 0,
                        transition: { duration: 1, ease: "easeInOut", delay: 1,}
                    }}
                    className='h-screen w-screen fixed bg-black top-0 pointer-events-none'
                />
            </div>
        </AnimatePresence>
    </>

  )
}

export default StairEffect
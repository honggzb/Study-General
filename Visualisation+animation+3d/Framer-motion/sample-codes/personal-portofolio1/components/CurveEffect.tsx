"use client";

import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation';
import CurveTransition from './CurveTransition';

const CurveEffect = () => {
  const pathname = usePathname();
  return (
    <>
        <AnimatePresence mode='wait'>
            <div key={pathname}>
                <motion.div
                // Optional subtle content fade/slide to complement the wipe
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: -0, transition: { duration: 0.4 } }}
                    className='h-screen w-screen fixed top-0 bottom-0 left-0 right-0 pointer-events-none z-40 flex'
                >
                    <CurveTransition color="#cc5b5b" duration={0.75} />
                </motion.div>
            </div>
        </AnimatePresence>
    </>

  )
}

export default CurveEffect
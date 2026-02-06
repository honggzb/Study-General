"use client";

import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation';
import CloseDoorTransition from './CloseDoorTransition';

const CloseDoorEffect = () => {
  const pathname = usePathname();
  return (
    <>
        <AnimatePresence mode='wait'>
            <div key={pathname}>
                <div className='h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-40'>
                    <CloseDoorTransition duration={0.55} seam={false} />
                </div>
            </div>
        </AnimatePresence>
    </>

  )
}

export default CloseDoorEffect
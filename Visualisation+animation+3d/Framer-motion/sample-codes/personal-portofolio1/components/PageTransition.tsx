"use client";

import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const PageTransition = ({children}:{ children: ReactNode}) => {
  const pathname = usePathname();
  return (
    <AnimatePresence>
        <div key={pathname}>
            {/* animation transition div */}
            <motion.div
                initial={{ opacity: 1 }}
                animate= {{
                    opacity: 0,
                    transition: { delay: 0.3, duration: 0.4, ease:"easeInOut"},
                }}
                className="h-screen w-screen fixed bg-black top-0 pointer-events-none"
            ></motion.div>
            {children}
        </div>
    </AnimatePresence>
  )
}

export default PageTransition
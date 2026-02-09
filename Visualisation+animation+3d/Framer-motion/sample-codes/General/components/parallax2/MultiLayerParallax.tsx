'use client';

import { motion, useTransform, useScroll } from 'motion/react';
import React, { useRef } from 'react'

const MultiLayerParallax = () => {

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [ 'start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0,1],['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0,1],['0%', '300%']);

  return (
    <div
        ref={ref}
        className='overflow-hidden h-screen w-screen relative grid place-items-center'
    >
        <motion.h1
            style={{ y: textY }}
            className='font-bold text-white text-7xl md:text-9xl relative z-10'
        >
            Parallax
        </motion.h1>
        <motion.div
            className='absolute inset-0 z-0'
            style={{
                backgroundImage: 'url(/image-full.png)',
                backgroundPosition: 'button',
                backgroundSize: 'cover',
                y: backgroundY,
            }}
            >
        </motion.div>
        <div
            className='absolute inset-0 z-20'
            style={{
                backgroundImage: 'url(/image-bottom.png)',
                backgroundPosition: 'button',
                backgroundSize: 'cover',
            }}
            >
        </div>
    </div>
  )
}

export default MultiLayerParallax

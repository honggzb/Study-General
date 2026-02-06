"use client";

import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter, X } from 'lucide-react'

const Sidebar = () => {
  return (
    <motion.div
        initial={{ x: "100%" }}
        whileInView={{ x: 0 }}
        className='absolute top-0 right-0 w-[140px] h-full bg-linear-to-b from-[#f97316]/80 to-[#e86f00]/80 backdrop-blur-sm z-10'
    >
        <div className='w-full h-full flex justify-center items-start text-white '>
            <div className='flex flex-col justify-center items-center gap-6 mt-100'>
                {/* line */}
                <div className='w-1 h-[70px] bg-white'></div>
                <div className='inline-block p-2 rounded-full cursor-pointer border border-white' ><Facebook className='text-2xl'/></div>
                <div className='inline-block p-2 rounded-full cursor-pointer border border-white' ><X className='text-2xl'/></div>
                <div className='inline-block p-2 rounded-full cursor-pointer border border-white' ><Instagram className='text-2xl'/></div>
                <div className='w-1 h-[70px] bg-white'></div>
            </div>
        </div>
    </motion.div>
  )
}

export default Sidebar
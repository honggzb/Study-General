"use client";

import { motion } from 'motion/react';

const WhereToBuy = () => {
  return (
    <div className='p-4 sm:p-8 my-36 bg-white'>
        <div className='grid grid-cols-1 sm:grid-cols-3 place-items-center gap-8'>
            {/* form section */}
            <div className='space-y-8'>
                <motion.h1
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
                    className='text-4xl font-bold text-[#1a1f25] font-serif'
                >
                    Buy our products from anywhere
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className='flex items-center gap-4'
                >
                    <input type="text" placeholder='name' className='input-style w-full lg:w-[150px]' />
                    <input type="email" placeholder='email' className='input-style w-full lg:w-[150px]' />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className='flex items-center gap-4'>
                    <input type="text" placeholder='name' className='input-style w-full lg:w-[150px]' />
                    <input type="email" placeholder='email' className='input-style w-full lg:w-[150px]' />
                </motion.div>
                <button className='bg-[#f97316] w-full text-white px-4 py-2 rounded-md hover:bg-[#e86f00]'>Order</button>
            </div>
            {/* world map */}
            <div className='col-span-2'>
                <motion.img
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10, delay: 1 }}
                    src="./assets/world-map.png"
                    alt=''
                    className='w-full sm:w-[500px] mx-auto' />
            </div>
        </div>
    </div>
  )
}

export default WhereToBuy
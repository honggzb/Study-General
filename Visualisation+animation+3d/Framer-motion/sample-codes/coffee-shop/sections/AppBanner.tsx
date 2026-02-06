"use client";

import { motion } from 'motion/react';

const AppBanner = () => {
  return (
    <div className='p-4 sm:p-8 my-14 bg-white h-full w-full'>
        <div className='bg-[url("@/public/assets/coffee-cover.jpg")] bg-cover bg-center sm:min-h-[400px] sm:flex sm:justify-end sm:items-center rounded-xl'>
          <div className=''>
            <div className='space-y-6 max-w-xl mx-auto'>
              <motion.h1
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
                className='text-2xl text-center sm:text-4xl font-semibold'
              >
                Download the app
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}
                className='text-center sm:px-20'
              >
                Elit anim est eiusmod culpa exercitation dolor aliqua ex minim voluptate laboris cillum. Fugiat est enim est duis nisi velit non dolore aute sunt commodo eu officia aliqua.
              </motion.p>
              {/* images link */}
              <div className='flex justify-center items-center gap-4'>
                <a href="#" className='max-w-[15px] sm:max-w-[120px] md:max-w-[200px] cursor-pointer'>
                  <motion.img
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.4 }}
                    src="./assets/website/app_store.png"
                    alt=""
                  />
                </a>
                <a href="#" className='max-w-[15px] sm:max-w-[120px] md:max-w-[200px] cursor-pointer'>
                  <motion.img
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
                    src="./assets/website/play_store.png"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AppBanner
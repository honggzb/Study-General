"use client";
// https://www.youtube.com/watch?v=pzStWJuCucw&list=PLt2fZkYs6q_lP8nscOwRYxOg41CXOM-gT
import { motion } from 'motion/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useState } from 'react';
import Services from '@/sections/Services';
import WhereToBuy from '@/sections/WhereToBuy';
import AppBanner from '@/sections/AppBanner';

const Hero = () => {

  const [sidebar, setSidebar] = useState<boolean>(false);

  return (
    <main className="bg-[url('@/public/assets/bg-slate.png')] bg-cover bg-center">
      <section className="relative min-h-187.5 w-full">
        <div className="w-full p-4 sm:p-8 text-center">
          <Navbar sidebar={sidebar} setSidebar={setSidebar} />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center min-h-212.5'>
            {/* text content section */}
            <div className='text-[#f1dabf] mt-25 md:mt-0 p-4 space-y-28'>
              <motion.h1
                className='text-7xl font-bold leading-tight ml-14'
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 1 }}
              >
                Blvck Tumbler
              </motion.h1>
              <motion.div
                className='relative'
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 1.2 }}
              >
                <div className='relative z-10 space-y-4'>
                  <h1 className='text-2xl'>Black lifestyel Lovers,</h1>
                  <h1 className='text-sm opacity-55 leading-loose'>
                    Sunt non non consequat ad dolore consequat incididunt consectetur anim in ea. Adipisicing nulla quis qui in enim commodo. Ullamco ut labore commodo enim consectetur eiusmod tempor et et anim. Ut aliqua qui occaecat voluptate commodo proident minim exercitation culpa deserunt ut est laboris irure. Sit irure magna mollit duis esse iquip ut.
                  </h1>
                </div>
                <div className="absolute -top-6 w-[250px] h-[190px] bg-gray-700/25"></div>
              </motion.div>
            </div>
            {/* hero image section */}
            <div className="relative">
              <motion.img
                initial={{ opacity: 0,scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.4 }}
                src="./assets/black.png"
                alt="black"
                className='relative z-40 h-[400px] md:h-[700px] img-shadow'
              />
              {/* orange circle ring */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.8 }}
                className="absolute h-[180px] w-[180px] z-10 top-24 -right-16 border-[#f97316] border-[20px] rounded-full"
              ></motion.div>
              {/* big text */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.8 }}
                className="absolute -top-20 z-1"
              >
                <h1 className="text-[140px] scale-150 font-bold text-[#1a1f25]/40 leading-none">Blvck Tumbler</h1>
              </motion.div>
            </div>
            {/* third div section */}
            <motion.div
              className='text-[#f1dabf] mt-[100px] md:mt-0 p-4 space-y-28'
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: 1.2 }}
            >
              <h1 className='opacity-0 text-7xl font-bold leading-tight ml-14'>Blvck Tumbler</h1>
              <div className=''>
                <div className='relative z-10 space-y-4'>
                  <h1 className='text-2xl'>Blvck Tumbler</h1>
                  <h1 className='text-sm opacity-55 leading-loose'>
                    t ad dolore consequat incididunt consectetur anim in ea. Adipisicing nulla quis qui in enim commodo. Ullamco ut lodo enim con irure. Sit irure magna mollit duis esse iquip ut.
                  </h1>
                </div>
                <div className="absolute -top-6 -right-10 w-[250px] h-[190px] bg-gray-700/50"></div>
              </div>
            </motion.div>
          </div>
        </div>
        <Services />
        <WhereToBuy />
        <AppBanner />
        {sidebar && (<Sidebar />)}
      </section>
    </main>
  )
}

export default Hero

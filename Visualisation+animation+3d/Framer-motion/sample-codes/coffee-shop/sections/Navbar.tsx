"use client";

import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { Dispatch } from 'react';

const Navbar = ({sidebar, setSidebar}: { sidebar: boolean, setSidebar: Dispatch<boolean> }) => {
  return (
    <nav className='absolute top-0 left-0 w-full pt-10 text-white z-40'>
      <div className='p-4 sm:p-8'>
        <div className='flex justify-between items-center'>
          <motion.h1
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
            className='text-2xl font-semibold uppercase'
          >
            <span className='text-[#f97316]'>Coders</span>Coffee.
          </motion.h1>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
          onClick={() => setSidebar(!sidebar)}
          className='absolute right-25 top-20'
        >
          <Menu className='text-3xl cursor-pointer' />
        </motion.div>
      </div>
    </nav>
  )
}

export default Navbar
"use client";

import { useState } from 'react'
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

function Navigation() {
  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <a className="nav-link" href="#home">
          Home
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#about">
          About
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#work">
          Work
        </a>
      </li>
       <li className="nav-li">
        <a className="nav-link" href="#experiences">
          Experiences
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#contact">
          Contact
        </a>
      </li>
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40'>
        <div className='mx-auto c-space max-w-7xl'>
            <div className="flex items-center justify-between py-2 sm:py-0">
                <Link href="/" className='text-xl font-bold transition-colors text-neutral-400 hover:text-white'>HongQ</Link>
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className='flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden'
                >
                    <Image src={isOpen ? "assets/close.svg" : "assets/menu.svg"} alt="toggle" width={24} height={24} />
                </Button>
                <nav className='hidden sm:flex'><Navigation /></nav>
            </div>
        </div>
        {isOpen && (
            <motion.div
                className="block overflow-hidden text-center sm:hidden"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ maxHeight: "100vh" }}
                transition={{ duration: 1 }}
            >
                <nav className="pb-5"><Navigation /></nav>
            </motion.div>
        )}
    </div>
  )
}

export default Navbar
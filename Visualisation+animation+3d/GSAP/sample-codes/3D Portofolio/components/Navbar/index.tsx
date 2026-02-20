"use client";

import { useState } from 'react';
import { navLinks } from '../constant';
import Link from 'next/link';
import { HeartPulseIcon } from 'lucide-react';

const NavItems = ({ onClick }: { onClick?: () => void }) => (
  <ul className="nav-ul">
    {navLinks.map((item, index) => (
      <li key={index} className="nav-li">
        <Link href={item.href} className="nav-li_a" onClick={onClick}>
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <Link href="/" className="flex flex-row text-neutral-400 font-bold text-xl hover:text-white transition-colors">
            <HeartPulseIcon /> <span> xxx</span>
          </Link>
          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu">
            <img src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt="toggle" className="w-6 h-6" />
          </button>
          <nav className="sm:flex hidden">
            <NavItems />
          </nav>
        </div>
      </div>

      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
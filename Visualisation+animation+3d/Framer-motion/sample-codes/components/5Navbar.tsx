"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

/**
 *
 * Framer Motion : Layouts 2
 *  navbar animation
 */

type NavItem = {
    title: string;
    href: string;
}
const navItems: NavItem[] = [
    {
        title: "Home",
        href: "/home"
    },
    {
        title: "About",
        href: "/about"
    },
    {
        title: "Contact",
        href: "/contact"
    },
    {
        title: "Login",
        href: "/login"
    },
]

const Navbar = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="py-40">
        <nav className="max-w-xl mx-auto bg-gray-100 rounded-full px-2 py-1 flex">
            {navItems.map((navItem, idx) => (
                <Link
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                    href={navItem.href}
                    key={navItem.title}
                    className="relative w-full text-center text-xs text-neutral-500 py-3 hover:text-white"
                >
                    {hovered === idx && (
                        <motion.div
                            layoutId="hover"
                            className="absolute inset-0 rounded-full w-full h-full bg-black"
                        ></motion.div>
                    )}
                    <span className="relative">{navItem.title}</span>
                </Link>
            ))}
        </nav>
    </div>
  )
}

export default Navbar
import { Gamepad2, Menu, X, Youtube } from 'lucide-react';
import React from 'react'

const socialLinks = [
  { href: "https://discord.com", icon: <Gamepad2 /> },
  { href: "https://twitter.com", icon: <X /> },
  { href: "https://youtube.com", icon: <Youtube /> },
  { href: "https://medium.com", icon: <Menu /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#b8b2f3] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          ©2026. All rights reserved
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <a href="#privacy-policy" className="text-center text-sm font-light hover:underline md:text-right">
          Privacy Policy
        </a>
      </div>
    </footer>
  )
}

export default Footer
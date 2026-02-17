import Link from 'next/link'
import React, { ReactNode } from 'react'
import { Bounded } from './Bounded';
import { Boxes } from 'lucide-react';

type FooterLinkProps = {
  href: string;
  children: ReactNode;
};

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="text-sm transition-colors hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
    >
      {children}
    </Link>
  );
}

const Footer = () => {
  return (
    <Bounded className="bg-black text-gray-400">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="shrink-0">
            <Boxes className="h-8 w-auto" />
            <span className="sr-only">Nimbus home</span>
          </Link>
          <p className="mt-4 text-center text-sm md:text-left">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-end">
          <FooterLink href="#keyboard-features">Features</FooterLink>
          <FooterLink href="#switch-playground">Playground</FooterLink>
          <FooterLink href="#keycap-changer">Keycap Changer</FooterLink>
          <FooterLink href="#buy-button">Buy</FooterLink>
        </nav>
      </div>
    </Bounded>
  )
}

export default Footer


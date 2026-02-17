import { Link } from 'next-view-transitions';
import React, { ReactNode } from 'react'
import Image from 'next/image';

type NavGroupProps = {
  title: string;
  children?: ReactNode;
};

const NavGroup = ({ title, children }: NavGroupProps) => (
  <nav aria-labelledby={`${title.toLowerCase()}-heading`}>
    <h3 id={`${title.toLowerCase()}-heading`} className="mb-6 text-xl font-medium">
      {title}
    </h3>
    <ul className="space-y-4" role="list">
      {children}
    </ul>
  </nav>
);

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <li>
      <Link href={href} className="hover:text-gray-300">
        {children}
      </Link>
    </li>
  );
};

const Footer = () => {
  return (
    <footer aria-labelledby="footer-heading" className="bg-black py-16">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <NavGroup title="Shop">
            <NavLink href="/fragrance/terra">Terra</NavLink>
            <NavLink href="/fragrance/igni">Igni</NavLink>
            <NavLink href="/fragrance/aqua">Aqua</NavLink>
          </NavGroup>

          <NavGroup title="About">
            <NavLink href="#">Science</NavLink>
            <NavLink href="#">Our Story</NavLink>
            <NavLink href="#">Côte Royale</NavLink>
          </NavGroup>

          <NavGroup title="Social">
            <NavLink href="#">Instagram</NavLink>
            <NavLink href="#">X (Twitter)</NavLink>
            <NavLink href="#">Facebook</NavLink>
          </NavGroup>
        </div>

        {/* Bottom footer */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-neutral-800 pt-8 md:flex-row">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Inc. All rights reserved
          </p>
          <Link href="/"
            aria-label="Côte Royale Home"
            className="order-first md:order-none"
          >
            <Image src="/logo.svg" alt="CÔTE ROYALE" width={50} height={25} />
          </Link>
          <ul aria-label="Legal" className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Terms &amp; conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer


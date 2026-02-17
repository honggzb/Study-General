"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Link } from "next-view-transitions";
import { NAVIGATION_LINK } from "./constant";

type NavIconsProps = {
  className?: string;
  tabIndex?: number;
};

const NavIcons = ({ className = "", tabIndex }: NavIconsProps) => (
  <div className={clsx("flex items-center gap-8", className)}>
    <a href="#" className="text-white" aria-label="Search" tabIndex={tabIndex}>
      <Search size={24} />
    </a>
    <a href="#" className="text-white" aria-label="Account" tabIndex={tabIndex}>
      <User size={24} />
    </a>
    <a href="#" className="text-white" aria-label="Cart" tabIndex={tabIndex}>
      <ShoppingBag size={24} />
    </a>
  </div>
);

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header>
      <div className="navbar fixed top-0 left-0 z-50 w-full bg-black text-white">
        <div className="flex items-center justify-between p-2 md:p-4">
          <button onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label="Menu"
            className="cursor-pointer p-2 text-white transition-colors duration-300 hover:bg-white/20"
          >
            <Menu size={24} />
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <Link href="/">
              <Image src="/logo.svg" alt="Côte Royale Paris" width={30} height={30} />
            </Link>
          </div>

          <div className="flex">
            <NavIcons className="hidden md:flex" />
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "nav-drawer-blur fixed inset-0 z-40 bg-black/40 opacity-0 transition-all duration-500",
          isDrawerOpen
            ? "pointer-events-auto opacity-100 backdrop-blur-xs"
            : "pointer-events-none backdrop-blur-none",
        )}
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        aria-hidden="true"
      />
      {/* sidebar */}
      <div
        className={clsx(
          "nav-drawer fixed top-0 left-0 z-50 h-full w-72 bg-neutral-900 p-6 transition-transform duration-500",
          isDrawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
        role="dialog"
        aria-modal={isDrawerOpen}
      >
        <div className="mb-6 flex justify-end">
          <button
            className="p-2 text-white transition-colors duration-300 hover:bg-white/10"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label="Close Menu"
            tabIndex={isDrawerOpen ? 0 : -1}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-4" aria-label="Main Navigation">
          {NAVIGATION_LINK.map((link, index) => (
            <Link
              href={link.link}
              onClick={() => setIsDrawerOpen(false)}
              key={index}
              className="block border-b border-white/10 py-2 text-xl font-semibold tracking-wide text-white uppercase hover:text-gray-300"
              tabIndex={isDrawerOpen ? 0 : -1}
            >{link.name}</Link>
          ))}
          <div className="pt-4 md:hidden">
            <NavIcons
              className="justify-around"
              tabIndex={isDrawerOpen ? 0 : -1}
            />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar;

type NavbarLinkProps = {
  href: string;
  title: string;
  description: string;
};

function NavbarLink({ href, title, description }: NavbarLinkProps) {

  return (
    <li>
      <Link
        href={href}
        className="group flex items-center rounded-xl p-4 hover:bg-[#01A7E1]/10 motion-safe:transition"
      >
        <div className="flex grow flex-col gap-1">
          <span className="text-xl font-semibold text-gray-900 group-hover:text-[#01A7E1] motion-safe:transition">
            {title}
          </span>
          <span className="text-sm text-gray-500">{description}</span>
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400 group-hover:bg-[#01A7E1] group-hover:text-white motion-safe:transition">
          <ChevronRight className="size-5 translate-x-px" />
        </div>
      </Link>
    </li>
  );
}
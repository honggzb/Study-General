"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { links } from './constants';

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className='flex gap-8'>
        {links.map((link,index) => {
          return (
            <Link href={link.path} key={link.name+link.path} className={`${link.path === pathname && "text-[#00ff99] border-b-2 border-[#00ff99]"} capitalize font-medium hover:text-[#e4f52b] transition-all`}>
                {link.name}
            </Link>
          )
        })}
    </nav>
  )
}

export default Nav
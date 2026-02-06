"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { links } from './constants';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';

const MobileNav = () => {
  const pathname = usePathname();
  return (
   <Sheet>
    <SheetTrigger className='flex justify-center items-center'>
        <Menu className='text-[32px] text-[#07e6fe]' />
    </SheetTrigger>
    <SheetContent className='flex flex-col'>
        <SheetTitle className="sr-only">menu</SheetTitle>
        <div className='mt-32 mb-40 text-center text-2xl'>
            <Link href="/">
                <h1 className='text-4xl font-semibold'>Hong<span className='text-blue-400'>.</span></h1>
            </Link>
        </div>
        <nav className='flex flex-col justify-center items-center gap-8'>
            {links.map((link, index) => {
            return (
                <Link href={link.path} key={link.name+link.path} className={`${link.path === pathname && "text-[#00ff99] border-b-2 border-[#00ff99]"} capitalize font-medium hover:text-[#e4f52b] transition-all`}>
                    {link.name}
                </Link>
            )
            })}
        </nav>
    </SheetContent>
   </Sheet>
  )
}

export default MobileNav
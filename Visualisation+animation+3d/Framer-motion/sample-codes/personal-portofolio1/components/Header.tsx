import Link from 'next/link'
import React from 'react'
import Nav from './Nav'
import { Button } from './ui/button'
import MobileNav from './MobileNav'

const Header = () => {
  return (
    <header className='py-8 xl:py-12 text-white'>
        <div className='flex justify-between items-center mx-auto p-8'>
            <Link href="/">
                <h1 className='text-4xl'>Hong<span className='text-blue-400'>.</span></h1>
            </Link>
            {/* desktop */}
            <div className='hidden xl:flex items-center gap-6'>
                <Nav />
                <Link href="/contact" className='cursor-pointer'>
                    <Button className='bg-[#099dae] hover:bg-[#099dae]/80'>Hire me</Button>
                </Link>
            </div>
            {/* mobile */}
            <div className='xl:hidden'>
                <MobileNav />
            </div>
        </div>
    </header>
  )
}

export default Header
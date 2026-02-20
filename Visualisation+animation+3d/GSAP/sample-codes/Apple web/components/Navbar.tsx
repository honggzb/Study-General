import Image from 'next/image';
//import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from './constants';

const Navbar = () => {
  return (
    <header className="w-screen py-5 sm:px-10 px-5 flex flex-col justify-between items-center gap-6">
      <nav className="flex w-screen">
        <Image src="/assets/images/apple.svg" alt="Apple" width={14} height={18} />

        <div className="flex flex-1 justify-center max-sm:hidden gap-6 mt-10">
          {navLists.map((nav) => (
            <div key={nav} className="px-5 text-sm cursor-pointer text-gray-300 hover:text-white transition-all">
              {nav}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <Image src="/assets/images/search.svg" alt="search" width={18} height={18} />
          <Image src="/assets/images/bag.svg" alt="bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
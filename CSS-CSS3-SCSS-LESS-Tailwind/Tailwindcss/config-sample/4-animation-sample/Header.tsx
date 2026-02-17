import Link from "next/link"


const Header = () => {
  return (
    <header className="flex w-full justify-center items-center relative top-3 z-10">
        <nav className="flex gap-1 p-0.5 border border-white/15 bg-white/10 backdrop-blur rounded-full">
          <Link href="/" className="nav-item">Home</Link>
          <Link href="/projects" className="nav-item">Projects</Link>
          <Link href="/about" className="nav-item">About</Link>
          <Link href="/contact" className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900">Contact</Link>
        </nav>
    </header>
  )
}

export default Header

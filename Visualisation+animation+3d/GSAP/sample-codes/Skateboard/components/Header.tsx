import Link from "next/link";
import { ButtonLink } from "./ButtonLink";
import { Logo } from "./Logo";
import { NAVIGATION_LINK } from "./constant";

const Header = async () => {
  return (
    <header className="header absolute left-0 right-0 top-0 z-50 ~h-32/48 ~px-4/6 ~py-4/6 hd:h-32">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-3 items-center gap-6 md:grid-cols-[1fr,auto,1fr]">
            <Link href="/" className="justify-self-start">
                <Logo className="h-24" />
            </Link>
            <nav aria-label="Main" className="col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1">
                <ul className="flex flex-wrap items-center justify-center gap-8">
                    {NAVIGATION_LINK.map((navlink, index) => {
                    return (
                        <li key={navlink.name+index}>
                            <Link href={navlink.link} className="text-lg">{navlink.name}</Link>
                        </li>
                    )
                    })}
                </ul>
            </nav>
            <div className="justify-self-end">
                <ButtonLink icon="cart" color="orange" aria-label="Cart (1)">
                    <span className="md:hidden">1</span>
                    <span className="hidden md:inline">Cart (1)</span>
                </ButtonLink>
            </div>
        </div>
    </header>
  )
}

export default Header
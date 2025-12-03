"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ToggleThemePage from "./toggle-theme";

export function Navbar() {
  const pathname = usePathname();
  console.log(pathname);

  const navigations = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <nav className="flex items-center justify-between h-16 container mx-auto px-2.5">
          <Link className="text-2xl font-semibold" href="/">
            Logo
          </Link>
          <div className="flex items-center justify-center gap-4">
            {navigations.map((navigation) => (
              <Link
                key={navigation.name}
                href={navigation.href}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  pathname === navigation.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {navigation.name}
              </Link>
            ))}
          </div>
          <div>
            <ToggleThemePage />
          </div>
        </nav>
      </header>
    </>
  );
}
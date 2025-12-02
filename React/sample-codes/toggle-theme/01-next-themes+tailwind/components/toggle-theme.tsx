"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const ToggleThemePage = () => {

  const { theme, setTheme } = useTheme()

  return (
      <>
        <button onClick={() => setTheme("light")} className='bg-transparent p-3 hover:bg-zinc-200 rounded-xl text-black dark:text-white'>
          <p>Theme is {theme}</p>
           <Sun />
        </button>
        <button onClick={() => setTheme("dark")} className='bg-transparent p-3 hover:bg-zinc-200 rounded-xl text-black dark:text-white'>
          <p>Theme is {theme}</p>
           <Moon />
        </button>
    </>
  )
}

export default ToggleThemePage

## Theme toggle in NextJS + shadcn + tailwindCSS

```
├─ 📂app/
│  ├─ 📂toggle-test/
│  │   └─ 📄page.tsx
│  ├─ 📄globals.css
│  └─ 📄layout.tsx
├─ 📂components/
│  ├─ 📄theme-provider.tsx
│  └─ 📄toggle-theme.tsx
```

1. `npm install next-themes`
2. add `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));` to 'app\globals.css'
3. Create a theme provider -> 'components/theme-provider.tsx'
4. Wrap theme provider to root layout('app/layout.tsx')
5. Add a mode toggle component 'components/toggle-theme.tsx'
6. use toggle component in other component such as 'app/toggle-test/page.tsx'

```ts
// app\globals.css
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
// components/theme-provider.tsx
"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
//app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>   <!-- add suppressHydrationWarning -->
        <head />
        <body>
        <!-- wrapping with ThemeProvider -->
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
//components/toggle-theme.tsx
"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
const ToggleThemePage = () => {
  const { theme, setTheme } = useTheme()
  return (
      <>
        <button onClick={() => setTheme("dark")} className='bg-transparent p-3 hover:bg-zinc-200 rounded-xl text-black dark:text-white'>
           <Sun />{theme}
        </button>
        <button onClick={() => setTheme("light")} className='bg-transparent p-3 hover:bg-zinc-200 rounded-xl text-black dark:text-white'>
           <Moon />{theme}
        </button>
    </>
  )
}
export default ToggleThemePage
// app/toggle-test/page.tsx
```

> https://ui.shadcn.com/docs/dark-mode/next
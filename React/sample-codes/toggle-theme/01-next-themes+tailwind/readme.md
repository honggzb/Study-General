## Theme toggle in NextJS + shadcn + tailwindCSS

```
├─ 📂app/
│  ├─ 📂toggle-test/
│  │   └─ 📄page.tsx
│  ├─ 📄globals.css
│  ├─ 📄page.tsx
│  └─ 📄layout.tsx
├─ 📂components/
│  ├─ 📄Navbar.tsx
│  ├─ 📄theme-provider.tsx
│  └─ 📄toggle-theme.tsx
```

1. `npm install next-themes`
2. Create a theme provider -> 'components/theme-provider.tsx'
3. Wrap theme provider to root layout('app/layout.tsx')
4. Add a mode toggle component 'components/toggle-theme.tsx'
    1. <-- `useTheme` from next-themes
    2. using `dark:scale-0` and `dark:scale-100` to switch sun/moon icon
5. use toggle component in other component such as 'app/toggle-test/page.tsx'

```ts
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
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>   <!-- add suppressHydrationWarning -->
        <head />
        <body>
        <!-- wrapping with ThemeProvider -->
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
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
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const ToggleThemePage = () => {
  const { theme, setTheme } = useTheme();
  return (
      <>
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} >
            <Sun className=" size-5 transition-all scale-0 rotate-0 dark:rotate-90 dark:scale-100" />
            <Moon className="size-5 absolute transition-all scale-100 rotate-0 dark:rotate-0 dark:scale-0" />
        </Button>
    </>
  )
}
export default ToggleThemePage
// app/toggle-test/page.tsx
//components/Navbar.tsx
<div><ToggleThemePage /></div>
```

> https://ui.shadcn.com/docs/dark-mode/next

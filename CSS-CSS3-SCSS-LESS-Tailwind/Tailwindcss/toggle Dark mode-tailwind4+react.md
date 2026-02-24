## toggle Dark mode - tailwind 4 + react

1. modify 'global.css'
    - `@custom-variant dark (&:where(.dark, .dark *));`  -->  Enable class-based dark mode (default is media query)
    - https://tailwindcss.com/docs/dark-mode
2. Create the Theme Switcher Component
3. Prevent Flash of Inaccurate Color (FOUC) --> add `suppressHydrationWarning` to 'layout.tsx'
     - To prevent the page from flashing white before switching to dark mode

```ts
/* app/globals.css */
@import "tailwindcss";
/* Enable class-based dark mode (default is media query) */
@custom-variant dark (&:where(.dark, .dark *));
// components/ThemeToggle.tsx
'use client';
import { useEffect, useState } from 'react';
export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    // Check local storage or system preference on load
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };
  return (
    <button onClick={toggleDarkMode} className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
      // {darkMode ? '🌙 Dark' : '☀️ Light'}
      // dark-mode flash issue
      // https://medium.com/@giolvani/how-i-finally-conquered-dark-mode-in-next-js-tailwind-67c12c685fb4
      <SunIcon className="hidden [html.dark_&]:block" />
      <MoonIcon className="hidden [html.light_&]:block" />
    </button>
  );
}
// app/layout.tsx
export default function RootLayout({children,
}: {children: React.ReactNode) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
```

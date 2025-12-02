[Toggling dark mode manually](#top)


## 1. Configure Tailwind CSS

- Tailwind 4 instead of `dark:*` utilities being applied based on `prefers-color-scheme`, they will be applied whenever the dark class is present earlier in the HTML tree

```ts
// globals.css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

## 2. Create the Theme Context

- Create a ThemeProvider component using React Context and useState to manage the theme state (light/dark) and persist it in localStorage.

```ts
// src/context/ThemeContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Get initial theme from local storage or system preference
  const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('color-theme') as Theme;
      if (storedPrefs) {
        return storedPrefs;
      }
      // Fallback to system preference
      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) {
        return 'dark';
      }
    }
    return 'light'; // Default theme
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove previous theme class and add the current one
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    // Persist the theme
    localStorage.setItem('color-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

[⬆ back to top](#top)

## 3. Wrap Application with the ThemeProvider

```ts
// src/index.tsx or src/App.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import './index.css'; // Your main CSS file with tailwind directives
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

[⬆ back to top](#top)

## 4. Create the Toggle Component

```ts
// src/components/ThemeToggleButton.tsx
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react'; // Example icons (install lucide-react)

const ThemeToggleButton = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('ThemeToggleButton must be used within a ThemeProvider');
  }
  const { theme, toggleTheme } = context;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};
export default ThemeToggleButton;
```

[⬆ back to top](#top)

## 5. Use the Toggle in App

```ts
// src/App.tsx
import React from 'react';
import ThemeToggleButton from './components/ThemeToggleButton';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <header className="p-4 flex justify-between items-center shadow-md dark:shadow-none">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Theme Toggle Demo</h1>
        <ThemeToggleButton />
      </header>
      <main className="p-8">
        <p className="text-gray-700 dark:text-gray-300">
          This content changes based on the current theme. The toggle button persists your preference in local storage.
        </p>
      </main>
    </div>
  );
}
export default App;
```
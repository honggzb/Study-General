import { useState } from "react";

const themes = ["black", "orange", "purple", "green", "blue"];

export default function Home() {
  const [theme, setTheme] = useState<string>(themes[0]);

  return (
    <main
      className={`flex flex-col gap-16 min-h-screen p-24 bg-bgPrimary theme-${theme}`}
    >
      <div className="flex flex-col">
        <h3 className="font-semibold">Select theme:</h3>
        <div className="flex gap-4">
          {themes.map((t) => (
            <div className="cursor-pointer" key={t} onClick={() => setTheme(t)}>
              {t}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

"use client";

import Link from 'next/link'
import { atom, useAtom } from "jotai";
import { pageAtom, pages } from './state';
import { useEffect } from 'react';
import Image from 'next/image';

const Bookpages = () => {
  const [page, setPage] = useAtom(pageAtom);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return (
    <>
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        <Link
          className="pointer-events-auto mt-10 ml-10"
          href="https://lessons.wawasensei.dev/courses/react-three-fiber"
        >
          <Image className="w-20" src="/images/wawasensei-white.png" alt="xxx xxx" width={80} height={80} />
        </Link>
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-2 max-w-full p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300 px-2 py-2 rounded-full uppercase shrink-0 border ${index === page? "bg-white/90 text-black" : "bg-black/30 text-white"}`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300 px-2 py-2 rounded-full uppercase shrink-0 border ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      <div className="fixed inset-0 flex items-center -rotate-2 select-none">
        <div className="relative">
          <div className="bg-white/0 animate-horizontal-scroll flex items-center gap-8 w-max px-8">
            <h1 className="shrink-0 text-white text-10xl font-black ">
             xxx xxx
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              React Three Fiber
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">
              Three.js
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Ultimate Guide
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              Tutorials
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              Learn
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">
              Practice
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Creative
            </h2>
          </div>
          <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll flex items-center gap-8 px-8 w-max">
            <h1 className="shrink-0 text-white text-10xl font-black ">
              Wawa Sensei
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              React Three Fiber
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">
              Three.js
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline">
              Ultimate Guide
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              Tutorials
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              Learn
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">
              Practice
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Creative
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Bookpages
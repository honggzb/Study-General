"use client";
/**
 *
 *
Build Your Dream 3D Dev Awwwards Portfolio in 2 hours
 * https://www.youtube.com/watch?v=i0229UsdBwc
 * https://github.com/Ali-Sanati/awwwards-portfolio
 *
 * Lenis ("smooth" in latin) is a lightweight, robust, and performant smooth scroll library
 * https://github.com/darkroomengineering/lenis/
 * https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md
 *
*/

"use client";

import ReactLenis from "lenis/react";
import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceSummary from "@/components/ServiceSummary";
import Services from "@/components/Services";
import About from "@/components/About";
import Works from "@/components/Works";
import ContactSummary from "@/components/ContactSummary";
import Contact from "@/components/Contact";

export default function Home() {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);
  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      {!isReady && (
        <div className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <div className={`${isReady ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}>
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <About />
        <Works />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
  );
}

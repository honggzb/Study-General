"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Preload } from '@react-three/drei';
import * as easing from "maath/easing";
import { Astronaut } from '@/components/Astronaut';
import ParallaxBackground from "@/components/ParallaxBackground";
import HeroText from "@/components/HeroText";
import Loader from "@/components/Loader";

const Hero = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
     // Add a listener for changes to the screen size
    // Define a callback function to handle changes to the media query
    const mediaQuery = window.matchMedia("(max-width: 853px)");
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <section id="home" className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
        <HeroText />
        <ParallaxBackground />
        <figure className='absolute inset-0 w-screen h-screen'>
          <Canvas camera={{ position: [0, 1, 3] }}>
            <Suspense fallback={<Loader />}>
              <Float>
                <Astronaut position={isMobile ? [0.5, -2, -4] : [1.5, -2, -4]} />
                {/* <OrbitControls /> */}
              </Float>
            </Suspense>
            <Preload all />
            <Rig />
          </Canvas>
        </figure>
    </section>
  )
}

function Rig() {
  return useFrame((state, delta) => {
    const { mouse } = state;
    easing.damp3(
      state.camera.position,
      [mouse.x / 10, 1 + mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}


export default Hero
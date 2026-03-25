/**
 *
 * Smooth Scroll Image Section Transitions | GSAP ScrollTrigger + Awwwards Tutorial
 * https://www.youtube.com/watch?v=_ogC7D7ncs8
 *
 * lenis:
 * npm i lenis
 *
*/

"use client";

import { useEffect, useRef } from 'react'
import ReactLenis, { LenisRef } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FlowingSection from '../components/FlowingSection'

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <ReactLenis root options={{autoRaf: false}} ref={lenisRef} />
      <FlowingSection />
    </>
  );
}

"use clients";

import ColorChanger from "@/components/ColorChanger";
import Features from "@/components/Features";
import Hero from "@/components/hero";
import Marquee from "@/components/Marquee";
import SwitchPlayground from "@/components/SwitchPlayground";

/**
 *
 * https://prismic.io/courses/nimbus-keyboards
 * Build an Ecommerce Keyboard Website with Three.js, Next.js 15, GSAP, and Prismic - Full Course 2025
 * https://www.youtube.com/watch?v=R7l4uVMWRF0
 * https://github.com/a-trost/nimbus-keyboards
 *
 */

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <SwitchPlayground />
      <Marquee direction={"right"} />
      <ColorChanger />
    </>
  );
}

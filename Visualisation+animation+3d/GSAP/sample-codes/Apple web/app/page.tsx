
/**
 * Build and Deploy an Apple Website with React | Beginner Three.js & GSAP Tutorial
 * https://www.youtube.com/watch?v=kRQbRAJ4-Fs&list=PL6QREj8te1P7d4j3k8Snfa187o-IjXuJx&index=3
 * https://github.com/adrianhajdin/iphone
 *
 * 1. IPhone model cannot rotate
 * 2. need adjusting layout
 * 3. Highlight section'VideoCarousel function is not working: can use other 3th party library to implement the video carousel, such as react-slick or swiper
 *
 */

import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import HowItWork from "@/components/HowItWork";
import Model from "@/components/Model";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="bg-black mt-10 gap6">
      <Navbar />
      <Hero />
      {/* <Highlights /> */}
      <Model />
      <Features />
      <HowItWork />
		</main>
  );
}

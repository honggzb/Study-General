"use client";

import { About } from "@/components/About";
import { BuyNow } from "@/components/BuyNow";
import CanvasContainer from "@/components/CanvasContainer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

/**
 * Learn React Three Fiber + GSAP: Create Stunning 3D Animations for the Web
 * https://www.youtube.com/watch?v=_qzuECf1h2w
 * https://github.com/Thabish-Kader/r3f-scroll/
 */


export default function Home() {
  return (
    <main className="overflow-x-hidden">
			<div className="h-screen w-full fixed top-0 z-10 hidden lg:block">
				<CanvasContainer />
			</div>
			<Header />
			<Hero />
			<About />
			<BuyNow />
		</main>
  );
}

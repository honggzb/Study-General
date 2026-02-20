
/**
 * Build and Deploy 3 Animated Websites with GSAP & Three.js to Land a Job | Full 10 Hour Course
 * https://www.youtube.com/watch?v=41lfYQhUzRs
 * https://github.com/adrianhajdin/award-winning-website
 *
 * npm i react-use
 *   - 100 useful custom React Hooks designed to abstract common patterns and interact with browser APIs
 *   - sensors, side-effects, UI and animation, state and lifecycle, etc.
 *
 * another demo: https://github.com/adrianhajdin/xora/
 *
 */

import Navbar from "@/components/Navbar";
import Hero from "@/components/hero";
import About from "@/components/About";
import Features from "@/components/features";
import Story from "@/components/Story";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
		</main>
  );
}

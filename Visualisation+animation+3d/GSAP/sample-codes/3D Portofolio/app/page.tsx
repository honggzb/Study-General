"use client";

import About from "@/components/About";
import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import WorkExperience from "@/components/Experience";
import Footer from "@/components/Footer";

/**
 * Build & Deploy an Amazing 3D Portfolio with React.js & Three.js | Beginner Three.js Tutorial
 * https://www.youtube.com/watch?v=kt0FrkQgw8w
 * https://jsmastery.com/video-kit/725337e6-5972-40e2-92ab-6d442e250797
 * https://github.com/adrianhajdin/threejs-portfolio
 *
 * npm i react-responsive
 */


export default function Home() {
  return (
    <main className="overflow-x-hidden">
			<Hero />
      <About />
      <Projects />
      <Clients />
      <WorkExperience />
      {/*<Contact />*/}
      <Footer />
		</main>
  );
}

"use client";
import Experience from "@/components/Experience";
import FeatureCards from "@/components/FeatureCards";
/**
 *
 * Build and Deploy a Unique 3D Web Developer Portfolio with React, Three JS & GSAP
 * https://www.youtube.com/watch?v=E-fdPfRxkzQ
 * https://github.com/adrianhajdin/3d-portfolio
 *
*/

import Hero from "@/components/hero";
import LogoShowcase from "@/components/LogoShowcase";
import Navbar from "@/components/Navbar";
import ShowcaseSection from "@/components/ShowcaseSection";
import TechStack from "@/components/TechStack";

export default function Home() {

  return (
    <>
      <Hero />
      <Navbar />
      <ShowcaseSection />
      <LogoShowcase />
      <FeatureCards />
      <Experience />
       <TechStack />
      {/*<Testimonials />
      <Contact />
      <Footer /> */}
    </>
  );
}

import Contact from '@/sections/Contact';
import Hero from '../sections/Hero';
import About from "@/sections/About";
import Experiences from '@/sections/Experiences';
import Projects from "@/sections/Projects";
import Testimonial from '@/sections/Testimonial';
import Footer from '@/sections/Footer';
import { AnimatePresence } from 'motion/react';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experiences />
      <Testimonial />
      <Contact />
      <Footer/>
    </>

  );
}


/**
 *
 * Master Web Animations in 2 Hours | Build an Awwwards-Level Website
 * https://jsmastery.com/video-kit/7a3dd92b-78ae-4036-be73-14db13b9d048
 * https://www.youtube.com/watch?v=AW1yfBKRMKc
 * https://github.com/adrianhajdin/gsap_cocktails/
 *
 */

import gsap from 'gsap';
import { ScrollTrigger, SplitText } from "gsap/all";
import Cocktails from "@/components/Cocktails";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero";
import About from '@/components/About';
import Art from '@/components/Art';
import Menu from '@/components/Menu';
import Contact from '@/components/Contact';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Cocktails />
      <About />
      <Art />
      <Menu />
      <Contact />
		</main>
  );
}

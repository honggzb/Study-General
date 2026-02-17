/**
 *
 * https://prismic.io/courses/suburbia-skateboards
 *
 * Build an Ecommerce Website with Three.js, Next.js 15, GSAP, and Prismic - Full Course 2025
 * https://www.youtube.com/watch?v=LBOhVng5rk8
 * https://github.com/prismicio-community/suburbia
 *
 * npm i matter-js
 * npm i --save-dev @types/matter-js
 */

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Product from "@/components/Product";
import Team from "@/components/Team";
import TextAndImage from "@/components/TextAndImage";
import Video from "@/components/Video";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Product />
      <TextAndImage />
      <Video />
      <Team />
      <Footer />
    </>
  );
}

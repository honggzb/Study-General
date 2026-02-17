/**
 *
 * https://prismic.io/courses/fizzi-3d-website
 *
 * Build an Ecommerce Website with Three.js, Next.js 15, GSAP, and Prismic - Full Course 2025
 * https://www.youtube.com/watch?v=RKQqrNyAC6k
 * https://github.com/prismicio-community/course-fizzi-next
 *
 */

import AlternatingText from "@/components/AlternatingText";
import BigText from "@/components/BigText";
import Carousel from "@/components/Carousel";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SkyDive from "@/components/SkyDive";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <SkyDive />
      <Carousel />
      <AlternatingText />
      <BigText />
    </>
  );
}

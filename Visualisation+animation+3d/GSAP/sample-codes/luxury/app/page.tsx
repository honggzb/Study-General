

/**
 *
 * https://prismic.io/courses/animated-luxury-website
 *
 * Build an luxury website Website with Three.js, Next.js 15, GSAP, and Prismic - Full Course 2025
 * https://www.youtube.com/watch?v=JkzZ-eTdnNM
 * https://github.com/prismicio-community/cote-royale-course
 *
 * npm install next-view-transitions
 *
 */

import Action from "@/components/Action";
import Features from "@/components/Features";
import FragList from "@/components/FragList";
import Hero from "@/components/Hero";
import ScrollText from "@/components/ScrollText";
import Video from "@/components/Video";

export default function Home() {

  return (
    <>
    <Hero />
    <ScrollText />
    <Features />
    <FragList />
    <Action />
    <Video youtube_video_id={"eTEsWseiDdg"}/>
    </>
  );
}

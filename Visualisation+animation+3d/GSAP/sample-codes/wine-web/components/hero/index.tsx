/**
 * FFmpeg
 * - tranform the video to be optimized for web and mobile, and to be scrubbed by scroll.
 * ffmpeg -i input.mp4 -vf scale=960 -movflags faststart -vdcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output.mp4
 */

"use client";

import React, { useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import useMediaQuery from 'react-responsive';
import { SplitText, ScrollTrigger } from "gsap/all";
import Link from 'next/link';

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {

    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });
    // Apply text-gradient class once before animating
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));
    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
    .to(".right-leaf", { y: 200 }, 0)
    .to(".left-leaf", { y: -200 }, 0)
    .to(".arrow", { y: 100 }, 0);

    // --- Video scroll scrub ---
    const videoEl = videoRef.current;
    const wrapEl = wrapRef.current;
    if (!videoEl || !wrapEl) return;

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    ScrollTrigger.create({
      trigger: wrapEl,
      start: startValue,
      end: endValue,
      scrub: true,
      onUpdate: (self) => {
        const duration = videoEl.duration;
        if (!duration) return;
        videoEl.currentTime = self.progress * duration;
      }
    });

  }, []);

  return (
    <>
      <section ref={wrapRef} id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>
        <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf" />
        <img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf" />

        <div className="body">
          <img src="/images/arrow.png" alt="arrow" className="arrow" />
          <div className="content">
            <div className="space-y-5 hidden md:block">
            <p>Cool. Crisp. Classic.</p>
            <p className="subtitle">  Sip the Spirit <br /> of Summer</p>
            </div>

            <div className="view-cocktails">
            <p className="subtitle">
              Every cocktail on our menu is a blend of premium ingredients,
              creative flair, and timeless recipes — designed to delight your
              senses.
            </p>
            <Link href="#cocktails">View cocktails</Link>
            </div>
          </div>
        </div>
        <div className='h-[30vh]'></div>
      </section>

      <div className="video absolute inset-0">
          {/*playsInline -->  open it up fullscreen while it plays, Mobile browsers */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/output.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  )
}

export default Hero
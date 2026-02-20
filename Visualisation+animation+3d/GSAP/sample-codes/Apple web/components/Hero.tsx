"use client";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useState } from 'react';

const smallHeroVideo = "/assets/videos/smallHero.mp4"
const heroVideo = "/assets/videos/hero.mp4"

const Hero = () => {

  const [videoSrc, setVideoSrc] = useState("")

  const handleVideoSrcSet = () => {
    if(window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo)
    } else {
      setVideoSrc(heroVideo)
    }
  }

  useEffect(() => {
    if(window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
        setVideoSrc(heroVideo);
    }
    window.addEventListener('resize', handleVideoSrcSet);
    return () => { window.removeEventListener('reisze', handleVideoSrcSet);}
  }, [videoSrc]);

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 2 })
    gsap.to('#cta', { opacity: 1, y: -50, delay: 2 })
  }, [])

  return (
    <section className="w-screen nav-height bg-black relative">
      <div className="h-5/6 w-screen flex flex-col justify-center items-center">
        <p id="hero" className="hero-title">iPhone 15 Pro</p>
        <div className="md:w-10/12 w-9/12">
          <video className="pointer-events-none" autoPlay muted playsInline={true} key="hero">
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
      </div>

      <div id="cta" className="flex flex-col items-center justify-center opacity-0 translate-y-20">
        <a href="#highlights" className="btn">Buy</a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero
'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

/**
 * GSAP Scroll Zoom
 * https://www.youtube.com/watch?v=aKRK9HXFTTQ
 * Create Stunning Zoom Effects with GSAP ScrollTrigger | Web Design Masterpiece Revealed
 */

export default function Home() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
      // Create a timeline
      const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.wrapper',
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: true,
        //markers: true,
      },
      })
      timeline.to('.image-container img', {
        scale: 2,
        z: 250,
        transformOrigin: "center center"
      })
      .to('.section.hero-section', {
        scale: 1.4,
        boxShadow: `10000px 0 0 0 rgba(0,0,0,.5) inset`,
        transformOrigin: "center center"
      }, "<")
      .to('.image-container', {
        autoAlpha: 0
      })
      .to(['.section.hero-section', '.intro'], {
        height: 400,
      });
    }, { scope: container }
  );

  return (
    <div ref={container} className="wrapper">
      {/* intro text */}
      <div className="intro">
        <h1 className="text-6xl">The story of</h1>
        <p className='text-9xl font-bold'>The Mountains</p>
      </div>
      {/* content */}
      <div className="content">
        <section className="section hero-section"></section>
        <section className="about-section">
            <p>
              Exercitation laborum in qui eiusmod sunt veniam sint. Pariatur et ex excepteur in ea eu minim quis. Eu qui aliqua deserunt deserunt consequat ullamco.
              Aliquip ullamco et consequat sunt minim ipsum in tempor sunt anim commodo non ad consectetur. Id incididunt sit in fugiat exercitation elit fugiat.
              Occaecat occaecat minim anim et sint cupidatat nostrud eiusmod aliqua.
              Incididunt sint voluptate deserunt ad fugiat amet sint non nulla sint. Eu sit aute irure do sint. Eiusmod excepteur ad ad adipisicing labore minim nisi.
              Dolor nulla ad Lorem cillum elit aliqua sunt mollit voluptate tempor sit aute tempor.
              Cillum dolor velit ex officia minim minim officia esse dolor.
              Ut mollit magna in adipisicing esse.
            </p>
        </section>
      </div>
      {/* leaf image */}
      <div className="image-container">
        <img src="https://uploads-ssl.webflow.com/5cff83ac2044e22cb8cf2f11/5d13364599bb70e3560cc4e5_background-min%203.png" alt="foreground-leaf-image" />
      </div>

    </div>
  );
}

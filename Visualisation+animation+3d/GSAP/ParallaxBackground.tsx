import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Animating a Parallax Environment
 */

gsap.registerPlugin(ScrollTrigger);

export const ParallaxBackground = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wrap animations in gsap.context() to ensure they are properly reverted, preventing memory leaks
    const ctx = gsap.context(() => {
      // Background moves slower for parallax
      gsap.to(".background", {
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 100,
      });

      // Foreground moves faster
      gsap.to(".foreground", {
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -100,
      });
    }, container);
    return () => ctx.revert();   // Using GSAP Context for Cleanup
  }, []);

  return (
    <div ref={container} className="scene-container">
      <div className="background">Bg</div>
      <div className="foreground">Fg</div>
    </div>
  );
};

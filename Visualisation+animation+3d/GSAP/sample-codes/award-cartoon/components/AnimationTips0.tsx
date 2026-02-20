"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

/**
 * 7 Must-Know GSAP Animation Tips for Creative Developers
 * https://tympanus.net/codrops/2025/09/03/7-must-know-gsap-animation-tips-for-creative-developers/
 */

const AnimationTips = () => {
  const textRef = useRef(null);

  useGSAP(() => {
      // split the header
      const split = SplitText.create("h1", {
        type:"words, chars",  // Split into characters
      })
      //1. Split Text Masking (Basic)
      // gsap.from(split.chars, {
      //   // duration: 1,
      //   // y: 100, // Animate from 100px below
      //   // autoAlpha: 0, // Fade in from opacity: 0
      //   // stagger: 0.05, // 0.05 seconds between each character
      //   // ease: "power1.out"
      //   type:"chars, lines",
	    //   mask:"lines",
      //   yPercent: 100,
      //   stagger: 0.1
      // })
      //2.
      gsap.timeline()
        .from(split.chars, {
          yPercent: 100,
          stagger:{
            each:0.05,
            from:"center"
          }
        })
        .to(split.chars, {
          yPercent:-100,
          stagger:{
            each:0.05,
            from:"edges"
          }
        });

      return () => {
          split.revert();
        };
  }, { scope: textRef });

  return (
    <>
      {/* SplitText Masking - https://gsap.com/docs/v3/Plugins/SplitText/ */}
      {/* 1. Split Text Masking (Basic) */}
      {/* <div ref={textRef} className="flex justify-center items-center">
        <h1 className='text-blue-500 text-6xl mt-60'>SplitText Masking</h1>
      </div> */}
      {/* 2. Stagger Direction Visualizer */}
      <div ref={textRef} className="flex justify-center items-center">
        <h1 className='text-blue-500 text-6xl mt-60'>SplitText Stagger</h1>
      </div>

    </>
  )
}

export default AnimationTips
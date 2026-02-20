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

const AnimationTips1 = () => {
  const containerRef = useRef<(HTMLDivElement | null)>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const pills = containerRef.current.querySelectorAll('div');
      const tl = gsap.timeline({
        defaults: { ease:"power2.inOut" }
      });
      tl.from(pills, {
        y: -50,
        scaleY: 0.5,
        rotate: -180,
        stagger: {
          each: 0.02,
          from: "center"
        }
      });
      tl.to(pills, {
        backgroundColor: '["#5b7e81", "#86c7df"]',
        y: 50,
        scaleY: 1.5,
        stagger: {
          each: 0.02,
          from: "center"
        }
      });

      tl.to(pills, {
        rotation: 180,
        scaleY: 1.5,
        ease:"back(3)",
        stagger: {
          each: 0.02,
          from: "end"
        }
      })
      .to(pills, {
        y: 0,
        scaleY:1,
        stagger: {
          each: 0.02,
          from: "center"
        }
      })
      .to(pills, {
        scaleY: 1.5,
        ease:"back(3)",
        stagger: {
          each: 0.02,
          from: "edges"
        }
      })
      .to(pills, {
        backgroundColor:"#5b7e81",
        scaleY:1,
        rotation:360,
        ease:"back(3)",
        stagger: {
          each: 0.02,
          from: "edges"
        }
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex justify-center items-center">
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
        <div className='h-[100px] w-15px] border-8 bg-[#5b7e81]'></div>
    </div>
  )
}

export default AnimationTips1
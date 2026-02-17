"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "@/components/Loader";
import { useProgress } from "@react-three/drei";
import clsx from "clsx";
import Scene from "./Scene";
import { Bounded } from "@/components/Bounded";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

function LoaderWrapper() {
  const { active } = useProgress();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (active) {
      setIsLoading(true);
    } else {
      const timer = setTimeout(() => setIsLoading(false), 100);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div
      className={clsx(
        "motion-safe:transition-opacity motion-safe:duration-700",
        isLoading ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <Loader />
    </div>
  );
}

const Hero = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = SplitText.create(".hero-heading", {
        type: "chars,lines",
        mask: "lines",
        linesClass: "line++",
      });

      const tl = gsap.timeline({ delay: 4.2 });

      tl.from(split.chars, {
        opacity: 0,
        y: -120,
        ease: "back",
        duration: 0.4,
        stagger: 0.07,
      }).to(".hero-body", { opacity: 1, duration: 0.6, ease: "power2.out" });

      gsap.fromTo(
        ".hero-scene",
        {
          background:
            "linear-gradient(to bottom, #000000, #0f172a, #062f4a, #7fa0b9)",
        },
        {
          background:
            "linear-gradient(to bottom, #ffffff, #ffffff, #ffffff, #ffffff)",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "50% bottom",
            scrub: 1,
          },
        },
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".hero-heading, .hero-body", { opacity: 1 });
    });
  });

  return (
    <section className="hero relative h-dvh text-white text-shadow-black/30 text-shadow-lg motion-safe:h-[300vh]">
        <div className="hero-scene pointer-events-none sticky top-0 h-dvh w-full">
            <Canvas shadows="soft">
                <Scene />
            </Canvas>
      </div>
      <LoaderWrapper />
      <div className="hero-content absolute inset-x-0 top-0 h-dvh">
        <Bounded
          fullWidth
          className="absolute inset-x-0 top-16 md:top-22 md:left-[4vw]"
        >
            <h1 className="hero-heading font-black-slanted text-4xl leading-[0.8] uppercase sm:text-5xl lg:text-6xl">
                Build for<br />for Bold!
            </h1>
        </Bounded>
        <Bounded
          fullWidth
          className="hero-body absolute inset-x-0 bottom-0 opacity-0 md:right-[0.5vw] md:left-auto max-w-[500px]"
          innerClassName="flex flex-col gap-3"
        >
            <h2 className="font-bold-slanted mb-1 text-2xl uppercase lg:mb-2 lg:text-4xl">
                Typing Reinvented
            </h2>
            <p>Nulla olor qui ad esse ut dolore anim ex adipisicing. In ullamco Lorem proident laboris ullamco ut incididunt excepteur aliquip.</p>
            <button className="font-bold-slanted group flex w-fit cursor-pointer items-center gap-1 rounded bg-[#01A7E1] px-3 py-1 text-2xl uppercase transition disabled:grayscale">
            Buy keyboard
            <span className="transition group-hover:translate-x-1">{">"}</span>
          </button>
        </Bounded>
      </div>
    </section>
  )
}

export default Hero
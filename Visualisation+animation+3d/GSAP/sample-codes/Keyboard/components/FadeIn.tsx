"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FadeInProps = {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  start?: string;
  className?: string;
  targetChildren?: boolean;
};

export function FadeIn({
  children,
  className,
  start = "top 50%",
  targetChildren = false,
  vars = {},
}: FadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const target = targetChildren
      ? containerRef.current?.children
      : containerRef.current;

    if (!target) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(target, {
        opacity: 0,
        y: 60,
      });

      gsap.to(target, {
        duration: 0.8,
        opacity: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.2,
        ...vars,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
        },
      });
    });
  });

  return (
    <div ref={containerRef} className={clsx(className)}>
      {children}
    </div>
  );
}
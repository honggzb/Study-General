"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useScroll } from "@react-three/drei";

import { gsap } from "gsap";

type ScrollManagerProps = {
  section: any;
  onSectionChange: (section: any) => void;
};

const ScrollManager = ({ section, onSectionChange }: ScrollManagerProps ) => {

  const scrollData = useScroll();
  const lastScrollPosition = useRef(0);
  const isAnimating = useRef(false);

  scrollData.fill.classList.add("top-0");
  scrollData.fill.classList.add("absolute");

  useEffect(() => {
    // Scroll to Section Animation
    gsap.to(scrollData.el, {
      // el comes from the scrollData object
      duration: 0.5,
      scrollTop: section * scrollData.el.clientHeight, // we scroll to the section times the height of the element
      onStart: () => {
        isAnimating.current = true; // we are currently animating
      },
      onComplete: () => {
        isAnimating.current = false; // we are not animating anymore
      },
    });
  }, [section]);

  useFrame(() => {
    if (isAnimating.current) {
      // if we are currently animating, do nothing, just...
      lastScrollPosition.current = scrollData.current; // last scroll position is the current scroll position
      return;
    }
    // if we are not animating, we...
    const currentSection = Math.floor(
      scrollData.scroll.current * scrollData.pages
    ); // this gives us the current section as a number

    // if the current scroll is bigger than the last croll and the current section === 0, then
    if (
      scrollData.scroll.current > lastScrollPosition.current &&
      currentSection === 0
    ) {
      // we set the current section to 1
      onSectionChange(1);
    }

    if (
      scrollData.scroll.current < lastScrollPosition.current &&
      scrollData.scroll.current < 1 / scrollData.pages
    ) {
      onSectionChange(0);
    } // if the current scroll is smaller than the last scroll and the current scroll is smaller than 1 / data.pages, then we set the current section to 0

    lastScrollPosition.current = scrollData.scroll.current; // last scroll position is the current scroll position
  });

  return null;
};

export default ScrollManager;
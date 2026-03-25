import React, { Fragment } from 'react'
import CategorySection from './CategorySection'
import { sections } from './data'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger);

const FlowingSection = () => {
  const mainRef = React.useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      if(!mainRef.current) return;
      const sections = Array.from(mainRef.current?.querySelectorAll<HTMLElement>('[data-snap-section]'));
      const medias =  Array.from(mainRef.current?.querySelectorAll<HTMLElement>('[data-media]'));

      medias.forEach((media, index) => {
        const isLast = index === medias.length - 1;
        gsap.fromTo(
           media,
           { y: "-100vh"},
           {
            y: isLast ? "0vh" : "100vh",
            ease: "none",
            scrollTrigger: {
              trigger: sections[index],
              start: "top bottom",
              end: isLast ? "bottom bottom" : "bottom top",
              scrub: true,
            },
           }
        );
      });

      ScrollTrigger.create({
        snap: {
            snapTo: (progress: number) => {
                const totalSections = sections.length;
                const sectionProgress = progress * (totalSections - 1);
                const progressSection = sectionProgress % 1;
                // dead zone: between 30-70% no snap
                if (progressSection > 0.3 && progressSection < 0.7) {
                    return Math.round(sectionProgress);
                }
                //snap to the closest section
                const closestSection = Math.round(sectionProgress);
                return closestSection / (totalSections - 1);
            },
            duration: {min: 0.4, max: 0.8},
            ease: "power1.inOut",
            delay: 0.1,
           }
        });
      });
    },
    { scope: mainRef });

  return (
    <main ref={mainRef}>
        {sections.map((section, index) => (
            <Fragment key={index}>
                <CategorySection section={section} />
                {index < sections.length - 1 && <hr />}
            </Fragment>
        ))}
    </main>
  )
}

export default FlowingSection
"use client";

import { useRef, useState } from 'react';
import { StepBack, StepForward } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { allCocktails } from '../constants';

const Menu = () => {
  const contentRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    gsap.fromTo('.info',
      { opacity: 0, yPercent: -80 },
      { opacity: 1, yPercent: -50, duration: 1 }
    );
    gsap.fromTo('.cocktail img',
      { opacity: 0, xPercent: -100 },
      { xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut' }
    );
    gsap.fromTo('.details h2',
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 100, ease: 'power1.inOut' }
    );
    gsap.fromTo('.details p',
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 100, ease: 'power1.inOut' }
    );
  }, [currentIndex]);

  const totalCocktails = allCocktails.length;
  const goToSlide = (index: number) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);
  }
  const getCocktailAt = (indexOffset: number) => {
    return allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails]
  }

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
	    <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />

      <h2 id="menu-heading" className="sr-only">Cocktail Menu</h2>
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={cocktail.id}
              className={`${isActive ? "text-white border-white" : "text-white/50 border-white/50"}`}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="arrows">
          <button className="text-left" onClick={() => goToSlide(currentIndex - 1)}>
            <span>{prevCocktail.name}</span>
            <StepBack size={32} aria-hidden="true" />
            {/* <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" /> */}
          </button>
          <button className="text-left" onClick={() => goToSlide(currentIndex + 1)}>
            <span>{nextCocktail.name}</span>
            <StepForward size={32} aria-hidden="true" />
            {/* <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" /> */}
          </button>
        </div>

        <div className="cocktail">
          <img src={currentCocktail.image} className="object-contain" />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>
          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu
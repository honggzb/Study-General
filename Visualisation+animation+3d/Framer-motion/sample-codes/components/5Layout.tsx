"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 *
 * Framer Motion : Layouts
 *   if layoutId is same, it will do position match animation automatically
 *
 */

type Card = {
    description: string;
    title: string;
    src: string;
    ctaLink: string;
    ctaText: string;
    content: () => React.ReactNode;
}
const cards: Card[] = [
    {
        description: "Lana del ref",
        title: "title 1",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaLink: "https://ui.aceternity.com/templates",
        ctaText: "play",
        content: () => {
            return (
                <p className='text-[10px] text-neutral-500'>
                    Commodo nulla nostrud aliquip dolore. Voluptate eu irure ullamco incididunt velit incididunt eiusmod fugiat minim irure. Cillum sit officia culpa deserunt ea reprehenderit ullamco tempor labore. Laboris nisi excepteur qui pariatur occaecat anim. Est consequat occaecat eu do commodo. Dolore aliquip pariatur reprehenderit mollit et amet anim sit consectetur tempor. Nulla voluptate do labore aute eu occaecat deserunt labore.Commodo nulla nostrud aliquip dolore. Voluptate eu irure ullamco incididunt velit incididunt eiusmod fugiat minim irure. Cillum sit officia culpa deserunt ea reprehenderit ullamco tempor labore. Laboris nisi excepteur qui pariatur occaecat anim. Est consequat occaecat eu do commodo. Dolore aliquip pariatur reprehenderit mollit et amet anim sit consectetur tempor. Nulla voluptate do labore aute eu occaecat deserunt labore.Commodo nulla nostrud aliquip dolore. Voluptate eu irure ullamco incididunt velit incididunt eiusmod fugiat minim irure. Cillum sit officia culpa deserunt ea reprehenderit ullamco tempor labore. Laboris nisi excepteur qui pariatur occaecat anim. Est consequat occaecat eu do commodo. Dolore aliquip pariatur reprehenderit mollit et amet anim sit consectetur tempor. Nulla voluptate do labore aute eu occaecat deserunt labore.
                </p>
            )
        }
    },
    {
        description: "afdsaa 2",
        title: "title 2",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaLink: "https://ui.aceternity.com/templates",
        ctaText: "play",
        content: () => {
            return (
                <p className='text-[10px] text-neutral-500'>
                    Commodo nulla nostrud aliquip dolore. Voluptate eu irure ullamco incididunt velit incididunt eiusmod fugiat minim irure. Cillum sit officia culpa deserunt ea reprehenderit ullamco tempor labore. Laboris nisi excepteur qui pariatur occaecat anim. Est consequat occaecat eu do commodo. Dolore aliquip pariatur reprehenderit mollit et amet anim sit consectetur tempor. Nulla voluptate do labore aute eu occaecat deserunt labore.
                </p>
            )
        }
    },
    {
        description: "12324432vaa ",
        title: "title 3",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaLink: "https://ui.aceternity.com/templates",
        ctaText: "play",
        content: () => {
            return (
                <p className='text-[10px] text-neutral-500'>
                    Commodo nulla nostrud aliquip dolore. Voluptate eu irure ullamco incididunt velit incididunt eiusmod fugiat minim irure. Cillum sit officia culpa deserunt ea reprehenderit ullamco tempor labore. Laboris nisi excepteur qui pariatur occaecat anim. Est consequat occaecat eu do commodo. Dolore aliquip pariatur reprehenderit mollit et amet anim sit consectetur tempor. Nulla voluptate do labore aute eu occaecat deserunt labore.
                </p>
            )
        }
    },
];

const useOutsideClick = (callback: () => void) => {

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
        if(ref.current && !ref.current.contains(event.target as Node)) {
            callback();
        }
    };
    document.addEventListener("click", handleClick);
    return () => {
        document.removeEventListener("click", handleClick);
    }
  }, [callback]);

  return ref;
}

const Layout = () => {

  const [current, setCurrent] = useState<Card | null>(null);
  const ref = useOutsideClick(() => setCurrent(null))

  return (
    <div className="py-10 bg-gray-100 min-h-screen relative overflow-hidden">
        {/* overlay */}
        {current && (
            <motion.div
                initial={{ opacity: 0}}
                animate={{ opacity: 1 }}
                className="fixed z-10 h-full w-full inset-0 bg-black/50 backdrop-blur-sm"
            ></motion.div>
        )}
        {/* popup */}
        {current && (
            <motion.div
                layoutId={`card-${current.title}`}
                ref={ref}
                className="fixed m-auto inset-0 z-20 h-120 w-80 bg-neutral-100 rounded-2xl border border-neutral-200 p-4"
            >
                <motion.img
                    layoutId={`card-image-${current.title}`}
                    src={current.src}
                    alt={current.title}
                    className="h-60 aspect-square rounded-xl m-auto"
                />
                <div className="flex flex-col justify-center items-center">
                    <div className="flex items-start justify-between w-full gap-2">
                        <div className="flex flex-col items-start gap-2">
                            <h2 className="font-bold text-xs tracking-tight text-black py-2">{current.title}</h2>
                            <p className="text-[10px] text-neutral-500">{current.description}</p>
                        </div>
                        <Link href={current.ctaLink} className="px-2 py-1 bg-green-500 rounded-full text-white text-xs">{current.ctaText}</Link>
                    </div>
                    <motion.div
                        initial= {{ filter: 'blur(10px)', opacity: 0}}
                        animate={{ filter: 'blur(0px)', opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="h-40 overflow-auto pb-20 mask-[linear-gradient(to_top,transparent_20%,black_80%)]"
                    >
                        {current.content()}
                    </motion.div>
                </div>
            </motion.div>
        )}
        {/* main */}
        <div className="max-w-lg mx-auto flex flex-col gap-10">
            {cards.map((card, idx) => (
                <motion.button
                    key={card.title}
                    layoutId={`card-${card.title}`}
                    onClick={() => setCurrent(card)}
                    className="p-4 rounded-lg flex justify-between items-center bg-white border border-neutral-200 cursor-pointer"
                    >
                    <div className="flex gap-4 items-center">
                        <motion.img
                            layoutId={`card-image-${card.title}`}
                            src={card.src}
                            alt={card.title}
                            className="h-10 aspect-square rounded-2xl"
                        />
                        <div className="flex flex-col gap-2 items-center">
                            <h2 className="font-bold text-lg text-black">{card.title}</h2>
                            <p className="text-sm text-neutral-500">{card.description}</p>
                        </div>
                    </div>
                    <div className="px-2 py-1 bg-green-500 text-white rounded-full text-sm">
                        {card.ctaText}
                    </div>
                </motion.button>
            ))}
        </div>
    </div>
  )
}

export default Layout
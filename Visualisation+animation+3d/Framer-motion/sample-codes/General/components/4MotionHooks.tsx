"use client";

/**
 *
 * Framer Motion : Hooks
 *   animation(opacity, scale, spring) when scrolling page
 *   change background color when scrolling page
 */


import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { Rocket } from "lucide-react";
import Image from "next/image";
import { ReactNode, useRef, useState } from "react";

type Feature ={
    icon: ReactNode;
    title: string;
    description:string;
    content: ReactNode;
}

const features: Feature[] = [
    {
        icon: <Rocket className="h-8 w-8 text-neutral-200" />,
        title: "Generate ultra realistic image in secondes",
        description: "Veniam eu magna irure est officia dolore um incididunt. Tempor consequat reprehenderit nostrud culpa do. Nostrud enim ipsum nostrud sunt nostrud sint. ",
        content: (
            <div><Image src="https://assets.aceternity.com/pro/car-1.jpg" alt="car" height={500} width={500} /></div>
        ),
    },
    {
        icon: <Rocket className="h-8 w-8 text-neutral-200" />,
        title: "afsafs 2",
        description: "Veniam eu magna irure estnt nulla.",
        content: (
            <div><Image src="https://assets.aceternity.com/pro/car-2.jpg" alt="car" height={500} width={500} /></div>
        ),
    },
    {
        icon: <Rocket className="h-8 w-8 text-neutral-200" />,
        title: "afsafs 3",
        description: "Veniam eu magna irure est officid sint. Amet cillum dolore nisi irure consectetur cillum. Ea consectetur dolor duis proident labore proident nulla.",
        content: (
            <div><Image src="https://assets.aceternity.com/pro/car-3.jpg" alt="car" height={500} width={500} /></div>
        ),
    },
    {
        icon: <Rocket className="h-8 w-8 text-neutral-200" />,
        title: "afsafs 4",
        description: "Veniam eu magna irure est officia d enim ipsum nostrud sunt nostrud sint. Amet cillum dolore nisi irure consectetur cillum. Ea cabore proident nulla.",
        content: (
            <div><Image src="https://assets.aceternity.com/pro/car-4.jpg" alt="car" height={500} width={500} /></div>
        ),
    }
];

const Card = ({feature}: {feature: Feature}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        // element = start, viewport = end --> I want the scroll tracking to start
        offset: ["start end", "end start"]   //
    });
    //
    //const translateContent = useTransform(scrollYProgress, [0, 1], [200, -300]);
    const translateContent = useSpring(
        useTransform(scrollYProgress, [0, 1], [200, -300]),
        {
            stiffness: 100,
            damping: 30,
            mass: 1,
        }
    );
    const opacityContent = useTransform(scrollYProgress, [0,0.5,1], [0, 1, 0]);
    const blur = useTransform(scrollYProgress, [0.5, 1], [0, 10]);
    const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.8]);

    return (
       <div
        ref={ref}
        className="grid grid-cols-2 items-center gap-20 py-30"
        >
            <div className="flex flex-col gap-5">
                {feature.icon}
                <h2 className="text-4xl font-bold text-white">{feature.title}</h2>
                <p className="text-lg text-neutral-400">{feature.description}</p>
            </div>
            <motion.div
                style={{
                    y: translateContent,
                    opacity: opacityContent,
                    filter: useMotionTemplate`blur(${blur}px)`,
                    scale
                }}
            >
                {feature.content}
            </motion.div>
        </div>
    )
}

const MotionHooks = () => {

  const backgrounds = [ "#171717", "#011239", "#2e3701"];
  const refContainer = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
        target: refContainer,
        // element = start, viewport = end --> I want the scroll tracking to start
        offset: ["start end", "end start"]
    });
  const [background, setBackground] = useState(backgrounds[0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const finalbg = Math.floor(latest * backgrounds.length);
        console.log("change values --> ", finalbg);
        setBackground(backgrounds[finalbg]);
    });

  return (
    <motion.div
        ref={refContainer}
        animate={{background}}
        className="flex min-h-screen items-center justify-center bg-neutral-900"
    >
        <div className="mx-auto flex max-w-4xl flex-col gap-10 py-40">
            {features.map((feature, i) => (
                <Card key={i} feature={feature} />
            ))}
        </div>
    </motion.div>
  )
}

export default MotionHooks
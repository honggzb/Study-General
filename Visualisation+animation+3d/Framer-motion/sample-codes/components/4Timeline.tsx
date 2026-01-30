"use client";

import { ArrowBigRight, ArrowRight } from "lucide-react";
/**
 *
 * Framer Motion : inView
 *   https://motion.dev/docs/inview
 */

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

type Content = {
    title: string;
    description: string;
}
type Feature ={
    year: string;
    content: Content[];
}

const features: Feature[] = [
    {
        year: "2020",
        content: [
            {
                title: "1 Reacheasfafd $20k",
                description: "Veniam eu magna irure est officia doloostrud sunt nostrud sint. "
            },
             {
                title: "2 Reaasafched $20k",
                description: "est officia doloostrud sunt n Veniam eu magna irure est officia doloostrud sunt nostrud sint. "
            },
            {
                title: "1 Reaafdsafched $20k",
                description: "Veniam eu magna irure est officia doloostrud sunt nostrud sint. "
            },
             {
                title: "2 af s Reacahed $20k",
                description: "est officia doloostrud sunt n Veniam eu magna irure est officia doloostrud sunt nostrud sint. "
            },
        ]
    },
    {
        year: "2023",
        content: [
            {
                title: "1 Resafsadfached $20k",
                description: "icia do Veniam eu icia doe est officia doloostrud sunt nostrud sint. "
            },
             {
                title: "2 Reacsafsdafhed $20k",
                description: "est officia doloostrud sunt n Veniam eu magna irure est officia doloostrud sunt nostrud icia do  sint. "
            },
            {
                title: "1 Reacafdsa hed $20k",
                description: "Veniaasfsa sa m eu magna irure est officia doloostrud sunt nostrud sint. "
            },
             {
                title: "2 Resafsaf ach d $20k",
                description: "est offisafdsa cia doloostrud sunt n Veniam eu magna irure est officia doloostrud sunt nostrud sint. "
            },
            {
                title: "1 Rfhsafsaed $20k",
                description: "Veniam eu magna irure est officia doloostrud sunt nostrud sint. "
            },
             {
                title: "2 Reaafhed $20k",
                description: "est officia doloostrud sunt n Veniam eu magna irure est officia doloostrud sunt nostrud sint. "
            },
        ]
    },
];

const Timeline = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInview = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div className="h-screen w-screen gap-3 ml-3">
        <div className="h-230 w-full"></div>
        <div ref={ref} className="py-10">
            {features.map((year, i) => (
                <div key={year.year+i}>
                    <motion.h2
                        animate={{ filter: isInview ? "blur(0px)" : "blur(10px)", opacity: isInview ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.01*i }}
                        className="font-bold text-black py-2"
                    >
                        {year.year}
                    </motion.h2>
                    <div className="flex flex-col gap-4">
                        {year.content.map((item, idx) => (
                            <div key={item.title+idx} className="pl-">
                                <motion.h3
                                    animate={{ y: isInview ? 0 : -10, opacity: isInview ? 1 : 0 }}
                                    transition={{ duration: 3, ease: "easeInOut", delay: 0.015*idx }}
                                    className="text-neutral-800"
                                >
                                    <ArrowRight height={12} width={12} className="inline-block" />{item.title}
                                </motion.h3>
                                {item.description && <p className="text-neutral-400">{item.description}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Timeline
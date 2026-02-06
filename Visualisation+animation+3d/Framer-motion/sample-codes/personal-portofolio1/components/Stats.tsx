"use client";

import { number } from "motion";
import CountUp from "react-countup";

const stats = [
    { number: 12, text: "years of experience" },
    { number: 23, text: "project completed" },
    { number: 5, text: "Technologies mastered" },
    { number: 500, text: "Code cmmits" },
]

const Stats = () => {
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
        <div className="mx-auto">
            <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
                {stats.map((stat, index) => {
                  return (
                    <div key={stat.text} className="flex-1 flex gap-4 items-center justify-center xl:justify-start">
                        <CountUp end={stat.number} duration={5} delay={2} className="text-4xl xl:text-6xl font-extrabold" />
                        <p className={`${stat.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"} leading-snug text-white/80`}>{stat.text}</p>
                    </div>
                  )
                })}
            </div>
        </div>
    </section>
  )
}

export default Stats
"use client";

import { motion } from "motion/react";
import { services } from "@/components/constants";
import { MoveDownRight } from "lucide-react";
import Link from "next/link";

const Services = () => {
  return (
    <section className="overflow-x-hidden min-h-[80vh] flex flex-col justify-center py-12 xl:py-0 text-white">
      <div className="mx-auto m-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate= {{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease:"easeIn"},
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
            {services.map((service, index) => {
              return (
                <div key={service.index+service.num} className="flex-1 flex flex-col justify-center gap-6 my-num-group group">
                  <div className="w-full flex justify-between items-center">
                    <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">{service.num}</div>
                    <Link
                      href={service.href}
                      className="w-[60px] h-[60px] flex rounded-full bg-white group-hover:bg-[#00ff99] transition-all duration-500 justify-center items-center hover:-rotate-45"
                    >
                      <MoveDownRight className="text-black" />
                    </Link>
                  </div>
                  <h2 className="text-[42px] font-bold leading-0 group-hover:text-[#00ff99] transition-all duration-500">{service.title}</h2>
                  <p className="text-white/60">{service.description}</p>
                  <div className="border-b border-white/60 w-full"></div>
                </div>
              )
            })}
        </motion.div>
      </div>
    </section>
  )
}

export default Services
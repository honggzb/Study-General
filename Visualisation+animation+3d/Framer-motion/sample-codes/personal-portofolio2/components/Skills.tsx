"use client";

import { motion } from "motion/react";
import { skills } from "./constants";

const Skills = () => {

   const containVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, duration: 0.8 }
        }
    };
    const itemVariants = {
        hidden: { y: 50,  opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { ease: "easeOut", duration: 0.8 }
        }
    }

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center bg-gray-900 relative">
        <div className="absolute top-[300px] md:top-[100px] left-64 inset-x-0 flex items-center justify-center">
            <div className="h-96 w-96 bg-linear-to-br from-[#0268b0] to-blue-500 blur-2xl opacity-40 rounded-full"></div>
        </div>
            <motion.div
                variants={containVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="container mx-auto px-6 relative z-10"
            >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <motion.div variants={itemVariants} className="lg:w-1/2 flex justify-center relative">
                         {/* images */}
                        <div className="relative mt-50 md:mt-0">
                            <motion.img
                                src="./assets/robot-hand.png" alt=""
                                className="w-full max-w-md relative z-10"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                            {/* icons */}
                            {skills.map((skill, index) => {
                              const positions = [
                                { top: '6%', left:'20%' },
                                { top: '6%', right:'23%' },
                                { bottom: '90%', left:'33%' },
                                { bottom: '90%', right:'37%' },
                              ];
                              return (
                                <motion.div
                                    key={skill.name}
                                    animate={{ y: [0,10,0], rotate: [0,5,0] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: index * 3, ease: "easeInOut"}}
                                    className="absolute z-20"
                                    style={positions[index]}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.2, boxShadow: '0 0 20px rgba(29 130, 246, 0.6'}}
                                        className="bg-gray-800/80 backdrop-blur-sm rounded-full w-16 h-16 p-2 shadow-lg border border-blue-500/30"
                                    >
                                        <img src={skill.icon} alt={skill.name} className="w-12 h-12 object-contain" />
                                    </motion.div>
                                </motion.div>
                              )
                            })}
                        </div>
                    </motion.div>
                    {/* contents */}
                    <motion.div variants={itemVariants} className="lg:w-1/2 text-white">
                        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                                My<span> Skills</span>
                            </span>
                        </motion.h2>
                        <motion.p>
                            Nulla sint in eu sunt reprehenderit. Enim non aute tempor id minim incididunt sit eiusmod velit. Ad veniam id veniam ipsum do tempor duis nulla est non laboris nulla reprehenderit ad. Non esse pariatur veniam velit nisi voluptate esse irure ipsum.
                        </motion.p>
                        {/* skill section */}
                        <motion.div variants={itemVariants} className="mt-6">
                            <div className="space-y-4">
                                {skills.map((skill, index) => {
                                  return (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false }}
                                        className="flex items-center"
                                    >
                                        <div className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-500/30">
                                            <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-gray-300">{skill.name}</span>
                                                <span className="text-cyan-300">{skill.level}%</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%`}}
                                                    transition={{ duration: 1, delay: index*0.2 }}
                                                    viewport={{ once: true}}
                                                    className="bg-linear-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full"
                                                ></motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                  )
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
    </section>
  )
}

export default Skills
"use client";

import { motion } from "motion/react";
import { projects } from "./constants";

const Work = () => {

  const containVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
    };
  const itemVariants = {
    hidden: { y: 30,  opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { ease: "easeOut", duration: 0.4 }
  }
    }

  return (
    <section id="work" className="min-h-screen flex items-center justify-center bg-gray-900 relative">
        <div className="absolute top-10 right-32">
            <div className="h-60 w-60 bg-linear-to-br from-blue-600 to-cyan-500 blur-3xl opacity-30 rounded-full"></div>
        </div>
        <div className="absolute bottom-10 left-32">
            <div className="h-48 w-48 bg-linear-to-br from-blue-600 to-cyan-500 blur-3xl opacity-30 rounded-full"></div>
        </div>
        <div className="container mx-auto px-6 lg:ml-40 lg:mr-8 relative z-10">
            {/* section header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-150px" }}
                className="text-center mb-12 ml-0 lg:ml-8"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to bg-cyan-400">
                        My
                    </span>{" "}Portfolio
                </h2>
                <p className="text-lg text-gray-300 max-w-xl mx-auto">A collection of my recent projects</p>
            </motion.div>
            {/* project card */}
            <motion.div
                variants={containVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-150px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-0 lg:ml-8"
            >
                {projects.map((project, index) => {
                return (
                    <motion.div
                        key={project.id}
                        variants={itemVariants}
                        className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50"
                    >
                        <div className="relative overflow-hidden">
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-40 object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                            {/* overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-4 w-full">
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex gap-2"
                                    >
                                        <motion.a
                                            href={project.demoLink}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 bg-blue-500 text-white py-1.5 px-3 rounded text-sm font-semibold hover:bg-blue-600 transition-colors"
                                        > Demo</motion.a>
                                        <motion.a
                                            href={project.codeLink}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 text-gray-300 py-1.5 px-3 rounded text-sm font-semibold hover:bg-blue-700 transition-colors"
                                        > Code</motion.a>
                                    </motion.div>
                                </div>
                            </div>
                            {/* project info */}
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-white mask-b-to-1.5">{project.title}</h3>
                                <p className="text-gray-400 text-sm mb-3 line-clamp-3">{project.desc}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.technologies.map((tech, index) => {
                                      return (
                                        <span key={index} className="px-2 py-0.5 bg-gray-700/50 text-cyan-300 text-xs rounded-full border border-cyan-500/30">
                                            {tech}
                                        </span>
                                      )
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )
                })}
            </motion.div>
            {/* button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: false }}
                className="text-center mt-8 ml-0 lg:ml-8 mb-25 md:mb-10"
            >
                <motion.button
                    whileHover={{
                        scale: 1.05,
                        boxShadow: " 0 15px 30px rgba(59,130,246,0.4)"
                    }}
                    whileTap={{scale: 0.95}}
                    className="px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 text-sm"
                >
                    View More
                </motion.button>
            </motion.div>
        </div>
    </section>
  )
}

export default Work
"use client";

import { motion } from "motion/react"
import { useEffect, useState } from "react"
import hero from "@/public/assets/photo.png";

const Hero = () => {
    const [displayText, setDisplayText] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const texts = ["web Developer", "UI/UX designer", "Frondend Expert", "Creative Coder"];
    const currentText = texts[currentIndex];

    useEffect(()=> {
        const timeout = setTimeout(() => {
            if(!isDeleting && displayText === currentText){
                setTimeout(() => setIsDeleting(true), 1000);
            } else if(isDeleting && displayText === "") {
                setIsDeleting(false);
                setCurrentIndex((prev) => (prev + 1) % texts.length);
            } else {
                setDisplayText(
                    isDeleting ?
                    currentText.substring(0, displayText.length - 1) :
                    currentText.substring(0, displayText.length + 1));
            }

        }, isDeleting ? 50 : 100);
        return () => clearTimeout(timeout);
    }, [displayText, currentIndex, isDeleting]);

    const scrollToSkills = () => {
        const element = document.getElementById('skills');
        element?.scrollIntoView({ behavior: "smooth" });
    }

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
    <section id="home" className="min-h-screen flex items-center justify-center bg-gray-900 relative">
        <div className="absolute inset-0">
            <div className="absolute top-64 left-96 w-80 h-80 bg-blue-500/20 rounded-full blur-xl"></div>
            <motion.div
                variants={containVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="container mx-auto px-6 top-45 left-6 text-center relative z-10"
            >
                <motion.div variants={itemVariants} className="mb-8">
                    <motion.div
                        whileHover={{scale: 1.05}}
                        className="w-56 h-56 mx-auto"
                    >
                        <img src="./assets/photo.png" alt="" className="h-full w-full object-cover rounded-full shadow-2xl shadow-blue-500 hover:shadow-cyan-500/20 transition-all duration-300" />
                    </motion.div>
                </motion.div>
                <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white">
                    Hi, I'm <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">xxx</span>
                </motion.h1>
                {/* animation text */}
                <motion.div variants={itemVariants} className="h-16 mb-6 mt-3">
                    <h2 className="text-2xl md:text-4xl text-gray-200">
                            I'm a {" "}
                        <span className="text-cyan-300 border-r-2 border-cyan-300">
                            {displayText}
                        </span>
                    </h2>
                </motion.div>
                <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Id sint voluptate dolore mollit eu mollit cupidatat. Id ad sit ex excepteur. Nulla deserunt culpa amet cillum velit ullamco quis. Duis minim esse occaecat aliquip labore ullamco ullamco laboris.
                </motion.p>
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center py-10">
                    <motion.button
                        onClick={scrollToSkills}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        className="px-8 py-4 bg-linear-to-b from-blue-500 to-cyan-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        View my Work
                    </motion.button>
                    <motion.button
                        onClick={scrollToSkills}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        className="px-8 py-4 border-2 border-gray-400/30 text-white rounded-full font-semibold text-lg hover:bg-gray-800/50 transition-all duration-300"
                    >
                        Download CV
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    </section>
  )
}

export default Hero
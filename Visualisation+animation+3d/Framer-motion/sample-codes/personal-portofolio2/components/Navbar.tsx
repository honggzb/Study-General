"use client";

import { BriefcaseIcon, GraduationCap, HomeIcon, Languages, Mail, WorkflowIcon } from "lucide-react";
import { motion } from "motion/react"
import { useEffect, useState } from 'react'

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const navItems = [
    { id: 'home', icon: HomeIcon, Label: 'Home'},
    { id: 'skills', icon: BriefcaseIcon, Label: 'Skills'},
    { id: 'education', icon: GraduationCap, Label: 'Education'},
    { id: 'languages', icon: Languages, Label: 'Languages'},
    { id: 'work', icon: WorkflowIcon, Label: 'Work'},
    { id: 'contact', icon: Mail, Label: 'Contact'},
  ];

  useEffect(() => {
    const handleScroll = () => {
        const sections = navItems.map((item) => document.getElementById(item.id));
        const scrollPos = window.scrollY + 100;
        sections.forEach((section) => {
            if(section && scrollPos >= section.offsetTop + section.offsetTop + section.offsetHeight) {
                setActiveSection(section.id);
            }
        })
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if(element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="fixed left-4 lg:left-20 top-1/2 transform -translate-y-1/2 z-50 lg:block hidden"
        >
            <motion.div
                animate={{
                    boxShadow: isHovered ? [
                        '0 0 20px rgba(59, 130, 246, 0.6)',
                        '0 0 40px rgba(6, 182, 212, 0.4)',
                        '0 0 60px rgba(59, 130, 246, 0.3)'
                    ].join(", ")
                    : [
                        '0 0 30px rgba(59, 130, 246, 0.4)',
                        '0 0 50px rgba(6, 182, 212, 0.2)'
                     ]
                 }}
                 transition={{ duration: 0.4 }}
                 className="bg-gray-800/90 backdrop-blur-xl rounded-full p-3 lg:p-4 border border-blue-500/20 relative"
            >
                {/* background shadow */}
                <motion.div
                        animate={{ opacity: isHovered ? 0.8 : 0.4 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 rounded-full bg-linear-to-br from-blue-500/30 to-cyan-500/20 blur-lg -z-10"
                ></motion.div>
                {/* nav items */}
                <div className="flex flex-col space-y-3 lg:space-y-4">
                    {navItems.map((navItem, index) => {
                        const IconComponent = navItem.icon;
                        return (
                            <motion.button key={navItem.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => scrollToSection(navItem.id)}
                                whileHover={{ scale: 1.1, transition: { duration: 0.2 }}}
                                whileTap={{ scale: 0.95 }}
                                className={`relative group p-2 lg:p-3 rounded-full transition-all duration-300 ${activeSection === navItem.id ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50' : 'text-gray-400 hover:text-white hover:bg-gray-700/60'}`}
                            >
                                <IconComponent className="w-5 h-5 lg:w-6 lg:h-6 relative z-10" />
                                {activeSection === navItem.id && (
                                    <motion.div
                                        animate={{
                                            boxShadow: [
                                                '0 0 10px rgba(59, 130, 246, 0.8)',
                                                '0 0 20px rgba(59, 130, 246, 0.6)',
                                                '0 0 10px rgba(59, 130, 246, 0.8)'
                                        ]}}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 rounded-full bg-blue-500/30"
                                    ></motion.div>
                                )}
                                {/* hover tooltip */}
                                <div className="absolute left-full ml-3 px-2 py-1 lg:px-3 lg:py-2 bg-gray-900/95 text-white text-xs lg:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap backdrop-blur-sm border border-gray-700 shadow-xl">
                                    {navItem.Label}
                                    <div className="absolute -left-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                                </div>
                        </motion.button>
                        )
                    })}
                </div>
            </motion.div>
        </motion.div>
        {/* mobile botton navigation */}
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 lg:hidden w-max"
        >
            <div className="bg-gray-800/90 backdrop-blur-xl rounded-2xl p-2 border border-blue-500/20 shadow-xl shadow-blue-500/30">
                <div className="flex space-x-1">
                    {navItems.map((navItem, index) => {
                       const IconComponent = navItem.icon;
                        return (
                            <motion.button
                                key={navItem.id}
                                onClick={() => scrollToSection(navItem.id)}
                                whileTap={{ scale: 0.9 }}
                                className={`relative p-3 rounded-xl transition-all duration-300 ${activeSection === navItem.id ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700/60'}`}
                                >
                                    <IconComponent className="w-5 h-5" />
                                    {activeSection === navItem.id && (
                                    <motion.div
                                        animate={{
                                            boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)'
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 rounded-xl bg-blue-500/30"
                                    >
                                    </motion.div>
                                )}
                            </motion.button>
                      )
                    })}
                </div>
            </div>
        </motion.div>
    </>
  )
}

export default Navbar
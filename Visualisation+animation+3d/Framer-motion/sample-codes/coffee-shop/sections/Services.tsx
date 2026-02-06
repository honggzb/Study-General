"use client";

import { motion } from 'motion/react';

const servicesData = [
    {
        id: 1,
        image: "./assets/coffee/Coffee1.png",
        title: "Black Coffee",
        subtitle: "Labore esse mollit execulpa sunt fugiat. In amet oc=m minim in non mollit quis aute et duis."
    },
    {
        id: 2,
        image: "./assets/coffee/Coffee3.png",
        title: "Black Coffee",
        subtitle: "Labore esse mollit execulpa sunt fugiat. In amet occaecat minim minim in non mollit quis aute et duis."
    },
    {
        id: 3,
        image: "./assets/coffee/Coffee1.png",
        title: "Black Coffee",
        subtitle: "Labore esse mollit execsunt fugiat. In amet occaecat minim minim in non mollit quis aute et duis."
    },
]

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 10, ease: "easeInOut" }
    }
};

const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: { delay: 0.6, staggerChildren: 0.4 }  // delay between animations
    },
};

const Services = () => {
  return (
    <div className='p-4 sm:p-8 my-16 space-y-4 bg-white'>
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.2 }}
            className='text-center max-w-lg mx-auto space-y-2'
        >
            <h1 className='text-3xl font-bold text-[#272c35]'>
                Fresh and <span className='text-[#f97316]'>Tasty Coffee</span>
            </h1>
            <motion.p
                 initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.6 }}
                className='text-sm opacity-50'
            >
                Elit ut mollit cillum adipisicing ea ea irure nostrud ut quis voluptate eu ipsum. Sunt ipsum velit labore ex adipisicing amet nostrud magna occaecat sunt. Laboris deserunt sint culpa voluptate magna labore officia. Est deserunt laborum sit cupidatat nulla nostrud anim.
            </motion.p>
        </motion.div>
        {/* card section */}
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView={"visible"}
            viewport={{ amount: 0.8 }}
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
        >
            {servicesData.map((ser, i) => (
                <motion.div
                    key={ser.subtitle+i}
                    variants={cardVariants}
                    className="text-center p-4 space-y-6"
                >
                    <img src={ser.image} alt={ser.title} className='img-shadow2 max-w-[200px] mx-auto hover:scale-110 duration-200 cursor-pointer' />
                    <div className='space-y-2'>
                        <h1 className='text-2xl font-bold text-[#f97316]'>{ser.title}</h1>
                        <h1 className='text-[#1a1f25]'>{ser.subtitle}</h1>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    </div>
  )
}

export default Services
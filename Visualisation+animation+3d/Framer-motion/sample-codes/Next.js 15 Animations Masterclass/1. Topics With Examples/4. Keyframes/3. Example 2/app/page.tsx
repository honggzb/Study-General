import * as motion from "motion/react-client";

const BouncingLoader = () => {
  return (
    <div className="flex space-x-2">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="w-8 h-8 bg-teal-500 rounded-full"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default BouncingLoader;

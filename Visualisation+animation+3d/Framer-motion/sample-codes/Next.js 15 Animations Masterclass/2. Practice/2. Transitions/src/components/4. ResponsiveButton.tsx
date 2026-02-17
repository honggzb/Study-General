import * as motion from "motion/react-client";

const ResponsiveButton = () => {
  return (
    <motion.button
      className="p-2 bg-blue-500 text-white rounded transition-transform duration-300 ease-in-out"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      Click Me!
    </motion.button>
  );
};

export default ResponsiveButton;

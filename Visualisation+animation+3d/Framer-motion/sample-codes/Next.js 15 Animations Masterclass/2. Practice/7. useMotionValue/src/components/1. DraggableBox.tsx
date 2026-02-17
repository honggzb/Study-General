"use client";
import { motion, useMotionValue } from "motion/react";

const DraggableBox = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        drag
        style={{ x, y }}
        className="w-32 h-32 bg-blue-500 rounded"
      />
      <p className="text-white">
        Position: ({x.get().toFixed(2)}, {y.get().toFixed(2)})
      </p>
    </div>
  );
};

export default DraggableBox;

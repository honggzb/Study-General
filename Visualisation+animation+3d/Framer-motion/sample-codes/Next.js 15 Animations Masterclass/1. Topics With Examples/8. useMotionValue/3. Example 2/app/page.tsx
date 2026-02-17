"use client";
import { motion, useMotionValue, useTransform } from "motion/react";
import { ChangeEvent } from "react";

const ColorChanger = () => {
  const hue = useMotionValue(0);
  const backgroundColor = useTransform(hue, (h) => `hsl(${h}, 100%, 50%)`);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    hue.set(parseFloat(e.target.value));
  };

  return (
    <div>
      <motion.div
        style={{ backgroundColor }}
        className="w-[200px] h-[200px] rounded-3xl "
      />
      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={360}
          step={1}
          defaultValue={0}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
};

export default ColorChanger;

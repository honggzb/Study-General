import * as motion from "motion/react-client";

const SpinningIcon = () => (
  <motion.img
    src="https://avatars.githubusercontent.com/u/85052811?v=4"
    className="w-20 h-20"
    animate={{ rotate: 360 }}
    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
  />
);

export default SpinningIcon;

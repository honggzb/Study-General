import { Html, Scroll } from "@react-three/drei";

const Overlay = () => {
  return (
    <Html
      style={{
        // transparent white background
        background: "rgba(255, 255, 255, 0.3)",
        fontFamily: "sans-serif",
        fontSize: "min(2vw, 32px)",
        width: "30vw",
        top: "400vh",
        right: "-50vw",
        color: "white",
      }}
    >
      <h1 className="font-serif text-2xl">made by xxx</h1>
      <h2>Technologies used:</h2>
      <ul>
        <li>next & React</li>
        <li>react-three/fiber</li>
        <li>react-three/drei</li>
        <li>Three.js</li>
        <li>CSS</li>
        <li>Tailwind CSS</li>
        <li>GSAP</li>
      </ul>
    </Html>
  );
};

export default Overlay;
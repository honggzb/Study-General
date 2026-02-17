"use client";

import { OrbitControls } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Suspense } from "react";
import { Loading } from "./Loading";
import { Jordan } from "./Jordan";
import { Canvas } from "@react-three/fiber";
// without registering scrolltriiger the model will break
gsap.registerPlugin(ScrollTrigger);

const CanvasContainer = () => {
  return (
    <Canvas
      camera={{ position: [4.742922067308307, 2.2387122409413784, 1.2218255872664914] }}
      shadows
    >
      <OrbitControls
        enablePan={false}
        enableRotate={false}
        enableZoom={false}
      />
      <Suspense fallback={<Loading />}>
        <Jordan />
      </Suspense>
    </Canvas>
  )
}

export default CanvasContainer
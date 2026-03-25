"use client";
/**
 *
 * Build a 3D Book Slider Landing Page with Three.js & React
 * https://www.youtube.com/watch?v=b7a_Y1Ja6js
 * https://github.com/wass08/r3f-animated-book-slider-final
 * https://r3f-animated-book-slider-final.vercel.app/
 *
 * npm i jotai
 * atomic approach to global React state management
 * https://tutorial.jotai.org/
 *
 * https://threejs.org/docs/#BoxGeometry
 * https://threejs.org/docs/#SkinnedMesh
 * https://threejs.org/docs/#Skeleton
 *
 * graphtoy  --> sin(x*0.2+0.23)
 * https://graphtoy.com/
 *
 */

import { Suspense } from "react";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Bookpages from "@/components/Bookpages";
import Scene from "@/components/Scene";

export default function Home() {
  return (
    <>
      <Bookpages />
      <Loader />
      <Canvas shadows camera={{
          position: [-0.5, 1, 9],
          fov: 20,
        }}>
        <group position-y={0}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
}

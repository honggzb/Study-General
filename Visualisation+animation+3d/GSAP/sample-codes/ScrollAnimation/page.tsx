"use client";
/**
 *
 * https://github.com/prismicio-community/course-fizzi-next
 *
 */

import { Canvas } from "@react-three/fiber";
import ScrollBasedAnimation from "@/components/ScrollBasedAnimation";


export default function Home() {
  return (
    <>
      <Canvas dpr={[1, 2]}>
          <ambientLight />
          <directionalLight color="red" intensity={10} />
          <ScrollBasedAnimation />
          {/*<Text>HI!</Text>*/}
      </Canvas>
      {/* <Menu /> */}
    </>
  );
}

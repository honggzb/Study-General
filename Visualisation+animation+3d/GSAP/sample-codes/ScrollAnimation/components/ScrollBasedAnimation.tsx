"use client";
/**
 * https://github.com/nadjascodejourney/scrollr3fproject/
*/

import { useState } from 'react';
import { Scroll, ScrollControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import ScrollManager from './ScrollManager'
import Particles from './Particles'
import Objects from './Objects'
import Overlay from './Overlay'
import ScrollText from './ScrollText'

const ScrollBasedAnimation = () => {
  const [section, setSection] = useState(0);

  useFrame(({ mouse, camera }) => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.x * 0.5,
      0.03
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.y * 0.8,
      0.01
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      Math.max(4, Math.abs(mouse.x * mouse.y * 8)),
      0.01
    );
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      mouse.x * -Math.PI * 0.025,
      0.001
    );
  });

  return (
    <ScrollControls pages={4} damping={0.1} horizontal={false}>
        <ScrollManager section={section} onSectionChange={setSection} />
        <Scroll>
        <Particles
          count={3000}
          size={10}
          speed={0.02}
          opacity={1}
          scale={60}
          color="#fff3b0"
        />
        <Particles />
        <Objects />
      </Scroll>
      <Scroll html>
        <ScrollText />
      </Scroll>
      <Scroll>
        <Overlay />
      </Scroll>
    </ScrollControls>
  )
}

export default ScrollBasedAnimation
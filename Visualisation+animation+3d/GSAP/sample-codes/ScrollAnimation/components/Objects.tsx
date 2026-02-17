"use client";

import { useIntersect } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

const Objects = () => {
  const { height, width } = useThree((state) => state.viewport);
  return (
    <>
      <pointLight color="blue" position={[8, -25, 5]} intensity={20} />
      <pointLight
        color="red"
        position={[0, -height * 2.25, 5]} /* minus height! */
        intensity={10}
      />
      <Item color="purple" position={[0, 1, 0]}>
        <boxGeometry />
      </Item>
      <Item color="blue" position={[width / 5, -height * 1, 0]}>
        <dodecahedronGeometry />
      </Item>
      <Item color="greenyellow" position={[-width / 3, -height * 1.8, -2]}>
        <coneGeometry args={[1, 1, 6]} />
      </Item>
      <Item color="purple" position={[width / 4, -height * 2, 0]}>
        <coneGeometry args={[1.5, 2, 3]} />
      </Item>
      <Item color="orange" position={[-width / 12, -height * 2.5, 0.5]}>
        <coneGeometry args={[0.75, 2.5, 12]} />
      </Item>
      <Item color="blue" position={[width / 3, -height * 3, -4]}>
        <octahedronGeometry />
      </Item>
    </>
  );
};

type ItemProps = {
  color: string;
  position: [number, number, number];
  children: React.ReactNode;
};

function Item({ color, position, children }: ItemProps) {
  // color, postion, and children are the props of the Item component
  const visible = useRef(); // useRef is used to store the current value of the object in the DOM
  const ref = useIntersect((isVisible) => (visible.current = isVisible)); // Intersection observer checks if the object is visible, this is important because we want to animate only visible objects => performance; current is a reference to the current object in the DOM
  const [xRandomFactor, yRandomFactor] = useMemo(
    () => [(0.5 - Math.random()) * 0.5, (0.5 - Math.random()) * 0.5],
    [] // useMemo is used to store the random values for the rotation of the object; performance optimization because the values are stored and not recalculated every time the component is rerendered
  ); // we need random values for the rotation of the objects
  useFrame(({ clock }, delta) => {
    // clock comes from the useFrame hook, it is used to get the elapsed time; delta is the time between the last frame and the current frame
    const elapsedTime = clock.getElapsedTime();
    ref.current.rotation.x = elapsedTime * xRandomFactor;
    ref.current.rotation.y = elapsedTime * yRandomFactor;
    const scale = THREE.MathUtils.damp(
      // damp is used to animate the scale of the object; it interpolates between the current scale and the target scale
      ref.current.scale.x, // current scale
      visible.current ? 1.5 : 0.2, // target scale checks if the object is visible, if yes the target scale is 1.5, if not the target scale is 0.2
      5, // damping factor = how fast the scale changes
      delta // time between the last frame and the current frame
    );
    ref.current.scale.set(scale, scale, scale); // set the scale of the object on the x, y, and z axis => here we can use the same value "scale" because we want to scale the object uniformly
  });
  return (
    // we use the mesh component to render the objects dynamically and reusable in the scene
    <mesh ref={ref} position={position}>
      {children}
      {/* we put children here to render the geometry of the object */}
      <meshPhysicalMaterial transparent color={color} />
    </mesh>
  );
}

export default Objects;
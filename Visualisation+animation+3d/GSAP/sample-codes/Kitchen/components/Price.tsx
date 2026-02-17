"use client";

import { useRef } from "react"
import { easing } from "maath"
import { useFrame } from "@react-three/fiber"
import { Text, Mask, useMask } from "@react-three/drei"
import { Group } from "three";

type PriceProps = {
  value: string | number;
  currency?: string;
  [key: string]: any;
};

const Price = ({ value, currency = "$", ...props }: PriceProps) => {

  return (
    <group {...props}>
    {[...`✨✨✨${value}`.slice(-4)].map((num, index) => (
      <Counter index={index} value={num === "✨" ? -1 : num} key={index} speed={0.1 * (4 - index)} />
    ))}
    <Text anchorY="bottom" position={[4 * 1.1, -0.25, 0]} fontSize={1} font="Inter-Regular.woff" color="rgba(255, 255, 255, 0.8)">{currency}</Text>
    <Mask id={1}>
      <planeGeometry args={[10, 1.55]} />
    </Mask>
  </group>
  )
}

export default Price;

type CounterProp ={
    index: number;
    value: string | number;
    speed: number;
}

function Counter({ index, value, speed = 0.1 }: CounterProp) {
  const ref = useRef<Group>(null);
  const stencil = useMask(1)
  useFrame((state, delta) => {
    if (!ref.current)
      return;
    easing.damp(ref.current.position, "y", value * -2, speed, delta);
    });
  return (
    <group position-x={index * 1.1} ref={ref}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
        <Text key={number} position={[0, number * 2, 0]} fontSize={2} font="Inter-Regular.woff" color="#rgba(255, 255, 255, 0.8)">
          {number}
          <meshBasicMaterial {...stencil} />
        </Text>
      ))}
    </group>
  )
}

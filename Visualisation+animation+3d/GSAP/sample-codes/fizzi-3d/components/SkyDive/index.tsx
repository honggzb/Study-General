"use client";

import { Bounded } from "@/components/Bounded";
import Scene from "./Scene";
import { View } from "@react-three/drei";

const SkyDive = () => {
  return (
    <Bounded className="skydive h-screen">
        <h2 className="sr-only">dive into health life</h2>
        <View className="h-screen w-screen">
            <Scene flavor="watermelon" sentence="dive into health life" />
        </View>
    </Bounded>
  )
}

export default SkyDive
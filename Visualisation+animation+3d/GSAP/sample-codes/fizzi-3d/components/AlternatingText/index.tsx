"use client";

import { View } from "@react-three/drei";
import clsx from "clsx";
import { Bounded } from '../Bounded'
import Scene from './Scene'
import { alternatingTexts } from "../constant";

const AlternatingText = () => {
  return (
    <Bounded className="alternating-text-container relative bg-yellow-300 text-sky-950">
        <div>
            <div className="relative z-100 grid">
                <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
                    <Scene />
                </View>
                {alternatingTexts.map((txt, index) => {
                  return (
                    <div key={index} className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2">
                         <div className={clsx(index % 2 === 0 ? "col-start-1" : "md:col-start-2", "rounded-lg p-4 backdrop-blur-lg max-md:bg-white/30")}>
                            <h2 className="text-balance text-6xl font-bold">{txt.heading}</h2>
                            <div className="mt-4 text-xl">{txt.body}</div>
                         </div>
                    </div>
                  )
                })}
            </div>
        </div>
    </Bounded>
  )
}

export default AlternatingText
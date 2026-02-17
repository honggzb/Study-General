"use client";

import { useCallback, useState, Suspense } from "react";
import { Canvas } from '@react-three/fiber'
import clsx from "clsx";
import Image from "next/image";
import { Bounded } from "@/components/Bounded";
import Scene from "./Scene";
import { KEYCAP_TEXTURES } from './constant';

type KeycapTexture = (typeof KEYCAP_TEXTURES)[number];

const ColorChanger = () => {
  const [selectedTextureId, setSelectedTextureId] = useState(
    KEYCAP_TEXTURES[0].id,
  );
  const [backgroundText, setBackroundText] = useState(KEYCAP_TEXTURES[0].name);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleTextureSelect(texture: KeycapTexture) {
    if (texture.id === selectedTextureId || isAnimating) return;

    setIsAnimating(true);
    setSelectedTextureId(texture.id);
    setBackroundText(
      KEYCAP_TEXTURES.find((t) => t.id === texture.id)?.name || "",
    );
  }

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false);
  }, []);

  return (
    <section
      className="relative flex h-[90vh] min-h-[1000px] flex-col overflow-hidden bg-linear-to-br from-[#0f172a] to-[#062f4a] text-white"
      id="keycap-changer"
    >
       {/* SVG background */}
      <svg
        className="pointer-events-none absolute top-0 left-0 h-auto w-full mix-blend-overlay"
        viewBox="0 0 75 100"
      >
        <text
          fontSize={7}
          textAnchor="middle"
          dominantBaseline={"middle"}
          x="50%"
          y="50%"
          className="font-black-slanted fill-white/20 uppercase group-hover:fill-white/30 motion-safe:transition-all motion-safe:duration-700"
        >
          {Array.from({ length: 20 }, (_, i) => (
            <tspan key={i} x={`${(i + 1) * 10}%`} dy={i === 0 ? -50 : 6}>
              {Array.from({ length: 10 }, () => backgroundText).join(" ")}
            </tspan>
          ))}
        </text>
      </svg>
      {/* Canvas */}
        <Canvas camera={{ position: [0, 0.5, 0.5], fov: 45, zoom: 1.5 }} className="mb-[-10vh] grow">
            {/* <Suspense> */}
                <Scene
                    selectedTextureId={selectedTextureId}
                    onAnimationComplete={handleAnimationComplete}
                />
            {/* </Suspense> */}
        </Canvas>
       <Bounded
        className="relative shrink-0"
        innerClassName="gap-6 lg:gap-8 flex flex-col lg:flex-row"
      >
        <div className="max-w-md shrink-0">
          <h2 className="font-bold-slanted mb-1 text-4xl uppercase lg:mb-2 lg:text-6xl">
            Customer Keycaps
          </h2>
          <div className="text-pretty lg:text-lg">
            Esse consectetur laborum deserunt molliur fugiat magna reprehenderit esse consequat ut officia non. Non et in velit tempor sint sunt.
          </div>
        </div>
        <ul className="grid grow grid-cols-2 gap-3 rounded-2xl bg-white p-4 text-black shadow-lg sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
          {KEYCAP_TEXTURES.map((texture) => (
            <li key={texture.id}>
              <button
                onClick={() => handleTextureSelect(texture)}
                disabled={isAnimating}
                className={clsx(
                  "flex aspect-square flex-col items-center justify-center rounded-lg border-2 p-4 hover:scale-105 motion-safe:transition-all motion-safe:duration-300",
                  selectedTextureId === texture.id
                    ? "border-[#81BFED] bg-[#81BFED]/20"
                    : "cursor-pointer border-gray-300 hover:border-gray-500",
                  isAnimating && "cursor-not-allowed opacity-50",
                )}
              >
                <div className="mb-3 overflow-hidden rounded border-2 border-black bg-gray-100">
                  <Image
                    src={texture.path}
                    alt={texture.name}
                    width={400}
                    height={255}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-center text-sm font-semibold">
                  {texture.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Bounded>
    </section>
  )
}

export default ColorChanger
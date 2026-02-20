"use client";

import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "./constants";
import { animateWithGsapTimeline } from "../utils/animations";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import ModelView from "./ModelView";
import dynamic from 'next/dynamic';

const Model = () => {
  const [size, setSize] = useState('small');
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: "/assets/images/yellow.jpg",
  })
  // camera control for the model view
  const cameraControlSmall = useRef(null);
  const cameraControlLarge = useRef(null);
  // model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());
  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  //const tl = gsap.timeline();

  useEffect(() => {
    const tl = gsap.timeline();
    if(size === 'large') {
      tl.to(small, {
            y: smallRotation,
            duration: 1,
            ease: 'power2.inOut'
        })
        .to('#view1',
            {
            transform: 'translateX(-100%)',
            duration: 2,
            ease: 'power2.inOut'
            },
            '<'
        )
        .to('#view2',
            {
            transform: 'translateX(-100%)',
            duration: 2,
            ease: 'power2.inOut'
            },
            '<'
        )
    }
    if(size ==='small') {
      tl.to(large, {
            y: largeRotation,
            duration: 1,
            ease: 'power2.inOut'
        })
        .to('#view2',
            {
            transform: 'translateX(0)',
            duration: 2,
            ease: 'power2.inOut'
            },
            '<'
        )
        .to('#view1',
            {
            transform: 'translateX(0)',
            duration: 2,
            ease: 'power2.inOut'
            },
            '<'
        )
    }
  }, [size])

  useGSAP(() => {
    gsap.to('#heading', { y: 0, opacity: 1 })
  }, []);

  return (
    <section className="common-padding">
      <div className="w-screen flex flex-col items-center justify-center">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full h-[65vh] md:h-[80vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />
            <Canvas className="w-full h-full fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
              <View.Port />
            </Canvas>
            <Loader />
          </div>

          <div className="w-full gap-3 flex flex-col items-center justify-center">
            <p className="text-sm font-light text-center">{model.title}</p>
            <div className="w-58 flex flex-row items-center justify-center gap-1">
              <ul className="color-container w-full p-6">
                {models.map((item, i) => (
                  <li key={i} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{ backgroundColor: item.color[0] }} onClick={() => setModel(item)} title={item.title.split(' ')[4]} />
                ))}
              </ul>
              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span key={label} className="size-btn" style={{ backgroundColor: size === value ? 'white' : 'transparent', color: size === value ? 'black' : 'white'}} onClick={() => setSize(value)}>
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Model

const Loader = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Loader),
  { ssr: false },
);

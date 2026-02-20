"use client";

import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import * as THREE from 'three';
import React, { Suspense } from 'react'
import Lights from './Lights'
//import { Loading } from './Loading'
import { Iphone } from './Iphone'
import clsx from 'clsx';

type ModelViewProps = {
  index: number;
  groupRef: React.RefObject<THREE.Group>;
  gsapType: string;
  controlRef: React.RefObject<any>;
  setRotationState: (angle: number) => void;
  size: string;
  item: any;
}

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }: ModelViewProps) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={clsx(`${index === 2 ? '-right-full' : ''}`, 'w-full h-full absolute')}
    >
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0 ,0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
        <Suspense fallback={null}>
          <group ref={groupRef} name={index === 1 ? 'small' : 'large'} position={[0, 0 ,0]}>
            <Iphone
              scale={index === 1 ? 1 : 1.1}
              item={item}
              size={size}
            />
            </group>
        </Suspense>
    </View>
  )
}

export default ModelView
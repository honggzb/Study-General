"use client";

import * as THREE from "three";
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Keyboard, KeyboardRefs } from '@/components/Keyboard';
import { Keycap } from "@/components/Keycap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// function LoaderWrapper() {
//   const { active } = useProgress();
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     if (active) {
//       setIsLoading(true);
//     } else {
//       const timer = setTimeout(() => setIsLoading(false), 100);
//       return () => clearTimeout(timer);
//     }
//   }, [active]);

//   return (
//     <div
//       className={clsx(
//         "motion-safe:transition-opacity motion-safe:duration-700",
//         isLoading ? "opacity-100" : "pointer-events-none opacity-0",
//       )}
//     >
//       <Loader />
//     </div>
//   );
// }

function CameraController() {

  const { camera, size } = useThree();
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentPositionRef = useRef(new THREE.Vector3(0, 0, 4));
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const baseCameraPosition = { x: 0, y: 0, z: 4 };

  useFrame(() => {
    const mouse = mouseRef.current;

    if (prefersReducedMotion) {
      camera.position.set(
        baseCameraPosition.x,
        baseCameraPosition.y,
        baseCameraPosition.z,
      );
      camera.lookAt(targetRef.current);
      return;
    }

    const tiltX = (mouse.y - 0.5) * 0.3;
    const tiltY = (mouse.x - 0.5) * 0.3;

    const targetPosition = new THREE.Vector3(
      baseCameraPosition.x + tiltY,
      baseCameraPosition.y - tiltX,
      baseCameraPosition.z,
    );

    currentPositionRef.current.lerp(targetPosition, 0.1);

    camera.position.copy(currentPositionRef.current);
    camera.lookAt(targetRef.current);
  });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX / size.width;
      mouseRef.current.y = event.clientY / size.height;
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [size]);

  return null;
}

const Scene = () => {
  const keyboardGroupRef = useRef<THREE.Group>(null);
  const keycapRef = useRef<THREE.Group>(null);
  const keyboardAnimationRef = useRef<KeyboardRefs>(null);
  const [lightIntensityScaler, setLightIntensityScaler] = useState(0);
  // This object is used to tween the Environment intensity
  const envValue = { value: 0 }
  //const envRef = useRef<THREE.Group>(null);

  const scalingFactor = window.innerWidth <= 500 ? 0.5 : 1;

  useGSAP(() => {
     const mm = gsap.matchMedia();
     mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!keyboardGroupRef.current) return;
      const keyboard = keyboardGroupRef.current;
      gsap.to(
        envValue,
        {
          environmentIntensity: 1,
          duration: 3.5,
          delay: 0.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          onUpdate: function () {
          //   console.log(this.targets()[0].environmentIntensity);
             setLightIntensityScaler(envValue.value);
          },
        },
      );

      const tl = gsap.timeline({ ease: "power2.inOut" });

      if (typeof window !== "undefined") {
        const initialScrollY = window.scrollY;
        if (initialScrollY === 0) {
          document.body.style.overflow = "hidden";
        }
      }

      tl.to(
          keyboard.position,
          { x: 0, y: -0.5, z: 0.5, duration: 2 }
        )
        .to(
          keyboard.rotation,
          { x: 1.4, y: 0, z: 0, duration: 1.8 },
          "<",
        )
        .to(
          keyboard.position,
          { x: 0.2,  y: -0.5, z: 1.9, duration: 2, delay: 0.5 }
        )
        .to(
          keyboard.rotation,
          { x: 1.6, y: 0.4, z: 0, duration: 2 },
          "<",
        )
        .call(() => {
          if (typeof window !== "undefined") {
            document.body.style.overflow = "";
          }
          const keycaps = keycapRef.current;
          if (!keyboard || !keycaps) return;
          const scrollTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          });
          scrollTimeline
            .to(
              keyboard.position,
              { x: 0, y: -0.5, z: 2.2,
            })
            .to(
              keyboard.rotation,
              { x: Math.PI * -2 + 0.8, y: 0, z: 0 },
              "<",
            )
            .to(
              keycaps.scale,
              { x: 5, y: 5, z: 5, duration: 3 },
              "0",
            );
          // Add wave animation to the scroll timeline
          if (keyboardAnimationRef.current) {
            // Collect all switches and keycaps from all rows
            const switchRefs = keyboardAnimationRef.current.switches;
            const individualKeys = keyboardAnimationRef.current.keys;
            // Collect all switches into a single array
            const allSwitches: THREE.Object3D[] = [];
            // Gather all switches from all rows
            [
              switchRefs.functionRow.current,
              switchRefs.numberRow.current,
              switchRefs.topRow.current,
              switchRefs.homeRow.current,
              switchRefs.bottomRow.current,
              switchRefs.modifiers.current,
              switchRefs.arrows.current,
            ].forEach((row) => {
              if (row) {
                allSwitches.push(...Array.from(row.children));
              }
            });
            // Define keycaps in actual left-to-right COLUMN order across the keyboard
            const keyboardColumns = [
              ["esc", "grave", "tab", "caps", "lshift", "lcontrol"],
              ["f1", "one", "q", "a", "z", "lalt"],
              ["f2", "two", "w", "s", "x", "lwin"],
              ["f3", "three", "e", "d", "c"],
              ["f4", "four", "r", "f", "v"],
              ["f5", "five", "t", "g", "b", "space"],
              ["f6", "six", "y", "h", "n"],
              ["f7", "seven", "u", "j", "m"],
              ["f8", "eight", "i", "k", "comma"],
              ["f9", "nine", "o", "l", "period"],
              ["f10", "zero", "dash", "p", "semicolon", "slash", "ralt"],
              [
                "f11",
                "lsquarebracket",
                "quote",
                "rshift",
                "fn",
                "arrowleft",
                "rsquarebracket",
                "enter",
                "f12",
                "equal",
                "arrowup",
              ],
              [],
              [
                "del",
                "backspace",
                "backslash",
                "pagedown",
                "end",
                "arrowdown",
                "pageup",
                "arrowright",
              ],
              [],
            ];

            // Group keycaps and switches by column
            const keyCapsByColumn: THREE.Mesh[][] = [];
            const switchesByColumn: THREE.Object3D[][] = [];

            // Sort switches by X position to match column order
            const sortedSwitches = allSwitches.sort(
              (a, b) => a.position.x - b.position.x,
            );

            keyboardColumns.forEach((column, columnIndex) => {
              const columnKeycaps: THREE.Mesh[] = [];
              const columnSwitches: THREE.Object3D[] = [];

              column.forEach((keyName) => {
                if (keyName && individualKeys[keyName]?.current) {
                  columnKeycaps.push(individualKeys[keyName].current);
                }
              });

              // Assign switches to columns based on their count
              const switchesPerColumn = Math.ceil(
                sortedSwitches.length / keyboardColumns.length,
              );
              const startIndex = columnIndex * switchesPerColumn;
              const endIndex = Math.min(
                startIndex + switchesPerColumn,
                sortedSwitches.length,
              );

              for (let i = startIndex; i < endIndex; i++) {
                if (sortedSwitches[i]) {
                  columnSwitches.push(sortedSwitches[i]);
                }
              }

              keyCapsByColumn.push(columnKeycaps);
              switchesByColumn.push(columnSwitches);
            });

            // Add wave animation for each column to the scroll timeline
            keyCapsByColumn.forEach((columnKeycaps, columnIndex) => {
              const columnSwitches = switchesByColumn[columnIndex];

              if (columnKeycaps.length === 0 && columnSwitches.length === 0)
                return;

              // Calculate wave timing - spread across scroll timeline
              const waveProgress = columnIndex / (keyboardColumns.length - 1); // 0 to 1
              const waveStartTime = waveProgress * 2 + 0.5; // Spread wave across 2 time units

              // Animate keycaps up then down
              if (columnKeycaps.length > 0) {
                const keycapPositions = columnKeycaps.map(
                  (keycap) => keycap.position,
                );

                // Create temporary keyframe for wave peak
                scrollTimeline.to(
                  keycapPositions,
                  {
                    y: "+=0.08", // Lift keycaps up
                    duration: 0.5,
                    ease: "power2.inOut",
                  },
                  waveStartTime,
                );

                // Return to original position
                scrollTimeline.to(
                  keycapPositions,
                  {
                    y: "-=0.08", // Bring keycaps back down
                    duration: 0.5,
                    ease: "power2.inOut",
                  },
                  waveStartTime + 0.5,
                );
              }

              // Animate switches (follow keycaps with delay and less movement)
              if (columnSwitches.length > 0) {
                const switchPositions = columnSwitches.map(
                  (switchObj) => switchObj.position,
                );

                // Up phase (slightly delayed and lower)
                scrollTimeline.to(
                  switchPositions,
                  {
                    y: "+=0.04", // Less movement for switches
                    duration: 0.3,
                    ease: "power2.inOut",
                  },
                  waveStartTime + 0.2, // Slight delay
                );
                // Down phase
                scrollTimeline.to(
                  switchPositions,
                  {
                    y: "-=0.04",
                    duration: 0.3,
                    ease: "power2.inOut",
                  },
                  waveStartTime + 0.5,
                );
              }
            });
          }
        });
    });
  });

  return (
    <group>
      <CameraController />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />

      <group scale={scalingFactor}>
        <group ref={keyboardGroupRef}>
          <Keyboard scale={9} ref={keyboardAnimationRef} />
        </group>

        <group ref={keycapRef}>
          <Keycap position={[0, -0.4, 2.6]} rotation={[0, 2, 3]} texture={0} />
          <Keycap position={[-1.4, 0, 2.3]} rotation={[3, 2, 1]} texture={1} />
          <Keycap position={[-1.8, 1, 1.5]} rotation={[0, 1, 3]} texture={2} />
          <Keycap position={[0, 1, 1]} rotation={[0, 4, 2]} texture={3} />
          <Keycap position={[0.7, 0.9, 1.4]} rotation={[3, 2, 0]} texture={4} />
          <Keycap
            position={[1.3, -0.3, 2.3]}
            rotation={[1, 2, 0]}
            texture={5}
          />
          <Keycap position={[0, 1, 2]} rotation={[2, 2, 3]} texture={6} />
          <Keycap position={[-0.7, 0.6, 2]} rotation={[1, 4, 0]} texture={7} />
          <Keycap
            position={[-0.77, 0.1, 2.8]}
            rotation={[3, 2, 3]}
            texture={8}
          />
          <Keycap position={[2, 0, 1]} rotation={[0, 0, 3]} texture={7} />
        </group>
      </group>

      <Environment
        files="/hdr/blue-studio.hdr"
        intensity={0.2 * lightIntensityScaler}
        background
        backgroundBlurriness={0.3}
      />

      <spotLight
        position={[-2, 1.5, 3]}
        intensity={30 * lightIntensityScaler}
        castShadow
        penumbra={0}
        shadow-bias={-0.0002}
        shadow-normalBias={0.002}
        shadow-mapSize={1024}
      />
    </group>
  )
}

export default Scene
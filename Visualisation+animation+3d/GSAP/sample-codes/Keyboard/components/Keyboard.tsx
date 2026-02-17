import * as THREE from "three";
import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Plate: THREE.Mesh;
    Knob: THREE.Mesh;
    PCB: THREE.Mesh;
    ["625u_Wire001"]: THREE.Mesh;
    Cube005: THREE.Mesh;
    Cube005_1: THREE.Mesh;
    Top_Case: THREE.Mesh;
    Weight: THREE.Mesh;
    Screen: THREE.Mesh;
    K_LCONTROL: THREE.Mesh;
    K_GRAVE: THREE.Mesh;
    K_A: THREE.Mesh;
    K_Q: THREE.Mesh;
    K_ESC: THREE.Mesh;
    K_SPACE: THREE.Mesh;
    K_Z: THREE.Mesh;
    K_ARROWLEFT: THREE.Mesh;
    K_TAB: THREE.Mesh;
    K_ENTER: THREE.Mesh;
    K_BACKSPACE: THREE.Mesh;
    K_CAPS: THREE.Mesh;
    K_LSHIFT: THREE.Mesh;
    K_RSHIFT: THREE.Mesh;
    K_ARROWDOWN: THREE.Mesh;
    K_ARROWRIGHT: THREE.Mesh;
    K_LALT: THREE.Mesh;
    K_LWIN: THREE.Mesh;
    K_RALT: THREE.Mesh;
    K_FN: THREE.Mesh;
    K_1: THREE.Mesh;
    K_2: THREE.Mesh;
    K_3: THREE.Mesh;
    K_4: THREE.Mesh;
    K_5: THREE.Mesh;
    K_6: THREE.Mesh;
    K_7: THREE.Mesh;
    K_8: THREE.Mesh;
    K_9: THREE.Mesh;
    K_0: THREE.Mesh;
    K_DASH: THREE.Mesh;
    K_EQUAL: THREE.Mesh;
    K_DEL: THREE.Mesh;
    K_S: THREE.Mesh;
    K_D: THREE.Mesh;
    K_F: THREE.Mesh;
    K_G: THREE.Mesh;
    K_H: THREE.Mesh;
    K_J: THREE.Mesh;
    K_K: THREE.Mesh;
    K_L: THREE.Mesh;
    K_SEMICOLON: THREE.Mesh;
    K_QUOTE: THREE.Mesh;
    K_PAGEDOWN: THREE.Mesh;
    K_W: THREE.Mesh;
    K_E: THREE.Mesh;
    K_R: THREE.Mesh;
    K_T: THREE.Mesh;
    K_Y: THREE.Mesh;
    K_U: THREE.Mesh;
    K_I: THREE.Mesh;
    K_O: THREE.Mesh;
    K_P: THREE.Mesh;
    K_LSQUAREBRACKET: THREE.Mesh;
    K_RSQUAREBRACKET: THREE.Mesh;
    K_PAGEUP: THREE.Mesh;
    K_F1: THREE.Mesh;
    K_F2: THREE.Mesh;
    K_F3: THREE.Mesh;
    K_F4: THREE.Mesh;
    K_F5: THREE.Mesh;
    K_F6: THREE.Mesh;
    K_F7: THREE.Mesh;
    K_F8: THREE.Mesh;
    K_F9: THREE.Mesh;
    K_F10: THREE.Mesh;
    K_F11: THREE.Mesh;
    K_F12: THREE.Mesh;
    K_X: THREE.Mesh;
    K_C: THREE.Mesh;
    K_V: THREE.Mesh;
    K_B: THREE.Mesh;
    K_N: THREE.Mesh;
    K_M: THREE.Mesh;
    K_COMMA: THREE.Mesh;
    K_PERIOD: THREE.Mesh;
    K_SLASH: THREE.Mesh;
    K_ARROWUP: THREE.Mesh;
    K_END: THREE.Mesh;
    K_BACKSLASH: THREE.Mesh;
    Switch_Heavy002: THREE.InstancedMesh;
    Switch_Heavy002_1: THREE.InstancedMesh;
    Switch_Heavy002_2: THREE.InstancedMesh;
    Switch_Heavy002_3: THREE.InstancedMesh;
    ["2U_Wires"]: THREE.InstancedMesh;
    Stab_Housing_Instances: THREE.InstancedMesh;
  };
  materials: {
    PC: THREE.MeshStandardMaterial;
    Knob: THREE.MeshStandardMaterial;
    PCB_Black: THREE.MeshStandardMaterial;
    Gold: THREE.MeshStandardMaterial;
    Bottom_Case: THREE.MeshStandardMaterial;
    Feet: THREE.MeshStandardMaterial;
    Top_Case: THREE.MeshStandardMaterial;
    Weight: THREE.MeshStandardMaterial;
    Screen: THREE.MeshPhysicalMaterial;
    Keycaps: THREE.MeshPhysicalMaterial;
    Switch_Bottom_Housing: THREE.MeshStandardMaterial;
    Stem: THREE.MeshStandardMaterial;
    Switch_Top_Housing: THREE.MeshStandardMaterial;
  };
  animations: THREE.AnimationClip[];
};

export interface KeyboardRefs {
  // Main keyboard structure
  plate: React.RefObject<THREE.Mesh | null>;
  topCase: React.RefObject<THREE.Mesh | null>;
  weight: React.RefObject<THREE.Mesh | null>;
  screen: React.RefObject<THREE.Mesh | null>;
  knob: React.RefObject<THREE.Mesh | null>;

  // Switch groups for wave animation
  switches: {
    functionRow: React.RefObject<THREE.Group | null>;
    numberRow: React.RefObject<THREE.Group | null>;
    topRow: React.RefObject<THREE.Group | null>;
    homeRow: React.RefObject<THREE.Group | null>;
    bottomRow: React.RefObject<THREE.Group | null>;
    modifiers: React.RefObject<THREE.Group | null>;
    arrows: React.RefObject<THREE.Group | null>;
  };

  // Keycap groups for easy animation targeting
  keycaps: {
    functionRow: React.RefObject<THREE.Group | null>;
    numberRow: React.RefObject<THREE.Group | null>;
    topRow: React.RefObject<THREE.Group | null>;
    homeRow: React.RefObject<THREE.Group | null>;
    bottomRow: React.RefObject<THREE.Group | null>;
    modifiers: React.RefObject<THREE.Group | null>;
    arrows: React.RefObject<THREE.Group | null>;
  };

  // Individual keycaps for detailed animations
  keys: {
    [key: string]: React.RefObject<THREE.Mesh | null>;
  };

  // Main container
  container: React.RefObject<THREE.Group | null>;
}

interface KeyboardProps extends React.ComponentProps<"group"> {
  keycapMaterial?: THREE.Material;
  knobColor?: string;
}

export const Keyboard = forwardRef<KeyboardRefs, KeyboardProps>(
  ({ keycapMaterial, knobColor, ...props }, ref) => {
    const { nodes, materials } = useGLTF(
      "/keyboard.gltf",
    ) as unknown as GLTFResult;

    // Main structure refs
    const containerRef = useRef<THREE.Group>(null);
    const plateRef = useRef<THREE.Mesh>(null);
    const topCaseRef = useRef<THREE.Mesh>(null);
    const weightRef = useRef<THREE.Mesh>(null);
    const screenRef = useRef<THREE.Mesh>(null);
    const knobRef = useRef<THREE.Mesh>(null);

    // Switch group refs
    const switchFunctionRowRef = useRef<THREE.Group>(null);
    const switchNumberRowRef = useRef<THREE.Group>(null);
    const switchTopRowRef = useRef<THREE.Group>(null);
    const switchHomeRowRef = useRef<THREE.Group>(null);
    const switchBottomRowRef = useRef<THREE.Group>(null);
    const switchModifiersRef = useRef<THREE.Group>(null);
    const switchArrowsRef = useRef<THREE.Group>(null);

    // Keycap group refs
    const functionRowRef = useRef<THREE.Group>(null);
    const numberRowRef = useRef<THREE.Group>(null);
    const topRowRef = useRef<THREE.Group>(null);
    const homeRowRef = useRef<THREE.Group>(null);
    const bottomRowRef = useRef<THREE.Group>(null);
    const modifiersRef = useRef<THREE.Group>(null);
    const arrowsRef = useRef<THREE.Group>(null);

    // Individual key refs
    const keyRefs = {
      esc: useRef<THREE.Mesh>(null),
      f1: useRef<THREE.Mesh>(null),
      f2: useRef<THREE.Mesh>(null),
      f3: useRef<THREE.Mesh>(null),
      f4: useRef<THREE.Mesh>(null),
      f5: useRef<THREE.Mesh>(null),
      f6: useRef<THREE.Mesh>(null),
      f7: useRef<THREE.Mesh>(null),
      f8: useRef<THREE.Mesh>(null),
      f9: useRef<THREE.Mesh>(null),
      f10: useRef<THREE.Mesh>(null),
      f11: useRef<THREE.Mesh>(null),
      f12: useRef<THREE.Mesh>(null),
      del: useRef<THREE.Mesh>(null),
      grave: useRef<THREE.Mesh>(null),
      one: useRef<THREE.Mesh>(null),
      two: useRef<THREE.Mesh>(null),
      three: useRef<THREE.Mesh>(null),
      four: useRef<THREE.Mesh>(null),
      five: useRef<THREE.Mesh>(null),
      six: useRef<THREE.Mesh>(null),
      seven: useRef<THREE.Mesh>(null),
      eight: useRef<THREE.Mesh>(null),
      nine: useRef<THREE.Mesh>(null),
      zero: useRef<THREE.Mesh>(null),
      dash: useRef<THREE.Mesh>(null),
      equal: useRef<THREE.Mesh>(null),
      backspace: useRef<THREE.Mesh>(null),
      tab: useRef<THREE.Mesh>(null),
      q: useRef<THREE.Mesh>(null),
      w: useRef<THREE.Mesh>(null),
      e: useRef<THREE.Mesh>(null),
      r: useRef<THREE.Mesh>(null),
      t: useRef<THREE.Mesh>(null),
      y: useRef<THREE.Mesh>(null),
      u: useRef<THREE.Mesh>(null),
      i: useRef<THREE.Mesh>(null),
      o: useRef<THREE.Mesh>(null),
      p: useRef<THREE.Mesh>(null),
      lsquarebracket: useRef<THREE.Mesh>(null),
      rsquarebracket: useRef<THREE.Mesh>(null),
      backslash: useRef<THREE.Mesh>(null),
      pageup: useRef<THREE.Mesh>(null),
      caps: useRef<THREE.Mesh>(null),
      a: useRef<THREE.Mesh>(null),
      s: useRef<THREE.Mesh>(null),
      d: useRef<THREE.Mesh>(null),
      f: useRef<THREE.Mesh>(null),
      g: useRef<THREE.Mesh>(null),
      h: useRef<THREE.Mesh>(null),
      j: useRef<THREE.Mesh>(null),
      k: useRef<THREE.Mesh>(null),
      l: useRef<THREE.Mesh>(null),
      semicolon: useRef<THREE.Mesh>(null),
      quote: useRef<THREE.Mesh>(null),
      enter: useRef<THREE.Mesh>(null),
      pagedown: useRef<THREE.Mesh>(null),
      lshift: useRef<THREE.Mesh>(null),
      z: useRef<THREE.Mesh>(null),
      x: useRef<THREE.Mesh>(null),
      c: useRef<THREE.Mesh>(null),
      v: useRef<THREE.Mesh>(null),
      b: useRef<THREE.Mesh>(null),
      n: useRef<THREE.Mesh>(null),
      m: useRef<THREE.Mesh>(null),
      comma: useRef<THREE.Mesh>(null),
      period: useRef<THREE.Mesh>(null),
      slash: useRef<THREE.Mesh>(null),
      rshift: useRef<THREE.Mesh>(null),
      arrowup: useRef<THREE.Mesh>(null),
      end: useRef<THREE.Mesh>(null),
      lcontrol: useRef<THREE.Mesh>(null),
      lwin: useRef<THREE.Mesh>(null),
      lalt: useRef<THREE.Mesh>(null),
      space: useRef<THREE.Mesh>(null),
      ralt: useRef<THREE.Mesh>(null),
      fn: useRef<THREE.Mesh>(null),
      arrowleft: useRef<THREE.Mesh>(null),
      arrowdown: useRef<THREE.Mesh>(null),
      arrowright: useRef<THREE.Mesh>(null),
    };

    // Expose refs through imperative handle
    useImperativeHandle(ref, () => ({
      plate: plateRef,
      topCase: topCaseRef,
      weight: weightRef,
      screen: screenRef,
      knob: knobRef,
      switches: {
        functionRow: switchFunctionRowRef,
        numberRow: switchNumberRowRef,
        topRow: switchTopRowRef,
        homeRow: switchHomeRowRef,
        bottomRow: switchBottomRowRef,
        modifiers: switchModifiersRef,
        arrows: switchArrowsRef,
      },
      keycaps: {
        functionRow: functionRowRef,
        numberRow: numberRowRef,
        topRow: topRowRef,
        homeRow: homeRowRef,
        bottomRow: bottomRowRef,
        modifiers: modifiersRef,
        arrows: arrowsRef,
      },
      keys: keyRefs,
      container: containerRef,
    }));

    const keycapTexture = useTexture("/goodwell_uv.png");
    // keycapTexture.flipY = false;
    // keycapTexture.colorSpace = THREE.SRGBColorSpace;

    const knurlTexture = useTexture("/Knurl.jpg");
    //knurlTexture.flipY = false;

    knurlTexture.repeat.set(6, 6);
    // knurlTexture.wrapS = THREE.RepeatWrapping;
    // knurlTexture.wrapT = THREE.RepeatWrapping;

    const screenTexture = useTexture("screen_uv.png");
    //screenTexture.flipY = false;

    screenTexture.repeat.set(-1, -1);
    screenTexture.offset.set(1, 1);

    const defaultKeycapMat = new THREE.MeshStandardMaterial({
      roughness: 0.7,
      map: keycapTexture,
    });

    const keycapMat = keycapMaterial || defaultKeycapMat;

    const knobMat = new THREE.MeshStandardMaterial({
      color: knobColor || "#E24818",
      roughness: 0.4,
      metalness: 1,
      bumpMap: knurlTexture,
      bumpScale: 0.8,
    });

    const plateMat = new THREE.MeshStandardMaterial({
      color: "#888888",
      roughness: 0.4,
    });

    const bottomCaseMat = new THREE.MeshStandardMaterial({
      color: "#1E548A",
      roughness: 0.4,
    });

    const topCaseMat = new THREE.MeshStandardMaterial({
      color: "#dddddd",
      roughness: 0.7,
    });

    const feetMat = new THREE.MeshStandardMaterial({
      color: "#333333",
      roughness: 0.6,
    });

    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTexture,
      roughness: 0.4,
    });

    const switchMat = new THREE.MeshStandardMaterial({
      color: "#cccccc",
      roughness: 0.4,
    });

    const switchStemMat = new THREE.MeshStandardMaterial({
      color: "#bb2222",
      roughness: 0.4,
    });

    const switchContactsMat = new THREE.MeshStandardMaterial({
      color: "#FFCF5F",
      roughness: 0.1,
      metalness: 1,
    });

    return (
      <group {...props} dispose={null} ref={containerRef}>
        <group position={[0.02, 0, 0]}>
          <mesh
            ref={plateRef}
            castShadow
            receiveShadow
            geometry={nodes.Plate.geometry}
            material={plateMat}
            position={[-0.022, -0.006, -0.057]}
          />
          <mesh
            ref={knobRef}
            castShadow
            receiveShadow
            geometry={nodes.Knob.geometry}
            material={knobMat}
            position={[0.121, 0.004, -0.106]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.PCB.geometry}
            material={plateMat}
            position={[-0.022, -0.009, -0.057]}
          />

          {/* Switches - organized by rows with individual meshes for animation */}
          {/* Function Row Switches */}
          <group ref={switchFunctionRowRef}>
            {[
              -0.165, -0.145, -0.126, -0.107, -0.088, -0.069, -0.05, -0.031,
              -0.012, 0.007, 0.026, 0.045, 0.064,
            ].map((x, i) => (
              <group key={`switch-f-${i}`} position={[x, -0.002, -0.106]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002.geometry}
                  material={switchMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_1.geometry}
                  material={switchContactsMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_2.geometry}
                  material={switchStemMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_3.geometry}
                  material={switchMat}
                />
              </group>
            ))}
          </group>

          {/* Number Row Switches */}
          <group ref={switchNumberRowRef}>
            {[
              -0.165, -0.146, -0.127, -0.108, -0.089, -0.07, -0.051, -0.032,
              -0.013, 0.006, 0.025, 0.044, 0.063, 0.092, 0.121,
            ].map((x, i) => (
              <group key={`switch-n-${i}`} position={[x, -0.002, -0.087]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002.geometry}
                  material={switchMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_1.geometry}
                  material={switchContactsMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_2.geometry}
                  material={switchStemMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_3.geometry}
                  material={switchMat}
                />
              </group>
            ))}
          </group>

          {/* Top Row Switches */}
          <group ref={switchTopRowRef}>
            {[
              -0.16, -0.136, -0.117, -0.098, -0.079, -0.06, -0.041, -0.022,
              -0.003, 0.016, 0.035, 0.054, 0.073, 0.097, 0.121,
            ].map((x, i) => (
              <group key={`switch-t-${i}`} position={[x, -0.002, -0.068]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002.geometry}
                  material={switchMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_1.geometry}
                  material={switchContactsMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_2.geometry}
                  material={switchStemMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_3.geometry}
                  material={switchMat}
                />
              </group>
            ))}
          </group>

          {/* Home Row Switches */}
          <group ref={switchHomeRowRef}>
            {[
              -0.158, -0.132, -0.113, -0.094, -0.075, -0.056, -0.037, -0.018,
              0.001, 0.02, 0.039, 0.058, 0.09, 0.121,
            ].map((x, i) => (
              <group key={`switch-h-${i}`} position={[x, -0.002, -0.049]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002.geometry}
                  material={switchMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_1.geometry}
                  material={switchContactsMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_2.geometry}
                  material={switchStemMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_3.geometry}
                  material={switchMat}
                />
              </group>
            ))}
          </group>

          {/* Bottom Row Switches */}
          <group ref={switchBottomRowRef}>
            {[
              -0.153, -0.122, -0.103, -0.084, -0.065, -0.046, -0.027, -0.008,
              0.011, 0.03, 0.049, 0.076, 0.121,
            ].map((x, i) => (
              <group key={`switch-b-${i}`} position={[x, 0.0, -0.03]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002.geometry}
                  material={switchMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_1.geometry}
                  material={switchContactsMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_2.geometry}
                  material={switchStemMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_3.geometry}
                  material={switchMat}
                />
              </group>
            ))}
          </group>

          {/* Modifier Switches */}
          <group ref={switchModifiersRef}>
            {[
              [-0.162, -0.011],
              [-0.139, -0.011],
              [-0.115, -0.011],
              [-0.043, -0.01], // Space key
              [0.028, -0.011],
              [0.052, -0.011],
            ].map(([x, z], i) => (
              <group key={`switch-m-${i}`} position={[x, -0.002, z]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002.geometry}
                  material={switchMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_1.geometry}
                  material={switchContactsMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_2.geometry}
                  material={switchStemMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_3.geometry}
                  material={switchMat}
                />
              </group>
            ))}
          </group>

          {/* Arrow Switches */}
          <group ref={switchArrowsRef}>
            {[
              [0.102, -0.03],
              [0.083, -0.011],
              [0.102, -0.011],
              [0.121, -0.011],
            ].map(([x, z], i) => (
              <group key={`switch-a-${i}`} position={[x, -0.002, z]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002.geometry}
                  material={switchMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_1.geometry}
                  material={switchContactsMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_2.geometry}
                  material={switchStemMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_3.geometry}
                  material={switchMat}
                />
              </group>
            ))}
          </group>

          <mesh
            castShadow
            receiveShadow
            geometry={nodes["625u_Wire001"].geometry}
            material={materials.Gold}
            position={[-0.043, -0.001, -0.014]}
            rotation={[Math.PI, 0, Math.PI]}
          />
          <group position={[-0.022, -0.014, -0.057]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube005.geometry}
              material={bottomCaseMat}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube005_1.geometry}
              material={feetMat}
            />
          </group>
          <mesh
            ref={topCaseRef}
            castShadow
            receiveShadow
            geometry={nodes.Top_Case.geometry}
            material={topCaseMat}
            position={[-0.022, -0.014, -0.057]}
          />
          <mesh
            ref={weightRef}
            castShadow
            receiveShadow
            geometry={nodes.Weight.geometry}
            material={keycapMat}
            position={[-0.022, -0.014, -0.057]}
          />
          <mesh
            ref={screenRef}
            castShadow
            receiveShadow
            geometry={nodes.Screen.geometry}
            material={screenMat}
            position={[0.092, 0.001, -0.106]}
            scale={-1}
          />

          {/* Function Row */}
          <group ref={functionRowRef}>
            <mesh
              ref={keyRefs.esc}
              castShadow
              receiveShadow
              geometry={nodes.K_ESC.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={keyRefs.f1}
              castShadow
              receiveShadow
              geometry={nodes.K_F1.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={keyRefs.f2}
              castShadow
              receiveShadow
              geometry={nodes.K_F2.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={keyRefs.f3}
              castShadow
              receiveShadow
              geometry={nodes.K_F3.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={keyRefs.f4}
              castShadow
              receiveShadow
              geometry={nodes.K_F4.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={keyRefs.f5}
              castShadow
              receiveShadow
              geometry={nodes.K_F5.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={keyRefs.f6}
              castShadow
              receiveShadow
              geometry={nodes.K_F6.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={keyRefs.f7}
              castShadow
              receiveShadow
              geometry={nodes.K_F7.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={keyRefs.f8}
              castShadow
              receiveShadow
              geometry={nodes.K_F8.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={keyRefs.f9}
              castShadow
              receiveShadow
              geometry={nodes.K_F9.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={keyRefs.f10}
              castShadow
              receiveShadow
              geometry={nodes.K_F10.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={keyRefs.f11}
              castShadow
              receiveShadow
              geometry={nodes.K_F11.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={keyRefs.f12}
              castShadow
              receiveShadow
              geometry={nodes.K_F12.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={keyRefs.del}
              castShadow
              receiveShadow
              geometry={nodes.K_DEL.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
          </group>

          {/* Number Row */}
          <group ref={numberRowRef}>
            <mesh
              ref={keyRefs.grave}
              castShadow
              receiveShadow
              geometry={nodes.K_GRAVE.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={keyRefs.one}
              castShadow
              receiveShadow
              geometry={nodes.K_1.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={keyRefs.two}
              castShadow
              receiveShadow
              geometry={nodes.K_2.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={keyRefs.three}
              castShadow
              receiveShadow
              geometry={nodes.K_3.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={keyRefs.four}
              castShadow
              receiveShadow
              geometry={nodes.K_4.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={keyRefs.five}
              castShadow
              receiveShadow
              geometry={nodes.K_5.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={keyRefs.six}
              castShadow
              receiveShadow
              geometry={nodes.K_6.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={keyRefs.seven}
              castShadow
              receiveShadow
              geometry={nodes.K_7.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={keyRefs.eight}
              castShadow
              receiveShadow
              geometry={nodes.K_8.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={keyRefs.nine}
              castShadow
              receiveShadow
              geometry={nodes.K_9.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={keyRefs.zero}
              castShadow
              receiveShadow
              geometry={nodes.K_0.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={keyRefs.dash}
              castShadow
              receiveShadow
              geometry={nodes.K_DASH.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={keyRefs.equal}
              castShadow
              receiveShadow
              geometry={nodes.K_EQUAL.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={keyRefs.backspace}
              castShadow
              receiveShadow
              geometry={nodes.K_BACKSPACE.geometry}
              material={keycapMat}
              position={[0.092, 0, -0.087]}
            />
          </group>

          {/* Top Row (QWERTY) */}
          <group ref={topRowRef}>
            <mesh
              ref={keyRefs.tab}
              castShadow
              receiveShadow
              geometry={nodes.K_TAB.geometry}
              material={keycapMat}
              position={[-0.16, 0.008, -0.068]}
            />
            <mesh
              ref={keyRefs.q}
              castShadow
              receiveShadow
              geometry={nodes.K_Q.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={keyRefs.w}
              castShadow
              receiveShadow
              geometry={nodes.K_W.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={keyRefs.e}
              castShadow
              receiveShadow
              geometry={nodes.K_E.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={keyRefs.r}
              castShadow
              receiveShadow
              geometry={nodes.K_R.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={keyRefs.t}
              castShadow
              receiveShadow
              geometry={nodes.K_T.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={keyRefs.y}
              castShadow
              receiveShadow
              geometry={nodes.K_Y.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={keyRefs.u}
              castShadow
              receiveShadow
              geometry={nodes.K_U.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={keyRefs.i}
              castShadow
              receiveShadow
              geometry={nodes.K_I.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={keyRefs.o}
              castShadow
              receiveShadow
              geometry={nodes.K_O.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={keyRefs.p}
              castShadow
              receiveShadow
              geometry={nodes.K_P.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={keyRefs.lsquarebracket}
              castShadow
              receiveShadow
              geometry={nodes.K_LSQUAREBRACKET.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={keyRefs.rsquarebracket}
              castShadow
              receiveShadow
              geometry={nodes.K_RSQUAREBRACKET.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={keyRefs.backslash}
              castShadow
              receiveShadow
              geometry={nodes.K_BACKSLASH.geometry}
              material={keycapMat}
              position={[-0.16, 0.008, -0.068]}
            />
            <mesh
              ref={keyRefs.pageup}
              castShadow
              receiveShadow
              geometry={nodes.K_PAGEUP.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
          </group>

          {/* Home Row (ASDF) */}
          <group ref={homeRowRef}>
            <mesh
              ref={keyRefs.caps}
              castShadow
              receiveShadow
              geometry={nodes.K_CAPS.geometry}
              material={keycapMat}
              position={[-0.158, 0, -0.049]}
            />
            <mesh
              ref={keyRefs.a}
              castShadow
              receiveShadow
              geometry={nodes.K_A.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={keyRefs.s}
              castShadow
              receiveShadow
              geometry={nodes.K_S.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={keyRefs.d}
              castShadow
              receiveShadow
              geometry={nodes.K_D.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={keyRefs.f}
              castShadow
              receiveShadow
              geometry={nodes.K_F.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={keyRefs.g}
              castShadow
              receiveShadow
              geometry={nodes.K_G.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={keyRefs.h}
              castShadow
              receiveShadow
              geometry={nodes.K_H.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={keyRefs.j}
              castShadow
              receiveShadow
              geometry={nodes.K_J.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={keyRefs.k}
              castShadow
              receiveShadow
              geometry={nodes.K_K.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={keyRefs.l}
              castShadow
              receiveShadow
              geometry={nodes.K_L.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={keyRefs.semicolon}
              castShadow
              receiveShadow
              geometry={nodes.K_SEMICOLON.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={keyRefs.quote}
              castShadow
              receiveShadow
              geometry={nodes.K_QUOTE.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={keyRefs.enter}
              castShadow
              receiveShadow
              geometry={nodes.K_ENTER.geometry}
              material={keycapMat}
              position={[0.09, 0, -0.049]}
            />
            <mesh
              ref={keyRefs.pagedown}
              castShadow
              receiveShadow
              geometry={nodes.K_PAGEDOWN.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
          </group>

          {/* Bottom Row (ZXCV) */}
          <group ref={bottomRowRef}>
            <mesh
              ref={keyRefs.lshift}
              castShadow
              receiveShadow
              geometry={nodes.K_LSHIFT.geometry}
              material={keycapMat}
              position={[-0.153, 0, -0.03]}
            />
            <mesh
              ref={keyRefs.z}
              castShadow
              receiveShadow
              geometry={nodes.K_Z.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={keyRefs.x}
              castShadow
              receiveShadow
              geometry={nodes.K_X.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={keyRefs.c}
              castShadow
              receiveShadow
              geometry={nodes.K_C.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={keyRefs.v}
              castShadow
              receiveShadow
              geometry={nodes.K_V.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={keyRefs.b}
              castShadow
              receiveShadow
              geometry={nodes.K_B.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={keyRefs.n}
              castShadow
              receiveShadow
              geometry={nodes.K_N.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={keyRefs.m}
              castShadow
              receiveShadow
              geometry={nodes.K_M.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={keyRefs.comma}
              castShadow
              receiveShadow
              geometry={nodes.K_COMMA.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={keyRefs.period}
              castShadow
              receiveShadow
              geometry={nodes.K_PERIOD.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={keyRefs.slash}
              castShadow
              receiveShadow
              geometry={nodes.K_SLASH.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={keyRefs.rshift}
              castShadow
              receiveShadow
              geometry={nodes.K_RSHIFT.geometry}
              material={keycapMat}
              position={[0.076, 0, -0.03]}
            />
            <mesh
              ref={keyRefs.arrowup}
              castShadow
              receiveShadow
              geometry={nodes.K_ARROWUP.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={keyRefs.end}
              castShadow
              receiveShadow
              geometry={nodes.K_END.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
          </group>

          {/* Modifiers */}
          <group ref={modifiersRef}>
            <mesh
              ref={keyRefs.lcontrol}
              castShadow
              receiveShadow
              geometry={nodes.K_LCONTROL.geometry}
              material={keycapMat}
              position={[-0.162, 0.008, -0.011]}
            />
            <mesh
              ref={keyRefs.lwin}
              castShadow
              receiveShadow
              geometry={nodes.K_LWIN.geometry}
              material={keycapMat}
              position={[-0.162, 0.008, -0.011]}
            />
            <mesh
              ref={keyRefs.lalt}
              castShadow
              receiveShadow
              geometry={nodes.K_LALT.geometry}
              material={keycapMat}
              position={[-0.162, 0.008, -0.011]}
            />
            <mesh
              ref={keyRefs.space}
              castShadow
              receiveShadow
              geometry={nodes.K_SPACE.geometry}
              material={keycapMat}
              position={[-0.043, 0, -0.01]}
            />
            <mesh
              ref={keyRefs.ralt}
              castShadow
              receiveShadow
              geometry={nodes.K_RALT.geometry}
              material={keycapMat}
              position={[-0.162, 0.008, -0.011]}
            />
            <mesh
              ref={keyRefs.fn}
              castShadow
              receiveShadow
              geometry={nodes.K_FN.geometry}
              material={keycapMat}
              position={[-0.162, 0.008, -0.011]}
            />
          </group>

          {/* Arrow Keys */}
          <group ref={arrowsRef}>
            <mesh
              ref={keyRefs.arrowleft}
              castShadow
              receiveShadow
              geometry={nodes.K_ARROWLEFT.geometry}
              material={keycapMat}
              position={[0.083, 0.008, -0.011]}
            />
            <mesh
              ref={keyRefs.arrowdown}
              castShadow
              receiveShadow
              geometry={nodes.K_ARROWDOWN.geometry}
              material={keycapMat}
              position={[0.083, 0.008, -0.011]}
            />
            <mesh
              ref={keyRefs.arrowright}
              castShadow
              receiveShadow
              geometry={nodes.K_ARROWRIGHT.geometry}
              material={keycapMat}
              position={[0.083, 0.008, -0.011]}
            />
          </group>

          <instancedMesh
            args={[nodes["2U_Wires"].geometry, materials.Gold, 3]}
            castShadow
            receiveShadow
            instanceMatrix={nodes["2U_Wires"].instanceMatrix}
            position={[0.092, 0.009, -0.086]}
          />
          <instancedMesh
            args={[nodes.Stab_Housing_Instances.geometry, materials.Stem, 8]}
            castShadow
            receiveShadow
            instanceMatrix={nodes.Stab_Housing_Instances.instanceMatrix}
            position={[0.08, -0.004, -0.085]}
          />
        </group>
      </group>
    );
  },
);

Keyboard.displayName = "Keyboard";

useGLTF.preload("/keyboard.gltf");
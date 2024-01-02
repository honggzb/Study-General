[Tips of react three fiber](#top)

- [transform and load glb model](#transform-and-load-glb-model)
- [reflection plane反射地面(平面)](#reflection-plane反射地面平面)
- [物体reflection plane反射效果](#物体reflection-plane反射效果)
- [Bloom亮闪闪效果](#bloom亮闪闪效果)
- [UI(HTML) and css over model](#uihtml-and-css-over-model)
- [远模糊近清晰的动画效果](#远模糊近清晰的动画效果)


-------------------------------------------------------------------------------

## transform and load glb model

1. `npx gltfjsx public/models/Camping.glb -o src/components/Camping1.jsx -k -K -r public` ： need install `gltfjsx@6.2.16`
   - `npx gltfjsx public/models/Camping.glb --transform`  ： no need install gltfjsx@6.2.16
2. or transform on line https://gltf.pmnd.rs/
3. not solve - [GLB export doesn’t include mesh names](https://discourse.threejs.org/t/glb-export-doesnt-include-mesh-names/41680)

## reflection plane反射地面(平面)

- refer to 'Experience.jsx in 'react-three-fiber-vite-boilerplate' project

```javascript
<mesh>
   <planeGeometry />
   <MeshReflectorMaterial/>
</mesh>
<Environment preset="sunset" />
```

[⬆ back to top](#top)

## 物体reflection plane反射效果

- 在物体内部加入meshBasicMaterial和RenderTexture
  
 ```javascript
<Text font={"fonts/Poppins-Black.ttf"} position={[-1.3, -0.5, 1]} lineHeight={0.8} textAlign="center" rotation-y= {degToRad(30)} anchorY={"bottom"}>
   MY LITTLE{"\n"}CAMPING
   <meshBasicMaterial color={bloomColor} toneMapped={false}>
       //reflection animation effect of Text by using RenderTexture
      <RenderTexture attach={"map"}>
         <color attach="background" args={["#fff"]} />   // white background
         <Environment preset="sunset" />
         // animation
         <Float floatIntensity={4} rotationIntensity={5}>
            <Camping1 scale={1.6} rotation-y={degToRad(25)} rotation-x={degToRad(40)} position-y={-0.5} />
         </Float>
    </RenderTexture>
  </meshBasicMaterial>
</Text>
```

## Bloom亮闪闪效果

- react-three/postprocessing
- This [library](https://github.com/pmndrs/react-postprocessing) provides an EffectPass which automatically organizes and merges any given combination of effects
- `npm i @react-three/postprocessing`

```javascript
// 1. add following in app.jsx
<EffectComposer>
   <Bloom intensity={1.2} mipmapBlur/>          //mip贴图模糊      
</EffectComposer>
// 2. add bloom color in experience.jsx
const bloomColor = new Color("#fff");  // 
bloomColor.multiplyScalar(1.5);        //trigger bloom
// 3. add color={bloomColor} toneMapped={false} to meshBasicMaterial which relecting envrionment
<meshBasicMaterial color={bloomColor} toneMapped={false} ref={textMaterial}>
```

[⬆ back to top](#top)

## UI(HTML) and css over model

- by using [jotai](https://jotai.org/): store interface that can be used outside of React
- `npm i jotai`
- Using `HTML` in '@react-three/drei'
- refer to 'Camping1.jsx' in 'react-three-fiber-vite-boilerplate' project

```javascript
import { useAtom } from "jotai";
const OverlayItem = ({props}) => {
  return (
    <Html>
      <div>
        <h2 className="font-bold">{title}</h2>
        <p>{description}</p>
      </div>
      <button>Add to cart</button>
    </Html>
  );
};
export function Camping1({html, ...props}) {
   //...
   <group>
      <mesh />
      { html && ( <OverlayItem/> )}
   </group>
   //...

};
```

[⬆ back to top](#top)

## 远模糊近清晰的动画效果

- `<fog attach="fog" args={["#171720", 10, 30]} />` in 'app.jsx'


[⬆ back to top](#top)

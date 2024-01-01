[Tips of react three fiber](#top)

- [transform and load glb model](#transform-and-load-glb-model)
- [react-three/postprocessing](#react-threepostprocessing)
- [UI(HTML) and css over model](#uihtml-and-css-over-model)
- [远模糊近清晰的动画效果](#远模糊近清晰的动画效果)
- [reflection plane反射地面(平面)](#reflection-plane反射地面平面)

-------------------------------------------------------------------------------

## transform and load glb model

1. `npx gltfjsx public/models/Camping.glb -o src/components/Camping1.jsx -k -K -r public`
   1. need install `gltfjsx@6.2.16`
   2. `npx gltfjsx public/models/Camping.glb --transform`
2. or transform on line https://gltf.pmnd.rs/
3. not solve - [GLB export doesn’t include mesh names](https://discourse.threejs.org/t/glb-export-doesnt-include-mesh-names/41680)

## react-three/postprocessing

- This [library](https://github.com/pmndrs/react-postprocessing) provides an EffectPass which automatically organizes and merges any given combination of effects
- `npm i @react-three/postprocessing`

```javascript
EffectComposer>
   <Bloom intensity={1.2} mipmapBlur/>          //mip贴图模糊      
</EffectComposer>
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

## reflection plane反射地面(平面)

- refer to 'Experience.jsx in 'r3f-vite-starter-main' project

```javascript
<mesh>
   <planeGeometry />
   <MeshReflectorMaterial/>
</mesh>
<Environment preset="sunset" />
```

[⬆ back to top](#top)

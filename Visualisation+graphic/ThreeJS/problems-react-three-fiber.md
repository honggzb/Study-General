[Issues](#top)

- [How to use DRACOLoader with GLTFLoader in ReactJs?](#how-to-use-dracoloader-with-gltfloader-in-reactjs)
  - [problem](#problem)
  - [references](#references)
  - [solution](#solution)
- [Problems casting shadows loaded Gltf](#problems-casting-shadows-loaded-gltf)
  - [problem](#problem-1)
  - [references](#references-1)
  - [solution](#solution-1)
- [Failed to parse source map](#failed-to-parse-source-map)
  - [problem](#problem-2)
  - [references](#references-2)
  - [solution](#solution-2)
- [Property 'textGeometry' does not exist on type 'JSX.IntrinsicElements](#property-textgeometry-does-not-exist-on-type-jsxintrinsicelements)
- [examples](#examples)
- [angular + d3](#angular--d3)

-------------------------------------------------------

## How to use DRACOLoader with GLTFLoader in ReactJs?

### problem

- Error: THREE.GLTFLoader: No DRACOLoader instance provided
- DRACOLoader Uncaught SyntaxError: Unexpected token '<'

### references

- https://stackoverflow.com/questions/56071764/how-to-use-dracoloader-with-gltfloader-in-reactjs
- https://stackoverflow.com/questions/75672470/unexpected-token-in-threejs-dracoloader

### solution

1. copy 'three/examples/jsm/libs/draco/gltf/' folder into your 'static/public' folder
2. add codes as following in app.js

```javascript
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
//...
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./gltf/'); // use a full url path
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load("./models/watch.glb", (gltf) => {
    //...
}
```

[⬆ back to top](#top)

## Problems casting shadows loaded Gltf

### problem

### references

- [Three.js光源、阴影](https://blog.csdn.net/shmilynn_/article/details/131264784)
- [Problems casting shadows loaded Gltf](https://discourse.threejs.org/t/problems-casting-shadows-loaded-gltf/31315)
- [How to cast a shadow with a gltf model in three.js?](https://stackoverflow.com/questions/49869345/how-to-cast-a-shadow-with-a-gltf-model-in-three-js)

### solution

```javascript
loader.load("./models/watch.glb", (gltf) => {
    gltf.scene.traverse((child) => {
          if ( child.isMesh || child.isLight ) child.castShadow = true;
          if ( child.isMesh || child.isLight ) child.receiveShadow = true;
        });
        // gltf.scene.traverse((child) => {
        //   if ( child.isMesh ) {
        //       child.material.envMap = envMap; //reflection of the world
        //   }
        // });
}
```

[⬆ back to top](#top)

## Failed to parse source map

### problem

```
WARNING in ./node_modules/@mediapipe/tasks-vision/vision_bundle.mjs
Module Warning (from ./node_modules/source-map-loader/dist/cjs.js):
Failed to parse source map from 'C:\xxx\xxx\\node_modules\@mediapipe\tasks-vision\vision_bundle_mjs.js.map' file: Error: ENOENT: no such file or directory, open 'C:\xxx\xxx\node_modules\@mediapipe\tasks-vision\vision_bundle_mjs.js.map'
```

### references

- https://stackoverflow.com/questions/70599784/failed-to-parse-source-map

### solution

- create '.env' file in root folder, '.env' file that have `GENERATE_SOURCEMAP=false` line
- If you want to disable sourcemap locally only, `"start": "GENERATE_SOURCEMAP=false && react-scripts start",`

[⬆ back to top](#top)

## Property 'textGeometry' does not exist on type 'JSX.IntrinsicElements

- Error: `Property 'textGeometry' does not exist on type 'JSX.IntrinsicElements`
- For anyone who is using Typescript and gets uppering error
- https://docs.pmnd.rs/react-three-fiber/tutorials/typescript#extending-threeelements

```typescript
import { extend, Object3DNode } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
extend({ TextGeometry });
declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}
```

[⬆ back to top](#top)

## examples

- [three.js official examples](https://github.com/mrdoob/three.js/tree/a2235b231046693d35a28352b6bc11f474f558e1/examples)
- [react-three-fiber official examples](https://docs.pmnd.rs/react-three-fiber/getting-started/examples)


---------------------------------------------------------------------------------------


- [orbitcontrols 如何控制球体转动](https://codesandbox.io/p/sandbox/orbitcontrols-react-three-fiber-9iotf)


![Askybox](skybox.png)
https://threejs.org/editor/

- [React & Three.js | Working with Shaders using React Three Fiber](https://www.youtube.com/watch?v=kxXaIHi1j4w)
- [React Magnificent 3D EARTH with THREE.JS](https://www.youtube.com/watch?v=ymavtyRpT0E)
  - https://www.youtube.com/watch?v=ymavtyRpT0E
- 3dchairs
  - Demo: https://3dchairs.netlify.app/
  - Project Files: https://github.com/wrongakram/R3F-Chairs

- https://codesandbox.io/p/sandbox/react-three-fiber-creating-a-sky-box-and-reflections-6izyu?file=%2Fsrc%2FApp.js%3A93%2C8-93%2C22
- https://www.youtube.com/watch?v=juH3jo1Oty0
- https://codesandbox.io/p/sandbox/yuri-artiukhs-noise-effect-in-r3f-yl3sr3?file=%2Fsrc%2FApp.js%3A25%2C14-25%2C34
- https://codesandbox.io/p/sandbox/color-grading-wvgxp?file=%2Fsrc%2FApp.js%3A21%2C36. color grading

https://github.com/drcmda/floating-shoe

- [spheres in threejs](https://codesandbox.io/p/sandbox/takeshape-article-3-spheres-el11e?file=%2Fsrc%2FApp.js)
- https://codesandbox.io/p/sandbox/t-shirt-configurator-ioxywi
- [【three.js / React-three-fiber】加载3D模型性能优化](https://blog.csdn.net/weixin_44545357/article/details/130679539)
- [react-three-fiber入门项目（1）-组件化设计](https://blog.csdn.net/JingYan_Chan/article/details/125783125)

vscode安装插件

- glTF Tools: vscode中查看gltf文件
- glsl-literal: 为 JavaScript 模板文本添加 GLSL 语法突出显示。
- GLSL Lint: 支持 GLS（OpenGL 着色语言）的 linting。它使用 OpenGL 和 OpenGL ES 着色器验证器 glslangValidator 支持的每个着色器类型都可以进行验证

------------------------------------------------------------------------------------

## angular + d3

- documentation sample - https://sinequa.github.io/sba-angular/
  - [Speed and Performance](https://sinequa.github.io/sba-angular/tipstricks/speed-performance.html)
    - Lazy loading feature modules
      - ![Alt text](image.png)
    - [Module Federation](https://www.npmjs.com/package/@angular-architects/module-federation)
    - Dynamic federation
- https://www.linkedin.com/pulse/integrating-d3js-angular-14-visualize-between-shubham-sutar/

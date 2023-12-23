- [How to use DRACOLoader with GLTFLoader in ReactJs?](#how-to-use-dracoloader-with-gltfloader-in-reactjs)
  - [problem](#problem)
  - [references](#references)
  - [solution](#solution)
- [Problems casting shadows loaded Gltf](#problems-casting-shadows-loaded-gltf)
  - [problem](#problem-1)
  - [references](#references-1)
  - [solution](#solution-1)
- [In react-router-dom v6, "Switch" is replaced by routes "Routes".](#in-react-router-dom-v6-switch-is-replaced-by-routes-routes)
- [examples](#examples)

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

## examples

- [three.js official examples](https://github.com/mrdoob/three.js/tree/a2235b231046693d35a28352b6bc11f474f558e1/examples)
- [react-three-fiber official examples](https://docs.pmnd.rs/react-three-fiber/getting-started/examples)

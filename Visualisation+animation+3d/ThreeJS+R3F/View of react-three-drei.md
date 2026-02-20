## View of react-three/drei

- **Single Canvas, Multiple Views**: This approach is more performant than using multiple `<Canvas>` instances because it avoids resource duplication and browser performance issues.
- Tracking HTML Elements: The views follow their corresponding tracking divs, scrolling along and resizing with the HTML content. This makes it ideal for integrating 3D content seamlessly into a standard scrollable webpage.
- Event Handling: It is recommended to connect the event system to a parent element that contains both the canvas and the HTML content. This ensures that both are accessible for interaction.
- Isolation: Views provide a degree of isolation, making it easier to manage different 3D scenes or components independently within the same canvas.
- Common Use Cases: It's frequently used for scenarios like creating dynamic minimaps that follow a character in a game-like environment or displaying a list of different 3D models on a single page.
- https://drei.docs.pmnd.rs/portals/view

### Using View

- View is an unstyled HTML DOM element (by default a div, and it takes the same properties as one)
- can define as many views
- `View.Port` inside the canvas to output them
- The canvas should ideally fill the entire screen with absolute positioning, **underneath** HTML or **on top of** it

```html
return (
  <main ref={container}>
    <h1>Html content here</h1>
    <View style={{ width: 200, height: 200 }}>
      <mesh geometry={foo} />
      <OrbitControls />
    </View>
    <View className="canvas-view">
      <mesh geometry={bar} />
      <CameraControls />
    </View>
    <Canvas eventSource={container}>
      <View.Port />
    </Canvas>
  </main>
)
```

### Examples

```ts
// components\ViewCanvas.tsx - fizzi-3d
const Loader = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Loader),
  { ssr: false },
);
export default function ViewCanvas() {
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 30,
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{ fov: 30 }}
      >
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}
// layout.tsx
 <main>
    {children}
    <ViewCanvas />
 </main>
```

- Apple Website(components\ModelView.tsx+Model.tsx)

```html
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
```

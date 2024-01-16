[React + Vite + three + react-three/fiber, drei + framer-motion](#top)

- [set up](#set-up)
- [Loading 3D model as Canvas](#loading-3d-model-as-canvas)
- [Media Query for Mobile](#media-query-for-mobile)
- [scrolling to component - framer-motion+#](#scrolling-to-component---framer-motion)
- [Higher-Order Components(HOC)](#higher-order-componentshoc)
  - [Higher-Order Component Structure](#higher-order-component-structure)
- [React tilt](#react-tilt)
- [react-vertical-timeline-component](#react-vertical-timeline-component)

--------------------------------------------------

## set up

- `npm create vite@latest`
- `npm i react-router-dom`
- `npm i three @react-three/fiber @react-three/drei maath`
  - [maath](https://github.com/pmndrs/maath); a collection of useful math helpers, random generators, bits and bobs
- `npm i react-vertical-timeline-component`
- `npm i react-tilt`: [react-tilt](https://www.npmjs.com/package/react-tilt) -> A tiny requestAnimationFrame powered 60+fps lightweight parallax hover tilt effect for ReactJS
- `npm i framer-motion`
  - create a 'src/utils/motion.jsx'
- `npm install @emailjs/browser`; [EmailJS](https://www.npmjs.com/package/@emailjs/browser) helps to send emails using client-side technologies only
- 🤖 `npm i tailwindcss postcss autoprefixer --save-dev`
  - `npx tailwindcss init -p`
  - add codes to 'tailwind.config.js'
  - Global setting-up(Snippets)
    - 'src\index.css'
    - 'src\constants\index.jsx'
    - 'src\styles.js'
    - 'src\utils\motion.jsx'
- Set Up Environment Variables
  - Create a new file named .env in the root of your project and add the following content
  - `REACT_APP_EMAILJS_USERID=your_emailjs_user_id`
  - `REACT_APP_EMAILJS_TEMPLATEID=your_emailjs_template_id`
  - `REACT_APP_EMAILJS_RECEIVERID=your_emailjs_receiver_id`

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx,jsx,js}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
}
// index.css
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
@tailwind base;
@tailwind components;
@tailwind utilities;
```

[⬆ back to top](#top)

## Loading 3D model as Canvas

```javascript
//1. CanvasLoader
import { Html, useProgress } from "@react-three/drei";
const CanvasLoader  = () => {
  const { progress } = useProgress();
  return (
      <Html as='div' center style={{ }} >
        <span className='canvas-loader'></span>
        <p style={{ }} >
            {progress.toFixed(2)}%
        </p>
      </Html>
    );
  }
export default CanvasLoader ;
//2. using <Canvas> in other component, such as 
  return (
    <Canvas frameloop='demand' dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }} >
        {/*<Suspense> allow to have a loader while model is loading */}
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls enableZoom={false}  maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          <Computers />
        </Suspense>
        <Preload all />
    </Canvas>
  );
//
const Computers = () => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  return (
    <mesh>
      //...
      <primitive object={computer.scene} scale={ 0.7} position={[0, -3, -2.2]} rotation={[-0.01, -0.2, -0.1]} />
    </mesh>
  )
};
```

[⬆ back to top](#top)

## Media Query for Mobile 

- [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) returns a new `MediaQueryList` object that can then be used to determine if the document matches the media query string

```javascript
useEffect(() => {
     // Add a listener for changes to the screen size
     const mediaQuery = window.matchMedia("(max-width: 500px)");
     // Set the initial value of the `isMobile` state variable
     setIsMobile(mediaQuery.matches);
    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [])
```

[⬆ back to top](#top)

## scrolling to component - framer-motion+#

- create 'src\hoc\SectionWrapper.jsx'
- add embedding tag in component that need scrolled to, such as
  - `<a href='#about'>` in component
  - `<a href={`#${nav.id}`}>{nav.title}</a>` in nav component
- change component export, such as `export default SectionWrapper(About, "about");`
  - first param: component name
  - second param: embedding tag

```javascript
// src\hoc\SectionWrapper.jsx
import { staggerContainer } from "../utils/motion";
const SectionWrapper = (Component, idName) => 
    function HOC(){
        return (
            <motion.section 
                variants={staggerContainer()}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.25}}
                className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
                 <span className='hash-span' id={idName}>&nbsp;</span>
                <Component />
            </motion.section>
        ) 
};
export default SectionWrapper;
// staggerContainer in src\utils\motion.jsx
  export const staggerContainer = (staggerChildren, delayChildren) => {
    return {
      hidden: {},
      show: {
        transition: {
          staggerChildren: staggerChildren,
          delayChildren: delayChildren || 0,
        },
      },
    };
  };
```

[⬆ back to top](#top)

## Higher-Order Components(HOC)

- Higher-order components (HOCs) are a powerful feature of the React library. They allow you to reuse component logic across multiple components
- [How to Use Higher-Order Components in React](https://www.freecodecamp.org/news/higher-order-components-in-react/)
- [](https://blog.logrocket.com/understanding-react-higher-order-components/)
- When to Use HOCs
  - Authentication
  - Logging
  - Styling and Theming
  - 
  
### Higher-Order Component Structure

```javascript
const hoc = (WrappedComponent) => 
  // HOC logic using hooks
  function HOC(props){
    // HOC-specific logic using hooks
    const [count, setCount] = useState(0);
    useEffect(() => {
      // Perform side effects here
    }, [count]);
    return <WrappedComponent {props} enhancedProp="someValue" />
}
//Using the enhanced component
function App() {
 return (
    <EnhancedComponent prop1="value1" prop2="value2" />
 );
}
// HOC is fuction that accepts a component and return a new component
const SectionWrapper = (Component, idName) => 
    function HOC(){
        return (
            <motion.section 
                variants={staggerContainer()}
                initia
                whileInView="show"
                viewport={{once: true, amount: 0.25}}
                className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
                 <span className='hash-span' id={idName}>&nbsp;</span>
                <Component />
            </motion.section>
        ) 
};
export default SectionWrapper;
//  Using SectionWrapper
export default SectionWrapper(About, "about");
```

[⬆ back to top](#top)

## React tilt

```javascript
const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}
```

[⬆ back to top](#top)

## react-vertical-timeline-component

- https://stephane-monnot.github.io/react-vertical-timeline/


[⬆ back to top](#top)

------------------------------------------------------------
> https://github.com/adrianhajdin/project_3D_developer_portfolio/tree/main


🤖 Introduction
⚙️ Tech Stack
🔋 Features
🤸 Quick Start
🕸️ Snippets
🔗 Links
🚀 More
🚨 Tutori
👉

- https://www.hostinger.com/

[⬆ back to top](#top)

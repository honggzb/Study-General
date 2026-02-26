```
│   ├── 📂GSAP/
│   │   ├── 📂sample-codes/
│   │   │   ├── 📂3D Portofolio
│   │   │   ├── 📂Apple web
│   │   │   ├── 📂award-cartoon/
│   │   │   ├── 📂fizzi-3d/
│   │   │   ├── 📂Keyboard/
│   │   │   ├── 📂Kitchen/
│   │   │   ├── 📂luxury/
│   │   │   ├── 📂ScrollAnimation/
│   │   │   ├── 📂Shoes/
│   │   │   ├── 📂Skateboard/
│   │   │   └── 📦award-cartoon, Keyboard, Kitchen, ScrollAnimation, Shoes, fizzi-3d,luxury...
│   │   ├── 📄 ParallaxBackground.tsx
│   │   ├── 📄 gsap-study.md
│   │   └──   
```

- `npm i gsap`
- `npm i @gsap/react`

```ts
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);

const container = useRef();
useGSAP(() => {
  // gsap code here...
  gsap.to(".box", {x: 100}); // <-- automatically reverted

}, { scope: container }); // <-- easily add a scope for selector text (optional)
```

## Resources

- [GSAP official demo](https://demos.gsap.com/explore/)
- https://freefrontend.com/   -> free samples(tailwind+bootstrap)

```
   project              |       function                                |
------------------------|-----------------------------------------------|-----------------------------------------
                        | 3D model loading and interactive              | components\Skateboard.tsx
                        | SlideIn animations (text, image)              | components\SlideIn.tsx
                        | parallax animation --->                       |
                        |  1. parallax(css--`sticky`, `--topNumber`)    | components\TextAndImage\index.tsx
 Skateboard             |  2. bg and forebg animation at same time      | components\TextAndImage\ParallaxImage.tsx
                        | SVG animation in bg --->                      | components\Product\Scribble.tsx,
                        |    (when mouse hover)                         | components\Team\SkaterScribble.tsx
                        | youtube video lazyLoader                      | components\Video\LazyYouTubePlayer.tsx
                        | 2D physics engine effect (matter-js)          | components\Footer\FooterPhysics.tsx
                        | https://suburbia-skate.netlify.app/
------------------------|-----------------------------------------------|------------------------------------------
                        | FadeIn animations (text, image)               | components\FadeIn.tsx
                        | page transition(next-view-transitions)        | app/layout.tsx
  luxury                | RevealText(GSAP)                              | components\RevealText.tsx
                        | Scroll Text(GSAP)                             | components\ScrollText\
                        | youtube video lazyLoader                      |
                        | https://coteroyalecourse.netlify.app/
------------------------|-----------------------------------------------|-------------------------------------------
                        | 3D model loading                              | components\Keyboard.tsx, keycap.tsx
                        | FadeIn animations (text, image)               | components\FadeIn.tsx
  keyboard              | 3D model interactive and sound effect         | components\RevealText.tsx
                        | 3D model texture change                       | components\ColorChanger\
                        | Marquee text scroll                           | components\Marquee\
                        | https://nimbus-keyboards.vercel.app/
------------------------|-----------------------------------------------|-------------------------------------------
                        | 3D model loading                              | components\SodaCan.tsx
                        | Singe Canvas, multiple View                   | app\layout.tsx, components\ViewCanvas.tsx
                        | text Slide in(GSAP)                           | components\Hero\index.tsx
                        | useuseMediaQuery hook                         |
   fizzi-3d             | 3D model -Bubbles                             | components\Hero\Bubbles.tsx
                        | 3D model texture change                       | components\AlternatingText\
                        | dive effect -  3D model +                     |
                        |    Cloud + 2D Text(react-three/drei)          | components\SkyDive\
                        | https://fizzi.vercel.app/
------------------------|-----------------------------------------------|-------------------------------------------
                        | 3D model loading                              | components\Scene.tsx
  Kitchen               | Counter(react-three/drei)                     | components\Pirce.tsx
                        | 3D Select(react-three/postprocessing)         | select and show price
------------------------|-----------------------------------------------|-------------------------------------------
                        | 3D model loading                              | components\Jordan.tsx
  Shoes                 | glowing background(TailwindCSS)               | components\About.tsx
                        | 3D animation(GSAP)                            | components\Jordan.tsx
------------------------|-----------------------------------------------|-------------------------------------------
                        | 3D model loading                              | components\Developer.tsx,HackerRoom.tsx,...
  3D Portofolio         | 3D model texture(video) change animation      | components\Projects\index.tsx+DemoComputer.tsx
                        | 3D model change when hover                    | components\Experience\index.tsx+Developer.tsx
------------------------|-----------------------------------------------|-------------------------------------------
                        | 3D model loadinlg                             |
 3D Portofolio2         | up slider animation(useful)                   | \components\Services.tsx+AnimatedHeaderSection.tsx
                        | show image animation when hovrer              | \components\Works.tsx
------------------------|-----------------------------------------------|-------------------------------------------
                        | 3D model loading(SelectiveBloom control)      | \components\home\
                        | card with 3D float model                      | \components\TechStack\
 3D Portofolio3         | text inline slider(CSS-wordSlider)            | \global.css
                        | marquee(CSS-marquee)                          | \global.css
------------------------|-----------------------------------------------|-------------------------------------------
                        | 3D model loading + texture change             | components\Iphone.tsx
  Apple web             | Singe Canvas,multiple View                    | components\ModelView.tsx+Model.tsx
                        |  +animation switch Views                      |
                        | GSAP animation                                | utils\animations.ts
------------------------|-----------------------------------------------|-------------------------------------------
                        | video animation                               |
                        |  1. mouse move to center show small view      | \components\hero\VideoPreview.tsx
                        |  2. click small view play next video          | \components\hero\index.tsx
                        |  3. scroll down clip video shape(GSAP-clipPath)| \components\hero\index.tsx
award-cartoon(GSAP)     | image Clip/filter('mask/svg filter' class)    | \components\Story.tsx+global.css
                        | play audio                                    | \components\Navbar.tsx
                        | top navbar showing when scrolling(react-use)  | \components\Navbar.tsx
                        | animation Title                               | \components\AnimatedTitle.tsx
                        | image enlarge/shunk while scrolling           | \components\About.tsx
                        | Radial gradient hover effect in butto         | \components\features\BentoCard.tsx
------------------------|-----------------------------------------------|-------------------------------------------
                        | video animation- play when scrolling page     | \components\hero\index.tsx
wine-cartoon(GSAP)      | image mask animation(.masked-img)             | \components\Art\index.tsx+global.css
                        | animation Text/image                          | 
                        | slider animation(GSAP+currentIndex)           | \components\Menu\index.tsx
------------------------|-----------------------------------------------|-------------------------------------------
 ScrollAnimation        | 3D model/background Scrolling(GSAP)           | ScrollManager.tsx
------------------------|-----------------------------------------------|-------------------------------------------
```


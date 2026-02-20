```
   project              |       function
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
                        | video animation                               |
                        |  1. mouse move to center show small view      | \components\hero\VideoPreview.tsx
                        |  2. click small view play next video          | \components\hero\index.tsx
                        |  3. scroll down clip video shape(GSAP-clipPath)| \components\hero\index.tsx
award-cartoon           | image Clip/filter('mask/svg filter' class)    | \components\Story.tsx+global.css
                        | play audio                                    | \components\Navbar.tsx
                        | top navbar showing when scrolling(react-use)  | \components\Navbar.tsx
                        | animation Title                               | \components\AnimatedTitle.tsx
                        | image enlarge/shunk while scrolling           | \components\About.tsx
                        | Radial gradient hover effect in butto         | \components\features\BentoCard.tsx
------------------------|-----------------------------------------------|------------------------------------------- 
 ScrollAnimation        | 3D model/background Scrolling(GSAP)           | ScrollManager.tsx
------------------------|-----------------------------------------------|-------------------------------------------
```

```
│   ├── 📂GSAP/
│   │   ├── 📂sample-codes/
│   │   │   ├── 📦Keyboard
│   │   │   ├── 📦luxury
│   │   │   └── 📦Skateboard
│   │   ├── 📄 ParallaxBackground.tsx
│   │   ├── 📄 gsap-study.md
│   │   └──
```

```
   project              |       function
------------------------|-----------------------------------------------|-----------------------------------------
                        | 3D model loading and interactive              | components\Hero\
                        | SlideIn animations (text, image)              | components\SlideIn.tsx
                        | parallax animation --->                       |
                        |  1. parallax(css--`sticky`, `--topNumber`)    | components\TextAndImage\index.tsx
 Skateboard             |  2. bg and forebg animation at same time      | components\TextAndImage\ParallaxImage.tsx
                        | SVG animation in bg --->                      | components\Product\Scribble.tsx,
                        |    (when mouse hover)                         | components\Team\SkaterScribble.tsx
                        | youtube video lazyLoader                      | components\Video\LazyYouTubePlayer.tsx
                        | 2D physics engine effect (matter-js)          | components\Footer\FooterPhysics.tsx
------------------------|-----------------------------------------------|------------------------------------------
                        | FadeIn animations (text, image)               | components\FadeIn.tsx
                        | page transition(next-view-transitions)        | app/layout.tsx
  luxury                | RevealText(GSAP)                              | components\RevealText.tsx
                        | Scroll Text(GSAP)                             | components\ScrollText\
                        | youtube video lazyLoader                      |
                        | https://coteroyalecourse.netlify.app/
------------------------|-----------------------------------------------|-------------------------------------------
                        | 3D model loading                              | components\Hero\
                        | FadeIn animations (text, image)               | components\FadeIn.tsx
  keyboard              | 3D model interactive and sound effect         | components\RevealText.tsx
                        | 3D model texture change                       | components\SColorChanger\
                        | Marquee text scroll                           | components\Marquee\
                        | https://nimbus-keyboards.vercel.app/
```

## General

- `npm install motion`
- `import { motion } from "motion/react"`

## sample-codes

```
-----------------------|-------------------------------------------------|--------------------------------------------------------------
     file              |                                                 |     effect
-----------------------|-------------------------------------------------|--------------------------------------------------------------
 1AnimateButton.tsx    | basic                                           | button: shadow animation/3d rotate
 2Card.tsx             | Hover & Exit Animations: `whileHover`           | Card
 3Dashboard.tsx        | Variants: `variants`                            | sidebar: open/close animation, sidebar's children animation
 4MotionHooks.tsx      | Hooks: `useMotionTemplate, useMotionValueEvent`,|
                       | `useScroll, useSpring, useTransform`            | change background color when scrolling
 4Timeline.tsx         | Hooks: `useInView`                              | content animation when scrolling to view
 5Layout.tsx           | Layout Animations                               | Popup window animation
 5Navbar.tsx           | Layout Animations                               | menu items animation
 6ChangeNumber.tsx     | Animation Sequence: `useAnimate`                | number counting animation
 66ChangeText.tsx      | Animation Sequence: `useAnimate`                | words逐个显示
 6ChangeTextButton.tsx | Animation Sequence: `useAnimate`                | 1. 点击button后，先显示loading再消失button再显示tick,
                       |                                                 | 2. tick <- svg animation(same effect-'react-countup' library)
 7CirclePhoto-animate  |                                                 | circle animation around a image <- svg animation
 7TextAnimations.tsx   |                                                 | 3 text animation should be known
 parallax📂            |useScroll, useSpring, useTransform               | parallax scrolling effect
 TransitionLink 📂     |without using Framer motion                      | page transition(without using Framer motion)
-----------------------|-------------------------------------------------|--------------------------------------------------------------
parallax project
├── 📂app/
│   ├── 📄globals.css
│   └── 📄page.tsx
├── 📂components/
│   └── 📄Parallax.tsx
├── 📂public/
│   ├── 📄mountains.png
│   └── 📄xxx.png
```

```
-------------------------|-----------------------------------------------|--------------------------------------------------------------
   project               |       function                                |
-------------------------|-----------------------------------------------|--------------------------------------------------------------
coffee-shop              |
-------------------------|-----------------------------------------------|--------------------------------------------------------------
                         | FlipWords                                     | components\FlipWords.tsx
parallax-portofolio1     | parallax animation                            | components\ParallaxBackground.tsx
                         | 3D model load                                 | @react-three/fiber, sections\Hero.tsx
                         | copyEmail button anmination                   | components\CopyEmailButton.tsx
-------------------------|-----------------------------------------------|----------------------------------------------------------------
                         | pages transition effect(App route)            | PageTransition.tsx
                         |   -- curve, Stair, CloseDoor                  | CurveTransition.tsx, Stair.tsx, CloseDoorTransition.tsx
personal-portofolio1     | number animation                              | components\Stats.ts(react-countup library)
                         | circle around image animation                 | components\Photos.ts
-------------------------|-----------------------------------------------|---------------------------------------------------------------
                         | text change animation in home page            |  components\Hero.tsx
                         | navigation animation when click sidebar mene  |  components\Navbar.ts  `scrollToSection`
personal-portofolio2     | project's demo/code showing overlay animation |  components\skills.tsx
                         | progressing bar animation                     |
                         | icons around a image animation                |
-------------------------|-----------------------------------------------|--------------------------------------------------------------
                         | 3D model loading                              | client\pages\components\canvas\CanvasModel.tsx
                         | Framer motion animation                       | client\pages\config\motion.ts
AI-Tshirt-cross-dressing | state management (valtio)                     | client\pages\store\index.ts
                         | create image by using Open AI                 | server\routes\dalle.routes.js, client\pages\components\AIPicker.tsx
                         |                                               | client\pages\components\customizer\index.tsx
                         | generate prompt by Microphone(speaking)       | client\pages\components\AIPicker.tsx
-------------------------|-----------------------------------------------|----------------------------------------------------------------
```

## resources

- [codse animata](https://animata.design): Hand-crafted ✍️ interaction animations and effects from around the internet 🛜 to copy and paste into your project
     - https://github.com/codse/animata

[framer Motion for React](#top)


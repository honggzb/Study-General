## sample-codes

```
     file              |                                                 |     effect
-----------------------|-------------------------------------------------|------------------------
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
 parallax              |useScroll, useSpring, useTransform               | parallax scrolling effect
 TransitionLink        |without using Framer motion                      | page transition
```

```
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

## next + framer motion + tailwind CSS + typescript

```
   project              |       function
------------------------|-----------------------------------------------|-----------------------------------------------
coffee-shop             |
------------------------|-----------------------------------------------|-----------------------------------------------
parallax-portofolio1    | parallax animation
------------------------|-----------------------------------------------|-----------------------------------------------
                        | animation between pages                       |
personal-portofolio1    | stair animation page transition(App route)    |
                        | circle around image animation                 |  components\Photos.tsx
------------------------|-----------------------------------------------|-----------------------------------------------
                        | text change animation in home page            |  components\Hero.tsx
                        | navigation animation when click sidebar mene  |  components\Navbar.ts  `scrollToSection`
personal-portofolio2    | project's demo/code showing overlay animation |  components\skills.tsx
                        | progressing bar animation                     |
                        | icons around a image animation                |
```

[framer Motion for React](#top)

## Animation

[🚀back to top](#top)

## Components

[🚀back to top](#top)

## Motion values

### useMotionValue

- `useMotionValue`: Motion values **track** the state and velocity of animated values

#### Create Motion values

- Usually, these are created automatically by **motion components**
- manually creating motion values

```js
// 1. automatically create
import { motion, useMotionValue } from "motion/react"
export function MyComponent() {
  const x = useMotionValue(0)
  return <motion.div style={{ x }} />
}
// 2. manually create
const x = useMotionValue(0)     // initial state is 0
const opacity = useTransform(
  x,
  [-200, 0, 200],
  [0, 1, 0]
)
// Will change opacity as element is dragged left/right
return <motion.div drag="x" style={{ x, opacity }} />
```

- <mark>Events</mark>
  - `useMotionValueEvent(x, "change", (latest) => console.log(latest))`
  - events: "change", "animationStart", "animationComplete" "animationCancel"
- <mark>Composition</mark>
  - Motion provides a number of **hooks** for creating and composing motion values, like `useSpring` and `useTransform`
- <mark>API</mark>

|API|Return|
|---|---|
|`get()`|the latest state of the motion value|
|`getVelocity()`|the latest velocity of the motion value. Returns 0 if the value is non-numerical|
|`set()`||
|`jump()`||
|`isAnimating()`|Returns true if the value is currently animating|
|`stop()`|Stop the active animation|
|`on()`|Subscribe to motion value events|
|`destroy()`|Destroy and clean up subscribers to this motion value|

[🚀back to top](#top)

### useScroll

- create scroll-linked animations, like progress indicators and parallax effects
-

## Hooks

[🚀back to top](#top)

> References
- [Motion for React](https://motion.dev/docs/react)
- [From Zero to Hero: Framer Motion](https://www.youtube.com/watch?v=TJACX6zy6wQ&list=PLympUr-oxAWU43N4ZaVG1PSCHkV0kcyaK&index=1)

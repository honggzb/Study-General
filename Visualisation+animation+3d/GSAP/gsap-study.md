## Stagger Object

```js
gsap.to(targets, {x:100,
   stagger: {
     each: 0.2, // amount of time between the start of each animation
     from: "center" // animate from center of the targets array , start, center, end, edges, random
}
```

## splitText basic

```ts
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

//...
const textRef = useRef(null);
useGSAP(() => {
      // split the header
      const split = SplitText.create("h1", {
        type:"words, chars",  // Split into characters
      })
      const tl = gsap.timeline({
        defaults: { ease:"power2.inOut" }
      });
      tl.from(split.chars, {
          yPercent: 100,
          stagger:{
            each:0.05,
            from:"center"
          }
        })
        .to(split.chars, {
          yPercent:-100,
          stagger:{
            each:0.05,
            from:"edges"
          }
        });
      return () => {
          split.revert();
        };
  }, { scope: textRef });
```



Trick for mobile - use `vh` and `vm`

- viewport units- `vh` and `vm` on mobile
- vh unit: equal to 1% of the height of the initial containing block.

```html
<style>
body {background-color: #333;}
.module {
  height: 100vh;   /* Use vh as a fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);    /* CSS custom variable --vh*/
  margin: 0 auto;
  max-width: 30%;
}
.module__item {
  align-items: center;
  display: flex;
  height: 20%;
  justify-content: center;
}
.module__item:nth-child(odd) {
  background-color: #fff;
  color: #F73859;
}
.module__item:nth-child(even) {
  background-color: #F73859;
  color: #F1D08A;
}
</style>
<div class="module">
  <div class="module__item">20%</div>
  <div class="module__item">40%</div>
  <div class="module__item">60%</div>
  <div class="module__item">80%</div>
  <div class="module__item">100%</div>
</div>
<script>
  /* grab the height of the viewport and then drilled it down into 1/100th of that total so we have a value to assign as our viewport height unit value */
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  // get the value of the current viewport by using the global variable window.innerHeight
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// listen to the resize event
window.addEventListener('resize', () => {
  // execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
</script>
```

https://css-tricks.com/the-trick-to-viewport-units-on-mobile/

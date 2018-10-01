### Offscreen

- way to completely hide an element visually and positionally in the DOM while still allowing it to be accessed by JavaScript and readable by screen readers. This method is very useful for accessibility ( ADA) development when more context is needed for visually-impaired users. 
- As an alternative to `display: none` which is not readable by screen readers or `visibility: hidden` which takes up physical space in the DOM

```html
<a class="button" href="http://pantswebsite.com">
  Learn More
  <span class="offscreen"> about pants</span>
</a>
<style>
.offscreen {
  border: 0;
  clip: rect(0 0 0 0);    /* indicate that no part of the element should be shown */
  height: 1px;  /* height and width of the element 1px */
  margin: -1px; /* Negate the elements height and width */
  overflow: hidden;   /* hide the element's overflow */
  padding: 0;         /* remove all padding */
  position: absolute;
  width: 1px;
}
</style>
```

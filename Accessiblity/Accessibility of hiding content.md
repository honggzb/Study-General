[Accessibility of hiding content](#top)
- [Hiding content in css](#hiding-content-in-css)
- [Hiding content while keeping it screen reader accessible](#hiding-content-while-keeping-it-screen-reader-accessible)
- [example: Icon-only button](#example-icon-only-button)
  - [sample of accessible checkbox](#sample-of-accessible-checkbox)
  - [sample of accessible on/of Toggle switch](#sample-of-accessible-onof-toggle-switch)
- [Tools](#tools)

## Hiding content in css

- recommend:
  - clip-path: inset(100%)
  - opacity: 0;
- do not recommend: it will remove the element from DOM and accessibility tree, thus making them completely inaccessible
  - visibility: hidden;
  - display: none;
- using **hidden** attribute
  - equaivalent of css: `display:none`
  - content will hidden both visually and from assistive technologies
  - useful for hiding content when css is disabled(e.g. reader modes)

    ```html
    <nav id="" aria-label="Site">
    <ul hidden>
        <li></li>
        <li></li>
    </ul>
    </nav>
    <style>
    <!-- for old browser -->
    [hidden] {
        display: none;
    }
    </style>
    ```

- **aria-hidden** attribute

    ```html
    <button aria-expanded="false" id="menu-trigger">
        <svg viewBox="0 0 32 32" width="32px" height="32px" aria-hidden="true" focusable="false" tabindex="-1">
            <!-- SVG content -->
        </svg>
        <span class="sr-only">Menu</span>
    </button>
    ```

## Hiding content while keeping it screen reader accessible

```css
/* Visually hide any element(mostly text) accessibly. support iclueds IE9+ */
.sr-only {
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}
```

## example: Icon-only button

- Option 1:
  - provide `sr-only` text inside the button
  - hide the button by using `aria-hidden`
  - prevent it from being focused by using `focusable="false"`
- Option 2:
  - provide a meaningful title on menu by using `aria-labelledby`
  - prevent it from being focused by using `focusable="false"` and `tabindex="-1"`
    ```html
    <button aria-expanded="false" id="menu-trigger">
        <svg viewBox="0 0 32 32" width="32px" height="32px" aria-labelledby="myTitle" focusable="false" tabindex="-1" role="img">
            <title id="myTitle">Menu</title>
            <!-- SVG content -->
        </svg>
    </button>
    ```
  - https://www.sitepoint.com/tips-accessible-svg/
  - https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
- Option 3:
  - provide a label by using `aria-label`
  - prevent it from being focused by using `focusable="false"` and `tabindex="-1"`
- Option 4:
  - hide menu by using `aria-hidden`
  - prevent it from being focused by using `focusable="false"`
  - hide button labe with `hidden` attribute
  ```html
  <button aria-expanded="false" id="menu-trigger" aria-labelledby="button-label">
      <span id="button-label" hidden>Menu</span>
    <svg viewBox="0 0 32 32" width="32px" height="32px" aria-hidden="true" focusable="false">
        <!-- SVG content -->
     </svg>
  </button>
  ```

### sample of accessible checkbox

```css
input[type="checkbox"]{
    /*1. remove checkbox from page flow, positioning it on top*/
    position: abosute;
    /*2. set some dimensions*/
    width: 1em;
    height: 1em;
    /*3. hide it */
    opacity: 0;
}
```

### sample of accessible on/of Toggle switch

- https://codepen.io/felipefialho/pen/DIdKj
- https://ghinda.net/css-toggle-switch/

```html
<style>
/* ==== Accessibility ===== */
.aural {
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    position: absolute;
    width: 1px;
    &:focus {
        clip: rect(0, 0, 0, 0);
        font-size: 1em;
        height: auto;
        outline: thin dotted;
        position: static !important;
        width: auto;
        overflow: visible;
    }
}
</style>
<div class="toggle-group">
    <input type="checkbox" name="on-off-switch" id="on-off-switch" checked="" tabindex="1">
    <label for="on-off-switch">
        <span class="aural">Show:</span> Show Accessible Toggle Switch
    </label>
    <div class="onoffswitch pull-right" aria-hidden="true">
        <div class="onoffswitch-label">
            <div class="onoffswitch-inner"></div>
            <div class="onoffswitch-switch"></div>
        </div>
    </div>
</div>
```

## Tools

- Chrome Dev tools
  - go to 'chrome://flags/#enable-devtools-experiments', enable Devtools experiments
  - ![](https://i.imgur.com/Qj1Amoi.png)
- [Accessibility Insights for Web](https://chrome.google.com/webstore/detail/accessibility-insights-fo/pbjjkligggfmakdaogkfomddhfmpjeni?hl=en)
- https://material.io/design/usability/accessibility.html
- [Sara Soueidan on Building Accessible Interfaces: Patterns And Techniques at SmashingConf SF 2019](https://vimeo.com/331530115)

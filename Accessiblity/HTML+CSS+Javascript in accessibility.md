[HTML+CSS+Javascript in accessibility](#top)

- [HTML with accessibility](#HTML-with-accessibility)
  - [define the natural language of your document](#define-the-natural-language-of-your-document)
  - [hide content using the hidden attribute](#hide-content-using-the-hidden-attribute)
  - [better to add a blank alt attribute to an <img> element](#better-to-add-a-blank-alt-attribute-to-an-img-element)
  - [use the `<button>` element if you need a button](#use-the-button-element-if-you-need-a-button)
  - [Structuring your markup correctly with headings](#Structuring-your-markup-correctly-with-headings)
  - [Using landmarks helps people navigate your site](#Using-landmarks-helps-people-navigate-your-site)
  - [Fieldsets are great for grouping form elements and giving them more context](#Fieldsets-are-great-for-grouping-form-elements-and-giving-them-more-context)
  - [Reference for HTML accessility](#Reference-for-HTML-accessility)
- [JavaScript with accessibility](#JavaScript-with-accessibility)
  - [focus management](#focus-management)
  - [Focusing elements with JavaScript](#Focusing-elements-with-JavaScript)
- [`aria-live` -inform user when content changes dynamically](#aria-live--inform-user-when-content-changes-dynamically)
- [CSS with Accessibility](#CSS-with-Accessibility)
  - [From legible to readable text](#From-legible-to-readable-text)
  - [Using content in pseudo elements cautiously](#Using-content-in-pseudo-elements-cautiously)
  - [The screen is not the only medium](#The-screen-is-not-the-only-medium)
  - [Fallback for property values with incomplete support](#Fallback-for-property-values-with-incomplete-support)
  - [There are many ways to hide content](#There-are-many-ways-to-hide-content)
  - [High color contrast](#High-color-contrast)
  - [Taking care of order](#Taking-care-of-order)
  - [Focus on what’s important: focus](#Focus-on-whats-important-focus)
  - [Grid and flat document structures -codepen](https://codepen.io/matuzo/pen/zdarLX)](#Grid-and-flat-document-structures--codepenhttpscodepeniomatuzopenzdarLX)

## HTML with accessibility

### define the natural language of your document

```html
<html lang="en">
<!-- If you switch language within a document -->
<p>There is a certain <i lang="fr" class="idiomatic">je ne sais quoi</i> in the air.</p>
```

> All language codes are listed in the [IANA Language Subtag Registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)

### hide content using the hidden attribute

- `[hidden] { display: none; }`
- Browser support for the hidden attribute is very good, except for IE 10 and lower

### better to add a blank alt attribute to an <img> element

- empty string (`alt=""`) indicates that this image is not a key part of the content and that non-visual browsers may omit it from rendering
- [Quick tip: Using alt text properly](https://a11yproject.com/posts/alt-text/)

### use the `<button>` element if you need a button

- Focusable
- Clickable (with mouse and keys)
- Screen readers identify them as buttons

```html

<button class="btn">I'm a button</button> <!-- Button and focusable -->
<div class="btn">I'm a div</div>  <!-- Div and not focusable -->
<div class="btn" tabindex="0">I'm a div</div>  <!-- Still just a div, but focusable -->
<div class="btn" tabindex="0" role="button">I'm a div</div> <!-- Button role and focusable -->
```

### Structuring your markup correctly with headings

- creating a sound outline using headings `<h1> - <h6>`
- checking if your outline is persistent
  1. [tota11y](http://khan.github.io/tota11y/)
  2.  to disable CSS and check if the page is readable and the structure makes sense

### Using landmarks helps people navigate your site

- One of the main benefits is that screen reader users will be able to **navigate pages by jumping from section to section**
- `<article>`, `<aside>`, `<nav>`, `<section>`
- can also use **WAI-ARIA role attributes** for older browsers or sections that don't have an explicit tag
- browser extension to check navigable sections(landmarks): [Landmarks](http://matatk.agrip.org.uk/landmarks/)

```html
<body>
  <header> <!-- landmark -->
    <nav> <!-- landmark -->
      ...
    </nav>
  </header>
  <aside> <!-- landmark -->
  </aside>
</body>
<!-- The extra role attributes are only important for older browsers -->
<body>
  <header role="banner"> <!-- landmark -->
    <h1>My personal blog</h1>
  </header>
  <main>
    <section> <!-- landmark -->
      <h2>Blog posts</h2>
      ....
    </section>
  </main>
  <footer role="contentinfo">  <!-- landmark -->
    &copy; 2016 Me
  </footer>
</body>
```

### Fieldsets are great for grouping form elements and giving them more context

```html
<!-- better approach is to wrap everything in a fieldset and put text in a <legend> tag -->
<form>
  <fieldset>
    <legend>T-Shirt size</legend>
    <input type="radio" id="s" name="shirtsize" />
    <label for="s">S</label>
    <input type="radio" id="m" name="shirtsize" />
    <label for="m">M</label>
    <input type="radio" id="l" name="shirtsize" />
    <label for="l">L</label>
  </fieldset>
</form>
```

### Reference for HTML accessility

1. Pickering, Heydon; Inclusive Design Patterns
2. [w3.org Wiki — i element](https://www.w3.org/wiki/HTML/Elements/i)
3. [WebAIM — Alternative Text](http://webaim.org/techniques/alttext/)
4. [Web Accessibility Tutorials — Headings](https://www.w3.org/WAI/tutorials/page-structure/headings/)
5. [WAI-ARIA — main:role](https://www.w3.org/TR/2012/WD-html-main-element-20121217/)
6. [Using navigation landmarks](https://accessibility.blog.gov.uk/2016/05/27/using-navigation-landmarks/)
7. [Landmarks must identify content regions](https://fae.disability.illinois.edu/rulesets/wcag/LANDMARK_18/)

[back to top](#top)

## JavaScript with accessibility

### focus management

- It’s important to make sure that our websites are navigable by keyboard
- Navigating a site via keyboard means jumping from one focusable element to another in DOM order
  - Tab key or Shift + Tab for the reverse direction
  - selected with the Enter key and sometimes the Spacebar
- Focusable elements are amongst others links, buttons and form elements
- Elements like `<p>`, `<h2>` or `<div>` cannot be focused by default
- By adding the **tabindex** attribute with an integer value to make non-focusable elements focusable
  - If the value is set to 0 the element becomes focusable and reachable via keyboard, `<h2 tabindex="0">A focusable heading</h2>`
  - If the value is a negative number, the element is focusable (e.g. with JavaScript method focus) as well, but not reachable via keyboard
  - can also use a value greater than 0, but that changes the natural tab order and is considered an anti-pattern.
- [Controlling focus with tabindex](https://www.youtube.com/watch?v=Pe0Ce1WtnUM&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=7)

### Focusing elements with JavaScript

- Even if elements are focusable, sometimes they are not in the right DOM order
- for example: [modal window of accessiblity](https://codepen.io/matuzo/pen/pRNVJN)

```html
<!-- 1. Add tabindex="0" for making focusable and reachable -->
<div class="modal" id="modal2" tabindex="0">
  <!-- ... -->
</div>
<script>
// 2. Use the focus() method to set focus
// Variable for storing the last focused element, If you close the modal window by pressing Esc the focus is lost
var lastFocusedElement;
function showModal() {
  // Store the last focused element
  lastFocusedElement = document.activeElement;
  // Select the modal window
  var modal = document.getElementById('modal');
  // Show the window
  modal.classList.add('modal--visible');
  // Focus the window
  modal.focus();
  // Add keydown event
  modal.addEventListener('keydown', function(e) {
    // Close the window by pressing the Esc-key
    if(e.keyCode === 27) {
      removeModal();
    }
  });
}
function removeModal() {
  var visibleClass = 'modal--visible';
  if (document.querySelector('.' + visibleClass)) {
    document.querySelector('.' + visibleClass).classList.remove(visibleClass);
    // Return the focus to the last focused element
    lastFocusedElement.focus();
  }
}
</script>
```

- Another solution: [07-modals-and-keyboard-traps](https://github.com/udacity/ud891/tree/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution)

```html
<div class="modal">
<script>
// Will hold previously focused element
var focusedElementBeforeModal;
// Find the modal and its overlay
var modal = document.querySelector('.modal');
var modalOverlay = document.querySelector('.modal-overlay');
var modalToggle = document.querySelector('.modal-toggle');
modalToggle.addEventListener('click', openModal);
function openModal() {
  // Save current focus
  focusedElementBeforeModal = document.activeElement;
  // Listen for and trap the keyboard
  modal.addEventListener('keydown', trapTabKey);
  // Listen for indicators to close the modal
  modalOverlay.addEventListener('click', closeModal);
  // Sign-Up button
  var signUpBtn = modal.querySelector('#signup');
  signUpBtn.addEventListener('click', closeModal);
  // Find all focusable children
  var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  var focusableElements = modal.querySelectorAll(focusableElementsString);
  // Convert NodeList to Array
  focusableElements = Array.prototype.slice.call(focusableElements);
  var firstTabStop = focusableElements[0];
  var lastTabStop = focusableElements[focusableElements.length - 1];
  // Show the modal and overlay
  modal.style.display = 'block';
  modalOverlay.style.display = 'block';
  // Focus first child
  firstTabStop.focus();
  function trapTabKey(e) {
    // Check for TAB key press
    if (e.keyCode === 9) {
      // SHIFT + TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }
      // TAB
      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }
    // ESCAPE
    if (e.keyCode === 27) {
      closeModal();
    }
  }
}
function closeModal() {
  // Hide the modal and overlay
  modal.style.display = 'none';
  modalOverlay.style.display = 'none';
  // Set focus back to element that had it before the modal was opened
  focusedElementBeforeModal.focus();
}
</script>
```

## `aria-live` -inform user when content changes dynamically

`<div role="alert" aria-live="assertive"></div>`

- off:  default value
- polite: equivalent to `role="status"` and `aria-live="assertive"` to `role="alert"`
- assertive

Another workaround is to change alert message manually

[back to top](#top)

## CSS with Accessibility

### From legible to readable text

- Increasing font size
- Setting line height: The default line height in browsers is at roughly 1.2. According to the [Web Content Accessibility Guidelines](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-visual-presentation) it should be at least 1.5 within paragraphs in blocks of text
- Defining paragraph widths: 45 to 85 characters per line, `p {max-width: 65ch;} /* Maximum width of 65 characters */`
  - If you are using any type of responsive typography technique make sure test your site on very large screens.
  - [Precise control over responsive typography](https://madebymike.com.au/writing/precise-control-responsive-typography/)

### Using content in pseudo elements cautiously

- If we do that, need to remember that [some screen readers recognize and announce generated content](https://tink.uk/accessibility-support-for-css-generated-content/)
- if content is purely presentational, make sure to hide it by using `aria-hidden`
- `<span class="icon icon-key" aria-hidden="true"></span>`

### The screen is not the only medium

```css
/* display the value of the href attribute next to every link that has a href attribute, which starts with http, but doesn't have mywebsite.com in its value */
@media print {
  a[href^="http"]:not([href*="mywebsite.com"])::after {
    content: " (" attr(href) ")";
  }
}
```

- Firefox and especially Chrome offer tools for [testing and debugging print style sheets](https://uxdesign.cc/i-totally-forgot-about-print-style-sheets-f1e6604cfd6#63e3)
- [tips and tricks for working with print styles](https://uxdesign.cc/i-totally-forgot-about-print-style-sheets-f1e6604cfd6)

### Fallback for property values with incomplete support

```css
div {width: 50vmax;} /* Doesn't work in IE and older versions of Edge */
/*fallback*/
div {
  width: 50vw;
  width: 50vmax;
}
```

### There are many ways to hide content

- `visibility: hidden` and/or `display: none`, Users can't see it and screen readers or search engines can't read it
- `aria-hidden="true"`,Hiding content for screen reader (semantically)
  ```html
  <button>
    <span class="icon icon-hamburger" aria-hidden="true"></span>
    <span class="text">Menu</span>
  </button>
  ```
- [Techniques for hiding text](https://medium.com/@matuzo/writing-css-with-accessibility-in-mind-8514a0007939)
- Hiding content visually

```css
.visually-hidden {
  position: absolute;  /* Remove the item from normal flow */
  white-space: nowrap;  /* Workaround for falsely pronounced, smushed text */
  /* Set it to the smallest possible size (some screen readers ignore elements with zero height and width) */
  width: 1px;
  height: 1px;
  overflow: hidden;  /* Hide overflowing content after resizing */
  border: 0;  /* Reset any property that may change the elements size */
  padding: 0;
  /* Clipping defines what part of an element should be displayed. */
  /* Deprecated clip property for older browsers */
  clip: rect(0 0 0 0);
  /* clip-path for newer browsers. inset(50%) defines an inset rectangle that makes the content disappear.  */
  clip-path: inset(50%);
    /* It seems like at the moment nobody is quite sure why margin: -1px is there. On top of that it seems to cause issues (see: https://github.com/h5bp/html5-boilerplate/issues/1985). */
  margin: -1px;
}
```

- **Skip links**
  - A [skip link](https://codepen.io/matuzo/pen/RZBNjP) is a link that is initially visually hidden, but visible on focus
  - should be one of the first items on the page to give screen reader and keyboard users the chance to immediately skip introductory content and jump right to the main content

```css
.skip-link {
  position: absolute;  /* Remove item from normal flow */
  top: 8px;
  left: 8px;
}
.skip-link:not(:focus) {
  white-space: nowrap;
  width: 1px;
  height: 1px;
  overflow: hidden;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  margin: -1px;
}
```

### High color contrast

- the [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/) has defined a ratio for measuring it
- Extension Tools
  - [High Contrast for Chrome](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph?hl=en-US)
  - [Measuring contrast ratio tool -Canary for Chrome](https://remysharp.com/2017/08/17/contrast-ratio-in-devtools)
- Online Tools
  - [contrast ratio](http://leaverou.github.io/contrast-ratio/#blue-on-red) by Lea Verou, Quick and easy contrast checker in the browser
  - [Colour Contrast](https://snook.ca/technical/colour_contrast/colour.html#fg=33FF33,bg=333333) Check by Jonathan Snook, Contrast checker in the browser with some more options
  - [Wave tool](http://wave.webaim.org/), Browsertool for checking contrast and more
  - [Accessible Color Spaces](http://kevingutowski.github.io/color.html) by Kevin Gutowski, Color picker with automatic contrast check
- can use media queries to detect if high contrast mode is active and provide specific styles
  - [Windows High Contrast Mode: the limited utility of -ms-high-contrast](https://developer.paciellogroup.com/blog/2016/12/windows-high-contrast-mode-the-limited-utility-of-ms-high-contrast/)

```css
/* High contrast mode active */
@media (-ms-high-contrast:active) {
}
/* High contrast mode with specific black on white theme */
@media (-ms-high-contrast:black-on-white) {
}
/* High contrast mode with specific white on black theme */
@media (-ms-high-contrast:white-on-black) {
}
```

### Taking care of order

- `order` and `flex-direction` for `Flexbox` or `order`, `flex-auto-flow`, will mess up DOM order
- [disconnect between the DOM order and visual presentation](https://tink.uk/flexbox-the-keyboard-navigation-disconnect/)
- [Source Order Matters](http://adrianroselli.com/2015/09/source-order-matters.html)
- [Styling elements with focused children](https://s.codepen.io/matuzo/debug/MvPddP), `:focus-within`
  - `form:focus-within { box-shadow: 0 0 4px 6px rgba(80,88,156,0.2); }`


### Focus on what’s important: focus

- [Focusable Elements - Browser Compatibility Table](https://allyjs.io/data-tables/focusable.html)
- Differentiating between keyboard and mouse users

### Grid and flat document structures -codepen](https://codepen.io/matuzo/pen/zdarLX)

```html
<div class="wrapper">
  <h2>Heading</h2>
  <ul>
    <li><a href="#">Element 1</a></li>
    <li><a href="#">Element 2</a></li>
    <li><a href="#">Element 3</a></li>
    <li><a href="#">Element 4</a></li>
    <li><a href="#">Element 5</a></li>
    <li><a href="#">Element 6</a></li>
  </ul>
</div>
<style>
.wrapper {
  display: grid;
  grid-template-columns: 120px repeat(2, 1fr);
  grid-gap: 20px;
}
h2 { grid-column: 2 / -1; }
ul {
  grid-column: 1 / -1;   /* span the whole grid */
  display: inherit; /* create another grid and inherit the values from the parent grid */
  grid-template-columns: inherit;
  grid-gap: inherit;
  /* overwrite display for browsers that understand display: contents */
  display: contents;
}
</style>
```

[back to top](#top)

> reference
- [Writing HTML with accessibility in mind](https://medium.com/alistapart/writing-html-with-accessibility-in-mind-a62026493412)
- [Writing JavaScript with accessibility in mind](https://medium.com/@matuzo/writing-javascript-with-accessibility-in-mind-a1f6a5f467b9)
- [Writing CSS with Accessibility in Mind](https://medium.com/@matuzo/writing-css-with-accessibility-in-mind-8514a0007939)
- [The A11Y Project](https://a11yproject.com/)
- [A11ycasts with Rob Dodson in youtube](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
- [alistapart](https://alistapart.com/)
- [Udacity Web Accessibility](https://github.com/udacity/ud891)

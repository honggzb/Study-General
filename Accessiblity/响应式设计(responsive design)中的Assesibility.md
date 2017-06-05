[响应式设计(responsive design)中的Assesibility](#top)

- [1. 图片和文本自动适应布局](#图片和文本自动适应布局)
- [2. autosuggest search field](#autosuggest-search)
- [3. Hiding content](#Hiding-content)
- [4. Responsive toggle](#Responsive-toggle)
- [5. Hacking the content property](#Hacking-the-content-property)

<h3 id="图片和文本自动适应布局">1. 图片和文本自动适应布局</h3>

using figcaption tag to solve it, and its semantics leave nothing for us to add

```html
<figure>
  <img src="eiffel.jpg" alt="Eiffel tower" />
  <figcaption>Pictured, the Eiffel Power, is Illuminated in Green to ...</figcaption>
</figure>
```

<h3 id="autosuggest-search">2. autosuggest search field</h3>

```html
<input type="search" aria-autocomplete="list" aria-owns="menu" aria-describedby="helptext" />
<p id="helptext">Use your arrow keys to browser the suggestions</p>
<div id="menu" aria-hidden="true">...</div>
```

<h3 id="Hiding-content">3. Hiding content</h3>

- principle: the 1 pixel size became common because VoiceOver would ignore text with 0px 
-  hiding content accessibly will not prevent focusable content from receiving keyboard focus, any accessibly-hidden content should no longer be hidden when it gains focus

```css
.accessible-hidden {
  position: absolute;
  top: 0;
  left: -999px;
  height: 1px;
  width: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
  white-space: nowrap;    /* make sure the text doesn't virtually wrap inside the 1px container, because some screen readers may interpret those word wraps in unhelpful ways  if clip */
  .accessible-hidden: focus {
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    padding: 10px;
  }
}
```

<h3 id="Responsive-toggle">4. Responsive toggle</h3>

- add focusable button into the heading, which allows that heading to stay in the document tree as handy accessible navigation.

```html
<h2 class="collapsible_header">
  <button aria-haspopup="true" aria-controls="packinglist" aria-expanded="false">Packing List</button>
</h2>
<div class="collapsible_content" role="menu" aria-hidden="true" id="packinglist">
  <!-- ... -->
</div>
```

- use javascript to selectively add or remove this markup depending on the viewport size and which version of our component is in play

```javascript
var big = window.matchMedia("(min-width: 800px)").matches;
if(big) removeToggle();
else addToggle();
//or
.collapsible_header { cursor: pointer;}
@media(min-width: 800px){ 
  .collapsible_header { cursor: default; }
}
var headingCSS = getComputedStyle(myHeading, null);
if(headingCSS.getPropertyValue("cursor") === "pointer") addToggle();
else removeToggle();
```

for Modal dialogs, we can use same technology to solve Assesibility.

```html
<div class="dialog" id="mydialog" aria-label="dialog example" role="dialog" tabindex="0">
  <p>This is some content</p>
  <button>Close dialog</button>
</div>
```

```css
.dialog { display: none;}
.dialog-open { display: block; }
@media (min-width: 800px){
  .dialog { display: block;}
  .dialog button{display: none;}
}
```

<h3 id="Hacking-the-content-property">5. Hacking the content property</h3>

```css
body.before {
  content: "smartphone";
  display: none;
}
@media(min-width: 800px){
  body:before { content: "tablet"; }
}
```

> references

- Presentation: Accessibility in a Responsive World, A11Y Days 2017 (https://www.filamentgroup.com/lab/accessibility-funka.html?utm_source=frontendfocus&utm_medium=email)
- http://simplyaccessible.com/articles/

[useful CSS tricks](#top)

## Sticky Footer

```html
<div id="document">
  <main>
    <p>Add more text here, to see how the footer responds!</p>
  </main>
  <footer>
    <h1>The footer goes here</h1>
  </footer>
</div>
<style>
#document { 
    height: 100vh;
    display: flex;
    flex-direction: column;
}
main {flex: auto;}   /*flex:auto; will sets flex-grow to 1 by default*/
footer {flex-shrink: 0;}   /*To prevent any unwanted behaviour */
/*flex-shrink is effectively the opposite of the flex-grow property, controlling the amount a flex element shrinks to fit into its container, and setting it to 0 will prevent the footer from shrinking at all*/
</style>
```

[back to top](#top)

## Zoom-on-Hover Images

```html
<!-- need a wrapper div to go around our normal img tag -->
<div class="img-wrapper">
    <img class="inner-img" src="https://source.unsplash.com/random/400x400" />
</div>
<style>
/*need to set the width and height of the parent element,
and make sure overflow is set to hidden 
for any kind of transform animation*/
.img-wrapper {  
  width: 400px;
  height: 400px;
  overflow: hidden; 
}
.inner-img { transition: 0.3s; }
.inner-img:hover { transform: scale(1.1); }
</style>
```

[back to top](#top)

## Instant Night Mode - quick way to apply a “night mode” skin to website

```css
body {
    background: #FFF;
    filter: invert(1) hue-rotate(210deg);
}
```

[back to top](#top)

## Custom Bullet Points +Navigation Breadcrumbs  - 自定义列表的勾选框和breadcrumb

```css
/*
🗹 Item 1
🗹 Item 2
☐ Item 1
☐ Item 2
*/
ul { list-style: none; }
ul.complete li::before { content: '🗹 '; }
ul.incomplete li::before { content: '☐ '; }
/*Navigation Breadcrumbs
» Home / Shop / T-Shirts
*/
.breadcrumb a:first-child::before {
  content: " » ";
}
.breadcrumb a::after {
  content: " /";
}
.breadcrumb a:last-child::after {
  content: "";
}
```

[back to top](#top)

## Parallax Images

```html
<div class="wrapper">
  <h1>Scroll Down</h1>  
  <div class="parallax-img"></div>
  <p>....</p>
</div>
<style>
.wrapper {
  height: 100vh;
}
.parallax-img {
  height: 100%;
  background-attachment: fixed;  /*fixes the background image’s position within the view-port*/
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
```

[back to top](#top)

## Animation with Cropped Images

```html
<input type="checkbox" /><br />
<img src="https://source.unsplash.com/random/1920x1080" alt="Random" />
<style>
input {
  transform: scale(1.5);
  margin: 10px 5px;
}
img {
  width: 1920px;
  height: 1080px;
  transition: 0s;
}
input:checked + br + img {
  width: 500px;
  height: 500px;
  /* object-fit and object-position together allow to change an image’s dimensions without affecting it’s aspect ratio*/
  object-fit: cover;
  object-position: left-top;
  transition: width 2s, height 4s;
}
</style>
```

[back to top](#top)

> [8 useful CSS tricks: Parallax images, sticky footers and more](https://medium.com/@bretcameron/parallax-images-sticky-footers-and-more-8-useful-css-tricks-eef12418f676)

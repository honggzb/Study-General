[top](#top)

- [1. Steps to Render a Page](#Steps-to-Render-a-Page)
- [2. Optimizing Strategies](#Optimizing)
  - [2.1 Opitmizing DOM](#Optimizing-DOM)
  - [2.2 Unblocking css with the media queries](#Unblocking-css-with-the-media-queries)
  - [2.3 Opitimizing JS](#Opitimizing-JS)

<h3 id="Steps-to-Render-a-Page">1. Steps to Render a Page</h3>

1. begin constructing the DOM by parsing HTML
2. Request CSS,JS resources
3. Parse CSS and construct the CSSOM tree
4. Merge DOM and CSSOM into the Render tree
5. Run layout, paint

![](http://i.imgur.com/dKTlPCM.png)

[back to top](#top)

<h3 id="Optimizing">2. Optimizing Strategies</h3>

<h4 id="Optimizing-DOM">2.1 Opitmizing DOM</h4>

- minify
- compress
- cache

<h4 id="Unblocking-css-with-the-media-queries">2.2 Unblocking css with the media queries</h4>

```css
/** 1) using media queries in css**/
@media screen and (orientation: landscape) { ... }
@media print { ... }
```

```html
<!-- 2) using media="" -->
<link rel="stylesheet" href="style.css" media="screen">
<link rel="stylesheet" href="portraint.css" media="orientation:landscape">
<link rel="stylesheet" href="style-print.css" media="print">
```

<h4 id="Opitimizing-JS">2.3 Opitimizing JS</h4>

- Defer Javascript exception
- Async JS

```html
<script src="analytics.js" async><script>
```

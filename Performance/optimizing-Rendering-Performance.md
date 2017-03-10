**Steps to Render a Page**

1. begin constructing the DOM by parsing HTML
2. Request CSS,JS resources
3. Parse CSS and construct the CSSOM tree
4. Merge DOM and CSSOM into the Render tree
5. Run layout, paint

![](http://i.imgur.com/QVV7qNP.png)

**1) Opitmizing DOM**

- minify
- compress
- cache

**2) Unblocking css with the media queries**

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

**3) Opitimizing JS**

- Defer Javascript exception
- Async JS

```html
<script src="analytics.js" async><script>
```

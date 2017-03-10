[top](#top)

- [1. Steps to Render a Page](#Steps-to-Render-a-Page)
- [2. Optimizing Strategies](#Optimizing)
  - [2.1 Opitmizing DOM](#Optimizing-DOM)
  - [2.2 Unblocking css with the media queries](#Unblocking-css-with-the-media-queries)
  - [2.3 Opitimizing JS](#Opitimizing-JS)
  - [2.4 Preload scanner](#Preload-scanner)
- [3. Sample of Optimized Portofolios](#Optimizing)

<h3 id="Steps-to-Render-a-Page">1. Steps to Render a Page</h3>

1. begin constructing the DOM by parsing HTML
2. Request CSS,JS resources
3. Parse CSS and construct the CSSOM tree
4. Merge DOM and CSSOM into the Render tree
5. Run layout, paint

![](http://i.imgur.com/dKTlPCM.png)

![](http://i.imgur.com/j7AksZ5.png)

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

[back to top](#top)

<h4 id="Preload-scanner">2.4 [Preload scanner](https://w3c.github.io/preload/) - preload, prefetch, prerender</h4>

```html
<!-- preload stylesheet resource via declarative markup -->
<link rel="preload" href="/styles/other.css" as="style">
<!-- or, preload stylesheet resource via JavaScript -->
<script>
  var res = document.createElement("link");
  res.rel = "preload";
  res.as = "style";
  res.href = "styles/other.css";
  document.head.appendChild(res);
</script>
<!-- some Use cases -is non-normative.  -->
<!-- 1)  -->
<link rel="preload" href="/assets/font.woff2" as="font" type="font/woff2">
<link rel="preload" href="/style/other.css" as="style">
<link rel="preload" href="//example.com/resource">
<link rel="preload" href="https://fonts.example.com/font.woff2" as="font" crossorigin type="font/woff2">
<!-- 2) listen for load and error events  -->
<script>
  function preloadFinished(e) { ... }
  function preloadError(e)  { ... }
</script>
<link rel="preload" href="app.js" as="script" onload="preloadFinished()" onerror="preloadError()">
<!-- 3) Developer, server, and proxy-initiated fetching  -->
<link rel="preload" href="//example.com/widget.html" as="document">
<script>
  var res = document.createElement("link");
  res.rel = "preload";
  res.as = "document";
  res.href = "/other/widget.html";
  document.head.appendChild(res);
</script>
```

[back to top](#top)

<h3 id="Optimizing">3. [Sample of Optimized Portofolios](https://discussions.udacity.com/t/optimized-portfolios/16161/22)</h3>

```
http://yipstar.github.io/udportfolio/274

Page Speed Insights Results:
Mobile: 93
Desktop: 95

Optimizations:
Added media="print" to print.css link
Inlined style.css.
Load google analytics async. 
Moved all javascript loading to the bottom of the body tag.
optimize the pizzeria image, shrink it to 100 pixels wide.
converted profilepic.jpg to profilepic.png
Change to googles Webfont Loader to load the web fonts async.
```

[back to top](#top)

> Reference

- [Udacity Discussion Forum](https://discussions.udacity.com/c/standalone-courses/website-performance-optimization)

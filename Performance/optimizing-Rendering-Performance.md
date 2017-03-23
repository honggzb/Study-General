[index](#top)

- [1. Steps to Render a Page](#Steps-to-Render-a-Page)
- [2. Optimizing Strategies](#Optimizing)
  - [2.1 The sequences standard of page Optimizing](#sequences-standard)
  - [2.2 Opitmizing DOM](#Optimizing-DOM)
  - [2.3 Unblocking css with the media queries](#Unblocking-css-with-the-media-queries)
  - [2.4 Opitimizing JS](#Opitimizing-JS)
  - [2.5 Preload scanner](#Preload-scanner)
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

<h4 id="sequences-standard">2.1 The sequences standard of page Optimizing</h4>

![](http://i.imgur.com/JxOAtxO.png)

```javascript
// bad performances
function changeSize(size){
  for(var i=0;i<document.querySelectorAll(".randomContainer").length;i++){
    var dx = determineDx(document.querySelectorAll(".randomContainer")[i], size);
    var newWidth = (document.querySelectorAll(".randomContainer")[i].offsetWidth + dx)+"px";
    document.querySelectorAll(".randomContainer")[i].style.width = newWidth;
  }
}
// improvement
function changeSize(size){
  var randomPizzas = document.querySelectorAll(".randomContainer");
  for(var i=0;i<randomPizzas.length;i++){
    var dx = determineDx(randomPizzas[i], size);
    var newWidth = (randomPizzas[i].offsetWidth + dx)+"px";
    randomPizzas[i].style.width = newWidth;
  }
}
// more efficience improvement
function changeSize(size){
  switch (size) {
    case "1": newWidth =25;break;
    case "2": newWidth =33.3;break;
    case "3": newWidth =50;break;
    default: console.log("bug in sizeSwitcher");
  }
  var randomPizzas = document.querySelectorAll(".randomContainer");
  for(var i=0;i<randomPizzas.length;i++){
    randomPizzas[i].style.width = newWidth+"%";
  }
}
```

[back to top](#top)

<h4 id="Optimizing-DOM">2.2 Opitmizing DOM</h4>

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

<h4 id="Opitimizing-JS">2.4 Opitimizing JS</h4>

- Defer Javascript exception
- Async JS

```html
<script src="analytics.js" async><script>
```

[back to top](#top)

<h4 id="Preload-scanner">2.5 [Preload scanner](https://w3c.github.io/preload/) - preload, prefetch, prerender</h4>

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
<!-- 4) Dns-prefetch -Dns-prefetching is the process of initiating the dns resolution of each domain where we have hosted resources, before the browser makes a request for them, with the goal to save the DNS resolution time when the resource is requested -->
<link rel='dns-prefetch' href='//g-ecx.images-amazon.com'>
<link rel='dns-prefetch' href='//completion.amazon.com'>
<!-- 5) other  -->
<link rel="preconnect" href="//example.com">
<link rel="prefetch" href="//example.com/next-page.html" as="html" crossorigin="use-credentials">
<link rel="prefetch" href="/library.js" as="script">
<link rel='prerender' href='//pagetoprerender/landing.html'>
<!--  Hint probability: The pr attribute expects a float value in the [0.0-1.0] range, there is 0.75 possible to prefetch resource -->
<link rel="prefetch" href="//example.com/next-page.html" pr="0.75">
```

[back to top](#top)

<h3 id="Optimizing">3. Sample of Optimized Portofolios</h3>

S[ample of Optimized Portofolios](https://discussions.udacity.com/t/optimized-portfolios/16161/22)

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
- [前端性能优化－－预加载技术](http://blog.csdn.net/franktaoge/article/details/51473823)
- [Resource Hints](https://medium.com/@luisvieira_gmr/html5-prefetch-1e54f6dda15d#.vx04es2cz)
- [Slides from a talk by Ilya Grigorik called Preconnect, prerender, prefetch](https://docs.google.com/presentation/d/18zlAdKAxnc51y_kj-6sWLmnjl6TLnaru_WH0LJTjP-o/present?slide=id.p19)
- [reload Hints For Web Fonts](http://www.bramstein.com/writing/preload-hints-for-web-fonts.html)
- [Front-end performance for web designers and front-end developers](https://csswizardry.com/2013/01/front-end-performance-for-web-designers-and-front-end-developers/#section:dns-prefetching)
- [Slides from a talk by Ilya Grigorik called Preconnect, prerender, prefetch](https://docs.google.com/presentation/d/18zlAdKAxnc51y_kj-6sWLmnjl6TLnaru_WH0LJTjP-o/present?slide=id.p19)

[back to top](#top)

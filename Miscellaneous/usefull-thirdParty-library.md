
- [HeadJS](http://headjs.com/) 

**headjs实现网站并行加载但顺序执行JS**

```javascript
<script src="js/head.min.js"></script>
<script type="text/javascript"> head.js("js/jquery-1.6.1.min.js","js/jquery.validate.min.js","js/my_validate.js"); </script>
//or 异步加载其他 JS 文件，比如Jquery,可以把所有JS内容汇集成一个文件，放在页面的最后。然后就可以在这个JS文件里来引用其他外部 JS
head(function() {
........
});
/* part 1 */
head.js("http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
/* part 2 */
```

- Speed up your apps: Load JS & CSS asyncronously and in parallel, but execute them in order
- Load one asset if a condition is met, else fallback and load a different one
- Manage script dependencies, and execute callbacks once they are loaded
- Cross-browser compatible « pseudo media-queries » let you code against different resolutions & devices
- Fix quirks in specific browsers by quickly applying dedicated CSS/JS logic
- Detect various browsers & their versions
- Check if the client supports a certain Browser, HTML5, or CSS3 feature
- Automatically generates JS and CSS classes for browsers & features that where detected
- Automatically generates CSS classes, to know what page or section a user is viewing
- Know if the user is in landscape or portrait mode
- Or whether the client is using a mobile or desktop device
- Get old browsers to support HTML5 elements like nav, sidebar, header, footer, ...

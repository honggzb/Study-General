[Get viewport height when soft keyboard is on](#top)

- [Method 1: use css](#Method1)
- [Method 2: use `window.innerWidth`, `window.innerHeight`](#Method2)

<h2 id="Method1">Method 1: use css</h2>

- hide the element instead of changing its position (simple and effective)
- The element is shown if the virtual keyboard is closed but the input is still on focus. 
- use `@media screen and (min-aspect-ratio: 11/16)` to detect whether soft keyboard on: it's less than the common 9/16 ratio (the presence of the virtual keyboard increases this ratio then the rule is applied)

```css
.fixfixed{
  @media screen and (min-aspect-ratio: 11/16) {
    .bottomThingToHideWhenVirtualKeyboardIsShown{
      opacity: 0;
      pointer-events: none;
    }
  }
}
```

```javascript
$(document).on('focus', 'input, textarea', function(){
    $('body').addClass("fixfixed");
});
$(document).on('blur', 'input, textarea', function(){
    $('body').removeClass("fixfixed");
});
```

<h2 id="Method2">Method 2: use `window.innerWidth`, `window.innerHeight`</h2>

```html
<style>
html {
    height : 100vh;
    width : 100vw;
}
</style>
<form><input type="text" /></form>
<input type="text" />
<div id="vwh"></div>
<script>
$(function() {    
    if (/ipad|iphone/gi.test(window.navigator.userAgent)) {
	    var events = "abort blur focus input scroll submit touchstart touchmove";
	    $("form, input").on(events, function(e) {
					return (function(window, elem, w, h) {
					var vh = window.getComputedStyle(elem,null).getPropertyValue(h);
					var vw = window.getComputedStyle(elem,null).getPropertyValue(w);
					    var vwh = {"documentWidth": vw, "documentHeight": vh, "windowInnerWidth": window.innerWidth, "windowInnerHeight": window.innerHeight};
					console.log(vwh);
					var _vwh = document.getElementById("vwh");
					    _vwh.innerHTML = JSON.stringify(vwh)
					return vwh  
					}(window, document.documentElement, "width", "height"));
			 }).focus();
    };
})
</script>
```


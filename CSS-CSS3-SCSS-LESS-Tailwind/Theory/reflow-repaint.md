## Rendering: repaint, reflow/relayout, restyle

![](http://i.imgur.com/jtpljy9.png)

### 1 Repaints and reflows

- parts of the render tree (or the whole tree) will need to be revalidated and the node dimensions recalculated. This is called a **reflow**, or layout, or layouting. (or "relayout" which I made up so I have more "R"s in the title, sorry, my bad). Note that there's at least one reflow - the initial layout of the page
- parts of the screen will need to be updated, either because of changes in geometric properties of a node or because of stylistic change, such as changing the background color. This screen update is called a **repaint**, or a **redraw**.


> Repaints and reflows can be expensive, they can hurt the user experience, and make the UI appear sluggish

### 2 triggers a reflow or a repaint

Anything that changes input information used to construct the rendering tree can cause a repaint or a reflow, for example:

- Adding, removing, updating DOM nodes
- Hiding a DOM node with display: none (reflow and repaint) or visibility: hidden (repaint only, because no geometry changes)
- Moving, animating a DOM node on the page
- Adding a stylesheet, tweaking style properties
- User action such as resizing the window, changing the font size, or scrolling


### 3 Minimizing repaints and reflows

- Don't change individual styles, one by one

```javascript
// bad
var left = 10,top = 10;
el.style.left = left + "px";
el.style.top  = top  + "px";
// better 
el.className += " theclassname";
// or when top and left are calculated dynamically...
// better
el.style.cssText += "; left: " + left + "px; top: " + top + "px;";
```

- Batch DOM changes and perform them "offline"
	- use a documentFragment to hold temp changes, clone the node you're about to update, work on the copy, then swap the original with the updated clone
	- hide the element with display: none (1 reflow, repaint), add 100 changes, restore the display (another reflow, repaint). This way you trade 2 reflows for potentially a hundred

```
// no-no!
for(big; loop; here) {
    el.style.left = el.offsetLeft + 10 + "px";
    el.style.top  = el.offsetTop  + 10 + "px";
}
// better
var left = el.offsetLeft,
    top  = el.offsetTop
    esty = el.style;
for(big; loop; here) {
    left += 10;
    top  += 10;
    esty.left = left + "px";
    esty.top  = top  + "px";
}
```

- Don't ask for computed styles excessively

```
var bodystyle = document.body.style;   //definitions of the variables used to cache value
var computed;
if (document.body.currentStyle) {
  computed = document.body.currentStyle;
} else {
  computed = document.defaultView.getComputedStyle(document.body, '');
}
// touch styles every time
bodystyle.color = 'red';
bodystyle.padding = '1px';
tmp = computed.backgroundColor;
bodystyle.color = 'white';
bodystyle.padding = '2px';
tmp = computed.backgroundImage;
// touch at the end
bodystyle.color = 'yellow';
bodystyle.padding = '4px';
bodystyle.color = 'pink';
bodystyle.padding = '5px';
tmp = computed.backgroundColor;
tmp = computed.backgroundImage;
```

### 4 Force repaint of an element with Javascript

```javascript
// https://martinwolf.org/blog/2014/06/force-repaint-of-an-element-with-javascript
var siteHeader = document.getElementById('header');
siteHeader.style.display='none';
siteHeader.offsetHeight; // no need to store this anywhere, the reference is enough
siteHeader.style.display='block';
//Force redraw on an element (jQuery) https://coderwall.com/p/ahazha/force-redraw-on-an-element-jquery
jQuery.fn.redraw = function(){
  return $(this).each(function(){
    var redraw = this.offsetHeight;
  });
};
// or
jQuery.fn.redraw = function() {
    return this.hide(0, function() {
        $(this).show();
    });
};
// or
Element.addMethods({
  redraw: function(element){
    element = $(element);
    var n = document.createTextNode(' ');
    element.appendChild(n);
    (function(){n.parentNode.removeChild(n)}).defer();
    return element;
  }
});
```

> reference

- [Rendering: repaint, reflow/relayout, restyle](http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/)
- [forcing-a-ui-redraw-from-javascript](http://ajaxian.com/archives/forcing-a-ui-redraw-from-javascript)

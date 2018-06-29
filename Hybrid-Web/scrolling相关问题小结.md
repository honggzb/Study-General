[scrolling相关问题小结](#top)

- [1. IOS horizontal scrolling bug](#horizontal)

<h2 id="horizontal">1. IOS horizontal scrolling bug</h2>

```javascript
// for IOS horizontal scrolling bug
		this.bind("setup", function(view, resources)
		{
			if(otui.is(otui.modes.PHONE) && otui.is(otui.modes.APPWORKS) && mejs.MediaFeatures.isiOS)
			{
				var el = view.contentArea().find(".ot-results")[0];
				var scrollStartPos = 0;
				el.addEventListener("touchstart", function(event)
				{
					scrollStartPos = this.scrollLeft + event.touches[0].pageX;
				}, false);
				el.addEventListener("touchmove", function(event)
				{
					this.scrollLeft = scrollStartPos - event.touches[0].pageX;
				}, false);
			}
		});
 ```
 
 [back to top](#top)

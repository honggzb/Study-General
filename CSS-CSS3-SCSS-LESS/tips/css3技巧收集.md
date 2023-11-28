[css3技巧收集](#top)

- [Apply CSS3 Transforms to Background Images](#Background-Images)

<h2 id="Background-Images">Apply CSS3 Transforms to Background Images</h2>

```css
/* must be set to position: relative* /
#myelement {
  position: relative;
  overflow: hidden;
  -webkit-transform: rotate(30deg); 
  transform: rotate(30deg);
}
/* 定义一个和myelement同样transform的伪css: before*/
/* create an absolutely-positioned pseudo element with a transformed background */
#myelement:before {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  z-index: -1;    /* z-index is set to -1 to ensure it appears below the container’s content */
  background: url(background.png) 0 0 repeat;  
  -webkit-transform: rotate(30deg);   /*use -webkit to make sure support Blackberry Browser and UC Browser for Android*/
  transform: rotate(30deg);
}
```

https://www.sitepoint.com/css3-transform-background-image/?utm_source=frontendfocus&utm_medium=email

[back to top](#top)

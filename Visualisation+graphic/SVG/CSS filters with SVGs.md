[CSS filters with SVGs](#top)

```html
<svg>
   <filter id="xxx">
    <!--Filter Primitives go in here-->
   </filter>
   <img src="2833.jpg" filter="url(#xxx)"></img>
</svg>
```

|||
|---|---|
|feGaussianBlur|`<feGaussianBlur stdDeviation="5" in="SourceGraphic" result="BLUR"></feGaussianBlur>` <br> 🔥`stdDeviation` -> <br> 🔥`in` -> where the filter will be applied, `in="SourceGraphic"` can also be text<br>🔥`result` -> as a reference for `in` when working with multiple filters|
|feDropShadow|`<feDropShadow in="SourceGraphic" dx="10" dy="10"></feDropShadow>`|
|feMorphology|`<feMorphology in="SourceGraphic" operator="dilate" radius="5"></feMorphology>`<br>🔥`operator` -> "dilate/erode" --> "outwards/inwards"|
|feTurbulence|`<feTurbulence in="SourceGRaphic" baseFrequency="0.01 0.02" numOctaves="1" result="NOISE">`<br>🔥`baseFrequency` -> amount of distortion, or noise, in the x and y directions<br>🔥`numOctaves` -> a noise function and controls the number of octaves in the filter effect|
|feDisplacementMap|change the content of another element<br> can add some animation|
|feColorMatrix|hue and saturation of an element. It works with a type attribute and four possible values: `matrix`, `saturate`, `hueRotate`, and `luminaceToAlpha`<br>![feColorMatrix](feColorMatrix.png)<br>![feColorMatrix1](feColorMatrix1.png)<br>![feColorMatrix2](feColorMatrix2.png)|
|feConvolveMatrix|adds a convolution effect, or kernel, to an image. It’s used for blurring, edge detection, sharpening, embossing, and beveling using a combination of pixels<br>![feConvolveMatrix](feConvolveMatrix.png)|
|feComponentTransfer|similar to feColorMatrix, but each color channel (RGBA) is a separate function<br>![feComponentTransfer](feComponentTransfer.png)|
|feOffset|offsetting the image along the x and y directions<br>`<feOffset in="SourceGraphic" dx="10" dy="10"></feOffset>`|
|feMerge|layer two or more elements<br>![feMerge](feMerge.png)|
|feFlood|`<feflood flood-color="#00c2cb" flood-opacity="0.1" />`<br>simply flooding the filter area with color|
|feComposite|combines an image with its background<br>|
|feImage|fills up the the filter area with an image<br>`<feImage xlink:href="2833.jpg" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="IMAGE"></feImage>`<br>can use this filter to add this image to the text|
|feBlend|blends the image with its background<br>|
|feDiffuseLighting|light coming from a large, outside source.|
|feSpecularLighting|Specular light|
|feTile|creates a repeating pattern on an element|

> References
- [A complete guide to using CSS filters with SVGs](https://blog.logrocket.com/complete-guide-using-css-filters-svgs/)

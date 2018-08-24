## [Media Queries for Standard Devices](#top)

- [1 Phones and Handhelds](#Phones-and-Handhelds)
  - [1.1 iPhones](#iPhones)
  - [1.2 Galaxy Phones](#Galaxy-Phones)
  - [1.3 HTC Phones](#HTC-Phones)
- [2 Tablets](#Tablets)
  - [2.1 iPads](#iPads)
  - [2.2 Galaxy Tablets](#Galaxy-Tablets)
  - [2.3 Nexus Tablets](#Nexus-Tablets)
  - [2.4 Kindle Fire](#Kindle-Fire)
- [3 Laptops](#Laptops)
- [4 Wearables](#Wearables)
  - [4.1 Apple Watch](#Apple-Watch)
  - [4.2 Moto 360 Watch](#Moto-Tablets)
- [5 compatible of low version](#compatible)

----

| 媒体类型 | 说明 |
| :------------- | :------------- |
|all|所有媒体（默认值）|
|screen|彩色屏幕|
|print| 打印预览|
|projection|手持设备|
|tv|电视|
|braille|盲文触觉设备|
|embossed| 盲文打印机|
|speech|“听觉”类似的媒体设备|
|tty|不适用像素的设备|

----

<h3 id="Phones-and-Handhelds">1 Phones and Handhelds</h3>

<h4 id="iPhones">1.1 iPhones</h4>

```css
/* ----------- iPhone 4 and 4S ----------- */
/* Portrait and Landscape */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 480px)
  and (-webkit-min-device-pixel-ratio: 2) {

}
/* Portrait */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 480px)
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: portrait) {
}
/* Landscape */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 480px)
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: landscape) {

}
/* ----------- iPhone 5 and 5S ----------- */
/* Portrait and Landscape */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 568px)
  and (-webkit-min-device-pixel-ratio: 2) {

}
/* Portrait */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 568px)
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: portrait) {
}
/* Landscape */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 568px)
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: landscape) {

}
/* ----------- iPhone 6 ----------- */
/* Portrait and Landscape */
@media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2) { 

}
/* Portrait */
@media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: portrait) { 

}
/* Landscape */
@media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: landscape) { 

}
/* ----------- iPhone 6+ ----------- */
/* Portrait and Landscape */
@media only screen 
  and (min-device-width: 414px) 
  and (max-device-width: 736px) 
  and (-webkit-min-device-pixel-ratio: 3) { 

}
/* Portrait */
@media only screen 
  and (min-device-width: 414px) 
  and (max-device-width: 736px) 
  and (-webkit-min-device-pixel-ratio: 3)
  and (orientation: portrait) { 

}
/* Landscape */
@media only screen 
  and (min-device-width: 414px) 
  and (max-device-width: 736px) 
  and (-webkit-min-device-pixel-ratio: 3)
  and (orientation: landscape) { 

}
```

[back to top](#top)

<h4 id="Galaxy-Phones">1.2 Galaxy Phones</h4>

```css
/* ----------- Galaxy S3 ----------- */
/* Portrait and Landscape */
@media screen 
  and (device-width: 320px) 
  and (device-height: 640px) 
  and (-webkit-device-pixel-ratio: 2) {

}
/* Portrait */
@media screen 
  and (device-width: 320px) 
  and (device-height: 640px) 
  and (-webkit-device-pixel-ratio: 2) 
  and (orientation: portrait) {

}
/* Landscape */
@media screen 
  and (device-width: 320px) 
  and (device-height: 640px) 
  and (-webkit-device-pixel-ratio: 2) 
  and (orientation: landscape) {
}
/* ----------- Galaxy S4 ----------- */
/* Portrait and Landscape */
@media screen 
  and (device-width: 320px) 
  and (device-height: 640px) 
  and (-webkit-device-pixel-ratio: 3) {

}
/* Portrait */
@media screen 
  and (device-width: 320px) 
  and (device-height: 640px) 
  and (-webkit-device-pixel-ratio: 3) 
  and (orientation: portrait) {

}
/* Landscape */
@media screen 
  and (device-width: 320px) 
  and (device-height: 640px) 
  and (-webkit-device-pixel-ratio: 3) 
  and (orientation: landscape) {

}
/* ----------- Galaxy S5 ----------- */
/* Portrait and Landscape */
@media screen 
  and (device-width: 360px) 
  and (device-height: 640px) 
  and (-webkit-device-pixel-ratio: 3) {

}
/* Portrait */
@media screen 
  and (device-width: 360px) 
  and (device-height: 640px) 
  and (-webkit-device-pixel-ratio: 3) 
  and (orientation: portrait) {

}
/* Landscape */
@media screen 
  and (device-width: 360px) 
  and (device-height: 640px) 
  and (-webkit-device-pixel-ratio: 3) 
  and (orientation: landscape) {
}

[back to top](#top)

<h4 id="Galaxy-Phones">1.3 HTC Phones</h4>

```css
/* ----------- HTC One ----------- */
/* Portrait and Landscape */
@media screen 
  and (device-width: 360px) 
  and (device-height: 640px) 
  and (-webkit-device-pixel-ratio: 3) {
}
/* Portrait */
@media screen 
  and (device-width: 360px) 
  and (device-height: 640px) 
  and (-webkit-device-pixel-ratio: 3) 
  and (orientation: portrait) {
}
/* Landscape */
@media screen 
  and (device-width: 360px) 
  and (device-height: 640px) 
  and (-webkit-device-pixel-ratio: 3) 
  and (orientation: landscape) {
}
```

[back to top](#top)

<h3 id="Tablets">2 Tablets</h3>

<h4 id="iPads">2.1 iPads</h4>

```css
/* ----------- iPad----------- */
/* Portrait and Landscape */
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px)  { /* STYLES GO HERE */}

/* ----------- iPad mini ----------- */
/* Portrait and Landscape */
@media only screen 
  and (min-device-width: 768px) 
  and (max-device-width: 1024px) 
  and (-webkit-min-device-pixel-ratio: 1) {
}
/* Portrait */
@media only screen 
  and (min-device-width: 768px) 
  and (max-device-width: 1024px) 
  and (orientation: portrait) 
  and (-webkit-min-device-pixel-ratio: 1) {
}
/* Landscape */
@media only screen 
  and (min-device-width: 768px) 
  and (max-device-width: 1024px) 
  and (orientation: landscape) 
  and (-webkit-min-device-pixel-ratio: 1) {
}
/* ----------- iPad 1 and 2 ----------- */
/* Portrait and Landscape */
@media only screen 
  and (min-device-width: 768px) 
  and (max-device-width: 1024px) 
  and (-webkit-min-device-pixel-ratio: 1) {
}
/* Portrait */
@media only screen 
  and (min-device-width: 768px) 
  and (max-device-width: 1024px) 
  and (orientation: portrait) 
  and (-webkit-min-device-pixel-ratio: 1) {
}
/* Landscape */
@media only screen 
  and (min-device-width: 768px) 
  and (max-device-width: 1024px) 
  and (orientation: landscape) 
  and (-webkit-min-device-pixel-ratio: 1) {
}
/* ----------- iPad 3 and 4 ----------- */
/* Portrait and Landscape */
@media only screen 
  and (min-device-width: 768px) 
  and (max-device-width: 1024px) 
  and (-webkit-min-device-pixel-ratio: 2) {

}
/* Portrait */
@media only screen 
  and (min-device-width: 768px) 
  and (max-device-width: 1024px) 
  and (orientation: portrait) 
  and (-webkit-min-device-pixel-ratio: 2) {

}
/* Landscape */
@media only screen 
  and (min-device-width: 768px) 
  and (max-device-width: 1024px) 
  and (orientation: landscape) 
  and (-webkit-min-device-pixel-ratio: 2) {

}
```

[back to top](#top)

<h4 id="Galaxy-Tablets">2.2 Galaxy Tablets</h4>

```css
/* ----------- Galaxy Tab 10.1 ----------- */
/* Portrait and Landscape */
@media 
  (min-device-width: 800px) 
  and (max-device-width: 1280px) {
}
/* Portrait */
@media 
  (max-device-width: 800px) 
  and (orientation: portrait) { 
}
/* Landscape */
@media 
  (max-device-width: 1280px) 
  and (orientation: landscape) { 
}
```

[back to top](#top)

<h4 id="Nexus-ablets">2.3 Nexus Tablets</h4>

```css
/* ----------- Asus Nexus 7 ----------- */
/* Portrait and Landscape */
@media screen 
  and (device-width: 601px) 
  and (device-height: 906px) 
  and (-webkit-min-device-pixel-ratio: 1.331) 
  and (-webkit-max-device-pixel-ratio: 1.332) {
}
/* Portrait */
@media screen 
  and (device-width: 601px) 
  and (device-height: 906px) 
  and (-webkit-min-device-pixel-ratio: 1.331) 
  and (-webkit-max-device-pixel-ratio: 1.332) 
  and (orientation: portrait) {
}
/* Landscape */
@media screen 
  and (device-width: 601px) 
  and (device-height: 906px) 
  and (-webkit-min-device-pixel-ratio: 1.331) 
  and (-webkit-max-device-pixel-ratio: 1.332) 
  and (orientation: landscape) {
}
```

[back to top](#top)

<h4 id="Kindle-Fire">2.4 Kindle Fire</h4>

```css
/* ----------- Kindle Fire HD 7" ----------- */
/* Portrait and Landscape */
@media only screen 
  and (min-device-width: 800px) 
  and (max-device-width: 1280px) 
  and (-webkit-min-device-pixel-ratio: 1.5) {
}
/* Portrait */
@media only screen 
  and (min-device-width: 800px) 
  and (max-device-width: 1280px) 
  and (-webkit-min-device-pixel-ratio: 1.5) 
  and (orientation: portrait) {
}
/* Landscape */
@media only screen 
  and (min-device-width: 800px) 
  and (max-device-width: 1280px) 
  and (-webkit-min-device-pixel-ratio: 1.5) 
  and (orientation: landscape) {
}
/* ----------- Kindle Fire HD 8.9" ----------- */
/* Portrait and Landscape */
@media only screen 
  and (min-device-width: 1200px) 
  and (max-device-width: 1600px) 
  and (-webkit-min-device-pixel-ratio: 1.5) {
}
/* Portrait */
@media only screen 
  and (min-device-width: 1200px) 
  and (max-device-width: 1600px) 
  and (-webkit-min-device-pixel-ratio: 1.5) 
  and (orientation: portrait) {
}
/* Landscape */
@media only screen 
  and (min-device-width: 1200px) 
  and (max-device-width: 1600px) 
  and (-webkit-min-device-pixel-ratio: 1.5) 
  and (orientation: landscape) {

}
```

[back to top](#top)

<h3 id="Laptops">3 Laptops</h3>

Media Queries for laptops are a bit of a juggernaut. Instead of targeting specific devices, try specifying a general screen size range, then distinguishing between retina and non-retina screens.

```css
/* ----------- Non-Retina Screens ----------- */
@media screen 
  and (min-device-width: 1200px) 
  and (max-device-width: 1600px) 
  and (-webkit-min-device-pixel-ratio: 1) { 
}
/* ----------- Retina Screens ----------- */
@media screen 
  and (min-device-width: 1200px) 
  and (max-device-width: 1600px) 
  and (-webkit-min-device-pixel-ratio: 2)
  and (min-resolution: 192dpi) { 
}
```

[back to top](#top)

<h3 id="Wearables">4 Wearables</h3>

Yes, we're going there. Sure, these might not exactly qualify as "standard" devices quite yet, but they are fun to look at.

<h4 id="Apple-Watch">4.1 Apple Watch</h4>

```css
/* ----------- Apple Watch ----------- */
@media
  (max-device-width: 42mm)
  and (min-device-width: 38mm) { 
}
```

<h4 id="Moto-Watch">4.2 Moto 360 Watch</h4>

```css
/* ----------- Moto 360 Watch ----------- */
@media 
  (max-device-width: 218px)
  and (max-device-height: 281px) { 
}
```

<h3 id="compatible">5 compatible of low versionh</h3>

```html
<!--[if lt IE 9]>
        <script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
    <![endif]-->
```

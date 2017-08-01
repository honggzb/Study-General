[移动web平时开发问题小结](#top)

- [1. CSS](#css)
  - [1.1 Background image not showing on iPad and iPhone](#background-image)
  - [1.2 Scrolling slow on mobile/ios](#Scrolling)

<h2 id="css">1. CSS</h2>

<h3 id="background-image">1.1 Background image not showing on iPad and iPhone</h3>

See [background-size](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size_. This property must be specified after background-position, separated with the '/' character.


```css
background: url([URL]) 0 0 / auto 749px;
/* or 1) */
background: url([URL]) 0 0 / cover;
/* or 2) */
/* The support for background-size in the shorthand notation is also not very broad, as it's supported in Firefox 18+, Chrome 21+, IE9+ and Opera. 
It is not supported in Safari at all. Regarding this, I would suggest to always use(seperate writing) */
background: url("background1.png");
background-size: auto 749px; /* or cover */
/* or 3) */
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
```

other solution

```css
section {
    width: 200px;
    height: 100px;
    border: 1px solid grey;
}
#section1 {
    background: url(http://placehold.it/350x150) auto 100px;
}
#section2 {
    background: url(http://placehold.it/350x150) 0 0 / auto 100px;
}
#section3 {
    background: url(http://placehold.it/350x150) 0 0 / cover;
}
#section4 {  //safari work only this way
    background: url(http://placehold.it/350x150) 0 0;
    background-size: cover;
}
```

[back to top)(#top)

<h3 id="Scrolling">1.2 Scrolling slow on mobile/ios</h3>

https://stackoverflow.com/questions/33601165/scrolling-slow-on-mobile-ios-when-using-overflowscroll

```css
.scrolling-content {
   overflow-y: scroll;
   -webkit-overflow-scrolling: touch;    /*adding `-webkit-overflow-scrolling:touch` to scrolling element*/
   height:100%;                          /*A value other than height:auto needs to be set*/
}
```

[back to top)(#top)

> Reference

- https://stackoverflow.com/questions/18999660/background-image-not-showing-on-ipad-and-iphone

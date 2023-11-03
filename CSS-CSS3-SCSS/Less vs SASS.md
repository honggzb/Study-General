## [Less vs SASS](#top)

- [1. Variable- exactly same](#Variable)
- [2. Nesting- exactly same](#Nesting)
- [3. Mixins](#Mixins)
- [4. Inheritance](#Inheritance)
- [5. Importing- exactly same](#Importing)
- [6. Color Functions](#Color)
- [7. Math- exactly same](#Math)
- [8. Practical Applications](#Vendor)
    - Vendor Prefixes
    - 3D Text
    - Media Queries

<h2 id="Variable">1. Variable- exactly same</h2>

```css
          Sass                         |           Less
---------------------------------------+--------------------- ---------------------
$mainColor: #0982c1;                   | $mainColor: #0982c1;
$borderStyle: dotted;                  | $borderStyle: dotted; 
body {                                 | body {
  color: $mainColor;                   |  color: $mainColor;
  border: 1px $borderStyle $mainColor; |  border: 1px $borderStyle $mainColor;
}                                      | }
```

<h2 id="Nesting">2. Nesting- exactly same</h2>

```css
section {
  margin: 10px;
  nav {
    height: 25px;
    a {
      color: #0982C1
      &amp;:hover {
        text-decoration: underline;
      }
    }
  }
}
```

[back to top](#top)

<h2 id="Mixins">3. Mixins</h2>

**Mixins are functions that allow the reuse of properties**

```
Sass                              | Less
----------------------------------+----------------------------------
@mixin bordered {                 | .bordered {
  border-top: dotted 1px black;   |   border-top: dotted 1px black;
  border-bottom: solid 2px black; |   border-bottom: solid 2px black;
}                                 | }
                                  | 
#menu a {                         | #menu a {
  @include bordered;              |   .bordered;
}                                 | }
```

**Mixins with Arguments / Dynamic Mixins**

```
          Sass                       |           Less
-------------------------------------+--------------------- ----------------------------------------------
@mixin error($borderWidth: 2px) {    |.error(@borderWidth: 2px) {
  border: $borderWidth solid #F00;   |  border: @borderWidth solid #F00;
  color: #F00;                       |  color: #F00;
}                                    |}
.generic-error {                     |.generic-error {
  padding: 20px;                     |  padding: 20px;
  margin: 4px;                       |  margin: 4px;
  @include error();                  |  .error(); /* Applies styles from mixin error */
}                                    |}
.login-error {                       |.login-error {
  left: 12px;                        |  left: 12px;
  position: absolute;                |  position: absolute;
  top: 20px;                         |  top: 20px;
  @include error(5px);               |  .error(5px); /* Applies styles from mixin error with argument @borderWidth equal to 5px */
}                                    |}
```

[back to top](#top)

<h2 id="Inheritance">4. Inheritance</h2>

- Mixins are functions that allow the reuse of properties
- LESS doesn't truly support inheriting styles like Sass and Stylus. Instead of adding multiple selectors to one set of properties, it treats inheritance like a mixin without arguments and imports the styles into their own selectors

```
  Sass by using @extend concept                      |           Less
-----------------------------------------------------+----------------------------------------
.block {                                             |.block {
  margin: 10px 5px;                                  |  margin: 10px 5px;
  padding: 2px;                                      |  padding: 2px;
}                                                    |}
p {                                                  |p {
  @extend .block; /* Inherit styles from '.block' */ |  .block; /* Inherit styles from '.block' */
  border: 1px solid #EEE;                            |  border: 1px solid #EEE;
}                                                    |}
ul, ol {                                             |ul, ol {
  @extend .block; /* Inherit styles from '.block' */ |  .block; /* Inherit styles from '.block' */
  color: #333;                                       |  color: #333;
  text-transform: uppercase;                         |  text-transform: uppercase;
}                                                    |}
```

**Selector Inheritance**

```
Sass                        | Less  | CSS Output
----------------------------+-------+---------------------------
.bordered {                 |  N/A  | .bordered, #menu a {
  border: 1px solid back;   |       |   border: 1px solid back; }
}                           |       |
#menu a {                   |       |
  @extend .bordered;        |       |
}                          
```

[back to top](#top)

<h2 id="Importing">5. Importing- exactly same</h2>

`@import "reset.css";`

<h2 id="Color">6. Color Functions</h2>

```
Sass                                                                           | Less
-------------------------------------------------------------------------------+------------------------------------------------------------------------------
lighten($color, 10%); /* returns a color 10% lighter than $color */            |lighten(@color, 10%); /* returns a color 10% lighter than @color */
darken($color, 10%);  /* returns a color 10% darker than $color */             |darken(@color, 10%);  /* returns a color 10% darker than @color */
saturate($color, 10%);   /* returns a color 10% more saturated than $color */  |saturate(@color, 10%);   /* returns a color 10% more saturated than @color */
desaturate($color, 10%); /* returns a color 10% less saturated than $color */  |desaturate(@color, 10%); /* returns a color 10% less saturated than @color */
grayscale($color);  /* returns grayscale of $color */                          |spin(@color, 10);  /* returns a color with a 10 degree larger in hue than @color */
complement($color); /* returns complement color of $color */                   |spin(@color, -10); /* returns a color with a 10 degree smaller hue than @color */
invert($color);     /* returns inverted color of $color */                     |mix(@color1, @color2); /* return a mix of @color1 and @color2 */
mix($color1, $color2, 50%); /* mix $color1 with $color2 with a weight of 50% */|
$color: #0982C1;                                                               |@color: #0982C1;
h1 {                                                                           |h1 {
  background: $color;                                                          |   background: @color;
  border: 3px solid darken($color, 50%);                                       |  border: 3px solid darken(@color, 50%);
}                                                                              |}
```

- [Sass Documentation](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html)
- [LESS Documentation](http://lesscss.org/#-color-functions)

[back to top](#top)

<h2 id="Math">7. Math- exactly same</h2>

```css
body {
  margin: (14px/2);
  top: 50px + 100px;
  right: 100px - 50px;
  left: 10 * 10;
}
div {
   width: 100px + 2em; // == 102px (weird)
}
```

**Numbers**

```
Sass                       | Less
---------------------------+-----------------
1cm * 1em => 1 cm * em     | 1cm * 1em => Error
2in * 3in => 6 in * in     | 2in * 3in => 6in
(1cm / 1em) * 4em => 4cm   | (1cm / 1em) * 4em => Error
2in + 3cm + 2pc => 3.514in | 2in + 3cm + 2pc => Error
3in / 2in => 1.5           | 3in / 2in => 1.5in
```

**Conditionals & Control Structures**

```
Sass                          | Less 
------------------------------+--------------------------------------------------
@if lightness($color) > 30% { | .mixin (@color) when (lightness(@color) > 30%) { 
  background-color: black;    |   background-color: black;
}                             | }
@else {                       | .mixin (@color) when (lightness(@color) =< 30%) {
  background-color: white;    |   background-color: white;
}                             | }
/*Loop*/                      | 
@for $i from 1px to 10px {    | N/A
.border-#{i} {                |
    border: $i solid blue;    |
    }                         |
}                             |
```

[back to top](#top)

<h2 id="Vendor">8. Practical Applications</h2>

**Vendor Prefixes**

```
Sass                             | Less
---------------------------------+-----------------------------------
@mixin border-radius($values) {  | .border-radius(@values) {
-webkit-border-radius: $values;  |   -webkit-border-radius: @values;
     -moz-border-radius: $values;|      -moz-border-radius: @values;
          border-radius: $values;|           border-radius: @values;
}                                |  }
div{                             | div{
  @include border-radius(10px);  |  .border-radius(10px);
}                                | }
```

**3D Text**

```
          Sass                                    |       Less
--------------------------------------------------+-------------------------------------------------
@mixin text3d($color) {                           | .text3d(@color) {
    color: $color;                                |   color: @color;
    text-shadow: 1px 1px 0px darken($color, 5%),  |   text-shadow: 1px 1px 0px darken(@color, 5%),
                 2px 2px 0px darken($color, 10%), |                2px 2px 0px darken($color, 10%),
                 3px 3px 0px darken($color, 15%), |                3px 3px 0px darken($color, 15%),
                 4px 4px 0px darken($color, 20%), |                4px 4px 0px darken($color, 20%),
                 4px 4px 2px #000;                |                4px 4px 2px #000;  
}                                                 |  }
div{                                              | div{
  @include text3d(#0982c1);                       |  .text3d(#0982c1);
}                                                 | }
```

**Media Queries**

- [_selector_hacks.scss](https://gist.github.com/chriseppstein/1215856)

```css
@mixin respond-to($media) {
  @if $media == handhelds {
    @media only screen and (max-width: 479px) { @content; }
  }
  @else if $media == wide-handhelds {
    @media only screen and (min-width: 480px) and (max-width: 767px) { @content; }
  }
  @else if $media == tablets {
    @media only screen and (min-width: 768px) and (max-width: 959px) { @content; }
  }
}
#sidebar {
  float: left;
  width: 300px;
  @include respond-to(handhelds) { float: none; }
  @include respond-to(wide-handhelds) { float: none; }
  @include respond-to(tablets) { width: 240px; }
}
```

[back to top](#top)
